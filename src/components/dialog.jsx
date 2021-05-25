import React from "react"
import Link from "next/link"
import { useSelector, useDispatch } from "react-redux"
import { getMessages, getMicturition, getDrinking, getPhotos } from "../actions"

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
        <img  className="rounded-t-xl w-64 lg:w-72 xl:w-80" src={url} />
        <div className="bg-white p-3 rounded-b-xl flex flex-row justify-between">
            <div>
                {name}
                <span className="block text-gray-400 text-sm">
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

const MicturitionEntry = ({date, id}) => (
    <Link href={`/app/micturition/${id}`}>
        <a href="#" className="text-md text-white bg-indigo-600 w-48 md:52 rounded-xl py-2 px-3 self-center">
            <h6 className="text-xs font-semibold text-white text-opacity-80 tracking-wider uppercase">Miktion</h6>
            <h5 className="text-xl md:text-2xl font-semibold">{date.getHours() < 10 ? '0' + date.getHours(): date.getHours()}:{date.getMinutes() < 10 ? '0' + date.getMinutes(): date.getMinutes()}</h5>
        </a>
    </Link>
)

const DrinkingEntry = ({amount, id}) => (
    <Link href={`/app/drinking/${id}`}>
        <a href="#" className="text-md text-white bg-pink-500 w-48 md:52 rounded-xl py-2 px-3 self-center">
            <h6 className="text-xs font-semibold text-white text-opacity-80 tracking-wider uppercase">Trinken</h6>
            <h5 className="text-xl md:text-2xl font-semibold">{amount}<span className="text-base md:text-lg">ml</span></h5>
        </a>
    </Link>
)
        
const BotMessage = ({text}) => (
    <div className="text-sm md:text-base text-gray-900 bg-gray-100 rounded-xl py-1 px-2 md:px-3 text-left self-start">
        {text}
    </div>
)

const UserMessage = ({text}) => (
    <div className="text-sm md:text-base text-gray-100 bg-gray-900 rounded-xl py-1 px-2 md:px-3 text-right self-end">
        {text}
    </div>
)

const DateTitle  = ({text}) => (
    <h4 className="text-lg md:text-xl text-gray-700 self-center my-2 font-semibold">
        {text}
    </h4>
)
    
const DialogEntry = ({entry}) => {
    switch(entry.type) {
        case "MICTURITION":
            console.log(entry)
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
        default:
            return <span>{entry}</span>
    }
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
    let dispatch = useDispatch()
    let oldest = useSelector(state => state.loadedDate)
    let micturitionEntries = useSelector(state => state.micturition)
        .map(e => ({ ...e, type: "MICTURITION"}))
    let drinkingEntries = useSelector(state => state.drinking)
        .map(e => ({ ...e, type: "DRINKING"}))
    let photos = useSelector(state => state.photos)
        .map(p => ({ ...p, type: "PHOTO" }))
    let messages = useSelector(state => state.messages)
        .map(e => ({ ...e, type: e.sender === 'user' ? "USER_MESSAGE" : "BOT_MESSAGE"}))

    let dialog = [
        ...micturitionEntries,
        ...drinkingEntries,
        ...messages
    ]
    dialog = addDateLabels(dialog)
        .sort((a, b) => a.timestamp - b.timestamp)


    if(messages.length == 0) {
        dispatch(getMessages(startDate))
        dispatch(getMicturition(startDate))
        dispatch(getDrinking(startDate))
        dispatch(getPhotos(startDate))
    } else {
        dialog = [
            ...micturitionEntries,
            ...drinkingEntries,
            ...messages,
            ...photos
        ]
        dialog = addDateLabels(dialog)
            .sort((a, b) => a.timestamp - b.timestamp)
        console.log("dialog", dialog)
    }

    return (
        <div className="flex flex-col px-3 w-full lg:w-3/4 xl:w-2/3 mx-auto space-y-2 pt-8">
            {dialog.map((e, i) => 
                <DialogEntry entry={e} key={i} /> 
            )}
        </div>
    )
}

export default Dialog