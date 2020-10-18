import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import blogReducer from "./reducers/blogReducer"
const reducers = combineReducers({
    blogs: blogReducer
})  

const store = createStore(reducers, applyMiddleware(thunk))


export default store