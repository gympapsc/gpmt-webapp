import React, {useRef, useEffect} from 'react'
import { useSelector } from "react-redux"
import * as d3 from 'd3'

const Clock = () => {
    const element = useRef(null)
    const predictions = useSelector(state => state.micturitionPredictions)

    useEffect(() => {
        // set the dimensions and margins of the graph
        let width = element.current.clientWidth
        let height = element.current.clientWidth
        let margin = 10

        // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
        let radius = Math.min(width, height) / 2 - margin

        // append the svg object to the div called 'my_dataviz'
        let root = d3.select(element.current)
        .append("svg")
            .attr("width", width)
            .attr("height", height);

        let svg = root.append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
            .style("clip-path", "circle()");
        

        svg
            .append("filter")
                .attr("id", "blur")
            .append("feGaussianBlur")
                .attr("edgeMode", "wrap")
                .attr("stdDeviation", "15")

        // Create dummy data
        let data = predictions

        let color = d3.scaleLinear()
            .domain([0, 50, 100])
            .range(["rgb(5, 150, 105)", "#eee", "rgb(220, 38, 38)"])

        let pie = d3.pie()
            .value(d => d.prediction)
        let data_ready = pie(data)

        svg
            .selectAll('whatever')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', d3.arc()
                .innerRadius(80)
                .outerRadius(radius)
                .startAngle((d) =>  d.data.date.getHours() * Math.PI * 2 / 12)
                .endAngle((d) => (d.data.date.getHours() + 1) * Math.PI * 2 / 12 )
            )
            .attr('fill', d => color(d.data.prediction))
            .style("stroke-width", "2px")
            .style("opacity", 0.7)
            .transition()
            .duration(100)


        svg
            .attr("filter", "url(#blur)")    


        root.append("circle")
            .attr("r", "115")
            .attr("cx", width / 2)
            .attr("cy", height / 2)
            .attr("fill", "#e5e7eb")
        
        let clock = root.append("g")

        for(let i = 0; i < 12; i++) {
            clock
                .append("line")
                .attr("x1", width/2)
                .attr("y1", i % 3 == 0 ? height/2 - 85 : height/2 - 90)
                .attr("x2", width/2)
                .attr("y2", height/2 - 95)
                .attr("transform", `rotate(${360*(i/12)}, ${width/2}, ${height/2})`)
                .attr("stroke-linecap", "round")
                .style("stroke-width", "4px")
                .style("stroke", "#999")
        }

        let hourhand = clock
            .append("line")
                .attr("x1", width/2)
                .attr("y1", height/2)
                .attr("x2", width/2)
                .attr("y2", height/2 - 50)
                .attr("stroke-linecap", "round")
                .style("stroke-width", "10px")
                .style("stroke", "#444")

        let minutehand = clock
            .append("line")
                .attr("x1", width/2)
                .attr("y1", height/2)
                .attr("x2", width/2)
                .attr("y2", height/2 - 70)
                .attr("stroke-linecap", "round")
                .style("stroke-width", "10px")
                .style("stroke", "#444")
        
            let date = new Date()
            minutehand
                .attr("transform", `rotate(${360 * date.getMinutes()/60}, ${width/2}, ${height/2})`)
            hourhand
                .attr("transform", `rotate(${360 * date.getHours()/12 + 360 * date.getMinutes()/(60 * 12)}, ${width/2}, ${height/2})`)  
        
        let interval = setInterval(() => {
            date = new Date()
            minutehand
                .attr("transform", `rotate(${360 * date.getMinutes()/60}, ${width/2}, ${height/2})`)
            hourhand
                .attr("transform", `rotate(${360 * date.getHours()/12 + 360 * date.getMinutes()/(60 * 12)}, ${width/2}, ${height/2})`)  
        }, 1000)

        return () => {
            clearInterval(interval)
            if(element.current) {
                element.current.children.forEach(child => {
                    child.remove()
                })
            }
        }
    })

    return (
        <div className="w-full space-y-4 mb-4">
            <div className="w-full" ref={element}></div>
            <div className="w-full space-y-2">
                <div className="w-full h-2 rounded-full bg-gradient-to-r from-green-300 to-red-300"></div>
                <div className="float-left text-xs">0%</div>
                <div className="float-right text-xs">100%</div>
            </div>
        </div>
    )
}

export default Clock