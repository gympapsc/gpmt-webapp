import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
    utterMessage,
    loadMessages
} from '../../actions'

import Secure from '../../components/secure'


const App = () => {
    let [message, setMessage] = useState('')

    let user = useSelector(state => state.user)
    let messages = useSelector(state => state.messages)
    let dispatch = useDispatch()    

    const utter = () => {    
        dispatch(utterMessage(message))
    }
    
    if(messages.length === 0) {
        dispatch(loadMessages(new Date("2020-10-01")))
    }

    return (
        <Secure>
            <h1>Hello {user?.firstname}</h1>
            <ul>
                {messages.map((message, i) => 
                    <li key={i}>{message.sender}: {message.text}</li>
                )}
            </ul>
            <input 
                type="text" 
                value={message}
                onChange={e => setMessage(e.target.value)} />
            <button onClick={utter}>
                Send
            </button>
        </Secure>
    )
}


export default App
