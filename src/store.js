import { createStore, applyMiddleware } from "redux"
import reducer from "./reducers"

import thunk from "redux-thunk"
import api from "./api/http"

const logger = store => next => action => {
    console.log(action.type, action.payload)
    next(action)
}

const store = createStore(
    reducer, 
    applyMiddleware(thunk.withExtraArgument({ api }), logger)
)

export default store
