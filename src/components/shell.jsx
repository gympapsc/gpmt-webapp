import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import {
    utterMessage
} from '../actions'

const ChatShell = ({ messages }) => {

    let [message, setMessage] = useState('')
    let [aside, setAside] = useState(false)

    let dispatch = useDispatch()

    const utter = () => {    
        dispatch(utterMessage(message))
    }

    const showAside = (e, state) =>{
        e.stopPropagation()
        setAside(state)
    } 

    return (
        <section 
            id="chat"
            className={`
                bg-white flex flex-col absolute top-0 bottom-0 left-0 right-0 md:left-96 overflow-y-scroll transform transition-transform duration-700
                ${aside ? 'translate-x-80 md:translate-x-0': 'translate-x-0'}
            `}
            onClick={e => showAside(e, false)}
        >
            <div
                className="sticky top-0 text-center bg-white p-2 shadow-sm"
            >
                <button
                    className="md:invisible" 
                    onClick={e => showAside(e, !aside)}>
                    show
                </button>
                Hello
            </div>

            <div className="flex flex-col justify-items-start px-2">
                {messages.map((message, i) =>
                    <span
                        key={i}
                        className={`px-2 py-1 my-1 rounded-lg  text-white ${ message.sender == 'user' ? 'self-end bg-indigo-800' : 'self-start bg-gray-600'}`}
                    >
                        {message.text}
                    </span>
                )}

                <a href="#" className="w-64 h-20 bg-gray-100 text-black rounded-xl self-center p-3">
                    <div className="flex flex-row justify-between">
                        <span>
                            Trinken
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg>
                    </div>
                    <span className="block text-3xl">
                        500<span className="text-xl">ml</span>
                    </span>
                </a>
            </div>
            
            {/* {messages.map((message, i) =>
                <div
                    key={i}
                    className="p-2 my-1 rounded-md bg-gray-900 text-white"
                >
                    {message.sender}: {message.text}
                </div>
            )}
            
            {messages.map((message, i) =>
                <div
                    key={i}
                    className="p-2 my-1 rounded-md bg-gray-900 text-white"
                >
                    {message.sender}: {message.text}
                </div>
            )} */}

            <div
                className="sticky bottom-0 mt-auto p-1 flex h-12 bg-white"
            >
                <input 
                    type="text"
                    value={message}
                    className={'rounded-md focus:ring-indigo-600 focus:outline-none h-full flex-grow'}
                    placeholder="Message"
                    onChange={e => setMessage(e.target.value)} />
                <button 
                    className={`ml-1 px-2 py-2 text-indigo-600 hover:text-white hover:bg-indigo-600 rounded-md flex-grow-0`}
                    onClick={utter}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                </button>
            </div>
        </section>
    )
}

ChatShell.propTypes = {
    messages: PropTypes.array
}

export default ChatShell