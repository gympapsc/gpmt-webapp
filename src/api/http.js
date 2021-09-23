import axios from "axios"

let client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true
})

const api = {
    init: () => {
        client = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL,
            withCredentials: true
        })
    },
    info: () => client.get("/"),
    signinUser: (email, password) => client.post("/signin", { email, password }),
    signupUser: (user) => client.post("/signup", { user }),

    startConversation: () => client.post("/conversation/bonjour"),
    utterMessage: text => client.post("/conversation/utter", { text }),

    getNutrition: () => client.get("/nutrition")
        .then(res => res.data.entries.map(e => ({
            ...e,
            date: new Date(e.date),
            timestamp: new Date(e.timestamp).valueOf()
        }))),
    getMessages: () => client.get("/conversation")
        .then(res => res.data.messages.map(e => ({
            ...e,
            timestamp: new Date(e.timestamp).valueOf()
        }))),
    getMicturition: () => client.get("/micturition")
        .then(res => res.data.entries.map(e => ({
            ...e,
            date: new Date(e.date),
            timestamp: new Date(e.timestamp).valueOf()
        }))),
    getMicturitionPrediction: () => client.get("/micturition/forecast")
        .then(res => res.data.forecast.map(e => ({
            ...e,
            date: new Date(e.date),
            timestamp: new Date(e.timestamp).valueOf()
        }))),
    getHydration: () => client.get("/hydration")
        .then(res => res.data.entries.map(e => ({
            ...e,
            date: new Date(e.date),
            timestamp: new Date(e.timestamp).valueOf()
        }))),
    getStress: () => client.get("/stress")
        .then(res => res.data.entries.map(e => ({
            ...e,
            date: new Date(e.date),
            timestamp: new Date(e.timestamp).valueOf()
        }))),
    getPhotos: () => client.get("/photo"),
    getUserInfo: () => client.get("/user"),
    getSpeechToken: () => client.get("/speech/token"),
    getMedication: () => client.get("/medication")
        .then(res => res.data.entries.map(e => ({
            ...e,
            date: new Date(e.date),
            timestamp: new Date(e.timestamp).valueOf()
        }))),
    
    updateMicturition: update => client.put(`/micturition/${update._id}`, update),
    updateHydration: update => client.put(`/hydration/${update._id}`, update),
    updateStress: update => client.put(`/stress/${update._id}`, update),
    updateNutrition: update => client.put(`/nutrition/${update._id}`, update),
    updateMedication: update => client.put(`/medication/${update._id}`, update),
    updateUser: update => client.put("/user", update),


    deleteMicturition: _id => client.delete(`/micturition/${_id}`),
    deleteHydration: _id => client.delete(`/hydration/${_id}`),
    deleteStress: _id => client.delete(`/stress/${_id}`),
    deleteNutrition: _id => client.delete(`/nutrition/${_id}`),
    deleteMedication: _id => client.delete(`/medication/${_id}`),

    uploadPhoto: formData => client.post("/photo", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }),
    isEmailUnique: email => client.get(`/email/checkUnique/${btoa(email)}`),
    _pending: []
}

export default api