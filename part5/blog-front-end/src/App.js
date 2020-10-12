import React, { useState, useEffect, useContext, createContext, useReducer } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import Login from "./components/Login";

export const BlogContext = createContext() 

const blogReducer = (state,action) => {
  if(action.type == "create"){
    return {status:action.payload}
  }
}
const initialState = {
  status:""
}
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [render, dispatch] = useReducer(blogReducer, initialState)

  useEffect(() => {
    
    const token = localStorage.getItem("loggedUser")? JSON.parse(localStorage.getItem("loggedUser")).token:"none"
    blogService.getAll(token).then(blogs =>
      setBlogs( blogs )
    )  
  }, [render])

  return (
    <BlogContext.Provider value = {{render, dispatch}} >
    <div>
      <Login />
      <h2>blogs</h2>
      <Blogs blogs={blogs} />
      
    </div>
    </BlogContext.Provider>
  )
}

export default App