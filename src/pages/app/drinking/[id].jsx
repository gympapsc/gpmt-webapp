import React, { useState } from "react"
import { useRouter } from "next/router"
import { useSelector, useDispatch } from "react-redux"

import Aside from '../../../components/aside'
import Secure from '../../../components/secure'
import Shell from '../../../components/shell'
import { getDrinking } from "../../../actions"


const DrinkingEdit = () => {
    let router = useRouter()
    let {id} = router.query

    let dispatch = useDispatch()
    let entry = useSelector(state => state.drinking.find(d => d._id === id))
    console.log("ENTRY", entry)
    if(!entry) {
        dispatch(getDrinking(new Date()))
    }
    let [amount, setAmount] = useState(entry?.amount || 200)
    
    const changeAmount = amount => {
        dispatch(updateDrinking({
            ...entry,
            amount
        }))
    }

    const changeDay = e => {

    }

    const changeMonth = e => {
        
    }

    const changeYear = e => {
        
    }

    const changeHour = e => {
        
    }

    const changeMinute = e => {
        
    }


    return (
        <Secure>
            <Aside />
            <Shell title={"Trinkeintrag"} className="bg-gray-100">
                <div className="flex flex-col px-3 w-full lg:w-3/4 xl:w-2/3 mx-auto my-5 space-y-4">
                    <form className="mt-3 space-y-4">
                        <div className="space-y-5">
                            <div className="col-span-full">
                                <label className="text-sm text-gray-600" htmlFor="amount">Menge</label>
                                <h4 className="text-2xl font-semibold">{entry?.amount}<span className="text-sm">ml</span></h4>
                                <input
                                    type="range"
                                    className="block w-full"
                                    id="amount"
                                    min="0"
                                    max="1000"
                                    value={amount}
                                    onChange={e => setAmount(e.target.value)}
                                    onBlur={e => changeAmount(e.target.value)}
                                    />
                            </div>
                            <div className="col-span-full">
                                <label className="text-sm text-gray-600" htmlFor="day">Uhrzeit</label>
                                <div className="grid grid-cols-6 gap-2">
                                    <div className="col-span-2">
                                        <input
                                            className="color transition ease-in-out duration-200 w-full border border-gray-300 bg-white rounded-lg px-3 py-2 md:py-3 block mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:ring-offset-1 focus:outline-none"
                                            type="number"
                                            id="day"
                                            value={entry?.date.getDate()}
                                            placeholder="Tag"
                                            min="1"
                                            max="31"
                                            onChange={changeDay}
                                            />
                                        <span className="text-sm text-red-500">&nbsp;</span>
                                    </div>
                                    <div className="col-span-2">
                                        <input
                                            className="color transition ease-in-out duration-200 w-full border border-gray-300 bg-white rounded-lg px-3 py-2 md:py-3 block mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:ring-offset-1 focus:outline-none"
                                            type="number"
                                            id="month"
                                            value={entry?.date.getMonth() + 1}
                                            placeholder="Monat"
                                            min="1"
                                            max="12"
                                            onChange={changeMonth}
                                            />
                                        <span className="text-sm text-red-500">&nbsp;</span>
                                    </div>
                                    <div className="col-span-2">
                                        <input
                                            className="color transition ease-in-out duration-200 w-full border border-gray-300 bg-white rounded-lg px-3 py-2 md:py-3 block mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:ring-offset-1 focus:outline-none"
                                            type="number"
                                            id="year"
                                            value={entry?.date.getFullYear()}
                                            placeholder="Jahr"
                                            onChange={changeYear}
                                            />
                                        <span className="text-sm text-red-500">&nbsp;</span>
                                    </div>
                                    <div className="col-span-full md:col-span-3">
                                        <input
                                            className="color transition ease-in-out duration-200 w-full border border-gray-300 bg-white rounded-lg px-3 py-2 md:py-3 block mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:ring-offset-1 focus:outline-none"
                                            type="number"
                                            id="year"
                                            value={entry?.date.getHours()}
                                            placeholder="Stunde"
                                            min="0"
                                            max="24"
                                            onChange={changeHour}
                                            />
                                        <span className="text-sm text-red-500">&nbsp;</span>
                                    </div>
                                    <div className="col-span-full md:col-span-3">
                                        <input
                                            className="color transition ease-in-out duration-200 w-full border border-gray-300 bg-white rounded-lg px-3 py-2 md:py-3 block mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:ring-offset-1 focus:outline-none"
                                            type="number"
                                            id="year"
                                            value={entry?.date.getMinutes()}
                                            placeholder="Minute"
                                            min="0"
                                            max="60"
                                            onChange={changeMinute}
                                            />
                                        <span className="text-sm text-red-500">&nbsp;</span>
                                    </div>
                                </div>
                                
                        </div>
                        </div>

                        <div className="flex flex-row w-full">
                            <button className="py-2 w-full text-center text-white bg-red-600 rounded-lg">Löschen</button>
                        </div>
                    </form>
                </div>
            </Shell>
        </Secure>
    )
}

export default DrinkingEdit