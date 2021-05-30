import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { assignUser, getDrinking, getMessages, getMicturition, getPhotos, getStress } from "./actions"


export function useDrinking(startDate) {
    let dispatch = useDispatch()
    let drinking = useSelector(s => s.drinking)
    let [requestIsRunning, runningRequest] = useState(false)


    if(typeof window !== 'undefined' && drinking === null && !requestIsRunning) {
        dispatch(getDrinking(startDate))
        runningRequest(true)
    } else if(drinking !== null && requestIsRunning) {
        runningRequest(false)
    }

    return drinking || []
}

export function useMessages(startDate) {
    let dispatch = useDispatch()
    let messages = useSelector(s => s.messages)
    let [requestIsRunning, runningRequest] = useState(false)


    if(typeof window !== 'undefined') {
        if(messages === null && !requestIsRunning) {
            dispatch(getMessages(startDate))
            runningRequest(true)
        } else if(messages !== null && requestIsRunning) {
            runningRequest(false)
        }
    }
    return messages || []
}

export function useMicturition(startDate) {
    let dispatch = useDispatch()
    let micturition = useSelector(s => s.micturition)
    let [requestIsRunning, runningRequest] = useState(false)

    if(typeof window !== 'undefined') {
        if(micturition === null && !requestIsRunning) {
            dispatch(getMicturition(startDate))
            runningRequest(true)
        } else if(micturition !== null && requestIsRunning) {
            runningRequest(false)
        }
    }

    return micturition || []
}

export function useStress(startDate) {
    let dispatch = useDispatch()
    let stress = useSelector(s => s.stress)
    let [requestIsRunning, runningRequest] = useState(false)


    if(typeof window !== 'undefined') {
        if(stress === null && !requestIsRunning) {
            dispatch(getStress(startDate))
            runningRequest(true)
        } else if(stress !== null && requestIsRunning) {
            runningRequest(false)
        }
    }

    return stress || []
}

export function usePhotos(startDate) {
    let dispatch = useDispatch()
    let photos = useSelector(s => s.photos)
    let [requestIsRunning, runningRequest] = useState(false)


    if(typeof window !== 'undefined') {
        if(photos === null && !requestIsRunning) {
            dispatch(getPhotos(startDate))
            runningRequest(true)
        } else if(photos !== null && requestIsRunning) {
            runningRequest(false)
        }
    }

    return photos || []
}

export function useUser() {
    let dispatch = useDispatch()
    let user = useSelector(s => s.user)
    let [requestIsRunning, runningRequest] = useState(false)


    if(typeof window !== 'undefined') {
        if(user === null && !requestIsRunning) {
            dispatch(assignUser())
            runningRequest(true)
        } else if(user !== null && requestIsRunning) {
            runningRequest(false)
        }
    }

    return user
}

