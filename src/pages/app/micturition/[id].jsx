import React from "react"
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

const Edit = () => {
    let router = useRouter()
    let { id } = router.query
    let dispatch = useDispatch()

    let entry = useMicturition(new Date())
        .find(m => m._id === id)

    let changeMicturition = date => {
        dispatch(updateMicturition({
            ...entry,
            date
        }))
    }

    let deleteEntry = e => {
        e.preventDefault()
        dispatch(deleteMicturition(id))
        router.push("/app")
    }

    return (
        <>
            <Aside />
            <Shell title="Miktionseintrag" className="bg-gray-50">
                <div className="flex flex-col px-3 w-full lg:w-3/4 xl:w-2/3 mx-auto space-y-4 my-5">
                    <form className="mt-3 space-y-4">
                        <div className="col-span-full">
                            <DateTimeInput value={entry?.date || new Date()} onChange={changeMicturition} label="Datum" />       
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
        </>
    )
}

export default function SecureMicturitionEdit() {    
    return (
        <Secure>
            <Edit />
        </Secure>
    )
}
