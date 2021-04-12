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
