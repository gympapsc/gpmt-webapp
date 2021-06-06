import { createStore, applyMiddleware } from "redux"
import reducer from "./reducers"

import thunk from "redux-thunk"
import io from "./api/io"
import api from "./api/http"

const logger = store => next => action => {
    console.log(action.type)
    next(action)
}

const store = createStore(
    reducer, 
    applyMiddleware(thunk.withExtraArgument({ api, io }), logger)
)

export default store
