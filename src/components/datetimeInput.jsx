import React, { useState } from "react"
import PropTypes from "prop-types"
import * as d3 from "d3"

const formatTime = d3.timeFormat("%Y-%m-%dT%H:%M")
const DateTimeInput = ({label, value, onChange}) => {
    return (
        <>
            <label className="text-xs text-gray-600 uppercase" htmlFor="day">{label}</label>
            <div className="grid grid-cols-1 gap-2">
                <div>
                    <input
                        className="color transition ease-in-out duration-200 w-full border border-gray-300 bg-white rounded-lg px-3 py-2 md:py-3 block mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:ring-offset-1 focus:outline-none"
                        type="datetime-local"
                        value={formatTime(value)}
                        onChange={e => onChange(new Date(e.target.value))}
                    />
                </div>
            </div>
        </>
    )
}

DateTimeInput.propTypes = {
    label: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func
}

export default DateTimeInput