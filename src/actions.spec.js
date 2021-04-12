import {
    utterMessage,
    addMessage
} from "./actions.js"


describe("action creators", () => {
    
    it("should create UTTER_MESSAGE action", () => {
        // arrange
        const message = "Hello World"

        // act
        const action = utterMessage(messsage)

        // assert
        expect(action)
        .toEqual({
            type: "UTTER_MESSAGE",
            payload: {
                message,
                sender: "user"
            }        
        })
    })

    it("should create ADD_MESSAGE action", () => {
        const message = "Hello World"
        const sender = "user"
        const timestamp = new Date().valueOf()

        const action = addMessage(message, sender, timestamp)

        expect(action)
        .toEqual({
            type: "ADD_MESSAGE",
            payload: {
                message,
                sender,
                timestamp
            }
        })
    })
})
