import React, {useRef, useEffect} from "react"
import * as d3 from "d3"

const LineChart = ({data}) => {
    let element = useRef(null)

    useEffect(() => {
        data =  [
            [new Date("2020-10-10T00:00:00"), 100, 80, 120],
            [new Date("2020-10-10T01:00:00"), 300, 260, 340],
            [new Date("2020-10-10T02:00:00"), 200, 190, 250],
            [new Date("2020-10-10T03:00:00"), 400, 290, 450],
            [new Date("2020-10-10T04:00:00"), 300, 250, 350],
            [new Date("2020-10-10T05:00:00"), 130, 20, 140],
            [new Date("2020-10-10T06:00:00"), 100, 90, 150],
            [new Date("2020-10-10T07:00:00"), 200, 190, 250],
            [new Date("2020-10-10T08:00:00"), 100, 190, 250],
            [new Date("2020-10-10T09:00:00"), 200, 190, 250],
            [new Date("2020-10-10T10:00:00"), 300, 190, 250],
            [new Date("2020-10-10T11:00:00"), 150, 190, 250],
            [new Date("2020-10-10T12:00:00"), 350, 190, 250],
            [new Date("2020-10-10T13:00:00"), 0, 190, 250],
            [new Date("2020-10-10T14:00:00"), 100, 190, 250],
            [new Date("2020-10-10T15:00:00"), 100, 190, 250],
            [new Date("2020-10-10T16:00:00"), 50, 190, 250],
            [new Date("2020-10-10T17:00:00"), 200, 190, 250],
            [new Date("2020-10-10T18:00:00"), 100, 190, 250],
            [new Date("2020-10-10T19:00:00"), 160, 190, 250],
            [new Date("2020-10-10T20:00:00"), 0, 190, 250],
            [new Date("2020-10-10T21:00:00"), 0, 190, 250],
            [new Date("2020-10-10T22:00:00"), 200, 190, 250],
            [new Date("2020-10-10T23:00:00"), 100, 190, 250]
        ]


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

        let x = d3.scaleTime()
            .domain([d3.min(data.map(d => d[0])), d3.max(data.map(d => d[0]))])
            .range([ 0, width ])
        Svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickSize(-height*1.3).ticks(5))
            .select(".domain").remove()

        let y = d3.scaleLinear()
            .domain([0, 1])
            .range([ height, 0])
            .nice()
        Svg.append("g")
            .call(d3.axisLeft(y).tickSize(-width*1.3).ticks(5))
            .select(".domain").remove()

        Svg.selectAll(".tick line")
            .attr("stroke", "#EBEBEB")

        Svg.append("path")
            .datum(data)
            .attr("fill", "#cce5df")
            .attr("stroke", "none")
            .attr("d", d3.area()
                .x(d => x(d[0]))
                .y0(d => y(d[2] / 500))
                .y1(d => y(d[3] / 500))
                .curve(d3.curveMonotoneX))

        Svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "blue")
            .attr("stroke-width", 3)
            .attr("d", d3.line()
                .x(d => x(d[0]))
                .y(d => y(d[1] / 500))
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