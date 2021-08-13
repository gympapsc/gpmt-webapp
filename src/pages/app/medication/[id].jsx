import React, { useState } from "react"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"

import Aside from "../../../components/aside"
import Secure from "../../../components/secure"
import Shell from "../../../components/shell"
import { updateMedication, deleteMedication } from "../../../actions"
import DateTimeInput from "../../../components/datetimeInput"
import { useMedication } from "../../../hooks"


const MedicationEdit = () => {
    let router = useRouter()
    let {id} = router.query

    let dispatch = useDispatch()
    let entry = useMedication(new Date())
        .find(d => d._id === id)

    const changeMass = mass => {
        dispatch(updateMedication({
            ...entry,
            mass: parseInt(mass)
        }))
    }

    const changeDate = date => {
        dispatch(updateMedication({
            ...entry,
            date
        }))
    }

    let deleteEntry = e => {
        e.preventDefault()
        dispatch(deleteMedication(id))
        router.push("/app")
    }

    return (
        <>
            <Aside />
            <Shell title={"Medikament"} className="bg-gray-50">
                <div className="flex flex-col px-3 w-full lg:w-3/4 xl:w-2/3 mx-auto my-5 space-y-4">
                    <form className="mt-3 space-y-4">
                        <div className="space-y-5">

                            <div className="col-span-full">
                                <DateTimeInput label="Datum" value={entry?.date || new Date()} onChange={changeDate} />
                            </div>
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

const SecureMedicationEdit = () => (
    <Secure>
        <MedicationEdit></MedicationEdit>
    </Secure>
)

export default SecureMedicationEdit