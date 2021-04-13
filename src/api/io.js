import { io } from "socket.io-client"


export default function createIOClient(path, authToken) {
    const socket = io(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
        auth: {
            bearer: authToken
        },
        reconnectionDelayMax: 10000
    })

    return new Promise((res, rej) => {
        socket.on("connect", () => {

            socket.emitAsync = (...args) => new Promise((res, rej) => {
                socket.emit(...args, response => res(response))
            })

            res(socket)
        })

        socket.on("connect_error", err => {
            rej(err)
        })
    })
}
