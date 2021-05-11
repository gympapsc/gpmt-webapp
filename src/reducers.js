const initialState = {
    loadedDate: new Date(0),
    messages: [
        // {
        //     timestamp: new Date().valueOf(),
        //     text: "Hello",
        //     sender: "user",
        //     _id: "asdfasdf"
        // }
    ],
    user: {},
    micturition: [
        {
            timestamp: new Date().valueOf(),
            date: new Date(),
            _id: "123sadfasdf"
        }
    ],
    drinking: [
        {
            timestamp: new Date().valueOf(),
            date: new Date(),
            amount: 500,
            _id: "123123"
        }
    ]
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case "ADD_MESSAGE":
            return {
                ...state,
                messages: [
                    ...state.messages,
                    {
                        ...action.payload
                    }    
                ]
            }
        case "ADD_MICTURITION":
            return {
                ...state,
                micturition: [
                    ...state.micturition,
                    action.payload
                ]
            }
        case "ADD_DRINKING":
                return {
                    ...state,
                    drinking: [
                        ...state.drinking,
                        action.payload
                    ]
                }
        case "SET_MESSAGES":
            if (action.payload.messages.length > 0) {
                return {
                    ...state,
                    messages: action.payload.messages
                }
            }
            return state
        case "SET_MICTURTION":
            if (action.payload.entries.length > 0) {
                return {
                    ...state,
                    micturition: action.payload.entries
                }
            }
            return state
        case "SET_DRINKING":
            if (action.payload.entries.length > 0) {
                return {
                    ...state,
                    drinking: action.payload.entries
                }
            }
            return state
        case "SET_AUTH_TOKEN":
            return {
                ...state,
                bearer: action.payload.bearer
            }
        case "SET_USER":
            return {
                ...state,
                user: action.payload.user
            }
        case "UPDATE_USER":
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload
                }
            }
        default:
            return state
    }
}

export default reducer 
