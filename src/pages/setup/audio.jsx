import React, {useState} from "react"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"

import Toggle from "../../components/toggle"
import Secure from "../../components/secure"
import { stt, tts } from "../../utils"

import {
    useUser,
    useSpeechConfig,
    useMicrophoneConfig
} from "../../hooks"

import {
    updateUser
} from "../../actions"

const Audio = () => {
    let router = useRouter()
    let user = useUser()
    let dispatch = useDispatch()

    const next = () => {
        router.push("/app")
    }

    const speechConfig = useSpeechConfig()
    const audioConfig = useMicrophoneConfig()

    let changeUser = update => {
        dispatch(updateUser({
            ...user,
            ...update
        }))
    }

    let [recognition, setRecognition] = useState("")
    let [recognized, setRecognized] = useState("")

    let recognitionWorking = () => !user?.settings.voiceInput || (user?.settings.voiceInput && Boolean(recognized.match(/Hallo/)))

    return (
            <div className="bg-gray-100 absolute top-0 bottom-0 right-0 left-0">
                <div className="px-4 w-full md:w-5/6 lg:w-3/4 xl:w-2/3 mx-auto flex flex-col h-full pb-20">
                    <h1 className="text-2xl text-center md:text-3xl font-bold mx-auto my-10">Sag, Hallo!</h1>
                    <div className="text-justify space-y-3">
                        {/* <div className="grid grid-cols-3">
                            <div className="flex flex-col">
                                <div className="bg-gray-500 h-16 w-16 rounded-full"></div>
                                <span className="text-sm">Hakim Rachidi</span>
                            </div>
                            <div className="flex flex-col">
                                <div className="bg-gray-500 h-16 w-16 rounded-full"></div>
                                <span className="text-sm">Hakim Rachidi</span>
                            </div>
                            <div className="flex flex-col">
                                <div className="bg-gray-500 h-16 w-16 rounded-full"></div>
                                <span className="text-sm">Hakim Rachidi</span>
                            </div>
                        </div> */}

                        <div className={`${recognitionWorking() ? "bg-green-200" : "bg-red-100"} w-full rounded-lg p-3`}>
                            <div className="h-96 rounded-xl text-2xl font-semibold flex flex-row justify-center items-center">
                                {
                                    recognition ? 
                                    <span className="text-gray-600">{recognition}</span> :
                                    <span className="text-gray-900">{recognized}</span>
                                }
                            </div>
                            {
                                recognitionWorking() ||
                                <div className="flex flex-row justify-around w-full">
                                    <button onClick={() => stt(audioConfig, speechConfig, setRecognition, setRecognized)} className="py-2 px-3 bg-blue-600 text-white rounded-lg">
                                        Versuche, <span className="italic">Hallo</span> zu sagen
                                    </button>
                                </div>
                            }
                        </div>
                        <div className="space-y-4 py-5 bg-white px-6 rounded-xl">
                            <Toggle 
                                title="Spracheingabe" 
                                description="Wenn aktiviert, ermöglicht das Aufnehmen von Nachrichten" 
                                value={user?.settings.voiceInput} 
                                onChange={voiceInput => {
                                    changeUser({settings: { ...user.settings, voiceInput }})
                                    if(voiceInput) {
                                        stt(audioConfig, speechConfig, setRecognition, setRecognized)
                                    }
                                }} />
                            <hr/>
                            <Toggle 
                                title="Lautsprecherausgabe" 
                                description="Liest alle Nachricht vor" 
                                value={user?.settings.voiceOutput} 
                                onChange={voiceOutput => {
                                    changeUser({settings: { ...user.settings, voiceOutput }})
                                    if(voiceOutput) {
                                        tts("Hallo!", speechConfig)
                                    }
                                }} />
                        </div>
                    </div>
                    <div className="mt-auto">
                        <button onClick={next} disabled={!recognitionWorking()} className={`w-full md:w-64 mx-auto ${recognitionWorking() ? "bg-blue-600 hover:bg-blue-500" : "bg-gray-400"} text-white p-2 rounded-lg focus:ring-2 focus:ring-offset-1 focus:ring-blue-600 focus:outline-none flex flex-row justify-center`}>
                            Weiter
                        </button>
                    </div>
                </div>
            </div>
    )
}

export default function SecureAudio() {
    return (
        <Secure>
            <Audio></Audio>
        </Secure>
    )
}