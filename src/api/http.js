import axios from "axios"


export default function createRestClient(authToken) {
    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: {
            "Authorization": `Bearer ${authToken}`
        },
//        transfromRequest: (data, headers) => {
//            return data
//      },
//      transformResponse: (data, headers) => {
//          return data
//      },
        
    })
}
