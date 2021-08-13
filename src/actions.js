import { redirect, tts, createSpeechConfig } from "./utils"
import * as d3 from "d3"

export const signupUser = ({
    firstname, 
    surname,
    email,
    password,
    weight,
    height,
    birthDate,
    sex
}) => async (dispatch, getState, { api }) => {
    await api.init()
    let { data: {ok} } = await api.signupUser({
        firstname,
        surname,
        email,
        password,
        weight,
        height,
        birthDate,
        sex
    })

    
    if(ok) {
        redirect("/setup/about")
    } else {
        dispatch({ type: "SIGNUP_FAILED" })
    }
}

export const signinUser = (
    email,
    password
) => async (dispatch, getState, { api }) => {
    try {
        api.init()
        let { data: { ok, err }} = await api.signinUser(
            email,
            password
        )

        if(err) {
            dispatch({ type: "SIGNIN_FAILED"})
        } else if(ok) {
            redirect("/app")
        }

    } catch {
        dispatch({type: "SIGNIN_FAILED"})
    }
}

export const signoutUser = () => (dispatch, getState) => {
    if(typeof window !== "undefined") {
        redirect("/signin")
    }
}

export const authenticateUser = () => async (dispatch, getState, { api }) => {
    if(typeof window !== undefined) {
        api.init()
        try {
            let { data: {user} } = await api.getUserInfo()

            if(!user) {
                return redirect("/signin")
            }

            user = {
                ...user,
                birthDate: new Date(user.birthDate),
                timestamp: new Date(user.timestamp).valueOf()
            }

            dispatch(setUser(user))
        } catch {
            return redirect("/signin")
        }
        
    }
}

export const utterMessage = (text) =>  async (dispatch, getState, { api }) => {
    let { data: { buttons, events, micturitionPrediction, micturitionFrequency }} = await api.utterMessage(text)
    await processEvents(events, dispatch, getState)
    dispatch(setUtterButtons(buttons))
    micturitionPrediction = micturitionPrediction.map(e => ({
        ...e,
        date: new Date(e.date),
        timestamp: new Date(e.timestamp).valueOf()
    }))
    dispatch(setMicturitionPredictions(micturitionPrediction))
    let user = getState().user
    dispatch(setUser({ ...user, micturitionFrequency }))
}



const processEvents = async (events, dispatch, getState) => {
    let state = getState()
    let config = createSpeechConfig(state.speech.token, state.speech.region)
    let entries
    for(let event of events) {
        if(event.text) {
            dispatch(addMessage(event.text, event.sender, new Date(event.timestamp).valueOf()))
            if(event.sender !== "user" && state.user.settings.voiceOutput) {
                await tts(event.text, config)
            }

        } else if(event.type) {
            switch(event.type) {
                case "ADD_MICTURITION":
                    dispatch(addMicturition(new Date(event.date), new Date(event.timestamp).valueOf(), event._id))
                    entries = getState().micturition
                    dispatch(setMicturitionFrequency(avgMicturitionFrequency(entries)))
                    break
                case "ADD_STRESS":
                    dispatch(addStress(new Date(event.date), new Date(event.timestamp).valueOf(), event.level, event._id))
                    break
                case "ADD_DRINKING":
                    dispatch(addDrinking(new Date(event.date), new Date(event.timestamp).valueOf(), event.amount, event._id))
                    entries = getState().drinking
                    dispatch(setAvgDrinkingAmount(avgDrinkingAmount(entries)))
                    break
                case "SIGNOUT_USER":
                    setTimeout(() => {
                        dispatch(signoutUser())
                    }, 500)
                    break
            }
        }
    }
}

/*
    Add Data
*/

export const addMessage = (text, sender, timestamp) => ({
    type: "ADD_MESSAGE",
    payload: {
        sender,
        text,
        timestamp
    }
})

export const addMicturition = (date, timestamp, _id) => ({
    type: "ADD_MICTURITION",
    payload: {
        date,
        timestamp,
        _id
    }
})

export const addStress = (date, timestamp, level, _id) => ({
    type: "ADD_STRESS",
    payload: {
        date,
        timestamp,
        level,
        _id
    }
})

export const addDrinking = (date, timestamp, amount, _id) => ({
    type: "ADD_DRINKING",
    payload: {
        date,
        timestamp,
        amount,
        _id
    }
})

export const addPhoto = (timestamp, id, name, url) => ({
    type: "ADD_PHOTO",
    payload: {
        timestamp,
        id,
        name,
        url
    }
})

/*
    Set Data
*/

export const setMessages = messages => ({
    type: "SET_MESSAGES",
    payload: {
        messages
    }
})

export const setMicturition = entries => ({
    type: "SET_MICTURITION",
    payload: {
        entries
    }
})

export const setDrinking = entries => ({
    type: "SET_DRINKING",
    payload: {
        entries
    }
})

export const setMicturitionPredictions = (predictions) => ({
    type: "SET_MICTURITION_PREDICTIONS",
    payload: {
        predictions
    }
})

export const setUser = (user) => ({
    type: "SET_USER",
    payload: {
        user
    }
})

export const setPhotos = (photos) => ({
    type: "SET_PHOTOS",
    payload: {
        photos
    }
})

export const setStress = (entries) => ({
    type: "SET_STRESS",
    payload: {
        entries
    }
})

export const setUtterButtons = buttons => ({
    type: "SET_UTTER_BUTTONS",
    payload: {
        buttons
    }
})

export const setSpeechToken = (token, region) => ({
    type: "SET_SPEECH_TOKEN",
    payload: {
        token,
        region
    }
})

export const setAvgDrinkingAmount = (amount) => ({
    type: "SET_AVG_DRINKING_AMOUNT",
    payload: {
        avgDrinkingAmount: amount
    }
})

