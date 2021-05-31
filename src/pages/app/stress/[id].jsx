import React from "react"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"

import Aside from '../../../components/aside'
import Secure from '../../../components/secure'
import Shell from '../../../components/shell'
import DateTimeInput from "../../../components/datetimeInput"

import {
    deleteStress,
    updateStress
} from "../../../actions"
import { useStress } from "../../../hooks"

const Edit = () => {
    let router = useRouter()
    let {id} = router.query
    let dispatch = useDispatch()

    let entry = useStress(new Date()).find(s => s._id === id)

    console.log(entry)

    let changeLevel = level => {
        dispatch(updateStress({
            ...entry,
            level
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

    return (
        <Secure>
            <Aside />
            <Shell title={"Stresseintrag"} className="bg-gray-100">
                <div className="flex flex-col px-3 w-full lg:w-3/4 xl:w-2/3 mx-auto space-y-4 my-5">
                    <form className="mt-3 space-y-4">
                        <div className="col-span-full">
                            <label className="text-sm text-gray-600" htmlFor="amount">Stresslevel</label>
                            <h4 className="text-2xl font-semibold">{entry?.level}<span className="text-sm">. level</span></h4>
                            <input
                                type="range"
                                className="block w-full"
                                id="amount"
                                min="1"
                                max="5"
                                value={entry?.level}
                                onChange={e => setLevel(e.target.value)}
                                onBlur={e => changeLevel(e.target.value)}
                                />
                            </div>
                        <div className="col-span-full">
                            <DateTimeInput value={entry?.date} onChange={changeDate} label="Datum" />       
                        </div>

                        <div className="flex flex-row w-full">
                            <button
                                onClick={deleteEntry} 
                                className="py-2 w-full text-center text-white bg-red-600 rounded-lg">
                                    Löschen
                            </button>
                        </div>
                    </form>
                </div>
            </Shell>
        </Secure>
    )
}

export default Edit