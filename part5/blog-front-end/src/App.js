import React, { useState, useEffect, useContext, createContext, useReducer } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import Login from "./components/Login";

export const BlogContext = createContext() 

const blogReducer = (state,action) => {
  if(action.type == "create"){
    return {...state,
      status:action.payload}
  }
  else if(action.type == "set token"){
    return {...state,
    token: action.payload}
  }
  else if(action.type == "updated"){
    return {
      ...state,
      status: action.payload
    }
  }
}
const initialState = {
  status:"",
  token:""
}
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [state, dispatch] = useReducer(blogReducer, initialState)

  useEffect(() => {
    
    const token = localStorage.getItem("loggedUser")? JSON.parse(localStorage.getItem("loggedUser")).token:"none"
    blogService.getAll(token).then(blogs =>
      setBlogs( blogs )
    )
    dispatch({type: "set token", payload:token})
    setTimeout(()=>dispatch({type:"updated", payload:""}),4000)
  }, [state.status])

  return (
    <BlogContext.Provider value = {{state, dispatch}} >
      <h1>{state.status}</h1>
    <div>
      <Login />
      <h2>blogs</h2>
      <Blogs blogs={blogs} />
      
    </div>
    </BlogContext.Provider>
  )
}

export default App