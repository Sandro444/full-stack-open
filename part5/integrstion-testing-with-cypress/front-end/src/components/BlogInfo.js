import React, { useContext } from "react"
import propTypes from "prop-types"
import blogServices from "../services/blogs";

import {BlogContext} from "../App"
export const BlogInfo = ({blog}) => {
    //dont't using context because of testing purposes
    //testLikeFunction should be removed and handleLike should handle like click
    const {state, dispatch} = useContext(BlogContext)

    const handleLike = async (e) => {
        e.preventDefault()
        try{
            const data = await blogServices.updateBlog(blog, state.token)
            dispatch({type:"updated", payload: "blog likes updated"})
        }catch(e){
            console.log(e)
        }

        
        
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        try{
            const data = await blogServices.deleteBlog(blog, state.token)
            dispatch({type:"deleted", payload: "blog deleted successfully"})
        } catch(e){
            console.log(e)
            console.log(e.response.status == "UnhandledPromiseRejectionWarning")
            console.log("our token is",state.token)
        }
    }
    return (
        <>
        <p className="blog-likes">Likes: {blog.likes} <button className="blog-like-button" onClick={handleLike}>like</button> </p>
        <p className="blog-url">Url: {blog.url} </p>
        <button className="blog-delete-button" onClick={handleDelete} >delete</button>
        </>
    )
}

BlogInfo.propTypes = {
    blog: propTypes.object.isRequired
}