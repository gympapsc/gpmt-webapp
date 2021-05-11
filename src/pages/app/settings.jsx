import React, {useState} from "react"
import { useDispatch, useSelector } from "react-redux"

import {
    updateEmail,
    updateWeight,
    updateHeight,
    updateBirthDate,
    updatePassword
} from "../../actions"

import Secure from "../../components/secure"
import Shell from "../../components/shell"
import Aside from "../../components/aside"


const Settings = () => {
    let dispatch = useDispatch()
    let email = useSelector(state => state.user.email) || ""
    let weight = useSelector(state => state.user.weight) || ""
    let birthDate = useSelector(state => state.user.birthDate) || "" 
    let height = useSelector(state => state.user.height) || ""
    let [password, setPassword] = useState("")

    console.log(new Date(birthDate))

    const changePassword = e => {
        setPassword(e.target.value)
        dispatch(updatePassword(e.target.value))
    }

    return (
        <Secure>
            <Aside></Aside>
            <Shell title="Einstellungen">
                <div className="px-3 w-full lg:w-5/6 xl:w-2/3 mx-auto my-5">
                    <form className="mt-3" action="#" method="GET">
                        <div className="grid grid-cols-6 gap-4">
                            <div className="col-span-6 md:col-span-3">
                                <label className="text-gray-600" forHtml="vorname">Vorname</label>
                                <input
                                    className="h-12 w-full bg-gray-300 rounded-lg py-2 px-3 block mt-1 border-0 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                    type="text"
                                    id="vorname"
                                    value="Hakim"
                                    />
                            </div>
                            <div className="col-span-6 md:col-span-3">
                                <label className="text-gray-600" forHtml="nachname">Nachname</label>
                                <input
                                    className="h-12 w-full bg-gray-300 rounded-lg py-2 px-3 block mt-1 border-0 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                    type="text"
                                    id="nachname"
                                    value="Rachidi"
                                    />
                            </div>
                            <div className="col-span-full">
                                <label className="text-gray-600" forHtml="email">Email</label>
                                <input
                                    className="h-12 w-full bg-gray-300 rounded-lg py-2 px-3 block mt-1 border-0 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                    type="text"
                                    id="email"
                                    value="hakim@example.com"
                                    />
                            </div>
                            <div className="col-span-full md:col-span-3 lg:col-span-2">
                                <label className="text-gray-600" forHtml="gewicht">Gewicht in Kg</label>
                                <input
                                    className="h-12 w-full bg-gray-300 rounded-lg py-2 px-3 block mt-1 border-0 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                    type="number"
                                    id="gewicht"
                                    value="80.5"
                                    />
                            </div>
                            <div className="col-span-full md:col-span-3 lg:col-span-2">
                                <label className="text-gray-600" forHtml="größe">Größe in cm</label>
                                <input
                                    className="h-12 w-full bg-gray-300 rounded-lg py-2 px-3 block mt-1 border-0 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                    type="number"
                                    id="größe"
                                    value="180.5"
                                    />
                            </div>
                            <div className="col-span-6 md:col-span-full lg:col-span-2">
                                <label className="text-gray-600" forHtml="geburtsdatum">Geburstdatum</label>
                                <input
                                    className="h-12 w-full bg-gray-300 rounded-lg py-2 px-3 block mt-1 border-0 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                    type="date"
                                    id="geburtsdatum"
                                    value=""
                                    />
                            </div>
                        </div>
                    </form>
                </div>
            </Shell>
        </Secure>
    )
}

export default Settings