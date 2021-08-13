import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { authenticateUser, loadDrinking, loadMessages, loadMicturition, loadPhotos, loadStress, loadMicturitionPredictions, setSpeechToken} from "./actions"
import api from "./api/http"
import * as speechsdk from "microsoft-cognitiveservices-speech-sdk"
import { createSpeechConfig } from "./utils"

export function useDrinking(startDate) {
    let dispatch = useDispatch()
    let drinking = useSelector(s => s.drinking)

    useEffect(() => {
        if(typeof window !== "undefined" && drinking === null) {
            dispatch(loadDrinking(startDate))
        }
    })

    return drinking || []
}

export function useMessages(startDate) {
    let dispatch = useDispatch()
    let messages = useSelector(s => s.messages)

    useEffect(() => {
        if(typeof window !== "undefined" && messages === null) {
            dispatch(loadMessages(startDate))
        }
    })

    return messages || []
}

export function useMicturition(startDate) {
    let dispatch = useDispatch()
    let micturition = useSelector(s => s.micturition)

    useEffect(() => {
        if(typeof window !== "undefined" && micturition === null) {
            dispatch(loadMicturition(startDate))
        }
    })

    return micturition || []
}

export function useMicturitionPredictions(startDate) {
    let dispatch = useDispatch()
    let predictions = useSelector(s => s.micturitionPredictions)

    useEffect(() => {
        if(typeof window !== "undefined" && predictions === null) {
            dispatch(loadMicturitionPredictions(startDate))
        }
    })

    return predictions || []
}

export function useStress(startDate) {
    let dispatch = useDispatch()
    let stress = useSelector(s => s.stress)

    useEffect(() => {
        if(typeof window !== "undefined" && stress === null) {
            dispatch(loadStress(startDate))
        }
    })

    return stress || []
}

export function usePhotos(startDate) {
    let dispatch = useDispatch()
    let photos = useSelector(s => s.photos)

    useEffect(() => {
        if(typeof window !== "undefined" && photos === null) {
            dispatch(loadPhotos(startDate))
        }
    })

    return photos || []
}

export function useUser() {
    let dispatch = useDispatch()
    let user = useSelector(s => s.user)

    useEffect(() => {
        if(typeof window !== "undefined" && user === null) {
            dispatch(authenticateUser())             
        }
    })

    return user
}

export function useUtterButtons() {
    let buttons = useSelector(s => s.user?.utterButtons)
    return buttons || []
}

export function useApiVersion() {
    let version = "0.0.0"
    useEffect(async () => {
        if(typeof window !== "undefined") {
            version = await api.info()
                .then(res => res.data.version)
        }
    })
    return version
}

export function useSpeechConfig() {
    let [config, setConfig] = useState(null)
    let dispatch = useDispatch()
    useEffect(async () => {
        if(typeof window !== "undefined" && config === null) {
            const { data: {token, region}} = await api.getSpeechToken()
            dispatch(setSpeechToken(token, region))
            let c = createSpeechConfig(token, region)
            c.speechRecognitionLanguage = "de-DE"
            setConfig(c)
        }
    })
    return config
}

export function useMicrophoneConfig() {
    let [config, setConfig] = useState(null)
    useEffect(async () => {
        if(typeof window !== "undefined" && config === null) {
            const c = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
            setConfig(c)
        }
    })
    return config
}