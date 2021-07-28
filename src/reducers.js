const initialState = {
    loadedDate: new Date(0),
    errors: {},
    user: null,
    messages: null,
    micturition: null,
    stress: null,
    drinking: null,
    photos: null,
    micturitionPredictions: null
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case "ADD_MESSAGE":
            return {
                ...state,
                messages: [
                    ...(state.messages || []),
                    {
                        ...action.payload
                    }    
                ]
            }
        case "ADD_MICTURITION":
            return {
                ...state,
                micturition: [
                    ...(state.micturition || []),
                    action.payload
                ]
            }
        case "ADD_DRINKING":
                return {
                    ...state,
                    drinking: [
                        ...(state.drinking || []),
                        action.payload
                    ]
            }
        case "ADD_STRESS":
            return {
                ...state,
                stress: [
                    ...(state.stress || []),
                    action.payload
                ]
            }
        case "ADD_PHOTO":
            return {
                ...state,
                photos: [
                    ...state.photos,
                    action.payload
                ]
            }
        case "SET_MESSAGES":
            return {
                ...state,
                messages: action.payload.messages
            }
        case "SET_MICTURITION":
            return {
                ...state,
                micturition: action.payload.entries
            }
        case "SET_MICTURITION_PREDICTIONS":
            return {
                ...state,
                micturitionPredictions: action.payload.predictions
            }
        case "SET_DRINKING":
            return {
                ...state,
                drinking: action.payload.entries
            }
        case "SET_USER":
            return {
                ...state,
                user: action.payload.user
            }    
        case "SET_PHOTOS":
            return {
                ...state,
                photos: action.payload.photos
            }
        case "SET_STRESS":
            return {
                ...state,
                stress: action.payload.entries
            }
        case "SET_UTTER_BUTTONS":
            return {
                ...state,
                user: {
                    ...state.user,
                    utterButtons: action.payload.buttons
                }
            }
        case "SET_SPEECH_TOKEN":
            return {
                ...state,
                speech: action.payload
            }
        case "UPDATE_USER":
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload
                }
            }
        case "SIGNIN_FAILED":
            return {
                ...state,
                errors: {
                    ...state.errors,
                    signin: action.payload?.reason || true
                }
            }
        case "UPDATE_STRESS":
            return {
                ...state,
                stress: [
                    ...state.stress.filter(d => d._id !== action.payload._id),
                    {
                        ...state.stress.find(d => d._id === action.payload._id),
                        ...action.payload
                    }
                ]
            }
        case "UPDATE_DRINKING":
            return {
                ...state,
                drinking: [
                    ...state.drinking.filter(d => d._id !== action.payload._id),
                    {
                        ...state.drinking.find(d => d._id === action.payload._id),
                        ...action.payload
                    }
                ]
            }
        case "UPDATE_MICTURITION":
            return {
                ...state,
                micturition: [
                    ...state.micturition.filter(m => m._id !== action.payload._id),
                    {
                        ...state.micturition.find(m => m._id === action.payload._id),
                        ...action.payload
                    }
                ]
            }
        case "DELETE_DRINKING":
            return {
                ...state,
                drinking: state.drinking.filter(d => d._id !== action.payload._id)
            }
        case "DELETE_MICTURITION":
            return {
                ...state,
                micturition: state.micturition.filter(m => m._id !== action.payload._id)
            }
        case "DELETE_STRESS":
            return {
                ...state,
                stress: state.stress.filter(s => s._id !== action.payload._id)
            }
        case "USER_CONNECTION":
            return {
                ...state,
                connected: action.payload.status
            }
        default:
            return state
    }
}

export default reducer 
