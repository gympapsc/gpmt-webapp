import React, {useRef, useEffect} from "react"
import * as d3 from "d3"

const StressChart = ({data}) => {

    let element = useRef(null)

    useEffect(() => {
        let margin = {top: 10, right: 20, bottom: 20, left: 20},
            width = element.current.clientWidth - margin.left - margin.right,
            height = element.current.clientHeight - margin.top - margin.bottom;

        let svg = d3.select(element.current)
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")")

        let now = new Date()

        let x = d3.scaleTime()
            .domain([
                new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2), 
                new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1)
            ])
            .range([ 0, width ])
            .clamp(true)

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(
                d3.axisBottom(x)
                    .tickSize(-height*1.3)
                    .ticks(d3.timeHour.every(12))
            )
            .call(g =>
                g.selectAll(".tick")
                .selectAll("text")
                    .attr("y", 6)
            )
            .select(".domain").remove()
        

        let chart = d3.bin()
            .value(d => d.date)
            .thresholds(() => x.ticks(d3.timeHour.every(1)))
        (data)

        let y = d3.scaleLinear()
            .domain([0, 5])
            .range([ height, 0])
            .nice()

        svg.append("g")
            .call(d3.axisLeft(y).tickSize(-width*1.3).ticks(5))
            .select(".domain").remove()

        
        svg.selectAll(".tick line")
            .attr("stroke", "#EBEBEB")

        if(data.length) {
            chart = chart.filter(d => d.reduce((a, d) => a + d.level, 0) / d.length > 0)
            svg.append("path")
                .datum(chart)
                .attr("fill", "rgb(79, 70, 229)")
                .attr("fill-opacity", .3)
                .attr("stroke", "none")
                .attr("d", d3.area()
                    .x(d => x(d3.timeHour.floor(d.x0)))
                    .y0( height )
                    .y1(d => y(d.reduce((a, d) => a + d.level, 0) / d.length))
                )


            svg
                .append("g")
                .selectAll("circle")
                .data(chart)
                .enter()
                    .append("circle")
                    .attr("cx", d => x(d3.timeHour.floor(d.x0)))
                    .attr("cy", d => y(d.reduce((a, d) => a + d.level, 0) / d.length))
                    .attr("r", 4)
                    .style("fill", "rgb(79, 70, 229)")
        
        } 

        return () => {
            if(element.current) {
                element.current.children.forEach(child => {
                    child.remove()
                })
            }
        }
    })

    return (
        <div className="w-full h-full" ref={element}></div>
    )
}



export default StressChart