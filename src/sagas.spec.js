jest.mock("./api/io")
jest.mock("./api/http")
jest.mock("./utils")

import { call, put, take, apply } from "redux-saga/effects"
import { END } from "redux-saga"
import { expectSaga } from 'redux-saga-test-plan'

import io from "./api/io"
import api from "./api/http"

import { 
    setAuthToken,
    setMessages,
    setUser,
    addMessage
} from './actions'


import {
    signinUser,
    signupUser,
    receive,
    receiver,
    saveAuthToken,
    getAuthToken,
    signoutUser,
    getMessages,
    sendMessage
} from './sagas'

import { redirect } from "./utils"


describe("receiver saga", () => {

    it("receive should dispatch message", () => {
        const message = {
            text: "Hello",
            sender: "user",
            timestamp: new Date().valueOf()
        }

        io.active.mockImplementation(() => true)
        io.onMessage.mockImplementation(cb => cb(message))
        
        expectSaga(receive)
            .call(receiver)
            .take(receiver())
            .put({
                type: "ADD_MESSAGE",
                payload: message
            })
            .run()
    })
})

describe("message sagas", () => {

    it("sendMessage should send and put message", () => {
        let text = "Hello"
        let message = {
            text: "Hello",
            sender: "user",
            timestamp: new Date()
        }

        io.active.mockImplementation(() => true)
        expectSaga(sendMessage, { payload: { text }})
            .provide([
                [call(io.addMessage, text), message]
            ])
            .put(addMessage(message.text, message.sender, message.timestamp))
            .run()
    })

    it("getMessages should load messages", () => {
        let startDate = new Date()
        let messages = [
            {
                text: "Hello",
                sender: "user",
                timestamp: startDate.valueOf()
            }
        ]
        
        io.active.mockImplementation(() => true)
        expectSaga(getMessages, { payload: { startDate }})
            .provide([
                [call(io.getMessages, startDate), messages]
            ])
            .put(setMessages(messages))
            .run()
    })
})

describe("authentication sagas", () => {

    afterEach(() => {
        redirect.mockClear()
    })

    it("getAuthToken sould load stored auth token", () => {
        let auth_token = "abcdefghijklmnopqrstuvwxyz"
        expectSaga(getAuthToken)
            .provide([
                [apply(localStorage, localStorage.getItem, ['auth_token']), auth_token]
            ])
            .put(setAuthToken(auth_token))
            .run()
    })

    it("getAuthToken should redirect unauthenticated user", () => {
        expectSaga(getAuthToken, redirect)
            .provide([
                [apply(localStorage, localStorage.getItem, ['auth_token']), null],
                [call(redirect, '/signin'), null]
            ])
            .run()
        expect(redirect).toHaveBeenCalledTimes(1)
        expect(redirect).toBeCalledWith('/signin')
    })

    it("saveAuthToken should store auth token and load user data", () => {
        let user = {
            email: "timmy@taylor.com",
            password: "password",
            firstname: "timmy",
            surname: "taylor",
            sex: "m",
            height: 180,
            weight: 80
        }
        let auth_token = "abcdefghijklmnopqrstuvwxyz"

        expectSaga(saveAuthToken, { payload: { bearer: auth_token }})
            .provide([
                [call(io.getUserInfo), user]
            ])
            .put(setUser(user))
            .run()
    })

    it("signinUser should retrieve and set auth token",() => {

        let credentials = {
            email: "timmy@taylor.com",
            password: "password"
        }
        let auth_token = "abcdefghijklmnopqrstuvwxyz"

        expectSaga(signinUser, { payload: credentials })
            .provide([
                [call(api.signinUser, credentials.email, credentials.password), {data: {bearer: auth_token}}]
            ])
            .put(setAuthToken(auth_token))
            .run()
    })

    it("signupUser should post user to web api",() => {
        let user = {
            email: "timmy@taylor.com",
            password: "password",
            firstname: "timmy",
            surname: "taylor",
            sex: "m",
            height: 180,
            weight: 80
        }
        let auth_token = "abcdefghijklmnopqrstuvwxyz"

        expectSaga(signupUser, { payload: user })
            .provide([
                [call(api.signupUser, user), {data: {bearer: auth_token}}]
            ])
            .put(setAuthToken(auth_token))
            .run()
    })

    it("signoutUser should call localStorage and redirect", () => {
        expectSaga(signoutUser)
            .apply(localStorage, localStorage.removeItem, ["auth_token"])
            .run()
        expect(redirect).toHaveBeenCalledTimes(1)
        expect(redirect).toBeCalledWith('/signin')
    })
})