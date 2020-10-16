import { createStore } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(anecdoteReducer, composeWithDevTools())

export default store