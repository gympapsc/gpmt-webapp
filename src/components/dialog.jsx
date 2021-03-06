import React from "react"
import Link from "next/link"
import PropTypes from "prop-types"
import { useDrinking, useMessages, useMicturition, usePhotos, useStress } from "../hooks"

const WEEKDAY = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag"   
]

const PhotoEntry = ({name, url}) => (
    <div className="block self-end">
        <img  className="rounded-t-xl w-64 lg:w-72 xl:w-80" src={url} alt={name} />
        <div className="bg-gray-100 p-3 rounded-b-xl flex flex-row justify-between">
            <div>
                <h4 className="text-lg font-semibold">{name}</h4>
                <span className="block text-gray-600 text-sm">
                    Automatische Bilderkennung
                </span>
            </div>
            <button className="hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
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
                <button className="text-indigo-900 -mr-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            <h5 className="text-xl md:text-2xl font-semibold text-indigo-900">{date.getHours() < 10 ? '0' + date.getHours(): date.getHours()}:{date.getMinutes() < 10 ? '0' + date.getMinutes(): date.getMinutes()}</h5>
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
                <button className="text-pink-900 -mr-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                </button>
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

const Dialog = ({startDate}) => {
    let micturitionEntries = useMicturition(startDate)
        .map(e => ({ ...e, type: "MICTURITION"}))
    let drinkingEntries = useDrinking(startDate)
        .map(e => ({ ...e, type: "DRINKING"}))
    let photos = usePhotos(startDate)
        .map(p => ({ ...p, type: "PHOTO" }))
    let stressEntries = useStress(startDate)
        .map(s => ({ ...s, type: "STRESS"}))
    let messages = useMessages(startDate)
        .map(e => ({ ...e, type: e.sender === 'user' ? "USER_MESSAGE" : "BOT_MESSAGE"}))

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
        </div>
    )
}

Dialog.propTypes = {
    startDate: PropTypes.any
}


export default Dialog