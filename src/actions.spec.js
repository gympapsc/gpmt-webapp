import {
    utterMessage,
    addMessage,
    assignUser,
    signinUser,
    signupUser
} from "./actions.js"


describe("action creators", () => {
    
    it("should create UTTER_MESSAGE action", () => {
        const text = "Hello World"

        const action = utterMessage(text)

        expect(action)
            .toEqual({
                type: "UTTER_MESSAGE",
                payload: {
                    sender: "user",
                    text
                }        
            })
    })

    it("should create ADD_MESSAGE action", () => {
        const text = "Hello World"
        const sender = "user"
        const timestamp = new Date().valueOf()

        const action = addMessage(text, sender, timestamp)

        expect(action)
            .toEqual({
                type: "ADD_MESSAGE",
                payload: {
                    text,
                    sender,
                    timestamp
                }
            })
    })

    it("should create ASSIGN_USER", () => {
        const action = assignUser()

        expect(action)
            .toEqual({
                type: "ASSIGN_USER"
            })
    })

    it("should create SIGNIN_USER", () => {
        const email = "timmy@taylor.com"
        const password = "password"
        const action = signinUser(email, password)

        expect(action)
            .toEqual({
                type: "SIGNIN_USER",
                payload: {
                    email,
                    password
                }
            })
    })

    it("should create SIGNUP_USER", () => {
        const user = {
            firstname: "timmy",
            surname: "taylor",
            email: "timmy@taylor",
            password: "password",
            weight: 80,
            height: 180,
            birthDate: new Date()
        }
        const action = signupUser(user)

        expect(action)
            .toEqual({
                type: "SIGNUP_USER",
                payload: user
            })
    })
})
