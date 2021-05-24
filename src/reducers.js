const initialState = {
    loadedDate: new Date(0),
    errors: {},
    messages: [],
    user: {},
    micturition: [],
    drinking: [],
    photos: [],
    micturitionPredictions: [
        {date: new Date(2021, 4, 24, 0), prediction: 90},
        {date: new Date(2021, 4, 24, 1), prediction: 60},
        {date: new Date(2021, 4, 24, 2), prediction: 90},
        {date: new Date(2021, 4, 24, 3), prediction: 50},
        {date: new Date(2021, 4, 24, 4), prediction: 80},
        {date: new Date(2021, 4, 24, 5), prediction: 10},
        {date: new Date(2021, 4, 24, 6), prediction: 20},
        {date: new Date(2021, 4, 24, 7), prediction: 30},
        {date: new Date(2021, 4, 24, 8), prediction: 60},
        {date: new Date(2021, 4, 24, 9), prediction: 10},
        {date: new Date(2021, 4, 24, 10), prediction: 10},
        {date: new Date(2021, 4, 24, 11), prediction: 10},
        // {date: new Date(2021, 4, 24, 13), prediction: 10},
        // {date: new Date(2021, 4, 24, 14), prediction: 10},
        // {date: new Date(2021, 4, 24, 15), prediction: 90},
        // {date: new Date(2021, 4, 24, 16), prediction: 0},
        // {date: new Date(2021, 4, 24, 17), prediction: 0},
        // {date: new Date(2021, 4, 24, 18), prediction: 0},
        // {date: new Date(2021, 4, 24, 19), prediction: 90},
        // {date: new Date(2021, 4, 24, 20), prediction: 90},
        // {date: new Date(2021, 4, 24, 21), prediction: 90},
        // {date: new Date(2021, 4, 24, 22), prediction: 90},
        // {date: new Date(2021, 4, 24, 23), prediction: 90},
        // {date: new Date(2021, 4, 24, 24), prediction: 90},
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
        case "SET_MICTURITION":
            if (action.payload.entries.length > 0) {
                return {
                    ...state,
                    micturition: action.payload.entries
                }
            }
            return state
        case "SET_MICTURITION_PREDICTION":
            return {
                ...state,
                micturitionPrediction: action.payload.predictions
            }
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
        case "ADD_PHOTO":
            return {
                ...state,
                photos: [
                    ...state.photos,
                    action.payload
                ]
            }
        case "SET_PHOTOS":
            return {
                ...state,
                photos: action.payload.photos
            }
        case "SIGNIN_FAILED":
            return {
                ...state,
                errors: {
                    ...state.errors,
                    signin: action.payload?.reason || true
                }
            }
        default:
            return state
    }
}

export default reducer 
