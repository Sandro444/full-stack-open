import React, { useState } from "react"
import {useSelector, useDispatch} from "react-redux"
import blogService from "../services/blogs"
export const CommentForm = ({id}) => {
    const state = useSelector(state=>state.blogs)
    const [comment, setComment] = useState("")
    const dispatch = useDispatch()
    const submitComment = async (e) => {
        e.preventDefault()
        const req = await blogService.createComment(id, state.token, comment)
        if(req.status == 201){
            dispatch({type:"updated", payload: `comment added to the blog`})
            setComment("")
        }
    }
    if(state.token == "none")return (
        <h1>commenting not avaliable to unlogged users</h1>
    )
    return(
        <form>
            your comment <input onChange={(e)=>setComment(e.target.value)} value={comment} />
            <button onClick={submitComment}>comment</button>
        </form>
    )
}