import React, {useState, Fragment} from "react"
import { useDispatch, useSelector } from "react-redux"
import { Listbox, Switch, Transition } from "@headlessui/react"
import { SelectorIcon, CheckIcon } from "@heroicons/react/solid"

import {
    updateUser
} from "../../actions"

import Secure from "../../components/secure"
import Shell from "../../components/shell"
import DateInput from "../../components/dateInput"
import TextInput from "../../components/textInput"
import NumberInput from "../../components/numberInput"
import { SexSelect } from "../../components/select"
import Toggle from "../../components/toggle"
import { useApiVersion, useUser } from "../../hooks"



const Settings = () => {
    let dispatch = useDispatch()

    let user = useUser()
    let apiVersion = useApiVersion()

    let changeUser = update => {
        dispatch(updateUser({
            ...user,
            ...update
        }))
    }

    return (
        <Shell title="Einstellungen" className="bg-gray-50 high-contrast:bg-gray-100">
            <div className="px-3 w-full lg:w-5/6 xl:w-2/3 mx-auto my-5">
                <form className="divide-y divide-gray-300" action="#" method="GET">
                    <div className="grid grid-cols-6 gap-4 py-5">
                        <div className="col-span-6 md:col-span-3 highContrast:text-green-800">
                            <TextInput label="Vorname" value={user?.firstname} onChange={firstname => changeUser({firstname})} />
                        </div>
                        <div className="col-span-6 md:col-span-3">
                            <TextInput label="Nachname" value={user?.surname} onChange={surname => changeUser({surname})} />
                        </div>
                        <div className="col-span-full">
                            <TextInput label="Email" value={user?.email} onChange={email => changeUser({email})} />
                        </div>
                        <div className="col-span-full">
                            <label className="text-sm text-gray-600 high-contrast:text-gray-800" htmlFor="sex">Geschlecht</label>
                            <SexSelect value={user?.sex} onChange={sex => changeUser({sex})}/>
                        </div>
                        <div className="col-span-full md:col-span-3">
                            <NumberInput label="Gewicht in Kg" value={user?.weight} onChange={weight => changeUser({weight})} />
                        </div>
                        <div className="col-span-full md:col-span-3">
                            <NumberInput label="Größe in cm" value={user?.height * 100} onChange={height => changeUser({height: (height / 100)})} />
                        </div>
                        <div className="col-span-full">
                            <DateInput label="Geburtstag" value={user?.birthDate} onChange={birthDate => changeUser({birthDate})} />
                        </div>
                    </div>

                    <div className="space-y-4 py-5">
                        <Toggle 
                            title="Spracheingabe" 
                            description="Wenn aktiviert, ermöglicht das Aufnehmen von Nachrichten" 
                            value={user?.settings.voiceInput} 
                            onChange={voiceInput => changeUser({settings: { ...user.settings, voiceInput }})} />
                        <Toggle 
                            title="Lautsprecherausgabe" 
                            description="Liest alle Nachricht vor" 
                            value={user?.settings.voiceOutput} 
                            onChange={voiceOutput => changeUser({settings: { ...user.settings, voiceOutput }})} />
                        <Toggle 
                            title="Kumulative Vorhersage" 
                            description="Zeigt die Vorhersage über den Tag kumulativ an" 
                            value={user?.settings.cumulativePrediction} 
                            onChange={cumulativePrediction => changeUser({settings: { ...user.settings, cumulativePrediction }})} />
                        <Toggle 
                            title="Hoher Kontrast"
                            description="Erhöht die Kontraste der Benutzeroberfläche" 
                            value={user?.settings.highContrast} 
                            onChange={highContrast => changeUser({settings: { ...user.settings, highContrast }})} />
                    </div>

                    <div className="bg-white rounded-lg flex flex-col items-stretch my-5 border-none">
                        <div className="text-md flex justify-between px-2 py-2 md:px-4 md:py-3">
                            <span>App Version</span>
                            <span className="tracking-wide">{process.env.NEXT_PUBLIC_APP_VERSION}</span>
                        </div>
                        <hr />
                        <div className="text-md flex justify-between px-2 py-2 md:px-4 md:py-3">
                            <span>Api Version</span>
                            <span className="tracking-wide">{apiVersion}</span>
                        </div>
                    </div>
                </form>
            </div>
        </Shell>
    )
}

export default function SecureSettings() {
    return (
        <Secure>
            <Settings />
        </Secure>
    )
}