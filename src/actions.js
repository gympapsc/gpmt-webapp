import { redirect } from "./utils"

export const signupUser = ({
    firstname, 
    surname,
    email,
    password,
    weight,
    height,
    birthDate
}) => async (dispatch, getState, { api, io }) => {
    await api.init()
    let {data: {bearer}} = await api.signupUser({
        firstname,
        surname,
        email,
        password,
        weight,
        height,
        birthDate
    })
    
    console.log(bearer)

    if(bearer) {
        localStorage.setItem("auth_token", bearer)
        redirect("/setup/about")
    } else {
        console.warn("Sign up failed")
    }
}

export const signinUser = (
    email,
    password
) => async (dispatch, getState, { api, io }) => {
    await api.init()
    let { data: { bearer }, err } = await api.signinUser(
        email,
        password
    )

    if(err) {
        dispatch({ type: "SIGNIN_FAILED"})
    } else if(bearer) {
        localStorage.setItem("auth_token", bearer)
        redirect("/app")
    }
}

export const signoutUser = () => (dispatch, getState, { api, io }) => {
    if(typeof window !== "undefined") {
        loadStorage.removeItem("auth_token")

        redirect("/signin")
    }
}

export const authenticateUser = () => async (dispatch, getState, { api, io }) => {
    if(typeof window !== undefined) {
        let bearer = localStorage.getItem("auth_token")
        api.init(bearer)
        await io.init(bearer)

        let user = await io.getUserInfo()

        user = {
            ...user,
            birthDate: new Date(user.birthDate),
            timestamp: new Date(user.timestamp).valueOf()
        }

        dispatch(setUser(user))
        dispatch(openEventStream())
    }
}

export const openEventStream = () => (dispatch, getState, { api, io }) => {
    if(typeof window !== undefined) {
        if(io.connected()) {
            io.onMessage(m => dispatch(addMessage(m.text, m.sender, new Date(m.timestamp).valueOf())))
            io.onMicturition(m => dispatch(addMicturition(new Date(m.date), new Date(m.timestamp).valueOf(), m._id)))
            io.onDrinking(d => dispatch(addDrinking(new Date(d.date), new Date(d.timestamp).valueOf(), d.amount, d._id)))
            io.onStress(s => dispatch(addStress(new Date(s.date), new Date(s.timestamp).valueOf(), entry.level, entry._id)))
            io.onUpdateUser(u => dispatch(updateUser(u)))
        }
    }
}

export const utterMessage = (text) => {
    return (dispatch, getState, { api, io }) => {
        if(io.connected()) {
            return io.addMessage(text)
        }
    }
}

/*
    Add Data
*/

export const addMessage = (text, sender, timestamp) => ({
    type: "ADD_MESSAGE",
    payload: {
        sender,
        text,
        timestamp
    }
})

export const addMicturition = (date, timestamp, _id) => ({
    type: "ADD_MICTURITION",
    payload: {
        date,
        timestamp,
        _id
    }
})

export const addStress = (date, timestamp, level, _id) => ({
    type: "ADD_STRESS",
    payload: {
        date,
        timestamp,
        level,
        _id
    }
})

export const addDrinking = (date, timestamp, amount, _id) => ({
    type: "ADD_DRINKING",
    payload: {
        date,
        timestamp,
        amount,
        _id
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

/*
    Set Data
*/

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

export const setUser = (user) => ({
    type: "SET_USER",
    payload: {
        user
    }
})

export const setPhotos = (photos) => ({
    type: "SET_PHOTOS",
    payload: {
        photos
    }
})

export const setStress = (entries) => ({
    type: "SET_STRESS",
    payload: {
        entries
    }
})


/*
    Load Data
*/

export const loadMessages = (startDate) => async (dispatch, getState, { api, io }) => {
    if(io.connected()) {
        let m = await io.getMessages(startDate)
        m = m.map(e => ({
            ...e,
            timestamp: new Date(e.timestamp).valueOf()
        }))
        dispatch(setMessages(m))
    }
}

export const loadMicturition = startDate => async (dispatch, getState, { api, io }) => {
    if(io.connected()) {
        let m = await io.getMicturition(startDate)
        m = m.map(e => ({
            ...e,
            date: new Date(e.date),
            timestamp: new Date(e.timestamp).valueOf()
        }))
        dispatch(setMicturition(m))
    }
}

export const loadDrinking = startDate => async (dispatch, getState, { api, io }) => {
    if(io.connected()) {
        let m = await io.getDrinking(startDate)
        m = m.map(e => ({
            ...e,
            date: new Date(e.date),
            timestamp: new Date(e.timestamp).valueOf()
        }))
        dispatch(setDrinking(m))
    }
}

export const loadStress = startDate => async (dispatch, getState, { api, io }) => {
    if(io.connected()) {
        let s = await io.getStress(startDate)
        s = s.map(e => ({
            ...e,
            date: new Date(e.date),
            timestamp: new Date(e.timestamp).valueOf()
        }))
        dispatch(setStress(s))
    }
}

export const loadPhotos = (startDate) => async (dispatch, getState, { api, io }) => {
    if(typeof window !== "undefined") {
        const { data: { photos } } = await api.getPhotos(startDate)

        if(photos) {
            for(let i = 0; i < photos.length; i++) {
                photos[i].url = await api.downloadPhoto(photos[i]._id)
            }
            dispatch(setPhotos(photos))
        }
    }
}


/*
    Update Data
*/


export const updateDrinking = d => async (dispatch, getState, { api, io }) => {
    let { ok } = await io.updateDrinking(d)
}

export const updateMicturition = m => async (dispatch, getState, { api, io }) => {
    let { ok } = await io.updateMicturition(m)
}

export const updateStress = s => async (dispatch, getState, { api, io }) => {
    let { ok } = await io.updateStress(s)
}

export const updateUser = u => async (dispatch, getState, {api, io}) => {
    let { ok } = await io.updateUser(u)
}

/*
    Delete Data
*/

export const deleteDrinking = (_id) => async (dispatch, getState, {api, io}) => {
    await io.deleteDrinking(_id)

    dispatch({
        type: "DELETE_DRINKING",
        payload: {
            _id
        }
    })
}

export const deleteMicturition = (_id) => async (dispatch, getState, { api, io }) => {
    await io.deleteMicturition(_id)

    dispatch({
        type: "DELETE_MICTURITION",
        payload: {
            _id
        }
    })
}

export const deleteStress = (_id) =>  async (dispatch, getState, { api, io }) => {
    await io.deleteStress(_id)

    dispatch({
        type: "DELETE_STRESS",
        payload: {
            _id
        }
    })
}
