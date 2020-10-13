import React, { useContext } from "react"
import { assign } from "underscore";

import blogServices from "../services/blogs";

import {BlogContext} from "../App"
export const BlogInfo = ({blog}) => {

    const {state, dispatch} = useContext(BlogContext)

    const handleLike = async (e) => {
        try{
            const data = await blogServices.updateBlog(blog, state.token)
            dispatch({type:"updated", payload: "blog likes updated"})
        }catch(e){
            console.log(e)
        }
        
    }

    const handleDelete = async (e) => {
        try{
            const data = await blogServices.deleteBlog(blog, state.token)
            dispatch({type:"deleted", payload: "blog deleted successfully"})
        } catch(e){
            console.log(e)
        }
    }
    return (
        <>
        <p>Author: {blog.author}</p>
        <p>Likes: {blog.likes} <button onClick={handleLike}>like</button> </p>
        <p>Url: {blog.url} </p>
        <button onClick={handleDelete} >delete</button>
        </>
    )
}