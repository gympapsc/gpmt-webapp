import React, { useState } from "react"

const DateTimeInput = ({label, value, onChange}) => {

    let [minute, setMinute] = useState(value?.getMinutes() || 0)
    let [hour, setHour] = useState(value?.getHours() || 0)
    let [day, setDay] = useState(value?.getDate() || 0)
    let [month, setMonth] = useState(value?.getMonth() || 0)
    let [year, setYear] = useState(value?.getFullYear() || 0)

    let changeDate = e => {
        let newDate = new Date(year, month, day, hour, minute)
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
                        value={month + 1}
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
                        value={year}
                        onChange={e => setYear(e.target.value)}
                        onBlur={changeDate}
                        placeholder="Jahr"
                        />
                </div>
            </div>
            <label className="text-sm text-gray-600" htmlFor="hour">Uhrzeit</label>
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <input
                        className="color transition ease-in-out duration-200 w-full border border-gray-300 bg-white rounded-lg px-3 py-2 md:py-3 block mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:ring-offset-1 focus:outline-none"
                        type="number"
                        id="hour"
                        value={hour}
                        onChange={e => setHour(e.target.value)}
                        onBlur={changeDate}
                        placeholder="Stunde"
                        />
                </div>
                <div>
                    <input
                        className="color transition ease-in-out duration-200 w-full border border-gray-300 bg-white rounded-lg px-3 py-2 md:py-3 block mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:ring-offset-1 focus:outline-none"
                        type="number"
                        id="minute"
                        value={minute}
                        onChange={e => setMinute(e.target.value)}
                        onBlur={changeDate}
                        placeholder="Minute"
                        />
                </div>
            </div>
        </>
    )
}

export default DateTimeInput