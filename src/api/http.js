import axios from "axios"

let client

const api = {
    init: (authToken) => {
        client = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL,
            headers: {
                "Authorization": authToken ? `Bearer ${authToken}` : ""
            }
        })
    },
    signinUser: (email, password) => client.post("/signin", { email, password }),
    signupUser: (user) => client.post("/signup", { user }),
    uploadPhoto: formData => client.post("/photo", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }),
    getPhotos: startDate => client.get("/photo"),
    downloadPhoto: id => {
        return client.get(`/photo/${id}`, {
            responseType: "arraybuffer"
        })
            .then(response => Buffer.from(response.data, 'binary').toString('base64'))
            .then(url => `data:image/jpeg;base64, ${url}`)
    },
    isEmailUnique: email => client.get(`/email/checkUnique/${btoa(email)}`),
}

export default api