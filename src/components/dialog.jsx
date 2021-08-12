import React, {Fragment} from "react"
import Link from "next/link"
import PropTypes from "prop-types"
import { useDrinking, useMessages, useMicturition, usePhotos, useStress } from "../hooks"
import { Menu, Transition } from "@headlessui/react"
import { deleteDrinking, deleteMicturition } from "../actions"

const WEEKDAY = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag"   
]

const PhotoEntry = ({url}) => (
    <div className="block self-end">
        <img className="rounded-lg w-64 lg:w-72 xl:w-80" src={url} />
    </div>
)

PhotoEntry.propTypes = {
    name: PropTypes.string,
    url: PropTypes.string
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

const MicturitionEntry = ({date, id}) => (
    <Link href={`/app/micturition/${id}`}>
        <a href="#" className="text-md text-white bg-indigo-200 w-48 md:52 rounded-xl py-2 px-3 self-center focus:ring-2 focus:outline-none focus:ring-indigo-800 focus:ring-offset-1">
            <div className="flex flex-row justify-between">
                <h6 className="text-xs font-semibold text-indigo-900 text-opacity-80 tracking-wider uppercase">Miktion</h6>
                <Menu className="relative h-5" as="div">
                    <Menu.Button className="text-indigo-900 -mr-1" >
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
                                            ${ active ? "bg-indigo-600 text-white" : "bg-white text-gray-900"}
                                            `}>
                                            <Link href={`/app/micturition/${id}`}>
                                                <a className={`
                                                    text-sm px-2 py-2 flex w-full items-center group
                                                `}
                                                >
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
                                                ${ active ? "bg-indigo-600 text-white" : "bg-white text-gray-900"}
                                                text-sm px-2 py-2 flex w-full items-center group rounded-sm
                                            `}
                                        >
                                            Löschen
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>                
            </div>
            <h5 className="text-xl md:text-2xl font-semibold text-indigo-900">{date.getHours() < 10 ? "0" + date.getHours(): date.getHours()}:{date.getMinutes() < 10 ? "0" + date.getMinutes(): date.getMinutes()}</h5>
        </a>
    </Link>
)

MicturitionEntry.propTypes = {
    date: PropTypes.any,
    id: PropTypes.string
}

const DrinkingEntry = ({amount, id}) => (
    <Link href={`/app/drinking/${id}`}>
        <a href="#" className="text-md text-white bg-pink-200 w-48 md:52 rounded-xl py-2 px-3 self-center focus:ring-2 focus:outline-none focus:ring-pink-800 focus:ring-offset-1">
            <div className="flex flex-row justify-between">
                <h6 className="text-xs font-semibold text-pink-900 text-opacity-80 tracking-wider uppercase">Trinken</h6>
                <Menu className="relative h-5" as="div">
                    <Menu.Button className="text-pink-900 -mr-1" >
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
                        <Menu.Items className="absolute -mr-3 right-0 w-56 mt-0 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="px-1 py-1">
                                <Menu.Item>
                                    {({active}) => (
                                        <div className={`
                                            rounded-sm
                                            ${ active ? "bg-pink-700 text-white" : "bg-white text-gray-900"}
                                            `}>
                                            <Link href={`/app/micturition/${id}`}>
                                                <a className={`
                                                    text-sm px-2 py-2 flex w-full items-center group
                                                `}
                                                >
                                                    Bearbeiten
                                                </a>
                                            </Link>
                                        </div>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({active}) => (
                                        <button
                                            onClick={e => deleteDrinking(id) + e.stopPropagation()} 
                                            className={`
                                                ${ active ? "bg-pink-700 text-white" : "bg-white text-gray-900"}
                                                text-sm px-2 py-2 flex w-full items-center group rounded-sm
                                            `}
                                        >
                                            Löschen
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>                
            </div>
            <h5 className="text-xl md:text-2xl font-semibold text-pink-900">{amount}<span className="text-base md:text-lg">ml</span></h5>
        </a>
    </Link>
)

DrinkingEntry.propTypes = {
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
    <h4 className="text-lg md:text-xl text-gray-700 self-center my-2 font-semibold">
        {text}
    </h4>
)

DateTitle.propTypes = {
    text: PropTypes.string
}


const DialogEntry = ({entry}) => {
    switch(entry.type) {
        case "MICTURITION":
            return <MicturitionEntry date={entry.date} id={entry._id} />
        case "DRINKING":
            return <DrinkingEntry amount={entry.amount} id={entry._id}/>
        case "BOT_MESSAGE":
            return <BotMessage text={entry.text} />
        case "USER_MESSAGE":
            return <UserMessage text={entry.text} />
        case "DATE_TITLE":
            return <DateTitle text={entry.text} />
        case "PHOTO":
            return <PhotoEntry name={entry.name} url={entry.url} />
        case "STRESS":
            return <StressEntry level={entry.level} id={entry._id} />
        default:
            return <span>{entry}</span>
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
            text: WEEKDAY[new Date(day).getDay()],
            timestamp: new Date(day)
        })
    }
    return dialog
}

const Dialog = ({startDate, children}) => {
    let micturitionEntries = useMicturition(startDate)
        .map(e => ({ ...e, type: "MICTURITION"}))
    let drinkingEntries = useDrinking(startDate)
        .map(e => ({ ...e, type: "DRINKING"}))
    let photos = usePhotos(startDate)
        .map(p => ({ ...p, type: "PHOTO" }))
    let stressEntries = useStress(startDate)
        .map(s => ({ ...s, type: "STRESS"}))
    let messages = useMessages(startDate)
        .map(e => ({ ...e, type: e.sender === "user" ? "USER_MESSAGE" : "BOT_MESSAGE"}))

    let dialog = [
        ...micturitionEntries,
        ...drinkingEntries,
        ...stressEntries,
        ...messages,
        ...photos
    ]

    dialog = addDateLabels(dialog)
        .sort((a, b) => a.timestamp - b.timestamp)


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