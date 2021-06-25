import React, { useState } from "react"
import PropTypes from "prop-types"

const DateInput = ({label, value, onChange}) => {

    let [day, setDay] = useState(value?.getDate())
    let [month, setMonth] = useState(value?.getMonth())
    let [year, setYear] = useState(value?.getFullYear())

    let changeDate = e => {
        let newDate = new Date(year, month, day)
        onChange(newDate)
    }

    return (
        <>
            <label className="text-sm text-gray-600" htmlFor="day">{label}</label>
            <div className="grid grid-cols-3 gap-2">
                <div>
                    <input
                        className="color transition ease-in-out duration-200 w-full border border-gray-300 bg-white rounded-lg px-3 py-2 md:py-3 block mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:ring-offset-1 focus:outline-none"
                        type="number"
                        id="day"
                        value={day}
                        onChange={e => setDay(e.target.value)}
                        onBlur={changeDate}
                        placeholder="Tag"
                        />
                </div>
                <div>
                    <input
                        className="color transition ease-in-out duration-200 w-full border border-gray-300 bg-white rounded-lg px-3 py-2 md:py-3 block mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:ring-offset-1 focus:outline-none"
                        type="number"
                        id="month"
                        defaultValue={month + 1}
                        onChange={e => setMonth(e.target.value - 1)}
                        onBlur={changeDate}
                        placeholder="Monat"
                        />
                </div>
                <div>
                    <input
                        className="color transition ease-in-out duration-200 w-full border border-gray-300 bg-white rounded-lg px-3 py-2 md:py-3 block mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:ring-offset-1 focus:outline-none"
                        type="number"
                        id="year"
                        defaultValue={year}
                        onChange={e => setYear(e.target.value)}
                        onBlur={changeDate}
                        placeholder="Jahr"
                        />
                </div>
            </div>
        </>
    )
}

DateInput.propTypes = {
    label: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func
}

export default DateInput