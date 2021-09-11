import React, { useState } from "react"
import PropTypes from "prop-types"

const DateInput = ({label, value, onChange}) => (
    <>
        <label className="text-sm text-gray-600" htmlFor="day">{label}</label>
        <div className="grid grid-cols-3 gap-2">
            <div>
                <input
                    className="color transition ease-in-out duration-200 w-full border border-gray-200 high-contrast:border-gray-400 bg-white rounded-lg px-3 py-2 md:py-3 block mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:ring-offset-1 focus:outline-none"
                    type="number"
                    id="day"
                    value={value.getDate()}
                    onChange={e => {value.setDate(e.target.value);onChange(value)}}
                    // onBlur={changeDate}
                    placeholder="Tag"
                    />
            </div>
            <div>
                <input
                    className="color transition ease-in-out duration-200 w-full border border-gray-200 high-contrast:border-gray-400 bg-white rounded-lg px-3 py-2 md:py-3 block mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:ring-offset-1 focus:outline-none"
                    type="number"
                    id="month"
                    value={value.getMonth() + 1}
                    onChange={e => {value.setMonth(e.target.value - 1);onChange(value)}}
                    // onBlur={changeDate}
                    placeholder="Monat"
                    />
            </div>
            <div>
                <input
                    className="color transition ease-in-out duration-200 w-full border border-gray-200 high-contrast:border-gray-400 bg-white rounded-lg px-3 py-2 md:py-3 block mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:ring-offset-1 focus:outline-none"
                    type="number"
                    id="year"
                    value={value.getFullYear()}
                    onChange={e => {value.setFullYear(e.target.value);onChange(value)}}
                    // onBlur={changeDate}
                    placeholder="Jahr"
                    />
            </div>
        </div>
    </>
)

DateInput.propTypes = {
    label: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func
}

export default DateInput