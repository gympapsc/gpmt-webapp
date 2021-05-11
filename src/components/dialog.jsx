import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { getMessages, getMicturition, getDrinking} from "../actions"

const WEEKDAY = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag"   
]

const MicturitionEntry = ({date}) => (
    <a href="#" className="text-md text-white bg-indigo-700 w-48 rounded-xl py-2 px-3 self-center">
        <h6 className="text-xs font-semibold text-white text-opacity-80 tracking-wider uppercase">Miktion</h6>
        <h5 className="text-2xl font-semibold">{date.getHours() < 10 ? '0' + date.getHours(): date.getHours()}:{date.getMinutes() < 10 ? '0' + date.getMinutes(): date.getMinutes()}</h5>
    </a>
)

const DrinkingEntry = ({amount}) => (
    <a href="#" className="text-md text-white bg-pink-500 w-48 rounded-xl py-2 px-3 self-center">
        <h6 className="text-xs font-semibold text-white text-opacity-80 tracking-wider uppercase">Trinken</h6>
        <h5 className="text-2xl font-semibold">{amount}<span className="text-lg">ml</span></h5>
    </a>
)
        
const BotMessage = ({text}) => (
    <div className="text-md text-black bg-gray-200 rounded-xl py-1 px-2 text-left self-start">
        {text}
    </div>
)

const UserMessage = ({text}) => (
    <div className="text-md text-white bg-black rounded-xl py-1 px-2 text-right self-end">
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
            return <MicturitionEntry date={entry.date} />
        case "DRINKING":
            return <DrinkingEntry amount={entry.amount} />
        case "BOT_MESSAGE":
            return <BotMessage text={entry.text} />
        case "USER_MESSAGE":
            return <UserMessage text={entry.text} />
        case "DATE_TITLE":
            return <DateTitle text={entry.text} />
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
    } else {
        dialog = [
            ...micturitionEntries,
            ...drinkingEntries,
            ...messages
        ]
        dialog = addDateLabels(dialog)
            .sort((a, b) => a.timestamp - b.timestamp)
        console.log("dialog", dialog)
    }

    return (
        <div className="flex flex-col px-3 w-full lg:w-3/4 xl:w-2/3 mx-auto space-y-4 pt-8">
            {dialog.map((e, i) => 
                <DialogEntry entry={e} key={i} /> 
            )}
        </div>
    )
}

export default Dialog