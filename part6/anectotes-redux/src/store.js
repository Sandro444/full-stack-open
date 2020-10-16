import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from "redux-thunk"
import anecdoteReducer from './reducers/anecdoteReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from "./reducers/notificationReducer"
import filterReducer from './reducers/filterReducer'
const allReducer = combineReducers({
    anecdotes: anecdoteReducer,
    notifications: notificationReducer,
    filter: filterReducer
})
const store = createStore(allReducer, composeWithDevTools(
    applyMiddleware(thunk)
))



export default store