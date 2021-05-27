import React from "react"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"

import Aside from '../../../components/aside'
import Secure from '../../../components/secure'
import Shell from '../../../components/shell'
import DateTimeInput from "../../../components/datetimeInput"

import {
    updateMicturition
} from "../../../actions"

const Edit = () => {
    let router = useRouter()
    let {id} = router.query
    let dispatch = useDispatch()

    let entry = useSelector(state => state.micturition.find(m => m._id === id))

    let changeMicturition = date => {
        dispatch(updateMicturition({
            ...entry,
            date
        }))
    }

    return (
        <Secure>
            <Aside />
            <Shell title={"Miktionseintrag"} className="bg-gray-100">
                <div className="flex flex-col px-3 w-full lg:w-3/4 xl:w-2/3 mx-auto space-y-4 my-5">
                    <form className="mt-3 space-y-4">
                        <div className="col-span-full">
                            <DateTimeInput value={entry?.date} onChange={changeMicturition} label="Datum" />       
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

export default Edit