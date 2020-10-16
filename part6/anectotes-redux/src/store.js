import { createStore, combineReducers} from 'redux'
import {useDispatch} from "react-redux"
import {initializeData} from "./services/notes"
import anecdoteReducer, {dispatchInitData} from './reducers/anecdoteReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from "./reducers/notificationReducer"
import filterReducer from './reducers/filterReducer'
const allReducer = combineReducers({
    anecdotes: anecdoteReducer,
    notifications: notificationReducer,
    filter: filterReducer
})
const store = createStore(allReducer, composeWithDevTools())



export default store