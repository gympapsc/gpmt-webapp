import { io } from "socket.io-client"

let socket

const api = {
    init: (authToken, options={}) => {
        return new Promise((res, rej) => {
            let s;
            if (authToken) {
                s = io(process.env.NEXT_PUBLIC_API_URL, {
                    auth: {
                        bearer: authToken
                    },
                    reconnectionDelayMax: 10000,
                    ...options
                })
                s.on("test", () => {
                    console.log("test ", s.connected)
                })
            } else {
                s = io(process.env.NEXT_PUBLIC_API_URL, {
                    reconnectionDelayMax: 10000,
                    ...options
                })
            }

            s.on("connect", () => {
                console.log("connected!!!")
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
        if(socket) return socket.emitAsync("GET_MESSAGES", { startDate })
    },
    getMicturition: startDate => {
        if(socket) return socket.emitAsync("GET_MICTURITION", {startDate})
    },
    getDrinking: startDate => {
        if(socket) return socket.emitAsync("GET_DRINKING", { startDate })
    },
    onMessage: cb => {
        if(socket) {
            socket.on("ADD_MESSAGE", cb)
        }
    },
    onMicturition: cb => socket.on("ADD_MICTURITION", cb),
    onDrinking: cb => socket.on("ADD_DRINKING", cb),
    getUserInfo: () => {
        if (socket) return socket.emitAsync("GET_USER_INFO")
    },
    updateUser: (user) => {
        if(socket) return socket.emitAsync("UPDATE_USER", user)
    },
    updatePassword: password => {
        if(socket) return socket.emitAsync("UPDATE_PASSWORD", password)
    },
    sendAsync: (event, ...args) => {
        if (socket) return socket.emitAsync(event, ...args)
    }
}

export default api