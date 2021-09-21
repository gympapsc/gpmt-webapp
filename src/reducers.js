const initialState = {
    loadedDate: new Date(0),
    errors: {},
    user: null,
    messages: null,
    micturition: null,
    nutrition: null,
    stress: null,
    hydration: null,
    photos: null,
    medication: null,
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
        case "ADD_NUTRITION":
            return {
                ...state,
                nutrition: [
                    ...(state.nutrition || []),
                    action.payload
                ]
            }
        case "ADD_MEDICATION":
            return {
                ...state,
                medication: [
                    ...(state.medication || []),
                    action.payload
                ]
            }
        case "ADD_HYDRATION":
                return {
                    ...state,
                    hydration: [
                        ...(state.hydration || []),
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
        case "SET_HYDRATION":
            return {
                ...state,
                hydration: action.payload.entries
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
        case "UPDATE_HYDRATION":
            return {
                ...state,
                hydration: [
                    ...state.hydration.filter(d => d._id !== action.payload._id),
                    {
                        ...state.hydration.find(d => d._id === action.payload._id),
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
        case "UPDATE_NUTRITION":
            return {
                ...state,
                nutrition: [
                    ...state.nutrition.filter(m => m._id !== action.payload._id),
                    {
                        ...state.nutrition.find(m => m._id === action.payload._id),
                        ...action.payload
                    }
                ]
            }
        case "UPDATE_MEDICATION":
            return {
                ...state,
                medication: [
                    ...state.medication.filter(m => m._id !== action.payload._id),
                    {
                        ...state.medication.find(m => m._id === action.payload._id),
                        ...action.payload
                    }
                ]
            }
        case "DELETE_HYDRATION":
            return {
                ...state,
                hydration: state.hydration.filter(d => d._id !== action.payload._id)
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
        case "DELETE_NUTRITION":
            return {
                ...state,
                nutrition: state.nutrition.filter(m => m._id !== action.payload._id)
            }
        case "DELETE_MEDICATION":
            return {
                ...state,
                medication: state.medication.filter(m => m._id !== action.payload._id)
            }
        case "USER_CONNECTION":
            return {
                ...state,
                connected: action.payload.status
            }
        case "SET_AVG_HYDRATION_AMOUNT":
            return {
                ...state,
                user: {
                    ...state.user,
                    avgHydrationAmount: action.payload.avgHydrationAmount
                }
            }
        case "SET_MICTURITION_FREQUENCY":
            return {
                ...state,
                user: {
                    ...state.user,
                    micturitionFrequency: action.payload.micturitionFrequency
                }
            }
        case "SET_NUTRITION":
            return {
                ...state,
                nutrition: action.payload.entries
            }
        case "SET_MEDICATION":
            return {
                ...state,
                medication: action.payload.entries
            }
        default:
            return state
    }
}

export default reducer 
