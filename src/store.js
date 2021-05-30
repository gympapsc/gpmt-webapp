import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import { takeEvery, takeLatest } from "redux-saga/effects"
import reducer from "./reducers"
import {
    loadMessages,
    sendMessage,
    getAuthToken,
    signupUser,
    signinUser,
    saveAuthToken,
    signoutUser,
    updateUser,
    updatePassword,
    loadMicturition,
    loadDrinking,
    loadPhotos,
    updateDrinking,
    updateMicturition,
    loadStress,
    updateStress,
    deleteMicturition,
    deleteDrinking,
    deleteStress
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

    yield takeEvery("GET_MESSAGES", loadMessages)
    yield takeEvery("GET_MICTURITION", loadMicturition)
    yield takeEvery("GET_DRINKING", loadDrinking)
    yield takeEvery("GET_PHOTOS", loadPhotos)
    yield takeEvery("GET_STRESS", loadStress)

    yield takeEvery("UPDATE_STRESS", updateStress)
    yield takeEvery("UPDATE_USER", updateUser)
    yield takeEvery("UPDATE_DRINKING", updateDrinking)
    yield takeEvery("UPDATE_MICTURITION", updateMicturition)

    yield takeEvery("DELETE_MICTURITION", deleteMicturition)
    yield takeEvery("DELETE_DRINKING", deleteDrinking)
    yield takeEvery("DELETE_STRESS", deleteStress)
}


sagaMiddleware.run(saga)

export default store
