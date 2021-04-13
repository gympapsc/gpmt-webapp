export const utterMessage = (text) => ({
    type: "UTTER_MESSAGE",
    payload: {
        sender: "user",
        text
    }
})

export const addMessage = (text, sender, timestamp) => ({
    type: "ADD_MESSAGE",
    payload: {
        sender,
        text,
        timestamp
    }
})

export const addMessages = messages => ({
    type: "ADD_MESSAGES",
    payload: {
        messages
    }
})

export const loadMessages = (startDate) => ({
    type: "LOAD_MESSAGES",
    payload: {
        startDate
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

