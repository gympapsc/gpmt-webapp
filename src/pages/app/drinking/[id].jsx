import React, { useState } from "react"
import { useRouter } from "next/router"
import { useSelector, useDispatch } from "react-redux"

import Aside from '../../../components/aside'
import Secure from '../../../components/secure'
import Shell from '../../../components/shell'
import { deleteDrinking, getDrinking, updateDrinking } from "../../../actions"
import DateTimeInput from "../../../components/datetimeInput"
import { useDrinking } from "../../../hooks"


const DrinkingEdit = () => {
    let router = useRouter()
    let {id} = router.query

    let dispatch = useDispatch()
    let entry = useDrinking(new Date())
        .find(d => d._id === id)
    let [amount, setAmount] = useState(entry?.amount || 0)
    

    const changeAmount = amount => {
        dispatch(updateDrinking({
            ...entry,
            amount: parseInt(amount)
        }))
    }

    const changeDate = date => {
        dispatch(updateDrinking({
            ...entry,
            date
        }))
    }

    let deleteEntry = e => {
        e.preventDefault()
        dispatch(deleteDrinking(id))
        router.push("/app")
    }

    return (
        <>
            <Aside />
            <Shell title={"Trinkeintrag"} className="bg-gray-100">
                <div className="flex flex-col px-3 w-full lg:w-3/4 xl:w-2/3 mx-auto my-5 space-y-4">
                    <form className="mt-3 space-y-4">
                        <div className="space-y-5">
                            <div className="col-span-full">
                                <label className="text-sm text-gray-600" htmlFor="amount">Menge</label>
                                <h4 className="text-2xl font-semibold">{amount}<span className="text-sm">ml</span></h4>
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
                                <DateTimeInput label="Datum" value={entry?.date} onChange={changeDate} />
                            </div>
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
        </>
    )
}

const SecureDrinkingEdit = () => (
    <Secure>
        <DrinkingEdit></DrinkingEdit>
    </Secure>
)

export default SecureDrinkingEdit