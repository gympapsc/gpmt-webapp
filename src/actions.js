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

export const updateUser = ({ firstname, surname, email, birthDate, weight, height}) => ({
    type: "UPDATE_USER",
    payload: {
        firstname,
        surname,
        birthDate,
        email,
        weight,
        height
    }
})

export const updateDrinking = ({_id, amount, date}) => ({
    type: "UPDATE_DRINKING",
    payload: {
        _id,
        amount,
        date
    }
})

export const updateMicturition = ({_id, date}) => ({
    type: "UPDATE_MICTURITION",
    payload: {
        _id,
        date
    }
})



export const uploadPhoto = formData => ({
    type: "UPLOAD_FORM_DATA",
    payload: {
        formData
    }
})

export const addPhoto = (timestamp, id, name, url) => ({
    type: "ADD_PHOTO",
    payload: {
        timestamp,
        id,
        name,
        url
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