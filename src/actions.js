export const utterMessage = (message) => ({
    type: "UTTER_MESSAGE",
    payload: {
        sender: "user",
        message
    }
})

export const addMessage = (message, sender, timestamp) => ({
    type: "ADD_MESSAGE",
    payload: {
        sender,
        message,
        timestamp
    }
})

export const assignUser = () => ({
    type: "ASSIGN_USER",
    payload: {}
})

export const signupUser = ({
    firstname, 
    surname,
    email,
    password,
    weight,
    height,
    birthDate
}) => ({
    type: "SIGNUP_USER",
    payload: {
        firstname, 
        surname,
        email,
        password,
        weight,
        height,
        birthDate
    }
})

export const signinUser = (email, password) => ({
    type: "SIGNIN_USER",
    payload: {
        email,
        password
    }
})

export const setAuthToken = (bearer) => ({
    type: "SET_AUTH_TOKEN",
    payload: {
        bearer
    }
})

export const setUser = (user) => ({
    type: "SET_USER",
    payload: {
        user
    }
})

