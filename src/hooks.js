import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { authenticateUser, loadDrinking, loadMessages, loadMicturition, loadPhotos, loadStress, loadMicturitionPredictions} from "./actions"


export function useDrinking(startDate) {
    let dispatch = useDispatch()
    let drinking = useSelector(s => s.drinking)
    let [requestIsRunning, runningRequest] = useState(false)

    useEffect(() => {
        if(typeof window !== 'undefined' && drinking === null && !requestIsRunning) {
            dispatch(loadDrinking(startDate))
            runningRequest(true)
        } else if(drinking !== null && requestIsRunning) {
            runningRequest(false)
        }
    })

    return drinking || []
}

export function useMessages(startDate) {
    let dispatch = useDispatch()
    let messages = useSelector(s => s.messages)
    let [requestIsRunning, runningRequest] = useState(false)

    useEffect(() => {
        if(typeof window !== 'undefined') {
            if(messages === null && !requestIsRunning) {
                dispatch(loadMessages(startDate))
                runningRequest(true)
            } else if(messages !== null && requestIsRunning) {
                runningRequest(false)
            }
        }
    })

    return messages || []
}

export function useMicturition(startDate) {
    let dispatch = useDispatch()
    let micturition = useSelector(s => s.micturition)
    let [requestIsRunning, runningRequest] = useState(false)

    useEffect(() => {
        if(typeof window !== 'undefined') {
            if(micturition === null && !requestIsRunning) {
                dispatch(loadMicturition(startDate))
                runningRequest(true)
            } else if(micturition !== null && requestIsRunning) {
                runningRequest(false)
            }
        }
    })

    return micturition || []
}

export function useMicturitionPredictions(startDate) {
    let dispatch = useDispatch()
    let predictions = useSelector(s => s.micturitionPredictions)
    let [requestIsRunning, runningRequest] = useState(false)

    useEffect(() => {
        if(typeof window !== 'undefined') {
            if(predictions === null && !requestIsRunning) {
                dispatch(loadMicturitionPredictions(startDate))
                runningRequest(true)
            } else if(predictions !== null && requestIsRunning) {
                runningRequest(false)
            }
        }
    })

    return predictions || []
}


export function useStress(startDate) {
    let dispatch = useDispatch()
    let stress = useSelector(s => s.stress)
    let [requestIsRunning, runningRequest] = useState(false)

    useEffect(() => {
        if(typeof window !== 'undefined') {
            if(stress === null && !requestIsRunning) {
                dispatch(loadStress(startDate))
                runningRequest(true)
            } else if(stress !== null && requestIsRunning) {
                runningRequest(false)
            }
        }
    })

    return stress || []
}

export function usePhotos(startDate) {
    let dispatch = useDispatch()
    let photos = useSelector(s => s.photos)
    let [requestIsRunning, runningRequest] = useState(false)

    useEffect(() => {
        if(typeof window !== 'undefined') {
            if(photos === null && !requestIsRunning) {
                dispatch(loadPhotos(startDate))
                runningRequest(true)
            } else if(photos !== null && requestIsRunning) {
                runningRequest(false)
            }
        }
    })

    return photos || []
}

export function useUser() {
    let dispatch = useDispatch()
    let user = useSelector(s => s.user)
    let [requestIsRunning, runningRequest] = useState(false)

    useEffect(() => {
        if(typeof window !== 'undefined') {
            if(user === null && !requestIsRunning) {
                dispatch(authenticateUser())
                
                runningRequest(true)
            } else if(user !== null && requestIsRunning) {
                runningRequest(false)
            }
        }
    })

    return user
}
