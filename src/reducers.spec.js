import reducer from "./reducers"

describe("redux reducer", () => {
    
    it("should default to initial state", () => {
        const action = { type: "" }
        const initialState = { messages: [] }
        
        const state = reducer(initialState, action)

        expect(state).toEqual(initialState)
    })

    it("should add message on ADD_MESSAGE action", () => {
        const message = {
            message: "Hello World",
            sender: "user",
            timestamp: new Date().valueOf()
        }
        const action = {
            type: "ADD_MESSAGE",
            payload: message
        }
        const initialState = { messages: [], user: {} }
        
        const state = reducer(initialState, action)

        expect(state.messages).toContainEqual(message)
    })

    it("should set messages on SET_MESSAGES", () => {
        const messages = [
            {
                message: "Hello World",
                sender: "user",
                timestamp: new Date().valueOf()
            }
        ]
        const action = {
            type: "SET_MESSAGES",
            payload: {
                messages
            }
        }
        const initialState = { messages: [], user: {} }
        
        const state = reducer(initialState, action)

        expect(state.messages).toEqual(messages)
    })

    it("should set no messages on empty set", () => {
        const messages = []
        const action = {
            type: "SET_MESSAGES",
            payload: {
                messages
            }
        }
        const initialState = { messages: [], user: {} }
        
        const state = reducer(initialState, action)

        expect(state.messages).toEqual(messages)
    })

    it("should set auth token on SET_AUTH_TOKEN", () => {
        const auth_token = "abcdefghijklmnopqrstuvwxyz"
        const action = {
            type: "SET_AUTH_TOKEN",
            payload: {
                bearer: auth_token
            }
        }
        const initialState = { messages: [], user: {}}

        const state = reducer(initialState, action)

        expect(state.bearer).toEqual(auth_token)
    })

    it("should set user on SET_USER", () => {
        const user = {
            email: "timmy@taylor.com",
            password: "password",
            firstname: "timmy",
            surname: "taylor",
            sex: "m",
            height: 180,
            weight: 80,
            _id: "123456789"
        }
        const action = {
            type: "SET_USER",
            payload: {
                user
            }
        }
        const initialState = { messages: [], user: {}}

        const state = reducer(initialState, action)

        expect(state.user).toEqual(user)
        expect(state).toEqual({
            messages: [],
            user
        })
    })

})
