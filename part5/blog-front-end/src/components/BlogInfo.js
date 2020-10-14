import React, { useContext } from "react"
import propTypes from "prop-types"
import blogServices from "../services/blogs";

import {BlogContext} from "../App"
export const BlogInfo = ({blog, testLikeFunction}) => {
    //dont't using context because of testing purposes
    //const {state, dispatch} = useContext(BlogContext)

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
        <p className="blog-likes">Likes: {blog.likes} <button className="blog-like-button" onClick={testLikeFunction}>like</button> </p>
        <p className="blog-url">Url: {blog.url} </p>
        <button onClick={handleDelete} >delete</button>
        </>
    )
}

BlogInfo.propTypes = {
    blog: propTypes.object.isRequired
}