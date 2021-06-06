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
            } else {
                s = io(process.env.NEXT_PUBLIC_API_URL, {
                    reconnectionDelayMax: 10000,
                    ...options
                })
            }

            console.log("in call io init ", authToken)

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
    connected: () => typeof socket !== "undefined" && socket.connected,
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
        if(socket) return socket.emitAsync("GET_MICTURITION", { startDate })
    },
    getMicturitionPrediction: startDate => {
        if(socket) return socket.emitAsync("GET_MICTURITION_PREDICTION", { startDate })
    },
    getDrinking: startDate => {
        if(socket) return socket.emitAsync("GET_DRINKING", { startDate })
    },
    getStress: startDate => {
        if(socket) return socket.emitAsync("GET_STRESS", { startDate })
    },
    updateDrinking: drinkingUpdate => {
        if(socket) return socket.emitAsync("UPDATE_DRINKING", drinkingUpdate)
    },
    updateMicturition: micturitionUpdate => {
        if(socket) return socket.emitAsync("UPDATE_MICTURITION", micturitionUpdate)
    },
    updateStress: stressUpdate => {
        if(socket) return socket.emitAsync("UPDATE_STRESS", stressUpdate)
    },
    deleteDrinking: _id => socket.emitAsync("DELETE_DRINKING", { _id }),
    deleteMicturition: _id => socket.emitAsync("DELETE_MICTURITION", { _id }),
    deleteStress: _id => socket.emitAsync("DELETE_STRESS", { _id }),
    onMessage: cb => socket.on("ADD_MESSAGE", cb),
    onMicturition: cb => socket.on("ADD_MICTURITION", cb),
    onMicturitionPrediction: cb => socket.on("SET_MICTURITION_PREDICTION", cb),
    onUpdateUser: cb => socket.on("UPDATE_USER", cb),
    onStress: cb => socket.on("ADD_STRESS", cb),
    onDrinking: cb => socket.on("ADD_DRINKING", cb),
    getUserInfo: () => socket.emitAsync("GET_USER_INFO"),
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