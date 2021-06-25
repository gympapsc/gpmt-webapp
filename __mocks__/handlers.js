import { rest } from "msw"
import { Result } from "postcss"

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
    sex: "m"
}

let data = {
    stress: [{
    }],
    drinking: [{
    }],
    micturition: [{
    }],
    predictions: new Array(24).map(i => (
        {
            _id: "0123456789" + i,
            date: new Date(now + i * 60 * 60 * 1000),
            prediction: Math.random(),
            timestamp: now
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
    user: {
        _id: "1234567890",
        timestamp: new Date().valueOf(),
        updatedAt: new Date().valueOf(),
        firstname: "Testing",
        surname: "Taylor",
        email: "testing@taylor.com",
        weight: 80,
        height: 180,
        birthDate: new Date(2000, 0, 1),
        sex: "m"
    } 
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
            data.messages.push({
                text,
                sender: "user",
                _id: new Date().valueOf().toString(),
                timestamp: new Date().valueOf(),
                updatedAt: new Date().valueOf()
            })
            return res(
                ctx.json({
                    messages: data.messages,
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
                    micturition: data.micturition
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
    rest.put(`${url}/micutition/:id`, (req, res, ctx) => {
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
    
    rest.get(`${url}/drinking`, (req, res, ctx) => {
        if(req.cookies["authToken"] === "testing@taylor.com") {

        } else {
            return res(
                ctx.status(403),
                ctx.json({
                    err: "Unauthorized request"
                })
            )
        }
    }),
    rest.put(`${url}/drinking/:id`, (req, res, ctx) => {
        let { id } = req.params
        let {
            date,
            amount
        } = req.body
        if(req.cookies["authToken"] === "testing@taylor.com") {
            data.drinking = [
                ...data.drinking.filter(m => m._id !== id),
                {
                    ...data.drinking.find(m => m._id === id),
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
    rest.delete(`${url}/drinking/:id`, (req, res, ctx) => {
        let { id } = req.params
        if(req.cookies["authToken"] === "testing@taylor.com") {
            data.drinking = data.drinking.filter(d => d._id !== id)
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
                    stress: data.stress
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
        let {update} = req.body

        if(req.cookies["authToken"] === "testing@taylor.com") {
            data.user = {
                ...data.user,
                ...update,
                updatedAt: new Date().valueOf()
            }
            return res(
                ctx.json({
                    ok
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