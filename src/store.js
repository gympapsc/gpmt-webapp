import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import { takeEvery, takeLatest } from "redux-saga/effects"
import reducer from "./reducers"
import {
    getMessages,
    sendMessage,
    getAuthToken,
    signupUser,
    signinUser,
    saveAuthToken,
    signoutUser
} from "./sagas"

const sagaMiddleware = createSagaMiddleware()

// const logger = store => next => action => {
//     console.log(action.type)
//     next(action)
// }

const store = createStore(
    reducer, 
    applyMiddleware(sagaMiddleware)
)

function* saga() {
    yield takeLatest("SET_AUTH_TOKEN", saveAuthToken)
    yield takeLatest("SIGNIN_USER", signinUser)
    yield takeLatest("SIGNUP_USER", signupUser)
    yield takeLatest("SIGNOUT_USER", signoutUser)
    yield takeLatest("ASSIGN_USER", getAuthToken)
    
    yield takeEvery("UTTER_MESSAGE", sendMessage)
    yield takeEvery("GET_MESSAGES", getMessages)
}


sagaMiddleware.run(saga)

export default store
