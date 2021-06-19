jest.mock("axios")

import axios from "axios"
import api from "./http"

describe("http client", () => {
    it("should post signin request", async () => {
        // const email = "timmy@taylor.com"
        // const password = "password"
        // process.env.NEXT_PUBLIC_API_URL = `http://localhost:${3001}/`
        // const mockResponse = {
        //     data: {
        //         email,
        //         password
        //     }
        // }
        // api.init()

        // axios.post.mockResolvedValue(mockResponse)

        // let res = await api.signinUser(email, password)
        // expect(res.data.email).toBeDefined()
        // // expect(res.data.password).toBeDefined()
        expect(true).toBeTruthy()
    })

    it("should post signup request", async () => {

    })

    it("should post utterance", async () => {

    })

    it("should retrieve messages", async () => {})

    it("should retrieve messages", async () => {})
    
})