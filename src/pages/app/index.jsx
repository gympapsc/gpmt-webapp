import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSpring, animated } from "react-spring"

import {
    utterMessage,
    getMessages,
    signoutUser,
    uploadPhoto,
    addPhoto,
    test
} from '../../actions'

import Secure from '../../components/secure'
import Aside from '../../components/aside'
import Shell from '../../components/shell'
import Dialog from '../../components/dialog'
import Banner from '../../components/banner'
import api from '../../api/http'
import { useDrinking, useMessages, useMicturition, useStress } from '../../hooks'

const App = () => {
    let startDate = new Date()

    let messageRef = useRef(null)
    let fileInputRef = useRef(null)
    let dispatch = useDispatch()
    let authBearer = useSelector(state => state.bearer)

    const utter = () => {
        dispatch(utterMessage(messageRef.current.value))
        messageRef.current.value = ""
    }
    
    const selectedPhoto = e => {
        e.preventDefault()
        let formData = new FormData()
        formData.append("photo", fileInputRef.current.files[0])
        api.init(authBearer)
        api.uploadPhoto(formData)
            .then(res => res.data)
            .then(data => api.downloadPhoto(data.photo._id)
                .then(url => dispatch(addPhoto(data.photo.timestamp, data.photo._id, data.photo.name, url))
            ))
    }

    let [title, setTitle] = useState('Heute')


    let startDictation = () => {}

    let [showMenu, toggleMenu] = useState(false)

    let props = useSpring({
        blur: showMenu ? 0 : 4
    })

    return (
        <Secure>
            {/* <Banner /> */}
            <Aside showMenu={showMenu}/>
            <animated.div
                style={props}>
                <Shell title={title} className={`bg-white ${ showMenu ? "opacity-80" : "opacity-100"}`} toggleMenu={() => toggleMenu(!showMenu)}>
                    <Dialog startDate={startDate}></Dialog>
                    <div className="sticky bottom-0 lg:w-2/3 flex flex-row mt-auto pt-3 w-full mx-auto">
                        <button onClick={startDictation} className="flex-grow-0 w-12 h-12 flex flex-col justify-center items-center text-white bg-indigo-800">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                        </button>
                        <input
                            className="h-12 flex-grow px-3 md:px-4 bg-gray-300 border-0 focus:outline-none focus:ring-2 focus:ring-inset"
                            ref={messageRef}
                            type="text"
                            placeholder="Nachricht"
                            />
                        <button onClick={e => fileInputRef.current.click()} className="flex-grow-0 w-12 h-12 flex flex-col justify-center items-center text-white bg-indigo-800">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>

                            <form hidden>
                                <input
                                    ref={fileInputRef}
                                    onChange={selectedPhoto}
                                    accept="image/jpeg"
                                    type="file"
                                    />
                                <input type="submit" />
                            </form>
                        </button> 
                        <button onClick={utter} className="flex-grow-0 w-12 h-12 flex flex-col justify-center items-center text-white bg-indigo-800">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                        </button>
                    </div>
                </Shell>
            </animated.div>
        </Secure>
    )
}


export default App
