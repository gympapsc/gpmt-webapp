import React, { useState, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"

import {
    utterMessage,
    getMessages,
    signoutUser,
    uploadPhoto,
    addPhoto
} from "../../actions"
import Secure from "../../components/secure"
import Shell from "../../components/shell"
import Dialog, { RecognizedText } from "../../components/dialog"
import * as Banner from "../../components/banner"
import api from "../../api/http"
import {
    useSpeechConfig, 
    useUtterButtons,
    useUser,
    useMicrophoneConfig
} from "../../hooks"

import {
    stt
} from "../../utils"

const App = () => {
    let startDate = new Date()

    let user = useUser()
    let messageRef = useRef(null)
    let fileInputRef = useRef(null)
    let dispatch = useDispatch()
    let buttons = useUtterButtons()

    const utter = message => {
        if(message) {
            dispatch(utterMessage(message))
        } else {
            dispatch(utterMessage(messageRef.current.value))
            messageRef.current.value = ""
        }
    }
    
    const selectedPhoto = e => {
        e.preventDefault()
        let formData = new FormData()
        formData.append("photo", fileInputRef.current.files[0])
        api.init()
        api.uploadPhoto(formData)
            .then(res => res.data)
            .then(data => dispatch(addPhoto(new Date(data.photo.timestamp).valueOf(), data.photo._id, data.photo.name, `${process.env.NEXT_PUBLIC_API_URL}/photo/${data.photo._id}`)))
    }

    let [title, setTitle] = useState("Heute")
    let [continuousText, setRecognition] = useState("")
    const audioConfig = useMicrophoneConfig()
    const speechConfig = useSpeechConfig()

    return (
        <Shell title={title} className="bg-white">
            <Dialog startDate={startDate}>
                {
                    continuousText.length > 0 &&
                    <RecognizedText>
                        {continuousText}
                    </RecognizedText>
                }
            </Dialog>
            {
                buttons.length ?
                    <div className="sticky bottom-3 lg:w-2/3 flex flex-row mt-auto pt-8 w-full mx-auto text-white justify-center">
                        {buttons.map((b, i) => 
                            <button key={i} onClick={e => utter(b.payload)} className="px-3 py-2 text-base md:text-xl font-semibold bg-blue-600 mx-3 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-110">
                                {b.title}
                            </button>
                        )}
                    </div>
                    :
                    <div className="sticky bottom-0 lg:w-2/3 flex flex-row mt-auto pt-3 w-full mx-auto">
                    
                        {
                            user.settings.voiceInput &&
                            <button onClick={() => stt(audioConfig, speechConfig, setRecognition, utter)} className="flex-grow-0 w-12 h-12 flex flex-col justify-center items-center text-white bg-indigo-800">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                </svg>
                            </button>

                        }
                        <input
                            className="h-12 flex-grow px-3 md:px-4 bg-gray-300 border-0 focus:outline-none focus:ring-2 focus:ring-inset"
                            ref={messageRef}
                            type="text"
                            placeholder="Nachricht"
                            />
                        <button title="Fotoauswahl" aria-label="Fotoauswahl" onClick={e => fileInputRef.current.click()} className="flex-grow-0 w-12 h-12 flex flex-col justify-center items-center text-white bg-indigo-800">
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
                        <button title="Nachricht senden" aria-label="Nachricht senden" onClick={e => utter()} className="flex-grow-0 w-12 h-12 flex flex-col justify-center items-center text-white bg-indigo-800">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                        </button>
                    </div>
            }
        </Shell>
    )
}


export default function SecureApp() {
    return (
        <Secure>
            <App />
        </Secure>
    )
}
