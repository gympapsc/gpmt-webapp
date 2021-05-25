import React from "react"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"

import Aside from '../../../components/aside'
import Secure from '../../../components/secure'
import Shell from '../../../components/shell'


const Edit = () => {
    let router = useRouter()
    let {id} = router.query

    let entry = useSelector(state => state.micturition.find(m => m._id === id))

    return (
        <Secure>
            <Aside />
            <Shell title={"Miktionseintrag"} className="bg-gray-100">
                <div className="flex flex-col px-3 w-full lg:w-3/4 xl:w-2/3 mx-auto space-y-4 my-5">
                    <form className="mt-3 space-y-4">
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
                                        />
                                    <span className="text-sm text-red-500">&nbsp;</span>
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

export default Edit