export const setMicturitionFrequency = (frequency) => ({
    type: "SET_MICTURITION_FREQUENCY",
    payload: {
        micturitionFrequency: frequency
    }
})

/*
    Load Data
*/

export const loadMessages = (startDate) => async (dispatch, getState, { api }) => {
    if(!api._pending["messages"]) {
        api._pending["messages"] = true
        let { data: { messages }} = await api.getMessages(startDate)
        messages = messages.map(e => ({
            ...e,
            timestamp: new Date(e.timestamp).valueOf()
        }))
        api._pending["messages"] = false
        dispatch(setMessages(messages))
    }
}

export const loadMicturition = startDate => async (dispatch, getState, { api }) => {
    if(!api._pending["micturition"]) {
        api._pending["micturition"] = true
        let { data: { entries }} = await api.getMicturition(startDate)
        entries = entries.map(e => ({
            ...e,
            date: new Date(e.date),
            timestamp: new Date(e.timestamp).valueOf()
        }))
        dispatch(setMicturition(entries))
        dispatch(setMicturitionFrequency(avgMicturitionFrequency(entries)))
        api._pending["micturition"] = false
    }
}

export const loadMicturitionPredictions = startDate => async (dispatch, getState, { api }) => {
    if(!api._pending["micturitionPrediction"]) {
        api._pending["micturitionPrediction"] = true
        let { data: { predictions }} = await api.getMicturitionPrediction(startDate)
        predictions = predictions.map(e => ({
            ...e,
            date: new Date(e.date),
            timestamp: new Date(e.timestamp).valueOf()
        }))
        api._pending["micturitionPrediction"] = false
        dispatch(setMicturitionPredictions(predictions))
    }
}

export const loadDrinking = startDate => async (dispatch, getState, { api }) => {
    if(!api._pending["drinking"]) {
        api._pending["drinking"] = true
        let { data: { entries }} = await api.getDrinking(startDate)
        entries = entries.map(e => ({
            ...e,
            date: new Date(e.date),
            timestamp: new Date(e.timestamp).valueOf()
        }))
        dispatch(setDrinking(entries))
        dispatch(setAvgDrinkingAmount(avgDrinkingAmount(entries)))
        api._pending["drinking"] = false
    }
}

export const loadStress = startDate => async (dispatch, getState, { api }) => {
    if(!api._pending["stress"]) {
        api._pending["stress"] = true
        let { data: { entries }} = await api.getStress(startDate)
        entries = entries.map(e => ({
            ...e,
            date: new Date(e.date),
            // TODO Fix missing timestamp
            timestamp: new Date(e.timestamp).valueOf()
        }))
        dispatch(setStress(entries))
        api._pending["stress"] = false
    }
}

export const loadPhotos = (startDate) => async (dispatch, getState, { api }) => {
    if(typeof window !== "undefined" && !api._pending["photos"]) {
        api._pending["photos"] = true
        const { data: { photos } } = await api.getPhotos(startDate)

        if(photos) {
            for(let i = 0; i < photos.length; i++) {
                photos[i].url = `${process.env.NEXT_PUBLIC_API_URL}/photo/${photos[i]._id}`
                photos[i].date = new Date(photos[i].date)
                photos[i].timestamp = new Date(photos[i].timestamp)
            }
            dispatch(setPhotos(photos))
        }
        api._pending["photos"] = false
    }
}

/*
    Update Data
*/

export const updateDrinking = d => async (dispatch, getState, { api }) => {
    let {data: { ok }} = await api.updateDrinking(d)

    if(ok) {
        dispatch({
            type: "UPDATE_DRINKING",
            payload: d
        })
    }
}

export const updateMicturition = m => async (dispatch, getState, { api }) => {
    let { data: { ok }} = await api.updateMicturition(m)

    if(ok) {
        dispatch({
            type: "UPDATE_MICTURITION",
            payload: m
        })
    }
}

export const updateStress = s => async (dispatch, getState, { api }) => {
    let { data: { ok }} = await api.updateStress(s)

    if(ok) {
        dispatch({
            type: "UPDATE_STRESS",
            payload: s
        })
    }
}

export const updateUser = u => async (dispatch, getState, { api }) => {
    let { data: { ok}} = await api.updateUser(u)

    if(ok) {
        dispatch({
            type: "UPDATE_USER",
            payload: u
        })
    }
}

/*
    Delete Data
*/

export const deleteDrinking = (_id) => async (dispatch, getState, { api }) => {
    await api.deleteDrinking(_id)

    dispatch({
        type: "DELETE_DRINKING",
        payload: {
            _id
        }
    })
}

export const deleteMicturition = (_id) => async (dispatch, getState, { api }) => {
    await api.deleteMicturition(_id)

    dispatch({
        type: "DELETE_MICTURITION",
        payload: {
            _id
        }
    })
}

export const deleteStress = (_id) =>  async (dispatch, getState, { api }) => {
    await api.deleteStress(_id)

    dispatch({
        type: "DELETE_STRESS",
        payload: {
            _id
        }
    })
}

/*
    Utilities
*/

const avgDrinkingAmount = (entries) => {
    let now = d3.timeDay.ceil(new Date().valueOf())
    let endDate = d3.timeDay.floor(Math.min(...entries.map(e => e.date.valueOf())))

    return entries
        .reduce((a, b) => a + b.amount, 0) / ((now - endDate) / 24 / 3600 / 1000) / 1000
}

const avgMicturitionFrequency = (entries) => {
    let now = d3.timeDay.ceil(new Date())
    let endDate = d3.timeDay.floor(Math.min(...entries.map(e => e.date.valueOf())))

    return entries
        .reduce((a, b) => 1 + a, 0) / ((now - endDate) / 24 / 3600 / 1000)
}