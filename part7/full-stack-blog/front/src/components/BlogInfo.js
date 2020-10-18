import React, { useContext } from "react"
import propTypes from "prop-types"
import blogServices from "../services/blogs";
import userServices from "../services/users"
import {useSelector, useDispatch} from "react-redux"
export const BlogInfo = ({blog}) => {
    //dont't using context because of testing purposes
    //testLikeFunction should be removed and handleLike should handle like click
    

    const state = useSelector(state=> state.blogs)
    const dispatch = useDispatch()
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
            const users = await userServices.fetchUsers()
            dispatch({type:"set all users", payload:users})
        } catch(e){
            console.log(e)
        }
    }
    return (
        <>
        <p className="blog-likes">Likes: {blog.likes} <button className="blog-like-button" onClick={handleLike}>like</button> </p>
        <p className="blog-url">Url: {blog.url} </p>
        <button onClick={handleDelete} >delete</button>
        </>
    )
}

BlogInfo.propTypes = {
    blog: propTypes.object.isRequired
}