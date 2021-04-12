import { call, fork, put, take, takeEvery, takeLatest } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'

import {
    setAuthToken,
    addMessage,
    setUser
} from './actions'

import createIOClient from './api/io'
import createHTTPClient from './api/http'
let httpClient
let dataSocket
let messageSocket

function messageReceiver() {
    return eventChannel(emitter => {
        if (!messageSocket) {
            // throw error
            emitter(END)
            return () => {}
        }
        messageSocket.on("ADD_MESSAGE", message => {
            emitter(message)  
        })
    
        return () => {
            messageSocket.close()
        }
    })
}

function* sendMessage(action) {
    if(!messageSocket) {
        // throw error
        return
    }
    
    const message = yield call(messageSocket.emit, "ADD_MESSAGE", {
        text: action.payload.text
    })
    yield put(addMessage(message.text, "user", message.timestamp))
    
}

function* receiveMessages() {
    const channel = yield call(messageReceiver)
    try {
        while(true) {
            let message = yield take(channel)
            yield put(addMessage(message.text, message.sender, message.timestamp))
        }
    } finally {
        
    }
}

function dataReceiver() {
    return eventChannel(emitter => {
        
        if(!dataSocket) {
            emitter(END)
        }
    })
}

function* sendData() {}

function* receiveData() {
    const channel = yield call(dataReceiver)
    try {
        while(true) {
            let data = yield take(channel)
        }
    } finally {
    }
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
        httpClient = createHTTPClient(action.payload.bearer)
        // dataSocket = yield call(createIOClient, "/data", action.payload.bearer)
        // messageSocket = yield call(createIOClient, "/chat", action.payload.bearer)
        
        const { data } = yield call(
            httpClient.get,
            "http://localhost:8089/user/"
        )
        yield put(setUser(data))
    }
}


function* signinUser(action) {
    // use of anonymous client for sign in
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
    } else {
        console.warn("Sign in failed")
    }
}


function* signupUser(action) {
    const {
        firstname,
        surname,
        email,
        password,
        birthDate,
        weight,
        height
    } = action.payload
    const anonymousClient = createHTTPClient(null)
    const { data } = yield call(
        anonymousClient.post,
        "/signup",
        {
            firstname,
            surname,
            email,
            password,
            birthDate,
            weight,
            height  
        }
    )
    if(data.bearer) {
        yield put(setAuthToken(data.bearer))
    } else {
        console.warn("Sign up faild")
    }
}

export default function* root() {
    yield takeLatest("SET_AUTH_TOKEN", saveAuthToken)
    yield takeLatest("SIGNIN_USER", signinUser)
    yield takeLatest("SIGNUP_USER", signupUser)
    yield takeLatest("ASSIGN_USER", getAuthToken)
    
    yield takeEvery("SEND_MESSAGE", sendMessage)

    yield fork(receiveMessages)
}

