import React, { useState } from "react"
import PropTypes from "prop-types"

const TimeInput = ({label, value, onChange}) => (
    <>
        <label className="text-sm text-gray-600" htmlFor="hour">{label}</label>
        <div className="grid grid-cols-3 gap-2">
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
                    id="minutes"
                    value={value.getMinutes()}
                    onChange={e => {value.setMinutes(e.target.value);onChange(value)}}
                    placeholder="Minute"
                    />
            </div>
        </div>
    </>
)


TimeInput.propTypes = {
    label: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func
}

export default TimeInput