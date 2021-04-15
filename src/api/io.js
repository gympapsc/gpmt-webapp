import { io } from "socket.io-client"

let socket

const api = {
    init: (authToken, options={}) => {
        let s;
        if (authToken) {
            s = io(process.env.NEXT_PUBLIC_API_URL, {
                auth: {
                    bearer: authToken
                },
                reconnectionDelayMax: 10000,
                ...options
            })
        } else {
            s = io(process.env.NEXT_PUBLIC_API_URL, {
                reconnectionDelayMax: 10000,
                ...options
            })
        }
        

        return new Promise((res, rej) => {
            s.on("connect", () => {
                s.emitAsync = (...args) => new Promise((res, rej) => {
                    s.emit(...args, response => res(response))
                })
    
                socket = s
                res()
            })
    
            s.on("connect_error", err => {
                rej(err)
            })
        })
    },
    active: () => typeof socket !== "undefined" && socket.connected,
    close: () => socket.close(),
    addMessage: text => {
        if(socket) {
            return socket.emitAsync("ADD_MESSAGE", {
                text
            })
        }
    },
    getMessages: startDate => {
        if(socket) {
            return socket.emitAsync("GET_MESSAGES", {
                startDate
            })
        } else {
            console.warn("getMessages was called, but socket is uninitialized")
        }
        
    },
    onMessage: cb => {
        if(socket) {
            socket.on("ADD_MESSAGE", cb)
        } else {
            console.warn("onMessage was called, but socket is uninitialized")
        }
    },
    getUserInfo: () => {
        if (socket) return socket.emitAsync("GET_USER_INFO")
    },
    sendAsync: (event, ...args) => {
        if (socket) return socket.emitAsync(event, ...args)
    }
}

export default api