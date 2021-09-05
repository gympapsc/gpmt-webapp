import React, {useState} from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import Link from "next/link"
import { useSpring, animated } from "@react-spring/web"
import { useMediaQuery } from "react-responsive"

import Clock from "../visualisations/clock"
import BarChart from "../visualisations/barChart"
import LineChart from "../visualisations/lineChart"

import { useDrinking, useMessages, useMicturition, useMicturitionPredictions, useStress } from "../hooks"
import { signoutUser } from "../actions"
import DrinkingChart from "../visualisations/drinkingChart"
import MicturitionChart from "../visualisations/micturitionChart"
import StressChart from "../visualisations/stressChart"
import { shorten } from "../utils"

import * as d3 from "d3" 
import { Menu, Transition } from "@headlessui/react"

const cumulativeData = (d, selector) => {
    let sum = 0
    return d.map(e => {
        sum += e[selector] / 8
        return {
            ...e,
            [selector]: sum
        }
    })
}


const Aside = ({ showMenu, setShowMenu }) => {
    let formatTime = d3.timeFormat("%H:%M")

    let startDate = new Date()
    let dispatch = useDispatch()
    let messages = useMessages(startDate)
        .sort((a, b) => b.timestamp - a.timestamp)

    let micturition = useMicturition(startDate)
    let drinking = useDrinking(startDate)
    let prediction = useMicturitionPredictions(startDate)
    let stress = useStress(startDate)

    const isMobile = useMediaQuery({
        query: "(max-width: 768px)"
    })
    
    const signOut = () => {
        dispatch(signoutUser())
    }

    let [currDate, setCurrDate] = useState(new Date())

    let props = useSpring({
        left: isMobile ? (showMenu ? 0 : -384) : 0
    })

    return (
        <animated.aside
            style={props}
            className={`${showMenu && isMobile ? "shadow-2xl md:shadow-none" : ""} max-w-full z-30 absolute bottom-0 md:right-auto w-96 h-full overflow-x-hidden bg-gray-100 overflow-y-scroll border-r border-gray-300 `}>
            <header className="px-3 md:px-4 pb-2 md:pb-0 md:h-10 w-full flex flex-row justify-between bg-gray-100 mt-4">
                {
                    isMobile &&
                    <button onClick={() => setShowMenu(false)} className="w-8 h-8 flex flex-row justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                }
                <h1 className="text-xl md:text-2xl font-bold self-center">
                    Übersicht
                </h1>
                {
                    isMobile ?
                    <Menu as="div" className="relative inline-block text-left">
                        <Menu.Button className="w-8 h-8 flex flex-row justify-center items-center bg-white rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                            </svg>
                        </Menu.Button>
                        <Transition
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items as="ul" className="absolute right-0 w-56 p-1 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Menu.Item al="li">
                                    {({active}) => (
                                        <button 
                                            title="Abmelden" 
                                            aria-label="Abmelden" 
                                            onClick={signOut}
                                            className={`${
                                                active ? "bg-blue-600 text-white" : "text-gray-900"
                                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                                            </svg>
                                            <span className="font-regular ml-2">
                                                Abmelden
                                            </span>
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item as="li">
                                    {({active}) => (
                                        <Link href="/app/settings">
                                            <a 
                                                title="Einstellungen" 
                                                aria-label="Einstellungen" 
                                                className={`${
                                                    active ? "bg-blue-600 text-white" : "text-gray-900"
                                                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                                </svg>
                                                <span className="font-regular ml-2">
                                                    Einstellungen
                                                </span>
                                            </a>
                                        </Link>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu> :
                    <div className="flex flex-row justify-between w-24">
                        <button title="Abmelden" aria-label="Abmelden" onClick={signOut} className="h-9 w-9 rounded-full bg-gray-200 border hover:bg-blue-600 hover:text-white transition-colors self-center flex flex-col justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                        <Link href="/app/settings">
                            <a title="Einstellungen" aria-label="Einstellungen" className="h-9 w-9 rounded-full bg-gray-200 border hover:bg-blue-600 hover:text-white transition-colors self-center flex flex-col justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </a>
                        </Link>
                    </div>
                }
            </header>
            <div className="p-2 md:p-3 grid grid-cols-2 gap-2 md:gap-3 mb-8">
                <Link href="/app">
                    <a className="col-span-2 p-3 bg-white rounded-xl border border-gray-200">
                        <h3 className="text-sm font-semibold">Chat &bull; <span className="text-gray-500">Gestern</span></h3>
                        <p className="text-gray-500">{shorten(messages[0]?.text, 40) || "..."}</p>
                    </a>
                </Link>
                <Link href="/app/overview" id="micturition_widget">
                    <a className={`
                        col-span-1 h-32 text-white rounded-xl bg-gradient-to-l 
                        ${Math.round(prediction.find(p => p.date.getHours() === currDate.getHours())?.prediction * 100) < 50 ? "from-green-500 to-green-600" : "from-red-400 to-red-500"} 
                        flex flex-col p-3
                    `}>
                        <h3 className="text-sm font-semibold">Miktion</h3>
                        <div className="mt-auto">
                            <h5 className="text-xs font-semibold -mb-1 tracking-wide opacity-90">{formatTime(currDate)}</h5>
                            <h4 className="text-2xl md:text-2xl font-bold">{
                                prediction.length ?
                                Math.round(prediction.find(p => p.date.getHours() === currDate.getHours())?.prediction * 100)
                                : "--"
                            }<span className="text-xl">%</span></h4>
                        </div>
                    </a>
                </Link>
                <Link href="/app/overview">
                    <a className="col-span-1 h-32 rounded-xl bg-white flex flex-col p-3 border border-gray-200">
                        <h3 className="text-sm font-semibold">Nächste Miktion</h3>
                        <div className="mt-auto">
                            <h5 className="text-gray-600 text-xs font-semibold -mb-1 tracking-wide">Morgen</h5>
                            <h4 className="text-2xl md:text-2xl font-bold">
                                {formatTime(cumulativeData(prediction, "prediction").find(p => p?.prediction > 1)?.date || new Date())}
                            </h4>
                        </div>
                    </a>
                </Link>
                <div className="col-span-2">
                    <div className="p-3 h-96">
                        <h3 className="text-sm md:text-md font-semibold">Heute</h3>
                        <Clock data={prediction}></Clock>
                    </div>
                </div>
                <Link href="/app/overview">
                    <a className="col-span-2 h-64 rounded-xl bg-white p-3 flex flex-col border border-gray-200">
                        <h3 className="text-sm font-semibold flex-grow-0">Miktion</h3>
                        <div className="w-full h-full mt-3 flex-grow">
                            <MicturitionChart data={micturition || []} />
                        </div>
                    </a>
                </Link>
                <Link href="/app/overview">
                    <a className="col-span-2 h-64 rounded-xl bg-white p-3 flex flex-col border border-gray-200">
                        <h3 className="text-sm font-semibold">Trinken</h3>
                        <div className="w-full h-full mt-3 flex-grow">
                            <DrinkingChart data={drinking || []} />
                        </div>
                    </a>
                </Link>
                <Link href="#">
                    <a className="col-span-2 h-64 rounded-xl bg-white p-3 flex flex-col border border-gray-200">
                        <h3 className="text-sm font-semibold">Stress</h3>
                        <div className="w-full h-full mt-3 flex-grow">
                            <StressChart data={stress || []} />
                        </div>
                    </a>
                </Link>
            </div>
        </animated.aside>
    )
}

Aside.propTypes = {
    showMenu: PropTypes.bool
}

export default Aside