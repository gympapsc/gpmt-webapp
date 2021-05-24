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

export const addMicturition = (date, timestamp) => ({
    type: "ADD_MICTURITION",
    payload: {
        date,
        timestamp
    }
})

export const addDrinking = (date, timestamp, amount) => ({
    type: "ADD_DRINKING",
    payload: {
        date,
        timestamp,
        amount
    }
})

export const setMessages = messages => ({
    type: "SET_MESSAGES",
    payload: {
        messages
    }
})

export const setMicturition = entries => ({
    type: "SET_MICTURITION",
    payload: {
        entries
    }
})

export const setDrinking = entries => ({
    type: "SET_DRINKING",
    payload: {
        entries
    }
})

export const setMicturitionPrediction = (predictions) => ({
    type: "SET_MICTURITION_PREDICTION",
    payload: {
        predictions
    }
})

export const getMessages = (startDate) => ({
    type: "GET_MESSAGES",
    payload: {
        startDate
    }
})

export const getMicturition = startDate => ({
    type: "GET_MICTURITION",
    payload: {
        startDate
    }
})

export const getDrinking = startDate => ({
    type: "GET_DRINKING",
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

export const uploadPhoto = formData => ({
    type: "UPLOAD_FORM_DATA",
    payload: {
        formData
    }
})

export const addPhoto = (timestamp, url, name) => ({
    type: "ADD_PHOTO",
    payload: {
        timestamp,
        url,
        name
    }
})

export const getPhotos = (startDate) => ({
    type: "GET_PHOTOS",
    payload: {
        startDate
    }
})

export const setPhotos = (photos) => ({
    type: "SET_PHOTOS",
    payload: {
        photos
    }
})