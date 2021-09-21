import reducer from "./reducers"

describe("redux action reducer", () => {
    
    it("should default to initial state", () => {
        const action = { type: "" }
        const initialState = { messages: null }
        
        const state = reducer(initialState, action)

        expect(state).toEqual(initialState)
    })

    it("should add message", () => {
        const message = {
            _id: "093498124",
            message: "Hello World",
            sender: "user",
            timestamp: new Date().valueOf()
        }
        const action = {
            type: "ADD_MESSAGE",
            payload: message
        }

        const initialState = { 
            messages: null, 
            user: null 
        }
        
        const state = reducer(initialState, action)

        expect(state.messages).toContainEqual(message)
    })

    it("should add micturition", () => {
        const micturition = {
                _id: "0123456789",
                date: new Date(),
                timestamp: new Date().valueOf(),
                updatedAt: new Date().valueOf(),
        }
        const action = {
            type: "ADD_MICTURITION",
            payload: micturition
        }
        const initialState = {
            micturition: null,
            user: null 
        }
        
        const state = reducer(initialState, action)

        expect(state.micturition).toContainEqual(micturition)
    })

    it("should add hydration", () => {
        const hydration = {
            _id: "9876543210",
            amount: 400,
            date: new Date(),
            timestamp: new Date().valueOf(),
            updatedAt: new Date().valueOf()
        }
        const action = {
            type: "ADD_HYDRATION",
            payload: hydration            
        }
        const initialState = { 
            messages: null,
            hydration: null,
            user: null 
        }
        
        const state = reducer(initialState, action)

        expect(state.hydration).toContainEqual(hydration)
    })

    it("should add photo", () => {
        let now = new Date()
        let action = {
            type: "ADD_PHOTO",
            payload: {
                name: "test photo 2",
                _id: "2",
                timestamp: now.valueOf(),
                updatedAt: now.valueOf()
            }
        }
        let initialState = {
            photos: [{
                name: "test photo 1",
                _id: "1",
                timestamp: now.valueOf(),
                updatedAt: now.valueOf()
            }]
        }

        const state = reducer(initialState, action)

        expect(state.photos.length).toBe(2)
        expect(state.photos.find(p => p._id === "2")).toStrictEqual({
            name: "test photo 2",
            _id: "2",
            timestamp: now.valueOf(),
            updatedAt: now.valueOf()
        })
    })

    it("should set messages", () => {
        const messages = [{
            _id: "0123456789",
            text: "Hallo",
            sender: "user",
            timestamp: new Date().valueOf(),
            updatedAt: new Date().valueOf(),
        }]
        const action = {
            type: "SET_MESSAGES",
            payload: {
                messages
            }
        }
        const initialState = {
            messages: null,
            user: null 
        }
        
        const state = reducer(initialState, action)

        expect(state.messages).toStrictEqual(messages)
    })

    it("should set user", () => {
        const user = {
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

        const action = {
            type: "SET_USER",
            payload: {
                user
            }
        }
        const initialState = {
            user: null
        }
        
        const state = reducer(initialState, action)

        expect(state.user).toStrictEqual(user)
    })

    it("should set stress", () => {
        const stress = [{
            _id: "0123456789",
            level: 1,
            date: new Date(),
            timestamp: new Date().valueOf(),
            updatedAt: new Date().valueOf(),
        }]
        const action = {
            type: "SET_STRESS",
            payload: {
                entries: stress
            }
        }
        const initialState = {
            stress: null,
            user: null 
        }
        
        const state = reducer(initialState, action)

        expect(state.stress).toStrictEqual(stress)
    })

    it("should set micturition prediction", () => {
        let now = new Date().valueOf()
        const predictions = [...Array(24).keys()].map(i => (
            {
                _id: "0123456789" + i,
                date: new Date(now + i * 60 * 60 * 1000),
                prediction: Math.random(),
                timestamp: now
            }
        ))
        
        const action = {
            type: "SET_MICTURITION_PREDICTIONS",
            payload: {
                predictions
            }
        }
        const initialState = {
            micturitionPredictions: null,
            user: null 
        }
        
        const state = reducer(initialState, action)

        expect(state.micturitionPredictions).toStrictEqual(predictions)
    })

    it("should set hydration", () => {
        const hydration = [{
            _id: "0123456789",
            amount: 100,
            date: new Date(),
            timestamp: new Date().valueOf(),
            updatedAt: new Date().valueOf(),
        }]
        const action = {
            type: "SET_HYDRATION",
            payload: {
                entries: hydration
            }
        }
        const initialState = {
            hydration: null,
            user: null 
        }
        
        const state = reducer(initialState, action)

        expect(state.hydration).toStrictEqual(hydration)
    })

    it("should set micturition", () => {
        const micturition = [{
            _id: "0123456789",
            date: new Date(),
            timestamp: new Date().valueOf(),
            updatedAt: new Date().valueOf(),
        }]
        const action = {
            type: "SET_MICTURITION",
            payload: {
                entries: micturition
            }
        }
        const initialState = {
            micturition: null,
            user: null 
        }
        
        const state = reducer(initialState, action)

        expect(state.micturition).toStrictEqual(micturition)
    })

    it("should set error signin failed", () => {
        let action = {
            type: "SIGNIN_FAILED",
            payload: {
                reason: "Server error 500"
            }
        }
        let initialState = {
            user: null,
            error: {}
        }

        const state = reducer(initialState, action)

        expect(state.errors).not.toStrictEqual({})
    })

    it("should update stress", () => {
        let now = new Date()
        const action = {
            type: "UPDATE_STRESS",
            payload: {
                _id: "0123456789",
                level: 2
            }
        }
        const initialState = {
            stress: [{
                _id: "0123456789",
                level: 3,
                date: now,
                timestamp: now.valueOf(),
                updatedAt: now.valueOf(),
            }],
            user: null
        }
        
        const state = reducer(initialState, action)

        expect(state.stress.find(d => d._id === "0123456789")).toStrictEqual(
            {
                _id: "0123456789",
                level: 2,
                date: now,
                timestamp: now.valueOf(),
                updatedAt: now.valueOf(),
            }
        )
    })

    it("should update micturition", () => {
        let now = new Date()
        const action = {
            type: "UPDATE_MICTURITION",
            payload: {
                _id: "0123456789",
                date: new Date(2021, 0, 1)
            }
        }
        const initialState = {
            micturition: [{
                _id: "0123456789",
                date: now,
                timestamp: now.valueOf(),
                updatedAt: now.valueOf(),
            }],
            user: null
        }
        
        const state = reducer(initialState, action)

        expect(state.micturition.find(d => d._id === "0123456789")).toStrictEqual(
            {
                _id: "0123456789",
                date: new Date(2021, 0, 1),
                timestamp: now.valueOf(),
                updatedAt: now.valueOf(),
            }
        )
    })

    it("should update hydration", () => {
        let now = new Date()
        const action = {
            type: "UPDATE_HYDRATION",
            payload: {
                _id: "0123456789",
                amount: 200
            }
        }
        const initialState = {
            hydration: [{
                _id: "0123456789",
                amount: 300,
                date: now,
                timestamp: now.valueOf(),
                updatedAt: now.valueOf(),
            }],
            user: null
        }
        
        const state = reducer(initialState, action)

        expect(state.hydration.find(d => d._id === "0123456789")).toStrictEqual(
            {
                _id: "0123456789",
                amount: 200,
                date: now,
                timestamp: now.valueOf(),
                updatedAt: now.valueOf(),
            }
        )
    })

    it("should update user", () => {
        let now = new Date()
        const action = {
            type: "UPDATE_USER",
            payload: {
                _id: "0123456789",
                firstname: "Testing",
                surname: "Talyor",
                birthDate: new Date(2000, 10, 1),
                sex: "w",
                weight: 100,
                height: 190,
                email: "testing@taylor.com"
            }
        }
        const initialState = {
            user: {
                _id: "0123456789",
                firstname: "Bob",
                surname: "Debug",
                birthDate: new Date(2001, 1, 1),
                sex: "m",
                weight: 90,
                height: 180,
                email: "bob@debug.com"
            },
            user: null
        }
        
        const state = reducer(initialState, action)

        expect(state.user).toStrictEqual(
            {
                _id: "0123456789",
                firstname: "Testing",
                surname: "Talyor",
                birthDate: new Date(2000, 10, 1),
                sex: "w",
                weight: 100,
                height: 190,
                email: "testing@taylor.com"
            }
        )
    })

    it("should delete hydration", () => {
        const action = {
            type: "DELETE_HYDRATION",
            payload: {
                _id: "0123456789"
            }
        }
        const initialState = {
            hydration: [{
                _id: "0123456789",
                amount: 300,
                date: new Date(),
                timestamp: new Date().valueOf(),
                updatedAt: new Date().valueOf(),
            }],
            user: null
        }
        
        const state = reducer(initialState, action)

        expect(state.hydration.length).toBe(0)
    })

    it("should delete micturition", () => {
        const action = {
            type: "DELETE_MICTURITION",
            payload: {
                _id: "0123456789"
            }
        }
        const initialState = {
            micturition: [{
                _id: "0123456789",
                date: new Date(),
                timestamp: new Date().valueOf(),
                updatedAt: new Date().valueOf(),
            }],
            user: null
        }
        
        const state = reducer(initialState, action)

        expect(state.micturition.length).toBe(0)
    })

    it("should delete stress", () => {
        const action = {
            type: "DELETE_STRESS",
            payload: {
                _id: "0123456789"
            }
        }
        const initialState = {
            stress: [{
                _id: "0123456789",
                date: new Date(),
                level: 4,
                timestamp: new Date().valueOf(),
                updatedAt: new Date().valueOf(),
            }],
            user: null
        }
        
        const state = reducer(initialState, action)

        expect(state.stress.length).toBe(0)
    })

})
