import React, { useState, Fragment } from "react"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { Listbox, Switch, Transition } from "@headlessui/react"
import { SelectorIcon, CheckIcon } from "@heroicons/react/solid"

import {
    deleteMicturition,
    deleteDrinking,
    deleteStress
} from "../../actions"

import Secure from "../../components/secure"
import Shell from "../../components/shell"
import LineChart from "../../visualisations/lineChart"
import { useDrinking, useMicturition, useUser, useMicturitionPredictions, usePhotos, useStress} from "../../hooks"
import MicturitionChart from "../../visualisations/micturitionChart"
import DrinkingChart from "../../visualisations/drinkingChart"


const timeRanges = {
    d: { id: 0, name: "Letzten 24 Stunden" },
    w: { id: 1, name: "Letzte Woche"},
    m: { id: 2, name: "Letzten Monat"},
    y: { id: 3, name: "Letztes Jahr"}
}

function TimeSelect({value, onChange}) {
    const [selected, setSelected] = useState(timeRanges[value])

    const changeRange = s => {
        setSelected(s)
        onChange(s.name[0])
    }

  return (
    <div>
      <Listbox value={selected} onChange={changeRange}>
        <div className="w-full relative">
          <Listbox.Button className="text-lg md:text-xl font-semibold text-gray-800">
            <span className="truncate">{selected.name}</span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            enter="transition ease-in duration-75"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-150"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-80 py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-md max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {Object.values(timeRanges).map(r => (
                <Listbox.Option
                  key={r.id}
                  className={({ active }) =>
                    `${active ? "text-blue-900 bg-blue-100" : "text-gray-900"}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={r}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? "font-medium" : "font-normal"
                        } block truncate`}
                      >
                        {r.name}
                      </span>
                      {selected ? (
                        <span
                          className={`${
                            active ? "text-blue-600" : "text-blue-600"
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

const WEEKDAY = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag"   
]

const MicturitionOverview = () => {
    let dispatch = useDispatch()
    let predictions = useMicturitionPredictions()

    let user = useUser()
    
    let micturition = useMicturition(new Date())
        .map(m => ({type:"micturition", ...m}))
    let drinking = useDrinking(new Date())
        .map(d => ({type: "drinking", ...d}))
    let stress = useStress(new Date())
        .map(s => ({type: "stress", ...s}))
    let photos = usePhotos(new Date())
    let entries = [...micturition, ...drinking, ...stress].sort((a, b) => b.timestamp - a.timestamp)

    const deleteEntry = (type, _id) => () => {
        if(type === "micturition") {
            dispatch(deleteMicturition(_id))
        } else if(type === "drinking") {
            dispatch(deleteDrinking(_id))
        } else if(type === "stress") {
            dispatch(deleteStress(_id))
        }
    }
    
    return (
        <Shell title={"Übersicht"} className="bg-gray-100">
            <div className="flex flex-col w-full space-y-4 pb-12">
                {
                    entries.length !== 0 ? 
                    <div className="space-y-5">
                        <div className="space-y-4 py-6 md:py-8 bg-white w-full">
                            <div className="grid grid-cols-3 px-3 md:px-5 my-2 md:my-4 max-w-screen-xl mx-auto" style={{maxWidth: "700"}}>
                                <div className="mr-auto">
                                    <h6 className="uppercase text-xs lg:text-sm font-semibold tracking-wide text-gray-600 md:mb-2">Miktionsfrequenz</h6>
                                    <h2 className="text-lg md:text-2xl font-bold ">
                                        &#8960; {Math.round(user?.micturitionFrequency * 1000) / 1000}
                                        {" "}<span className="text-sm md:text-base text-gray-600 font-semibold">pro Tag</span>
                                    </h2>
                                </div>
                                <div className="mx-auto">
                                    <h6 className="uppercase text-xs lg:text-sm font-semibold tracking-wide text-gray-600 md:mb-2">Trinkmenge</h6>
                                    <h2 className="text-lg md:text-2xl font-bold">
                                        &#8960; {Math.round(user?.micturitionFrequency * 1000) / 1000} L 
                                        {" "}<span className="text-sm md:text-base text-gray-600 font-semibold"> pro Tag</span>
                                    </h2>
                                </div>
                                <div className="ml-auto">
                                    <h6 className="uppercase text-xs lg:text-sm font-semibold tracking-wide text-gray-600 md:mb-2">Miktionsfrequenz</h6>
                                    <h2 className="text-lg md:text-2xl font-bold ">
                                        &#8960; {Math.round(user?.micturitionFrequency * 1000) / 1000} 
                                        {" "}<span className="text-sm md:text-base text-gray-600 font-semibold">pro Tag</span>
                                    </h2>
                                </div>
                            </div>
                            <hr className="mx-3 md:px-5" />
                            <div className="grid grid-cols-2 gap-2 px-3 md:px-5 xl:gap-3 mx-auto my-4">
                                <div className="col-span-full xl:col-span-1 flex flex-col">
                                    <div>
                                        <TimeSelect value="w" onChange={() => {}} />
                                        <p className="text-gray-500 text-sm md:text-md">Alle Trink- und Miktionseinträge die du in den letzten 24 Stunden gemacht hast.</p>
                                    </div>
                                    <div className="grid grid-rows-2 mt-auto">
                                        <div
                                            className="w-full h-36 lg:h-48 row-span-1">
                                            <MicturitionChart data={micturition} />
                                        </div>
                                        <div
                                            className="w-full h-36 lg:h-48 row-span-1">
                                            <DrinkingChart data={drinking} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-full xl:col-span-1 flex flex-col">
                                    <div>
                                        <h2 className="text-lg md:text-xl font-semibold text-gray-800">Morgen</h2>
                                        <p className="text-gray-500 text-sm md:text-md">Basierend auf deiner getrunkenmenge Flüssigkeit und den letzten Miktionen, wird diese Miktionsvorhersage für dich errechnet.</p>
                                    </div>
                                    <div
                                        className="w-full h-36 lg:h-96 mt-auto" >
                                            <LineChart data={predictions}></LineChart>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:px-4 mx-auto max-w-screen-xl">
                            <h3 className="mb-2 font-semibold text-lg md:text-xl">Einträge</h3>
                            <div className="-my-2 overflow-x-hidden">
                                <div className="py-2 align-middle inline-block min-w-full">
                                    <div className="border overflow-hidden border-gray-200 sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Datum
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Uhrzeit
                                                    </th>
                                                    <th scope="col" className="relative px-6 py-3">
                                                        <span className="sr-only">Bearbeiten</span>
                                                    </th>
                                                    <th scope="col" className="relative px-6 py-3">
                                                        <span className="sr-only">Löschen</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">

                                                {entries.map((e, i) => (
                                                    <tr key={i}>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {WEEKDAY[e?.date.getDay()]}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {e?.date.getHours()}:{e?.date.getMinutes()}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                                            <Link href={`/app/${e.type}/${e._id}`}>
                                                                <a className="font-medium text-indigo-600 p-2 hover:bg-indigo-100 rounded-lg transition-colors ease-in-out duration-100">
                                                                    Bearbeiten
                                                                </a>
                                                            </Link>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                                            <button onClick={deleteEntry(e.type, e._id)} className="font-medium text-indigo-600 p-2 hover:bg-indigo-100 rounded-lg transition-colors ease-in-out duration-100">
                                                                Löschen
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col px-3 md:px-4 mx-auto max-w-screen-xl">
                            <h3 className="mb-2 font-semibold text-lg md:text-xl">Fotos</h3>
                            <div className="-my-2 overflow-x-auto">
                                <div className="py-2 align-middle inline-block min-w-full">
                                    <div className="border overflow-hidden border-gray-200 sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Foto
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Name
                                                    </th>
                                                    <th scope="col" className="relative px-6 py-3">
                                                        <span className="sr-only">Löschen</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">

                                                {photos.map((e, i) => (
                                                    <tr key={i}>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <img src={e.url} className="rounded-md max-h-14"/>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {e?.name}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <Link href={`/app/${e.type}/${e._id}`}>
                                                                <a className="text-indigo-600 p-2 hover:bg-indigo-100 rounded-lg transition-colors ease-in-out duration-100">
                                                                    Löschen
                                                                </a>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> :
                    <div className="self-center mt-16 text-center">
                        <h1 className="text-lg md:text-xl font-semibold text-gray-600">Du hast noch keine Einträge gemacht</h1>
                        <span className="text-sm md:text-base text-gray-500">Sage dem Chatbot wenn du etwas getrunken hast</span>
                    </div>
                }
            </div>
        </Shell>
    )
}


export default function SecureMicturitionOverview() {
    return (
        <Secure>
            <MicturitionOverview />
        </Secure>
    )
}
