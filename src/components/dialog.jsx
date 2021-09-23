import React, {Fragment} from "react"
import * as d3 from "d3"
import Link from "next/link"
import PropTypes from "prop-types"
import { useHydration, useMessages, useMicturition, useNutrition, usePhotos, useStress } from "../hooks"
import { Menu, Transition } from "@headlessui/react"
import { deleteHydration, deleteMicturition } from "../actions"

const WEEKDAY = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag"   
]

let formatDaytimeShort = d3.timeFormat("%a, %H:%M")


const PhotoEntry = ({url}) => (
    <div className="block self-end">
        <img className="rounded-lg w-64 lg:w-72 xl:w-80" src={url} />
    </div>
)

PhotoEntry.propTypes = {
    name: PropTypes.string,
    url: PropTypes.string
}

const MedicationEntry = ({date, mass, substance, id}) => (
    <Link href={`/app/medication/${id}`}>
        <a className="text-md text-black bg-purple-300 w-48 md:52 rounded-xl py-2 px-3 self-center focus:ring-2 focus:outline-none focus:ring-yellow-800 focus:ring-offset-1">
            <div className="flex flex-row justify-between">
                <h6 className="text-xs font-semibold text-purple-800 text-opacity-90 tracking-wider uppercase">{substance || "Medikament"}</h6>
                <Menu className="relative h-5" as="div">
                    <Menu.Button className="text-purple-800 -mr-1" >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                        </svg>
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-75"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute -mr-5 right-0 w-56 mt-1 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="px-1 py-1">
                                <Menu.Item>
                                    {({active}) => (
                                        <div className={`
                                            rounded-sm
                                            ${ active ? "bg-blue-600 text-white" : "bg-white text-gray-900"}
                                            `}>
                                            <Link href={`/app/nutrition/${id}`}>
                                                <a className={`
                                                    text-sm px-2 py-2 flex w-full items-center group
                                                `}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                    </svg>
                                                    Bearbeiten
                                                </a>
                                            </Link>
                                        </div>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({active}) => (
                                        <button
                                            onClick={e => deleteMicturition(id) + e.stopPropagation()} 
                                            className={`
                                                ${ active ? "bg-red-600 text-white" : "bg-white text-gray-900"}
                                                text-sm px-2 py-2 flex w-full items-center group rounded-sm
                                            `}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            Löschen
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
            <h5 className="text-xl md:text-2xl font-semibold text-purple-900">{date.getHours() < 10 ? "0" + date.getHours(): date.getHours()}:{date.getMinutes() < 10 ? "0" + date.getMinutes(): date.getMinutes()}</h5>
        </a>
    </Link>
)

MedicationEntry.propTypes = {
    date: PropTypes.object,
    substance: PropTypes.string,
    id: PropTypes.string,
    mass: PropTypes.number
}

const StressEntry = ({ id, level }) => (
    <Link href={`/app/stress/${id}`}>
        <a href="#" className="text-md text-white bg-green-200 w-48 md:52 rounded-xl py-2 px-3 self-center focus:ring-2 focus:outline-none focus:ring-blue-500 focus:ring-offset-1">
            <div className="flex flex-row justify-between">
                <h6 className="text-xs font-semibold text-green-900 text-opacity-80 tracking-wider uppercase">Stress</h6>
                <button className="text-green-900 -mr-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            <h5 className="text-xl md:text-2xl font-semibold text-green-800">{level}<span className="text-base md:text-lg">. level</span></h5>
        </a>
    </Link>
)

StressEntry.propTypes = {
    id: PropTypes.string,
    level: PropTypes.number
}

const NutritionEntry = ({date, mass, type, id, timestamp }) => (
    <Link href={`/app/nutrition/${id}`}>
        <a className="text-md text-white bg-yellow-400 w-48 md:52 rounded-xl py-2 px-3 self-center focus:ring-2 focus:outline-none focus:ring-yellow-800 focus:ring-offset-1">
            <div className="flex flex-row justify-between">
                <h6 className="text-xs font-semibold text-yellow-900 text-opacity-80 tracking-wider uppercase">{type || "Essen"}</h6>
                <span className="text-xs text-gray-500">
                    {formatDaytimeShort(new Date(timestamp))}
                </span>
            </div>
            <h5 className="text-xl md:text-2xl font-semibold text-yellow-900">{mass * 1000}<span className="text-base md:text-lg">g</span></h5>
        </a>
    </Link>
)

NutritionEntry.propTypes = {
    date: PropTypes.object,
    type: PropTypes.string,
    id: PropTypes.string,
    mass: PropTypes.number
}

const MicturitionEntry = ({date, _id, timestamp}) => (
    <Link href={`/app/micturition/${_id}`}>
        <a className="text-md text-white bg-indigo-200 w-48 md:w-52 rounded-xl py-2 px-3 self-center focus:ring-2 focus:outline-none focus:ring-indigo-800 focus:ring-offset-1">
            <div className="flex flex-row justify-between">
                <h6 className="text-xs font-semibold text-indigo-900 text-opacity-80 high-contrast:text-opacity-100 tracking-wider uppercase">Miktion</h6>
                <span className="text-xs text-gray-600">
                    {formatDaytimeShort(new Date(timestamp))}
                </span>
            </div>
            <h5 className="text-xl md:text-2xl font-semibold text-indigo-900">{date.getHours() < 10 ? "0" + date.getHours(): date.getHours()}:{date.getMinutes() < 10 ? "0" + date.getMinutes(): date.getMinutes()}</h5>
        </a>
    </Link>
)

MicturitionEntry.propTypes = {
    date: PropTypes.any,
    id: PropTypes.string
}

const HydrationEntry = ({amount, _id, type, timestamp}) => (
    <Link href={`/app/hydration/${_id}`}>
        <a href="#" className="text-md text-white bg-pink-200 w-48 md:w-52 rounded-xl py-2 px-3 self-center focus:ring-2 focus:outline-none focus:ring-pink-800 focus:ring-offset-1">
            <div className="flex flex-row justify-between">
                <h6 className="text-xs font-semibold text-pink-900 text-opacity-80 high-contrast:text-opacity-100 tracking-wider uppercase">{type || "Trinken"}</h6>
                <span className="text-xs text-gray-500">
                    {formatDaytimeShort(new Date(timestamp))}
                </span>
            </div>
            <h5 className="text-xl md:text-2xl font-semibold text-pink-900">{Math.round(amount * 1000)}<span className="text-base md:text-lg">ml</span></h5>
        </a>
    </Link>
)

HydrationEntry.propTypes = {
    amount: PropTypes.number,
    id: PropTypes.string
}
        
const BotMessage = ({text}) => (
    <div className="text-lg lg:text-xl font-semibold text-blue-900 text-opacity-80 max-w-xs md:max-w-md rounded-xl py-1 px-2 md:px-3 text-left self-start">
        {text}
    </div>
)

BotMessage.propTypes = {
    text: PropTypes.string
}

const UserMessage = ({text}) => (
    <div className="text-lg lg:text-xl font-semibold text-gray-800 max-w-xs md:max-w-md rounded-xl py-1 px-2 md:px-3 text-right self-end">
        {text}
    </div>
)

export const RecognizedText = ({children}) => (
    <div className="text-lg lg:text-xl font-semibold text-gray-500 max-w-xs md:max-w-md rounded-xl py-1 px-2 md:px-3 text-right self-end">
        {children}
    </div>
)

UserMessage.propTypes = {
    text: PropTypes.string
}

const DateTitle  = ({text}) => (
    <h4 className="md:text-lg text-gray-700 self-center my-2 font-semibold high-contrast:text-gray-800">
        {text}
    </h4>
)

DateTitle.propTypes = {
    text: PropTypes.string
}


const DialogEntry = ({entry: { type, payload}}) => {
    switch(type) {
        case "MICTURITION":
            return <MicturitionEntry {...payload} />
        case "HYDRATION":
            return <HydrationEntry {...payload} />
        case "BOT_MESSAGE":
            return <BotMessage text={payload.text} />
        case "USER_MESSAGE":
            return <UserMessage text={payload.text} />
        case "NUTRITION":
            return <NutritionEntry {...payload} />
        case "DATE_TITLE":
            return <DateTitle text={payload.text} />
        case "PHOTO":
            return <PhotoEntry name={payload.name} url={payload.url} />
        case "STRESS":
            return <StressEntry level={payload.level} id={payload._id} />
        default:
            return <span>{payload}</span>
    }
}

DialogEntry.propTypes = {
    entry: PropTypes.any
}

const addDateLabels = entries => {
    let dialog = Array.from(entries)
    let days = new Set(entries.map(e => new Date(e.timestamp).toDateString()))
    for(let day of days) {
        dialog.push({
            type: "DATE_TITLE",
            payload: {
                text: WEEKDAY[new Date(day).getDay()],
                timestamp: new Date(day)
            }
        })
    }
    return dialog
}

const Dialog = ({startDate, children}) => {
    let micturitionEntries = useMicturition(startDate)
        .map(e => ({ payload: e, type: "MICTURITION"}))
    let hydrationEntries = useHydration(startDate)
        .map(e => ({ payload: e, type: "HYDRATION"}))
    let photos = usePhotos(startDate)
        .map(p => ({ payload: p, type: "PHOTO" }))
    let nutriitonEntries = useNutrition(startDate)
        .map(e => ({ payload: e, type: "NUTRITION"}))
    let stressEntries = useStress(startDate)
        .map(s => ({ payload: s, type: "STRESS"}))
    let messages = useMessages(startDate)
        .map(e => ({ payload: e, type: e.sender === "user" ? "USER_MESSAGE" : "BOT_MESSAGE"}))

    let dialog = [
        ...micturitionEntries,
        ...hydrationEntries,
        ...stressEntries,
        ...messages,
        ...photos
    ]

    dialog = addDateLabels(
            dialog
                .sort((a, b) => a.payload.timestamp - b.payload.timestamp)
                .filter((a, i, arr) => i > (arr.length - 12))
        )
        .sort((a, b) => a.payload.timestamp - b.payload.timestamp)

    return (
        <div className="flex flex-col px-3 w-full lg:w-3/4 xl:w-2/3 mx-auto space-y-3 pt-8">
            {dialog.map((e, i) => 
                <DialogEntry entry={e} key={i} /> 
            )}
            {children}
        </div>
    )
}

Dialog.propTypes = {
    startDate: PropTypes.any
}

export default Dialog
