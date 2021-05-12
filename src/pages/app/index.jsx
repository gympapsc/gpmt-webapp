import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
    utterMessage,
    getMessages,
    signoutUser
} from '../../actions'

import Secure from '../../components/secure'
import Aside from '../../components/aside'
import Shell from '../../components/shell'
import Dialog from '../../components/dialog'

const App = () => {
    let messageRef = useRef(null)
    let dispatch = useDispatch()
    let user = useSelector(state => state.user)  

    const utter = () => {
        dispatch(utterMessage(messageRef.current.value))
        messageRef.current.value = ""
    }
    
    let [title, setTitle] = useState('Heute')

    let startDate = new Date()

    return (
        <Secure>
            <Aside />
            <Shell title={title}>
                <Dialog startDate={startDate} changeTitle={setTitle}></Dialog>
                <div className="sticky bottom-0 lg:w-2/3 flex flex-row mt-auto pt-3 w-full mx-auto">
                    <input
                        onEnter
                        className="h-12 flex-grow px-3 md:px-4 bg-gray-300 border-0 focus:outline-none focus:ring-2 focus:ring-inset"
                        ref={messageRef}
                        type="text"
                        placeholder="Nachricht"
                        />
                    <button className="flex-grow-0 w-12 h-12 flex flex-col justify-center items-center text-white bg-indigo-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button> 
                    <button onClick={utter} className="flex-grow-0 w-12 h-12 flex flex-col justify-center items-center text-white bg-indigo-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                    </button>
                </div>
            </Shell>
        </Secure>
    )
}


export default App
