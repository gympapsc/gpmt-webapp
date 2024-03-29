import React, { useState, useRef } from "react"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"

import Aside from "../../../components/aside"
import Secure from "../../../components/secure"
import Shell from "../../../components/shell"
import DateTimeInput from "../../../components/datetimeInput"

import {
    deleteStress,
    updateStress
} from "../../../actions"
import { useStress } from "../../../hooks"

const StressEdit = () => {
    let router = useRouter()
    let inputRef = useRef(null)
    let {id} = router.query
    let dispatch = useDispatch()

    let entry = useStress(new Date())
        .find(s => s._id === id)

    let changeLevel = level => {
        dispatch(updateStress({
            ...entry,
            level: parseInt(level)
        }))
    }

    let changeDate = date => {
        dispatch(updateStress({
            ...entry,
            date
        }))
    }

    let deleteEntry = e => {
        e.preventDefault()
        dispatch(deleteStress(id))
        router.push("/app")
    }

    let saveEntry = e => {
        
    }

    return (
        <Secure>
            <Aside />
            <Shell title={"Stresseintrag"} className="bg-gray-50" actionButton={
                <button
                    onClick={saveEntry} 
                    className="text-blue-500 self-center inline-flex flex-row">
                    <span className="ml-auto font-medium">Speichern</span>
                </button>
            }>
                <div className="flex flex-col px-3 w-full lg:w-3/4 xl:w-2/3 mx-auto space-y-4 my-5">
                    <form className="mt-3 space-y-4">
                        <div className="col-span-full">
                            <label className="text-xs text-gray-600 uppercase" htmlFor="amount">Stresslevel</label>
                            <h4 className="text-2xl font-semibold">{inputRef.current?.value || 1}<span className="text-sm">. level</span></h4>
                            <input
                                ref={inputRef}
                                type="range"
                                className="block w-full"
                                id="amount"
                                min="1"
                                max="5"
                                defaultValue={entry?.level || 1}
                                onBlur={e => changeLevel(e.target.value)}
                                title="Stressstufe"
                                />
                            </div>
                        <div className="col-span-full">
                            <DateTimeInput value={entry?.date || new Date(2000, 0, 1, 0, 0)} onChange={changeDate} label="Datum" />       
                        </div>

                        <div className="flex flex-row w-full">
                            <button
                                onClick={deleteEntry} 
                                className="py-2 w-full text-center text-white bg-red-600 rounded-lg font-medium">
                                    Löschen
                            </button>
                        </div>
                    </form>
                </div>
            </Shell>
        </Secure>
    )
}

export default StressEdit