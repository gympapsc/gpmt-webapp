import { call, apply, fork, put, take, } from "redux-saga/effects"
import { eventChannel, END } from "redux-saga"

import {
    setAuthToken,
    addMessage,
    setMessages,
    setUser,
    setMicturition,
    setDrinking,
    addMicturition,
    addDrinking,
    setMicturitionPrediction,
    addPhoto,
    setPhotos
} from "./actions"

import {
    redirect
} from "./utils"

import io from "./api/io"
import api from "./api/http"
import { Router } from "next/router" 

export function receiver() {
    return eventChannel(emitter => {
        if (!io.active()) {
            emitter(END)
        }

        io.onMessage(message => {
            emitter(addMessage(message.text, message.sender, new Date(message.timestamp).valueOf()))
        })

        io.onMicturition(entry => {
            emitter(addMicturition(new Date(entry.date), new Date(entry.timestamp).valueOf()))
        })
    
        io.onDrinking(entry => {
            emitter(addDrinking(new Date(entry.date), new Date(entry.timestamp).valueOf(), entry.amount))
        })

        io.onUpdateUser(entry => {
            // update user
        })

        return () => {
            io.close()
        }
    })
}

export function* receive() {
    const channel = yield call(receiver)
    try {
        while(true) {
            let action = yield take(channel)
            yield put(action)
        }
    } finally {}
}

export function* sendMessage(action) {
    if(!io.active()) {
        return
    }
    const {ok} = yield call(
        io.addMessage,
        action.payload.text
    )
    // yield put(addMessage(message.text, "user", new Date(message.timestamp).valueOf()))   
}

export function* getMessages(action) {
    if(!io.active()) {
        return
    }

    let messages = yield call(
        io.getMessages,
        action.payload.startDate
    )
    messages = messages.map(e => ({
        ...e,
        timestamp: new Date(e.timestamp).valueOf()
    }))
    yield put(setMessages(messages))
}

export function* getDrinking(action) {
    if(!io.active()) {
        return
    }

    let entries = yield call(
        io.getDrinking,
        action.payload.startDate
    )
    entries = entries.map(e => ({
        ...e,
        timestamp: new Date(e.timestamp).valueOf(),
        date: new Date(e.date)
    }))
    yield put(setDrinking(entries))
}

export function* updateDrinking(action) {
    if(!io.active()) {
        return
    }

    // TODO check status
    yield call(
        io.updateDrinking,
        action.payload
    )
}

export function* getMicturition(action) {
    if(!io.active()) {
        return
    }

    let entries = yield call(
        io.getMicturition,
        action.payload.startDate
    )
    console.log(entries)
    entries = entries.map(e => ({
        ...e,
        timestamp: new Date(e.timestamp).valueOf(),
        date: new Date(e.date)
    }))
    yield put(setMicturition(entries))
}


export function* updateMicturition(action) {
    if(!io.active()) {
        return
    }

    // TODO check status
    yield call(
        io.updateMicturition,
        action.payload
    )
}

export function* getMicturitionPrediction(action) {
    if(!io.active()) {
        return
    }

    let predictions = yield call(
        io.getMicturitionPrediction,
        action.payload.startDate
    )
    predicitions = predictions.map(p => ({
        ...p,
        timestamp: new Date(p.timestamp).valueOf(),
        date: new Date(p.date),
        prediction: parseFloat(p.prediction)
    }))
    yield put(setMicturitionPrediction(predictions))
}

export function* getPhotos(action) {
    if(typeof window !== 'undefined') {
        const { data: { photos } } = yield call(
            api.getPhotos,
            action.startDate
        )
    
        if(photos) {
            for(let i = 0; i < photos.length; i++) {
                photos[i].url = yield call(
                    api.downloadPhoto,
                    photos[i]._id
                )
            }
            yield put(setPhotos(photos))
        }
    }
}

export function* downloadPhoto(action) {
    if(typeof window !== 'undefined') {
        photos[i].url = yield call(
            api.downloadPhoto,
            photos[i]._id
        )
    }
}


export function* getAuthToken() {
    if(typeof window !== "undefined") {
        const token = yield apply(localStorage, localStorage.getItem, ["auth_token"])
        if(token) {
            yield put(setAuthToken(token))
        } else {
            // redirect user to sign in page
            redirect("/signin")
        }
    }
}

export function* saveAuthToken(action) {
    if(typeof window !== "undefined") {
        yield apply(localStorage, localStorage.setItem, ["auth_token", action.payload.bearer])
        // create authorized client
        yield call(api.init, action.payload.bearer)
        yield call(io.init, action.payload.bearer)

        let user = yield call(io.getUserInfo)

        user = {
            ...user,
            brithDate: new Date(user.birthDate)
        }
        
        yield put(setUser(user))
        yield fork(receive)
    }
}

export function* signinUser(action) {
    // use anonymous client for sign in
    yield call(api.init) 
    const { data, err } = yield call(
        api.signinUser,
        action.payload.email,
        action.payload.password
    )
    if(err) {
        yield put({type: "SIGNIN_FAILED"})
    } else if(data.bearer) {
        yield put(setAuthToken(data.bearer))

        // redirect user to home page
        redirect("/app")
    } else {
        console.warn("Sign in failed")
    }
}

export function* signupUser(action) {
    yield call(api.init)
    const { data } = yield call(
        api.signupUser,
        action.payload
    )
    if(data.bearer) {
        yield put(setAuthToken(data.bearer))

        // redirect user to about
        redirect("/setup/about")
    } else {
        console.warn("Sign up failed")
    }
}

export function* signoutUser(action) {
    if(typeof window !== "undefined") {
        yield apply(localStorage, localStorage.removeItem, ["auth_token"])

        // redirect user to sign in page
        redirect("/signin")
    }
}

export function* updateUser(action) {
    let { ok } = yield call(
        io.updateUser,
        action.payload
    )
}

export function* updatePassword(action) {
    let user = yield call(
        io.updatePassword,
        action.payload
    )
}