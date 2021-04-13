import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducers'
import saga from './sagas'

const sagaMiddleware = createSagaMiddleware()

const logger = store => next => action => {
    console.log(action.type)
    next(action)
}

const store = createStore(
    reducer, 
    applyMiddleware(sagaMiddleware, logger)
)

sagaMiddleware.run(saga)

export default store
