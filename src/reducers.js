const initialState = {
    messages: []
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
        case "ADD_MESSAGES":
            if (action.payload.messages.length > 0) {
                return {
                    ...state,
                    messages: action.payload.messages
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
        default:
            return state
    }
}

export default reducer 
