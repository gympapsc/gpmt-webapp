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
    signoutUser,
    updateUser,
    updatePassword,
    getMicturition,
    getDrinking,
    uploadPhoto,
    getPhotos
} from "./sagas"

const sagaMiddleware = createSagaMiddleware()

const logger = store => next => action => {
    console.log(action.type)
    next(action)
}

const store = createStore(
    reducer, 
    applyMiddleware(sagaMiddleware, logger)
)

function* saga() {
    yield takeLatest("SET_AUTH_TOKEN", saveAuthToken)
    yield takeLatest("SIGNIN_USER", signinUser)
    yield takeLatest("SIGNUP_USER", signupUser)
    yield takeLatest("SIGNOUT_USER", signoutUser)
    yield takeLatest("ASSIGN_USER", getAuthToken)
    
    yield takeEvery("UTTER_MESSAGE", sendMessage)
    yield takeEvery("GET_MESSAGES", getMessages)
    yield takeEvery("GET_MICTURITION", getMicturition)
    yield takeEvery("GET_DRINKING", getDrinking)
    yield takeEvery("GET_PHOTOS", getPhotos)

    yield takeEvery("UPDATE_USER", updateUser)
    // TODO debounce sending
    yield takeEvery("UPDATE_PASSWORD", updatePassword)
}


sagaMiddleware.run(saga)

export default store
