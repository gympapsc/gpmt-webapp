import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
    utterMessage,
    getMessages,
    signoutUser
} from '../../../actions'

import Secure from '../../../components/secure'
import Shell from '../../../components/shell'
import Aside from '../../../components/aside'
import BarChart from '../../../visualisations/barChart'

const Micturition = () => {
    let predictions = useSelector(state => state.micturitionPredictions)
        .map(p => [p.date, p.prediction])
    
    let micturition = useSelector(state => state.micturition)

    let [title, setTitle] = useState('Übersicht')

    return (
        <Secure>
            <Aside />
            <Shell title={title} className="bg-gray-100">
                <div className="flex flex-col w-full space-y-4">
                    <div className="space-y-5">
                        <div className="space-y-4 py-6 md:py-8 bg-white w-full">
                            <div className="grid grid-cols-2 gap-2 px-3 xl:px-5 xl:gap-3 mx-auto">
                                <div className="col-span-full xl:col-span-1 flex flex-col">
                                    <div>
                                        <h2 className="text-lg md:text-xl font-semibold text-gray-800">Deine Miktion</h2>
                                        <p className="text-gray-500 text-sm md:text-md">Alle Trink- und Miktionseinträge die du in den letzten 24 Stunden gemacht hast.</p>
                                    </div>
                                    <div className="grid grid-rows-2 mt-auto">
                                        <div
                                            className="w-full h-36 lg:h-48 row-span-1">
                                            <BarChart></BarChart>
                                        </div>
                                        <div
                                            className="w-full h-36 lg:h-48 row-span-1">
                                            <BarChart></BarChart>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-full xl:col-span-1 flex flex-col">
                                    <div>
                                        <h2 className="text-lg md:text-xl font-semibold text-gray-800">Vorhersage</h2>
                                        <p className="text-gray-500 text-sm md:text-md">Basierend auf deiner getrunkenmenge Flüssigkeit und den letzten Miktionen, wird diese Miktionsvorhersage für dich errechnet.</p>
                                    </div>
                                    <div
                                        className="w-full h-36 lg:h-96 mt-auto" >
                                            <BarChart data={predictions}></BarChart>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col px-3 xl:px-5 lg:w-3/4 xl:w-2/3 mx-auto">
                            <h3 className="mb-2 font-semibold text-lg md:text-xl">Einträge</h3>
                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
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
                                                <tr>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        Dienstag
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        12:37
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                            Bearbeiten
                                                        </a>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                            Löschen
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        Montag
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        14:12
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                            Bearbeiten
                                                        </a>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                            Löschen
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        Montag
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        15:32
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                            Bearbeiten
                                                        </a>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                            Löschen
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Shell>
        </Secure>
    )
}


export default Micturition
