import reducer from "./reducers"

describe("redux reducer", () => {
    
    it("should default to initial state", () => {
        const action = { type: "" }
        const intialState = { messages: [] }
        
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
        const initialState = { messages: [] }
        
        const state = reducer(initialState, action)

        expect(state.messages).toContainEqual(message)
    })

})
