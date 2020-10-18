import React, { useState } from 'react'
import blogServices from "../services/blogs";
import userServices from "../services/users"
import { useSelector, useDispatch } from "react-redux"
const Blog = ({ blog }) => {
  

  const state = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  const handleLike = async (e) => {
    try {
      const data = await blogServices.updateBlog(blog, state.token)
      dispatch({ type: "updated", payload: "blog likes updated" })
    } catch (e) {
      console.log(e)
    }



  }

  const handleDelete = async (e) => {
    try {
      const data = await blogServices.deleteBlog(blog, state.token)
      dispatch({ type: "deleted", payload: "blog deleted successfully" })
      const users = await userServices.fetchUsers()
      dispatch({ type: "set all users", payload: users })
    } catch (e) {
      console.log(e)
    }
  }
  if(!blog) return null
  return (<div style={singleBlogStyle}>

    <h4 className="blog-title">{blog.title }</h4>
    <p className="blog-author"> {blog.author} </p>
    <p className="blog-likes">Likes: {blog.likes} <button className="blog-like-button" onClick={handleLike}>like</button> </p>
    <p className="blog-url">Url: {blog.url} </p>
    <button onClick={handleDelete} >delete</button>
  </div>)
}


const singleBlogStyle = {
  marginTop:20,
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}
export default Blog
