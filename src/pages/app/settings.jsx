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
import { useUser } from "../../hooks"


const gender = {
    w: { id: 1, name: "weiblich"},
    m: { id: 2, name: "männlich"},
    d: { id: 3, name: "divers"}
}

const SexSelect = ({value, onChange}) => {
    const [selected, setSelected] = useState(gender[value])

    const changeSex = s => {
        setSelected(s)
        onChange(s.name[0])
    }

  return (
    <div>
      <Listbox value={selected} onChange={changeSex}>
        <div className="w-full relative">
          <Listbox.Button className="relative color transition ease-in-out duration-200 border border-gray-300  w-full py-2 md:py-3 pl-3 pr-10 text-left bg-white rounded-lg  cursor-default focus:outline-none focus:ring-2 focus:ring-blue-500 focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 text-sm md:text-base">
            <span className="block truncate">{selected.name}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            enter="transition ease-in duration-75"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-150"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-md max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {Object.values(gender).map(s => (
                <Listbox.Option
                  key={s.id}
                  className={({ active }) =>
                    `${active ? 'text-blue-900 bg-blue-100' : 'text-gray-900'}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={s}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? 'font-medium' : 'font-normal'
                        } block truncate`}
                      >
                        {s.name}
                      </span>
                      {selected ? (
                        <span
                          className={`${
                            active ? 'text-blue-600' : 'text-blue-600'
                          }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

const Settings = () => {
    let dispatch = useDispatch()
    let [enabled, setEnabled] = useState(false)

    let user = useUser()

    let changeBirthDate = date => {
        dispatch(updateUser({
            ...user,
            birthDate: date
        }))
    }

    let changeFirstname = name => {
        dispatch(updateUser({
            ...user,
            firstname: name
        }))
    }

    let changeSurname = name => {
        dispatch(updateUser({
            ...user,
            surname: name
        }))
    }

    let changeWeight = weight => {
        dispatch(updateUser({
            ...user,
            weight
        }))
    }

    let changeHeight = height => {
        dispatch(updateUser({
            ...user,
            height
        }))
    }

    let changeSex = sex => {
        dispatch(updateUser({
            ...user,
            sex
        }))
    }

    let changeEmail = email => {
        dispatch(updateUser({
            ...user,
            email
        }))
    }

    return (
        <Secure>
            <Aside></Aside>
            <Shell title="Einstellungen" className="bg-gray-100">
                <div className="px-3 w-full lg:w-5/6 xl:w-2/3 mx-auto my-5 divide-y divide-gray-500">
                    <form className="divide-y divide-gray-300" action="#" method="GET">
                        <div className="grid grid-cols-6 gap-4 py-5">
                            <div className="col-span-6 md:col-span-3">
                                <TextInput label="Vorname" value={user?.firstname} onChange={changeFirstname} />
                            </div>
                            <div className="col-span-6 md:col-span-3">
                                <TextInput label="Nachname" value={user?.surname} onChange={changeSurname} />
                            </div>
                            <div className="col-span-full">
                                <TextInput label="Email" value={user?.email} onChange={changeEmail} />
                            </div>
                            <div className="col-span-full">
                                <label className="text-sm text-gray-600" htmlFor="sex">Geschlecht</label>
                                <SexSelect value={user?.sex} onChange={changeSex}/>
                            </div>
                            <div className="col-span-full md:col-span-3">
                                <NumberInput label="Gewicht in Kg" value={user?.weight} onChange={changeWeight} />
                            </div>
                            <div className="col-span-full md:col-span-3">
                                <NumberInput label="Größe in cm" value={user?.height} onChange={changeHeight} />
                            </div>
                            <div className="col-span-full">
                                <DateInput label="Geburtstag" value={user?.birthDate} onChange={changeBirthDate} />
                            </div>
                        </div>


                        <div className="space-y-4 py-5">
                            <Switch.Group>
                                <div className="flex flex-row justify-between">
                                    <div>
                                        <Switch.Label className="text-md text-gray-800 font-semibold block">Nachrichten aktivieren</Switch.Label>
                                        <span className="text-xs md:text-sm lg:text-md text-gray-600">Wenn aktiv werden Nachrichten angezeigt</span>
                                    </div>
                                    <Switch
                                        checked={enabled}
                                        onChange={setEnabled}
                                        className={`color transition ease-in-out duration-200 ${
                                            enabled ? `bg-blue-600`: `bg-gray-200`
                                        } relative inline-flex items-center h-8 rounded-full w-14 self-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600`}
                                    >
                                        <span className="sr-only">Nachrichten aktivieren</span>
                                        <span
                                            className={`transform transition ease-in-out duration-200 ${
                                                enabled ? "translate-x-7" : "translate-x-1"
                                            } inline-block w-6 h-6 transform bg-white rounded-full shadow-sm`}>
                                        </span>
                                    </Switch>
                                </div>
                            </Switch.Group>
                            <Switch.Group>
                                <div className="flex flex-row justify-between">
                                    <div>
                                        <Switch.Label className="text-md text-gray-800 font-semibold block">Nachrichten aktivieren</Switch.Label>
                                        <span className="text-xs md:text-sm lg:text-md text-gray-600">Wenn aktiv werden Nachrichten angezeigt</span>
                                    </div>
                                    <Switch
                                        checked={enabled}
                                        onChange={setEnabled}
                                        className={`color transition ease-in-out duration-200 ${
                                            enabled ? `bg-blue-600`: `bg-gray-200`
                                        } relative inline-flex items-center h-8 rounded-full w-14 self-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600`}
                                    >
                                        <span className="sr-only">Nachrichten aktivieren</span>
                                        <span
                                            className={`transform transition ease-in-out duration-200 ${
                                                enabled ? "translate-x-7" : "translate-x-1"
                                            } inline-block w-6 h-6 transform bg-white rounded-full shadow-sm`}>
                                        </span>
                                    </Switch>
                                </div>
                            </Switch.Group>
                            <Switch.Group>
                                <div className="flex flex-row justify-between">
                                    <div>
                                        <Switch.Label className="text-md text-gray-800 font-semibold block">Automatische Vorhersage</Switch.Label>
                                        <span className="text-xs md:text-sm lg:text-md text-gray-600 ">Aktiviert automatische Vorhersage der Miktion</span>
                                    </div>
                                    <Switch
                                        checked={enabled}
                                        onChange={setEnabled}
                                        className={`color transition ease-in-out duration-200 ${
                                            enabled ? `bg-blue-600`: `bg-gray-200`
                                        } relative inline-flex items-center h-8 rounded-full w-14 self-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600`}
                                    >
                                        <span className="sr-only">Nachrichten aktivieren</span>
                                        <span
                                            className={`transform transition ease-in-out duration-200 ${
                                                enabled ? "translate-x-7" : "translate-x-1"
                                            } inline-block w-6 h-6 transform bg-white rounded-full shadow-sm`}>
                                        </span>
                                    </Switch>
                                </div>
                            </Switch.Group>
                            <Switch.Group>
                                <div className="flex flex-row justify-between">
                                    <div>
                                        <Switch.Label className="text-md text-gray-800 font-semibold block">Kumulative Vorhersage</Switch.Label>
                                        <span className="text-xs md:text-sm lg:text-md text-gray-600 ">Zeigt die Vorhersage über den Tag kumulativ an</span>
                                    </div>
                                    <Switch
                                        checked={enabled}
                                        onChange={setEnabled}
                                        className={`color transition ease-in-out duration-200 ${
                                            enabled ? `bg-blue-600`: `bg-gray-200`
                                        } relative inline-flex items-center h-8 rounded-full w-14 self-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600`}
                                    >
                                        <span className="sr-only">Nachrichten aktivieren</span>
                                        <span
                                            className={`transform transition ease-in-out duration-200 ${
                                                enabled ? "translate-x-7" : "translate-x-1"
                                            } inline-block w-6 h-6 transform bg-white rounded-full shadow-sm`}>
                                        </span>
                                    </Switch>
                                </div>
                            </Switch.Group>
                        </div>
                    </form>
                </div>
            </Shell>
        </Secure>
    )
}

export default Settings