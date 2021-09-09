import React, { useState } from "react"
import { useRouter } from "next/router"
import { useSelector, useDispatch } from "react-redux"

import Aside from "../../../components/aside"
import Secure from "../../../components/secure"
import Shell from "../../../components/shell"
import { updateNutrition, deleteNutrition } from "../../../actions"
import DateTimeInput from "../../../components/datetimeInput"
import { useNutrition } from "../../../hooks"


const NutritionEdit = () => {
    let router = useRouter()
    let {id} = router.query

    let dispatch = useDispatch()
    let entry = useNutrition(new Date())
        .find(d => d._id === id)
    
    let [mass, setMass] = useState(entry?.mass || 0)
    
    const changeMass = m => {
        dispatch(updateNutrition({
            ...entry,
            mass: parseInt(m)
        }))
    }

    const changeDate = date => {
        dispatch(updateNutrition({
            ...entry,
            date
        }))
    }

    let deleteEntry = e => {
        e.preventDefault()
        dispatch(deleteNutrition(id))
        router.push("/app")
    }

    return (
        <>
            <Aside />
            <Shell title={"Esseintrag"} className="bg-gray-50">
                <div className="flex flex-col px-3 w-full lg:w-3/4 xl:w-2/3 mx-auto my-5 space-y-4">
                    <form className="mt-3 space-y-4">
                        <div className="space-y-5">
                            <div className="col-span-full">
                                <label className="text-xs text-gray-600 uppercase" htmlFor="amount">Menge</label>
                                <h4 className="text-2xl font-semibold">{mass * 1000}<span className="text-sm">g</span></h4>
                                <input
                                    type="range"
                                    className="block w-full"
                                    id="amount"
                                    min="0"
                                    max="2000"
                                    value={mass * 1000}
                                    onChange={e => setMass(e.target.value / 1000)}
                                    onBlur={e => changeMass(e.target.value / 1000)}
                                    title="Gegessene Menge"
                                    />
                            </div>
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

const SecureNutritionEdit = () => (
    <Secure>
        <NutritionEdit></NutritionEdit>
    </Secure>
)

export default SecureNutritionEdit