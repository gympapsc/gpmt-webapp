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
    signupUser: (user) => client.post("/signup", { user })
}

export default api