import { call, fork, put, take, takeEvery, takeLatest } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'

import {
    setAuthToken,
    addMessage,
    addMessages,
    setUser
} from './actions'

import createIOClient from './api/io'
import createHTTPClient from './api/http'
let httpClient
let socket

function receiver() {
    return eventChannel(emitter => {
        if (!socket) {
            // throw error
            emitter(END)
            return () => {}
        }

        socket.on("ADD_MESSAGE", message => {
            emitter(message)
        })
    
        return () => {
            messageSocket.close()
        }
    })
}

function* sendMessage(action) {
    if(!socket) {
        // throw error
        return
    }
       
    const message = yield call(socket.emitAsync, "ADD_MESSAGE", {
        text: action.payload.text
    })
    yield put(addMessage(message.text, "user", message.timestamp))    
}

function* receiveMessages() {
    const channel = yield call(receiver)
    try {
        while(true) {
            let message = yield take(channel)
            yield put(addMessage(message.text, message.sender, message.timestamp))
        }
    } finally {
        
    }
}

function* loadMessages(action) {
    if(!socket) {
        return
    }

    const messages = yield call(socket.emitAsync, "GET_MESSAGES", {
        startDate: action.payload.startDate
    })
    yield put(addMessages(messages))
}

function* getAuthToken(action) {
    if(typeof window !== 'undefined') {
        const token = localStorage.getItem('auth_token')
        if(token) {
            yield put(setAuthToken(token))         
        } else {
            // redirect user to sign in page
            let { protocol, host } = document.location
            document.location.assign(`${protocol}//${host}/signin`)
        }
    }
}

function* saveAuthToken(action) {
    if(typeof window !== 'undefined') {
        localStorage.setItem('auth_token', action.payload.bearer)
        // create authorized clients
        httpClient = httpClient || createHTTPClient(action.payload.bearer)
        if(!socket) {
            socket = yield call(createIOClient, "/", action.payload.bearer)
        }

        let user = yield call(socket.emitAsync, "GET_USER_INFO")
        yield put(setUser(user))
        yield fork(receiveMessages)
    }
}

function* signinUser(action) {
    // use anonymous client for sign in
    const anonymousClient = createHTTPClient(null)
    const { data } = yield call(
        anonymousClient.post, 
        "/signin",
        {
            email: action.payload.email,
            password: action.payload.password
        }
    )
    if(data.bearer) {
        yield put(setAuthToken(data.bearer))

        // redirect user to home page
        let { protocol, host } = document.location
        document.location.assign(`${protocol}//${host}/app`)


    } else {
        console.warn("Sign in failed")
    }
}

function* signupUser(action) {
    const anonymousClient = createHTTPClient(null)
    const { data } = yield call(
        anonymousClient.post,
        "/signup",
        action.payload
    )
    if(data.bearer) {
        yield put(setAuthToken(data.bearer))

        // redirect user to home page
        let { protocol, host } = document.location
        document.location.assign(`${protocol}//${host}/app`)
    } else {
        console.warn("Sign up failed")
    }
}

export default function* root() {
    yield takeLatest("SET_AUTH_TOKEN", saveAuthToken)
    yield takeLatest("SIGNIN_USER", signinUser)
    yield takeLatest("SIGNUP_USER", signupUser)
    yield takeLatest("ASSIGN_USER", getAuthToken)
    
    yield takeEvery("UTTER_MESSAGE", sendMessage)
    yield takeEvery("LOAD_MESSAGES", loadMessages)
}

