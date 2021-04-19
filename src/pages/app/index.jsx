import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
    utterMessage,
    getMessages,
    signoutUser
} from '../../actions'

import Secure from '../../components/secure'
import ChatShell from '../../components/shell'
import Sidebar from '../../components/sidebar'


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
        console.log("getMessages")
        dispatch(getMessages(new Date("2020-10-01")))
    }

    return (
        <Secure>
            <Sidebar />
            <ChatShell messages={messages} />
        </Secure>
    )
}


export default App
