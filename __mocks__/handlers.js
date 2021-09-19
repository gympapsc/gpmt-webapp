import { rest } from "msw"

const url = process.env.NEXT_PUBLIC_API_URL

const testingUser = {
    _id: "1234567890",
    timestamp: new Date().valueOf(),
    updatedAt: new Date().valueOf(),
    firstname: "Testing",
    surname: "Taylor",
    email: "testing@taylor.com",
    weight: 80,
    height: 180,
    birthDate: new Date(2000, 0, 1),
    sex: "m",
    settings: {
        voiceInput: false,
        voiceOutput: false,
        cumulativePrediction: false
    }
}

let data = {
    stress: [{
        _id: "123456789",
        timestamp: new Date().valueOf(),
        updatedAt: new Date().valueOf(),
        date: new Date(2020, 0, 1, 10, 0),
        level: 2
    }],
    hydration: [{
        _id: "123456789",
        timestamp: new Date().valueOf(),
        updatedAt: new Date().valueOf(),
        date: new Date(2020, 0, 1, 10, 0),
        amount: 800
    }],
    micturition: [{
        _id: "123456789",
        timestamp: new Date().valueOf(),
        updatedAt: new Date().valueOf(),
        date: new Date(2020, 0, 1, 10, 0)
    }],
    predictions: [...Array(24).keys()].map(i => (
        {
            _id: "0123456789" + i,
            date: new Date(new Date().valueOf() + i * 60 * 60 * 1000),
            prediction: Math.random(),
            timestamp: new Date().valueOf()
        }
    )),
    photos: [],
    messages: [
        {
            text: "Hallo",
            sender: "user",
            _id: "1",
            timestamp: new Date().valueOf()
        },
        {
            text: "Hallo, ich bin deine Hilfe",
            sender: "bot",
            _id: "2",
            timestamp: new Date().valueOf()
        }
    ],
    user: testingUser
}

