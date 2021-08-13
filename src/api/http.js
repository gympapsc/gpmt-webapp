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
    
    utterMessage: text => client.post("/conversation/utter", { text }),

    getNutrition: () => client.get("/nutrition"),
    getMessages: () => client.get("/conversation"),
    getMicturition: () => client.get("/micturition"),
    getMicturitionPrediction: () => client.get("/micturition/predictions"),
    getDrinking: () => client.get("/drinking"),
    getStress: () => client.get("/stress"),
    getPhotos: () => client.get("/photo"),
    getUserInfo: () => client.get("/user"),
    getSpeechToken: () => client.get("/speech/token"),
    getMedication: () => client.get("/medication"),
    
    updateMicturition: update => client.put(`/micturition/${update._id}`, update),
    updateDrinking: update => client.put(`/drinking/${update._id}`, update),
    updateStress: update => client.put(`/stress/${update._id}`, update),
    updateNutrition: update => client.put(`/nutrition/${update._id}`, update),
    updateMedication: update => client.put(`/medication/${update._id}`, update),
    updateUser: update => client.put("/user", update),


    deleteMicturition: _id => client.delete(`/micturition/${_id}`),
    deleteDrinking: _id => client.delete(`/drinking/${_id}`),
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