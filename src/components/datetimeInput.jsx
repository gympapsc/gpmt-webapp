import React, { useState } from "react"
import PropTypes from "prop-types"

const DateTimeInput = ({label, value, onChange}) => (
    <>
        <label className="text-xs text-gray-600 uppercase" htmlFor="day">{label}</label>
        <div className="grid grid-cols-3 gap-2">
            <div>
                <input
                    className="color transition ease-in-out duration-200 w-full border border-gray-300 bg-white rounded-lg px-3 py-2 md:py-3 block mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:ring-offset-1 focus:outline-none"
                    type="number"
                    id="day"
                    value={value.getDate()}
                    onChange={e => {value.setDate(e.target.value);onChange(value)}}
                    placeholder="Tag"
                    />
            </div>
            <div>
                <input
                    className="color transition ease-in-out duration-200 w-full border border-gray-300 bg-white rounded-lg px-3 py-2 md:py-3 block mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:ring-offset-1 focus:outline-none"
                    type="number"
                    id="month"
                    value={value.getMonth() + 1}
                    onChange={e => {value.setMonth(e.target.value - 1);onChange(value)}}
                    placeholder="Monat"
                    />
            </div>
            <div>
                <input
                    className="color transition ease-in-out duration-200 w-full border border-gray-300 bg-white rounded-lg px-3 py-2 md:py-3 block mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:ring-offset-1 focus:outline-none"
                    type="number"
                    id="year"
                    value={value.getFullYear()}
                    onChange={e => {value.setFullYear(e.target.value);onChange(value)}}
                    placeholder="Jahr"
                    />
            </div>
        </div>
        <label className="text-xs text-gray-600 uppercase" htmlFor="hour">Uhrzeit</label>
        <div className="grid grid-cols-2 gap-2">
            <div>
                <input
                    className="color transition ease-in-out duration-200 w-full border border-gray-300 bg-white rounded-lg px-3 py-2 md:py-3 block mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:ring-offset-1 focus:outline-none"
                    type="number"
                    id="hour"
                    value={value.getHours()}
                    onChange={e => {value.setHours(e.target.value);onChange(value)}}
                    placeholder="Stunde"
                    />
            </div>
            <div>
                <input
                    className="color transition ease-in-out duration-200 w-full border border-gray-300 bg-white rounded-lg px-3 py-2 md:py-3 block mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:ring-offset-1 focus:outline-none"
                    type="number"
                    id="minute"
                    value={value.getMinutes()}
                    onChange={e => {value.setMinutes(e.target.value);onChange(value)}}
                    placeholder="Minute"
                    />
            </div>
        </div>
    </>
)

DateTimeInput.propTypes = {
    label: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func
}

export default DateTimeInput