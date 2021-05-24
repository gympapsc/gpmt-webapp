import React from "react"
import { useDispatch, useSelector } from "react-redux"
import Link from "next/link"

import Clock from "../visualisations/clock"
import BarChart from "../visualisations/barChart"

import {
    getMessages
} from "../actions"

const Aside = () => {
    let dispatch = useDispatch()
    let r_messages = useSelector(state => state.messages).sort((a, b) => b.timestamp - a.timestamp)
    if(!r_messages.length) {
        let startDate = new Date()
        dispatch(getMessages(startDate))
    }

    let currDate = new Date()

    return (
        <aside className="absolute top-0 left-0 bottom-0 md:w-96 bg-gray-200 overflow-y-scroll border-r border-gray-300">
            <header className="px-4 md:h-14 w-full flex flex-row justify-between bg-gray-200 mt-4">
                <h1 className="text-2xl md:text-3xl font-bold self-center">
                    Übersicht
                </h1>
                <Link href="/app/settings">
                    <a className="h-8 w-8 rounded-full bg-gray-300 self-center flex flex-col justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </a>
                </Link>
            </header>
            <div className="p-4 grid grid-cols-2 gap-3">
                <Link href="/app">
                    <a className="col-span-2 p-3 bg-white rounded-xl">
                        <h3 className="text-md font-semibold">Chat</h3>
                        <p className="text-gray-400">{r_messages[0]?.text || "&nbsp;"}</p>
                    </a>
                </Link>
                <Link href="/app/micturition" id="micturition_widget">
                    <a className="col-span-1 h-32 text-white rounded-xl bg-gray-500 flex flex-col p-3">
                        <h3 className="text-md font-semibold">Miktion</h3>
                        <div className="mt-auto">
                            <h5 className="text-sm -mb-1 tracking-wide">{currDate.getHours()}:{currDate.getMinutes()}</h5>
                            <h4 className="text-2xl md:text-3xl font-bold">83<span className="text-xl">%</span></h4>
                        </div>
                    </a>
                </Link>
                <Link href="/app/micturition">
                    <a className="col-span-1 h-32 rounded-xl bg-white flex flex-col p-3">
                        <h3 className="text-md font-semibold">Nächste Miktion</h3>
                        <div className="mt-auto">
                            <h4 className="text-2xl md:text-3xl font-bold">19:45</h4>
                        </div>
                    </a>
                </Link>
                <div className="col-span-2">
                    <div className="p-3 h-96">
                        <h3 className="text-md font-semibold">Heute</h3>
                        <Clock></Clock>
                    </div>
                </div>
                <Link href="/app/micturition">
                    <a className="col-span-2 h-64 rounded-xl bg-white p-3 flex flex-col">
                        <h3 className="text-md font-semibold flex-grow-0">Miktion</h3>
                        <div className="w-full h-full mt-3 flex-grow">
                            <BarChart></BarChart>
                        </div>
                    </a>
                </Link>
                <Link href="#">
                    <a className="col-span-2 h-64 rounded-xl bg-white p-3 flex flex-col">
                        <h3 className="text-md font-semibold">Trinken</h3>
                        <div className="w-full h-full mt-3 flex-grow">
                            <BarChart></BarChart>
                        </div>
                    </a>
                </Link>
            </div>
        </aside>
    )
}

export default Aside