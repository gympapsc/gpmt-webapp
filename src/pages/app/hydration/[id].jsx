import React, { useState, useRef } from "react"
import { useRouter } from "next/router"
import { useSelector, useDispatch } from "react-redux"

import Aside from "../../../components/aside"
import Secure from "../../../components/secure"
import Shell from "../../../components/shell"
import { deleteHydration, getHydration, updateHydration } from "../../../actions"
import DateTimeInput from "../../../components/datetimeInput"
import { useHydration } from "../../../hooks"
import TextInput from "../../../components/textInput"


const HydrationEdit = () => {
    let router = useRouter()
    let slider = useRef(null)
    let {id} = router.query

    let dispatch = useDispatch()
    let entry = useHydration(new Date())
        .find(d => d._id === id)
        
    let [amount, setAmount] = useState(entry?.amount)
    let [type, setType] = useState(entry?.type)
    let [date, setDate] = useState(entry?.date)
    
    let deleteEntry = e => {
        e.preventDefault()
        dispatch(deleteHydration(id))
        router.push("/app")
    }

    let saveEntry = e => {
        e.preventDefault()
        dispatch(updateHydration({
            ...entry,
            type,
            amount,
            date
        }))
        router.push("/app")
    }

    return (
        <>
            <Aside />
            <Shell title={"Trinkeintrag"} className="bg-gray-50" actionButton={
                <button
                    onClick={saveEntry} 
                    className="text-blue-500 self-center inline-flex flex-row">
                    <span className="ml-auto font-medium">Speichern</span>
                </button>
            }>
                <div className="flex flex-col px-3 w-full lg:w-3/4 xl:w-2/3 mx-auto space-y-4 h-full">
                    <form className="pt-3 space-y-4 flex flex-col h-full">
                        <div className="space-y-5">
                            <div className="col-span-full">
                                <label className="text-xs text-gray-600 uppercase" htmlFor="amount">Menge</label>
                                <div>
                                    <input
                                        type="number" 
                                        className="text-2xl font-semibold inline w-20 bg-transparent text-left"
                                        value={amount * 1000}
                                        min="0"
                                        max="1000"
                                        onChange={e => setAmount(e.target.value / 1000)}
                                    />
                                    <span className="text-sm">ml</span>
                                </div>
                                <input
                                    type="range"
                                    className="block w-full"
                                    id="amount"
                                    min="0"
                                    max="1000"
                                    defaultValue={amount * 1000}
                                    onChange={e => setAmount(e.target.value / 1000)}
                                    ref={slider}
                                    title="Trinkmenge"
                                    />
                            </div>
                            <div className="col-span-full">
                                <TextInput label="Trinken" defaultValue={type || ""} onChange={setType}/>
                            </div>
                            <div className="col-span-full">
                                <DateTimeInput label="Datum" value={date || new Date()} onChange={setDate} />
                            </div>
                        </div>

                        <div className="flex flex-row w-full mt-auto">
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

const SecureHydrationEdit = () => (
    <Secure>
        <HydrationEdit></HydrationEdit>
    </Secure>
)

export default SecureHydrationEdit