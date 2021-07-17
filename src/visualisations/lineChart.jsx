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

        // let Tooltip = d3.select(element.current)
        //     .append("div")
        //     .style("opacity", 0)
        //     .attr("class", "tooltip")
        //     .style("background-color", "white")
        //     .style("padding", "5px")
        
        // let mouseover = d => {
        //     Tooltip
        //         .style("opacity", 1)
        // }
        // let mousemove = d => {
        //     Tooltip
        //         .html("Value is " + d.value)
        //         .style("left", (d3.mouse(this)[0] + 70) + "px")
        //         .style("top", d3.mouse(this)[1] + "px")
        // }
        // let mouseleave = d => {
        //     Tooltip
        //         .style("opacity", 0)
        // }


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
                .curve(d3.curveMonotoneX))
            

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