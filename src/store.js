import {createStore,applyMiddleware} from 'redux'
import rootReducer from './Reducer'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

const middlware = [thunk]

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlware))

)

export default store;