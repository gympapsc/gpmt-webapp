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

export const setMessages = messages => ({
    type: "SET_MESSAGES",
    payload: {
        messages
    }
})

export const getMessages = (startDate) => ({
    type: "GET_MESSAGES",
    payload: {
        startDate
    }
})

export const assignUser = () => ({
    type: "ASSIGN_USER"
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

export const signoutUser = () => ({
    type: "SIGNOUT_USER"
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

export const updateEmail = (email) => ({
    type: "UPDATE_USER",
    payload: {
        email
    }
})

export const updateWeight = (weight) => ({
    type: "UPDATE_USER",
    payload: {
        weight
    }
})

export const updateHeight = (height) => ({
    type: "UPDATE_USER",
    payload: {
        height
    }
})

export const updatePassword = (password) => ({
    type: "UPDATE_PASSWORD",
    payload: password
})

export const updateBirthDate = (birthDate) => ({
    type: "UPDATE_USER",
    payload: {
        birthDate
    }
})