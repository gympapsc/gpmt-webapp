import React, {useRef, useEffect} from "react"
import * as d3 from "d3"

const DrinkingChart = ({data, tooltip, range}) => {
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
                range || new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2), 
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
        
        const chart = d3.bin()
            .value(d => d.date)
            .thresholds(() => x.ticks(d3.timeHour.every(1)))
        (data)

        let y = d3.scaleLinear()
            .domain([0, 1])
            .range([ height, 0])
            .nice()

        svg.append("g")
            .call(d3.axisLeft(y).tickSize(-width*1.3).ticks(5))
            .select(".domain").remove()

        
        svg.selectAll(".tick line")
            .attr("stroke", "#EBEBEB")

        if(data.length) {
            svg.append("g")
            .selectAll("rect")
            .data(chart, d => d)
            .enter()
                .append("rect")
                .attr("x", d => x(d3.timeHour.floor(d.x0)))
                .attr("y", d => y(d.reduce((a, d) => a + d.amount, 0) / 1000))
                .attr("height", d => height - y(d.reduce((a, d) => a + d.amount, 0) / 1000))
                .attr("width", d => x(d3.timeHour.offset(d.x0, 1)) - x(d.x0) - 1)
                .style("fill", "rgb(79, 70, 229)")
        }

        let marker, tooltip

        d3.select(element.current)
            .on("mouseover", (e, d) => {
                if(marker) {
                    marker
                        .attr("x1", e.offsetX - margin.left)
                        .attr("x2", e.offsetX - margin.left)
                    tooltip
                        .attr("x", e.offsetX - margin.left)
                        .attr("y", 80)
                        .attr("text-anchor", "middle")

                } else {
                    d = chart.find(p => d3.timeHour.floor(x.invert(e.offsetX - margin.left)).valueOf() === d3.timeHour.floor(p.x0).valueOf())                
                    marker = svg
                        .append("line", ":first-child")
                        .attr("x1", e.offsetX - margin.left)
                        .attr("x2", e.offsetX - margin.left)
                        .attr("y1", y(0) + margin.top)
                        .attr("y2", y(100) + margin.top)
                        .attr("stroke", "rgba(256, 0, 0, 0.4)")
                        .attr("stroke-width", "2px")
                    tooltip = svg
                        .append("text")
                        .html(d?.reduce((a, d) => a + d.amount, 0) || 0)
                        .attr("x", e.offsetX - margin.left)
                        .attr("y", 80)
                        .attr("text-anchor", "middle")
                }
            })
            .on("mousemove", (e, d) => {
                marker
                    .attr("x1", e.offsetX - margin.left)
                    .attr("x2", e.offsetX - margin.left)
                d = chart.find(p => d3.timeHour.floor(x.invert(e.offsetX - margin.left)).valueOf() === d3.timeHour.floor(p.x0).valueOf())
                

                tooltip
                    .html(d?.reduce((a, d) => a + d.amount, 0) || 0)
                tooltip
                    .attr("x", e.offsetX - margin.left)
                    .attr("y", 80)

                
            })
            .on("mouseleave", (e, d) => {
                marker.remove()
                tooltip.remove()
                marker = undefined
            })
        
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

export default DrinkingChart