export const handlers = [
    rest.get(`${url}/conversation`, (req, res, ctx) => {
        if(req.cookies["authToken"] === "testing@taylor.com") {
            return res(
                ctx.json({
                    messages: data.messages
                })
            )
        } else {
            return res(
                ctx.status(403),
                ctx.json({
                    err: "Unauthorized request"
                })
            )
        }
    }),
    rest.post(`${url}/conversation/utter`, (req, res, ctx) => {
        let { text } = req.body
        if(req.cookies["authToken"] === "testing@taylor.com") {
            let message = {
                text,
                sender: "user",
                _id: new Date().valueOf().toString(),
                timestamp: new Date().valueOf()
            }
            data.messages.push(message)
            return res(
                ctx.json({
                    events: [
                        message
                    ],
                    micturitionPrediction: data.predictions,
                    buttons: []
                })
            )
        } else {
            return res(
                ctx.status(403),
                ctx.json({
                    err: "Unauthorized request"
                })
            )
        }
    }),

    rest.get(`${url}/micturition`, (req, res, ctx) => {
        if(req.cookies["authToken"] === "testing@taylor.com") {
            return res(
                ctx.json({
                    entries: data.micturition
                })
            )
        } else {
            return res(
                ctx.status(403),
                ctx.json({
                    err: "Unauthorized request"
                })
            )
        }
    }),
    rest.put(`${url}/micturition/:id`, (req, res, ctx) => {
        let { id } = req.params
        let { date } = req.body
        if(req.cookies["authToken"] === "testing@taylor.com") {
            data.micturition = [
                ...data.micturition.filter(m => m._id !== id),
                {
                    ...data.micturition.find(m => m._id === id),
                    date: new Date(date)
                }
            ]
            return res(
                ctx.json({
                    ok: true
                })
            )
        } else {
            return res(
                ctx.status(403),
                ctx.json({
                    err: "Unauthorized request"
                })
            )
        }
    }),
    rest.delete(`${url}/micturition/:id`, (req, res, ctx) => {
        let { id } = req.params
        if(req.cookies["authToken"] === "testing@taylor.com") {
            data.micturition = data.micturition.filter(d => d._id !== id)
            return res(
                ctx.json({
                    ok: true
                })
            )
        } else {
            return res(
                ctx.status(403),
                ctx.json({
                    err: "Unauthorized request"
                })
            )
        }
    }),

    rest.get(`${url}/micturition/predictions`, (req, res, ctx) => {
        if(req.cookies["authToken"] === "testing@taylor.com") {
            return res(
                ctx.json({
                    start: new Date().valueOf(),
                    end: new Date().valueOf(),
                    predictions: data.predictions
                })
            )
        } else {
            return res(
                ctx.status(403),
                ctx.json({
                    err: "Unauthorized request"
                })
            )
        }
    }),
    
    rest.get(`${url}/hydration`, (req, res, ctx) => {
        if(req.cookies["authToken"] === "testing@taylor.com") {
            return res(
                ctx.json({
                    entries: data.hydration
                })
            )
        } else {
            return res(
                ctx.status(403),
                ctx.json({
                    err: "Unauthorized request"
                })
            )
        }
    }),
    rest.put(`${url}/hydration/:id`, (req, res, ctx) => {
        let { id } = req.params
        let {
            date,
            amount
        } = req.body
        if(req.cookies["authToken"] === "testing@taylor.com") {
            data.hydration = [
                ...data.hydration.filter(m => m._id !== id),
                {
                    ...data.hydration.find(m => m._id === id),
                    date: new Date(date),
                    amount,
                    updatedAt: new Date().valueOf()
                }
            ]
            return res(
                ctx.json({
                    ok: true
                })
            )
        } else {
            return res(
                ctx.status(403),
                ctx.json({
                    err: "Unauthorized request"
                })
            )
        }
    }),
    rest.delete(`${url}/hydration/:id`, (req, res, ctx) => {
        let { id } = req.params
        if(req.cookies["authToken"] === "testing@taylor.com") {
            data.hydration = data.hydration.filter(d => d._id !== id)
            return res(
                ctx.json({
                    ok: true
                })
            )
        } else {
            return res(
                ctx.status(403),
                ctx.json({
                    err: "Unauthorized request"
                })
            )
        }
    }),

    rest.get(`${url}/stress`, (req, res, ctx) => {
        if(req.cookies["authToken"] === "testing@taylor.com") {
            return res(
                ctx.json({
                    entries: data.stress
                })
            )
        } else {
            return res(
                ctx.status(403),
                ctx.json({
                    err: "Unauthorized request"
                })
            )
        }
    }),
    rest.put(`${url}/stress/:id`, (req, res, ctx) => {
        let { id } = req.params
        let {
            date,
            level
        } = req.body
        if(req.cookies["authToken"] === "testing@taylor.com") {
            data.stress = [
                ...data.stress.filter(m => m._id !== id),
                {
                    ...data.stress.find(m => m._id === id),
                    date: new Date(date),
                    level,
                    updatedAt: new Date().valueOf()
                }
            ]
            return res(
                ctx.json({
                    ok: true
                })
            )
        } else {
            return res(
                ctx.status(403),
                ctx.json({
                    err: "Unauthorized request"
                })
            )
        }
    }),
    rest.delete(`${url}/stress/:id`, (req, res, ctx) => {
        let { id } = req.params
        if(req.cookies["authToken"] === "testing@taylor.com") {
            data.stress = data.stress.filter(d => d._id !== id)
            return res(
                ctx.json({
                    ok: true
                })
            )
        } else {
            return res(
                ctx.status(403),
                ctx.json({
                    err: "Unauthorized request"
                })
            )
        }
    }),

    rest.get(`${url}/photo`, (req, res, ctx) => {
        if(req.cookies["authToken"] === "testing@taylor.com") {
            return res(
                ctx.json({
                    photos: data.photos
                })
            )
        } else {
            return res(
                ctx.status(403),
                ctx.json({
                    err: "Unauthorized request"
                })
            )
        }
    }),

    rest.get(`${url}/user`, (req, res, ctx) => {
        if(req.cookies["authToken"] === "testing@taylor.com") {
            return res(
                ctx.json({
                    user: testingUser
                })
            )   
        } else {
            return res(
                ctx.status(401),
                ctx.json({
                    err: "Unauthorized request"
                })
            )
        }
    }),
    rest.put(`${url}/user`, (req, res, ctx) => {
        let update = req.body

        if(req.cookies["authToken"] === "testing@taylor.com") {
            data.user = {
                ...data.user,
                ...update,
                updatedAt: new Date().valueOf()
            }
            return res(
                ctx.json({
                    ok: true
                })
            )
        } else {
            return res(
                ctx.json({
                    err: "Unauthorized request"
                })
            )
        }
    }),

    rest.post(`${url}/signin`, (req, res, ctx) => {
        let { email, password } = req.body
        if(email === "testing@taylor.com" && password === "Password") {
            return res(
                ctx.cookie("authToken", "testing@taylor.com"),
                ctx.json({
                    ok: true
                })
            )
        } else {
            return res(
                ctx.status(403),
                ctx.json({
                    err: "Unauthorized request"
                })
            )
        }
    }),
    rest.post(`${url}/signup`, (req, res, ctx) => {
        let {
            user: {
                firstname,
                surname,
                email,
                password,
                weight,
                height,
                birthDate,
                sex
            }
        } = req.body

        if(
            firstname &&
            surname &&
            email &&
            password &&
            weight &&
            height &&
            birthDate &&
            sex
        ) {
            return res(
                ctx.status(200),

            )
        } else {
            return res(
                ctx.status(400)
            )
        }

    }),

    rest.get(`${url}/email/checkUnique/:email`, (req, res, ctx) => {
        let email = atob(req.params.email)
        if(email === "isnot@unique.com") {
            return res(
                ctx.json({
                    isUnique: false,
                    email
                })
            )
        } else {
            return res(
                ctx.json({
                    isUnique: true,
                    email
                })
            )
        }
    })
]