import React from "react"

const TimeInput = ({label, value, onChange}) => {


    let [hour, setHour] = useState(value.getMinutes())
    let [minute, setMinute] = useState(value.getMinutes())

    const changeTime = e => {
        let date = new Date()
        date.setHours(hour)
        date.setMinutes(minute)
        onChange(date)
    }

    return (
        <>
            <label className="text-sm text-gray-600" htmlFor="day">{label}</label>
            <div className="grid grid-cols-3 gap-2">
                <div>
                    <input
                        className="color transition ease-in-out duration-200 w-full border border-gray-300 bg-white rounded-lg px-3 py-2 md:py-3 block mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:ring-offset-1 focus:outline-none"
                        type="number"
                        id="month"
                        defaultValue={hour + 1}
                        onChange={e => setHour(e.target.value - 1)}
                        onBlur={changeTime}
                        placeholder="Stunde"
                        />
                </div>
                <div>
                    <input
                        className="color transition ease-in-out duration-200 w-full border border-gray-300 bg-white rounded-lg px-3 py-2 md:py-3 block mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:ring-offset-1 focus:outline-none"
                        type="number"
                        id="minutes"
                        defaultValue={minute}
                        onChange={e => setMinute(e.target.value)}
                        onBlur={changeTime}
                        placeholder="Minute"
                        />
                </div>
            </div>
        </>
    )
}

export default TimeInput