import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
    utterMessage,
    getMessages,
    signoutUser
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
    
    const signOut = () => {
        dispatch(signoutUser())
    }

    if(messages.length === 0) {
        dispatch(getMessages(new Date("2020-10-01")))
    }

    return (
        <Secure>
            <h1>Hello {user?.firstname}</h1>
            <button onClick={signOut}>Sign out</button>
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
