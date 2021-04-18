import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import {
    utterMessage
} from '../../actions'

const ChatShell = ({ messages }) => {

    let [message, setMessage] = useState('')
    let [aside, showAside] = useState(false)

    let dispatch = useDispatch()

    const utter = () => {    
        dispatch(utterMessage(message))
    }

    return (
        <section 
            id="chat"
            className={`
                bg-white w-full flex flex-col absolute top-0 right-0 bottom-0 md:left-96 overflow-y-scroll
                ${aside ? 'left-12': ''}
            `}
        >
            <div
                className="sticky top-0 text-center bg-white"
            >
                <button onClick={() => showAside(!aside)}>
                    show
                </button>
                Hello
            </div>
            {messages.map((message, i) =>
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
            )}
            
            {messages.map((message, i) =>
                <div
                    key={i}
                    className="p-2 my-1 rounded-md bg-gray-900 text-white"
                >
                    {message.sender}: {message.text}
                </div>
            )}

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
                    className={`ml-1 px-4 py-2 bg-indigo-600 text-white rounded-md flex-grow-0`}
                    onClick={utter}>
                    Send
                </button>
            </div>
        </section>
    )
}

ChatShell.propTypes = {
    messages: PropTypes.array
}

export default ChatShell