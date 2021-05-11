import React, {useRef, useEffect} from 'react'
import * as d3 from 'd3'

const Clock = () => {
    const element = useRef(null)

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
                .attr("stdDeviation", "20")

        // Create dummy data
        let data = {a: 9, b: 20, c:20, d:8, e:12}

        let color = d3.scaleOrdinal()
            .domain(['a', 'b', 'c', 'd', 'e'])
            .range(["#00ff00", "#00ff00", "#99ff99", "#ff0000", "#ff0000"])

        let pie = d3.pie()
            .value(d => d[1])
        let data_ready = pie(Object.entries(data))

        svg
            .selectAll('whatever')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', d3.arc()
                .innerRadius(80)
                .outerRadius(radius)
            )
            .attr('fill', function(d){ 
                return(color(d.data[0])) 
            })
            .style("stroke-width", "2px")
            .style("opacity", 0.7)


        svg
            .attr("filter", "url(#blur)")    


        root.append("circle")
            .attr("r", "115")
            .attr("cx", width / 2)
            .attr("cy", height / 2)
            .attr("fill", "#fff")
        
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
                .style("stroke", "#aaa")
        }

        let hourhand = clock
            .append("line")
                .attr("x1", width/2)
                .attr("y1", height/2)
                .attr("x2", width/2)
                .attr("y2", height/2 - 50)
                .attr("stroke-linecap", "round")
                .style("stroke-width", "10px")
                .style("stroke", "#555")

        let minutehand = clock
            .append("line")
                .attr("x1", width/2)
                .attr("y1", height/2)
                .attr("x2", width/2)
                .attr("y2", height/2 - 70)
                .attr("stroke-linecap", "round")
                .style("stroke-width", "10px")
                .style("stroke", "#555")
        
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
        <div className="w-full" ref={element}></div>
    )
}

export default Clock