import React from "react"
import { useDispatch, useSelector } from "react-redux"
import Link from "next/link"
import { useSpring, animated } from "react-spring"
import { useMediaQuery } from "react-responsive"

import Clock from "../visualisations/clock"
import BarChart from "../visualisations/barChart"
import LineChart from "../visualisations/lineChart"

import { useMessages } from "../hooks"
import { signoutUser } from "../actions"

const Aside = ({ showMenu }) => {
    let startDate = new Date()
    let dispatch = useDispatch()
    let messages = useMessages(startDate)
        .sort((a, b) => b.timestamp - a.timestamp)

    const isMobile = useMediaQuery({
        query: '(max-width: 640px)'
    })
    
    const signOut = () => {
        dispatch(signoutUser())
    }

    let currDate = new Date()

    let props = useSpring({
        top: isMobile ? (showMenu ? 40 : 900) : 0
    })

    return (
        <animated.aside
            style={props}
            className={`${showMenu && isMobile ? "shadow-2xl md:shadow-none" : ""} z-50 rounded-t-xl md:rounded-t-none absolute left-0 bottom-0 right-0 md:right-auto  md:w-96 bg-gray-200 overflow-y-scroll border-r border-gray-300 divide-y divide-gray-300 md:divide-y-0`}>
            <header className="px-3 md:px-4 pb-2 md:pb-0 md:h-14 w-full flex flex-row justify-between bg-gray-200 mt-4">
                <h1 className="text-2xl md:text-3xl font-bold self-center">
                    Übersicht
                </h1>
                <div className="flex flex-row justify-between w-24">
                    <button onClick={signOut} className="h-9 w-9 rounded-full bg-gray-300 self-center flex flex-col justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                    <Link href="/app/settings">
                        <a className="h-9 w-9 rounded-full bg-gray-300 self-center flex flex-col justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </a>
                    </Link>
                </div>
            </header>
            <div className="p-2 md:p-4 grid grid-cols-2 gap-3">
                <Link href="/app">
                    <a className="col-span-2 p-3 bg-white rounded-xl">
                        <h3 className="text-md font-semibold">Chat</h3>
                        <p className="text-gray-400">{messages[0]?.text || "..."}</p>
                    </a>
                </Link>
                <Link href="/app/overview" id="micturition_widget">
                    <a className="col-span-1 h-32 text-white rounded-xl bg-green-500 flex flex-col p-3">
                        <h3 className="text-md font-semibold">Miktion</h3>
                        <div className="mt-auto">
                            <h5 className="text-sm -mb-1 tracking-wide">{currDate.getHours()}:{currDate.getMinutes()}</h5>
                            <h4 className="text-2xl md:text-3xl font-bold">83<span className="text-xl">%</span></h4>
                        </div>
                    </a>
                </Link>
                <Link href="/app/overview">
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
                <Link href="/app/overview">
                    <a className="col-span-2 h-64 rounded-xl bg-white p-3 flex flex-col">
                        <h3 className="text-md font-semibold flex-grow-0">Miktion</h3>
                        <div className="w-full h-full mt-3 flex-grow">
                            <LineChart />
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
                <Link href="#">
                    <a className="col-span-2 h-64 rounded-xl bg-white p-3 flex flex-col">
                        <h3 className="text-md font-semibold">Stress</h3>
                        <div className="w-full h-full mt-3 flex-grow">
                            <BarChart></BarChart>
                        </div>
                    </a>
                </Link>
            </div>
        </animated.aside>
    )
}

export default Aside