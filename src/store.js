import { createStore, applyMiddleware } from "redux"
import reducer from "./reducers"

import thunk from "redux-thunk"
import api from "./api/http"

const logger = store => next => action => {
    if (!(process.env.NODE_ENV === "test" || process.env.NODE_ENV === "production")) {
        console.log(action.type, action.payload)
    }
    next(action)
}

const store = createStore(
    reducer, 
    applyMiddleware(thunk.withExtraArgument({ api }), logger)
)

export default store
