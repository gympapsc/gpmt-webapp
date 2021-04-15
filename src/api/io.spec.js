import http from 'http'
import { Server } from 'socket.io'

import io from './io'

describe("socket.io api", () => {
    let ioServer, serverSocket
  
    beforeEach((done) => {
      const httpServer = http.createServer()
      ioServer = new Server(httpServer)
      httpServer.listen(() => {
            const port = httpServer.address().port
            process.env.NEXT_PUBLIC_API_URL = `http://localhost:${port}`
            ioServer.on("connection", (socket) => {
                serverSocket = socket
            })
            io.init().then(done)
        })
    })
  
    afterEach(() => {
        ioServer.close()
        io.close()
    })
  
    it("should sendAsync", (done) => {
        serverSocket.on("PING", (cb) => {
            cb("PONG")
        })
        io.sendAsync("PING")
            .then(arg => {
                expect(arg).toEqual("PONG")
                done()
            })
    })

    it("should be inactive on close", () => {
        io.close()
        expect(io.active()).toBeFalsy()
    })

    it("should ADD_MESSAGE", done => {
        serverSocket.on("ADD_MESSAGE", (message, cb) => {
            cb(message)
        })

        io.addMessage("Hello")
            .then(res => {
                expect(res.text).toEqual("Hello")
            })
            .then(done)
    })

    it("should GET_MESSAGES", done => {
        const date = new Date().valueOf()

        serverSocket.on("GET_MESSAGES", ({ startDate }, ack) => {
            expect(startDate).toEqual(date)
            done()
        })

        io.getMessages(date)
    })

    it("should receive messages", done => {
        const message = {
            sender: "user",
            text: "Hello",
            timestamp: new Date().valueOf()
        }

        io.onMessage(m => {
            expect(m).toEqual(message)
            done()
        })

        serverSocket.emit("ADD_MESSAGE", message)
    })

    it("should GET_USER_INFO", done => {
        serverSocket.on("GET_USER_INFO", () => {
            done()
        })

        io.getUserInfo()
    })
})


describe("socket io authentication", () => {
    it("should send auth token", done => {
        let serverSocket
        const auth_token = "abcdefghijklmnopqrstuvwxyz"
        const httpServer = http.createServer()
        const ioServer = new Server(httpServer)

        httpServer.listen(() => {
            const port = httpServer.address().port
            process.env.NEXT_PUBLIC_API_URL = `http://localhost:${port}`
            ioServer.on("connection", (socket) => {
                serverSocket = socket
            })
            io.init(auth_token)
                .then(() => {
                    ioServer.close()
                    io.close()
                    done()
                })
        })
        
        ioServer.use((socket, next) => {
            expect(socket.handshake.auth.bearer).toEqual(auth_token)
            next()
        })

    })
})