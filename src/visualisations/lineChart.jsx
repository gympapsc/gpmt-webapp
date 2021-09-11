import React, {useRef, useEffect} from "react"
import * as d3 from "d3"

import {
    useUser
} from "../hooks"

const cumulativeData = (d, selector) => {
    let sum = 0
    return d.map(e => {
        sum += e[selector] / 8
        return {
            ...e,
            [selector]: sum
        }
    })
}

const LineChart = ({data, xlabel, ylabel}) => {
    let element = useRef(null)

    let user = useUser()

    useEffect(() => {
        data = data || []

        data = user.settings.cumulativePrediction ? cumulativeData(data, "prediction") : data

        let margin = {top: 10, right: 20, bottom: 20, left: 20},
            width = element.current.clientWidth - margin.left - margin.right,
            height = element.current.clientHeight - margin.top - margin.bottom;

        let Svg = d3.select(element.current)
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")")
        
        let now = new Date()

        let x = d3.scaleTime()
            .domain([
                new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours()), 
                new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, now.getHours())
            ])
            .range([ 0, width ])
            .clamp(true)
            
        Svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickSize(-height*1.3).ticks(5))
            .call(g =>
                g.selectAll(".tick")
                .selectAll("text")
                    .attr("y", 6)
            )
            .select(".domain").remove()

        let y = d3.scaleLinear()
            .domain([0, d3.max(data?.map(e => e.prediction) || [0.5]) + 0.5])
            .range([ height, 0])
            .nice()

        Svg.append("g")
            .call(d3.axisLeft(y).tickSize(-width*1.3).ticks(5))
            .select(".domain").remove()

        Svg.selectAll(".tick line")
            .attr("stroke", "#EBEBEB")

        if(!user.settings.cumulativePrediction) {
            Svg.append("path")
            .datum(data)
            .attr("fill", "#cce5df")
            .attr("stroke", "none")
            .attr("d", d3.area()
                .x(d => x(d.date))
                .y0(d => y(Math.abs(d.prediction + 0.2)))
                .y1(d => y(Math.abs(d.prediction - 0.1)))
                .curve(d3.curveMonotoneX))
        }

        Svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "blue")
            .attr("stroke-width", 3)
            .attr("d", d3.line()
                .x(d => x(d.date))
                .y(d => y(d.prediction))
                .curve(d3.curveMonotoneX)
            )

        let marker, tooltip, timetip, tooltipBox

        Svg.append("g")
            .selectAll("circle")
            .data(data)
            .enter()
                .append("circle")
                .attr("cx", d => x(d.date))
                .attr("cy", d => y(d.prediction))
                .attr("r", 3)
                .attr("fill", "blue")
        
        d3.select(element.current)
            .on("mouseover", (e, d) => {
                if(marker) {
                    marker
                        .attr("x1", e.offsetX - margin.left)
                        .attr("x2", e.offsetX - margin.left)
                    tooltip
                        .attr("x", width - e.offsetX < 0 ? width - margin.left : ( e.offsetX < 40 ? margin.left: e.offsetX - margin.left))
                        .attr("y", 35)
                        .attr("text-anchor", "middle")
                    timetip
                        .append("text")
                        .html(d3.timeFormat("%H:%M")(d3.timeHour.floor(x.invert(e.offsetX - margin.left))))
                        .attr("color", "#fff")
                        .attr("y", 10)

                    tooltipBox
                        .attr("x", width - e.offsetX < 0 ? width - margin.left - 40 : ( e.offsetX < 40 ? margin.left - 40: e.offsetX - margin.left - 40))
                        .attr("y", -5)

                } else {
                    let prediction = data.find(p => d3.timeHour.floor(x.invert(e.offsetX - margin.left)).valueOf() === p.date.valueOf())       

                    marker = Svg
                        .append("line", ":first-child")
                        .attr("x1", e.offsetX - margin.left)
                        .attr("x2", e.offsetX - margin.left)
                        .attr("y1", y(0) + margin.top)
                        .attr("y2", y(100) + margin.top)
                        .attr("stroke", "rgba(256, 0, 0, 0.6)")
                        .attr("stroke-width", "2px")
                        .attr("stroke", d => prediction?.prediction < 0.5 ? "green" : "red" )
                    
                    tooltipBox = Svg
                        .append("rect")
                        .attr("x", width - e.offsetX < 0 ? width - margin.left - 40 : ( e.offsetX < 40 ? margin.left - 40: e.offsetX - margin.left - 40))
                        .attr("y", -5)
                        .attr("width", 80)
                        .attr("height", 50)
                        .attr("rx", 8)
                        .attr("ry", 8)
                        .attr("fill", d => prediction?.prediction < 0.5 ? "green" : "red" )
                    
                    tooltip = Svg
                        .append("text")
                        .html(prediction?.prediction || 0 )
                        .attr("x", width - e.offsetX < 0 ? width - margin.left : ( e.offsetX < 40 ? margin.left: e.offsetX - margin.left))
                        .attr("y", 35)
                        .attr("fill", "#fff")
                        .attr("text-anchor", "middle")

                    timetip = Svg
                        .append("text")
                        .html(d3.timeFormat("%H:%M")(d3.timeHour.floor(x.invert(e.offsetX - margin.left))))
                        .attr("x", width - e.offsetX < 0 ? width - margin.left : ( e.offsetX < 40 ? margin.left: e.offsetX - margin.left))
                        .attr("y", 15)
                        .attr("fill", "#fff")
                        .attr("text-anchor", "middle")
                        .attr("font-size", 12)
                    
                    

                }
            })
            .on("mousemove", (e, d) => {
                let prediction = data.find(p => d3.timeHour.floor(x.invert(e.offsetX - margin.left)).valueOf() === p.date.valueOf())
                
                marker
                    .attr("x1", e.offsetX - margin.left)
                    .attr("x2", e.offsetX - margin.left)
                    .attr("stroke", d => prediction?.prediction < 0.5 ? "green" : "red" )


                if(prediction) {
                    tooltip
                        .html(`${Math.round(prediction?.prediction * 1000)/10}%`)
                    tooltip
                        .attr("x", width - e.offsetX < 0 ? width - margin.left : ( e.offsetX < 40 ? margin.left: e.offsetX - margin.left))
                        .attr("y", 35)
                    timetip
                        .html(d3.timeFormat("%H:%M")(d3.timeHour.floor(x.invert(e.offsetX - margin.left))))
                        .attr("x", width - e.offsetX < 0 ? width - margin.left : ( e.offsetX < 40 ? margin.left: e.offsetX - margin.left))
                    tooltipBox
                        .attr("x", width - e.offsetX < 0 ? width - margin.left - 40 : ( e.offsetX < 40 ? margin.left - 40: e.offsetX - margin.left - 40))
                        .attr("y", -5)
                        .attr("fill", d => prediction.prediction < 0.5 ? "green" : "red" )
                }

                
            })
            .on("mouseleave", (e, d) => {
                marker.remove()
                tooltip.remove()
                timetip.remove()
                tooltipBox.remove()
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


export default LineChart