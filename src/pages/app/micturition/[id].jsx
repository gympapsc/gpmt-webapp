import React, { useState } from "react"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"

import Aside from "../../../components/aside"
import Secure from "../../../components/secure"
import Shell from "../../../components/shell"
import DateTimeInput from "../../../components/datetimeInput"

import {
    deleteMicturition,
    updateMicturition
} from "../../../actions"
import { useMicturition } from "../../../hooks"

const MicturitionForm = ({ entry, id }) => {
    let router = useRouter()
    let dispatch = useDispatch()
    let [date, setDate] = useState(entry.date)

    let deleteEntry = e => {
        e.preventDefault()
        dispatch(deleteMicturition(id))
        router.push("/app")
    }

    let saveEntry = e => {
        e.preventDefault()

        dispatch(updateMicturition({
            ...entry,
            date
        }))
        router.push("/app")
    }

    return (
        <Shell title="Miktionseintrag" className="bg-gray-50" actionButton={
            <button
                onClick={saveEntry} 
                className="text-blue-500 self-center inline-flex flex-row transition-colors duration-150 hover:text-blue-600">
                <span className="ml-auto font-medium">Speichern</span>
            </button>
        }>
            <div className="flex flex-col px-3 w-full lg:w-3/4 xl:w-2/3 mx-auto space-y-4 h-full">
                <form className="pt-3 space-y-4 flex flex-col justify-between pb-8 h-full">
                    <div className="col-span-full md:mt-8">
                        <DateTimeInput value={date} onChange={setDate} label="Datum" />       
                    </div>

                    <input
                        type="submit"
                        hidden
                        onClick={saveEntry}
                    />


                    <div className="flex flex-row w-full">
                        <button
                            onClick={deleteEntry} 
                            className="py-2 w-full text-center text-white bg-red-600 rounded-lg font-medium transition-colors duration-150 hover:bg-red-700">
                                Löschen
                        </button>
                    </div>
                </form>
            </div>
        </Shell>
    )
}

export default function SecureMicturitionEdit() {    
    let router = useRouter()
    let {id} = router.query

    let entry = useMicturition(new Date())
        .find(d => d._id === id)
    
    return (
        <Secure>
            <Aside />
            {
                entry ?
                <MicturitionForm entry={entry} id={id} /> :
                <Shell title={"Miktionseintrag"} className="bg-gray-50">
                    <div className="flex flex-col justify-center items-center">
                        <ActivityIndicator />
                    </div>
                </Shell>
            }
        </Secure>
    )
}