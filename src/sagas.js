import { call, apply, fork, put, take, } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'

import {
    setAuthToken,
    addMessage,
    setMessages,
    setUser
} from './actions'

import {
    redirect
} from './utils'

import io from './api/io'
import api from './api/http'

export function receiver() {
    return eventChannel(emitter => {
        if (!io.active()) {
            // throw error
            emitter(END)
            return () => {}
        }

        
        io.onMessage(message => {
            emitter(addMessage(message.text, message.sender, message.timestamp))
        })
    
        // TODO add more socket listeners
        // stream events to redux store

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
    } finally {
        
    }
}

export function* sendMessage(action) {
    if(!io.active()) {
        // throw error
        return
    }
       
    const message = yield call(
        io.addMessage,
        action.payload.text
    )
    yield put(addMessage(message.text, "user", message.timestamp))    
}

export function* getMessages(action) {
    if(!io.active()) {
        return
    }

    const messages = yield call(
        io.getMessages,
        action.payload.startDate
    )
    yield put(setMessages(messages))
}

export function* getAuthToken() {
    if(typeof window !== 'undefined') {
        const token = yield apply(localStorage, localStorage.getItem, ['auth_token'])
        if(token) {
            yield put(setAuthToken(token))
        } else {
            // redirect user to sign in page
            redirect('/signin')
        }
    }
}

export function* saveAuthToken(action) {
    if(typeof window !== 'undefined') {
        yield apply(localStorage, localStorage.setItem, ['auth_token', action.payload.bearer])
        // create authorized client
        yield call(io.init, action.payload.bearer)

        let user = yield call(io.getUserInfo)
        yield put(setUser(user))
        yield fork(receive)
    }
}

export function* signinUser(action) {
    // use anonymous client for sign in
    yield call(api.init) 
    const { data } = yield call(
        api.signinUser,
        action.payload.email,
        action.payload.password
    )
    if(data.bearer) {
        yield put(setAuthToken(data.bearer))

        // redirect user to home page
        redirect('/app')
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

        // redirect user to home page
        redirect('/app')
    } else {
        console.warn("Sign up failed")
    }
}

export function* signoutUser(action) {
    if(typeof window !== 'undefined') {
        yield apply(localStorage, localStorage.removeItem, ["auth_token"])

        // redirect user to sign in page
        redirect('/signin')
    }
}