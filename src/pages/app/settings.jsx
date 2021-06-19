import React, {useState, Fragment} from "react"
import { useDispatch, useSelector } from "react-redux"
import { Listbox, Switch, Transition } from "@headlessui/react"
import { SelectorIcon, CheckIcon } from "@heroicons/react/solid"

import {
    updateUser
} from "../../actions"

import Secure from "../../components/secure"
import Shell from "../../components/shell"
import Aside from "../../components/aside"
import DateInput from "../../components/dateInput"
import TextInput from "../../components/textInput"
import NumberInput from "../../components/numberInput"
import { SexSelect } from "../../components/select"
import Toggle from "../../components/toggle"
import { useUser } from "../../hooks"



const Settings = () => {
    let dispatch = useDispatch()
    let [enabled, setEnabled] = useState(false)

    let user = useUser()

    let changeUser = update => {
        dispatch(updateUser({
            ...user,
            ...update
        }))
    }

    return (
        <Shell title="Einstellungen" className="bg-gray-100">
            <div className="px-3 w-full lg:w-5/6 xl:w-2/3 mx-auto my-5 divide-y divide-gray-500">
                <form className="divide-y divide-gray-300" action="#" method="GET">
                    <div className="grid grid-cols-6 gap-4 py-5">
                        <div className="col-span-6 md:col-span-3">
                            <TextInput label="Vorname" value={user?.firstname} onChange={firstname => changeUser({firstname})} />
                        </div>
                        <div className="col-span-6 md:col-span-3">
                            <TextInput label="Nachname" value={user?.surname} onChange={surname => changeUser({surname})} />
                        </div>
                        <div className="col-span-full">
                            <TextInput label="Email" value={user?.email} onChange={email => changeUser({email})} />
                        </div>
                        <div className="col-span-full">
                            <label className="text-sm text-gray-600" htmlFor="sex">Geschlecht</label>
                            <SexSelect value={user?.sex} onChange={sex => changeUser({sex})}/>
                        </div>
                        <div className="col-span-full md:col-span-3">
                            <NumberInput label="Gewicht in Kg" value={user?.weight} onChange={weight => changeUser({weight})} />
                        </div>
                        <div className="col-span-full md:col-span-3">
                            <NumberInput label="Größe in cm" value={user?.height} onChange={height => changeUser({height})} />
                        </div>
                        <div className="col-span-full">
                            <DateInput label="Geburtstag" value={user?.birthDate} onChange={birthDate => changeUser({birthDate})} />
                        </div>
                    </div>


                    <div className="space-y-4 py-5">
                        <Toggle title="Nachrichten aktivieren" description="Wenn aktiv werden Nachrichten angezeigt" value={enabled} onChange={setEnabled} />
                        <Toggle title="Spracheingabe" description="Ermöglicht das Aufnehmen von Nachrichten" value={enabled} onChange={setEnabled} />
                        <Toggle title="Kumulative Vorhersage" description="Zeigt die Vorhersage über den Tag kumulativ an" value={enabled} onChange={setEnabled} />
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