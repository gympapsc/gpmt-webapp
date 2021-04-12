import { io } from "socket.io-client"


export default function createIOClient(path, authToken) {
    const socket = io(NEXT_PUBLIC_API_URL + path, {
        auth: {
            bearer: authToken
        },
        reconnectionDelayMax: 10000
    })

    return new Promise((res, rej) => {
        socket.on("connect", () => {
            emit = socket.emit
        
            socket.emit = (event, payload, ack) => {
                return new Promise((res, rej) => {
                    emit(event, payload, r => {
                        res(r)
                    })
                })
            }

            res(socket)
        })

        socket.on("connect_error", err => {
            rej(err)
        })
    })
}
