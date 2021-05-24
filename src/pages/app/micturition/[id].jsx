import React from "react"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"

import Aside from '../../../components/aside'
import Secure from '../../../components/secure'
import Shell from '../../../components/shell'


const Edit = () => {
    let router = useRouter()
    let {id} = router.query

    let micturition = useSelector(state => state.micturition.find(m => m.id === id))

    return (
        <Secure>
            <Aside />
            <Shell title={"Miktionseintrag"} className="bg-gray-100">
                <div className="flex flex-col px-3 w-full lg:w-3/4 xl:w-2/3 mx-auto space-y-4">
                    <div className="w-5/6 mx-auto my-5">
                        <form className="mt-3 space-y-4">
                            <div>
                                <label forHtml="date" className="text-gray-600">
                                    Uhrzeit
                                </label>
                                <input
                                    className="h-12 w-full border border-gray-300 bg-white rounded-lg py-2 px-3 block mt-1 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:outline-none"
                                    type="date"
                                    id="date"
                                    />
                            </div>

                            <div className="flex flex-row w-full">
                                <button className="py-2 w-full text-center text-white bg-red-600 rounded-lg">Löschen</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Shell>
        </Secure>
    )
}

export default Edit