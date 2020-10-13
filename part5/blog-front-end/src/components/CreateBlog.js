import React, {useContext, useState} from "react"
import blogServices from "../services/blogs"
import {BlogContext} from "../App"
import BlogForm from "./BlogForm"
const CreateBlog = (props) => {
    const {state, dispatch} = useContext(BlogContext)

    const [message, setMessage] = useState("")
    const [showForm, setShowForm] = useState(false)
    const handleBlogSubmit = async (e , {title, author, url}) => {
        e.preventDefault()
        const token = JSON.parse(localStorage.getItem("loggedUser")).token
        
        try{
            const blogCreatedDate = await blogServices.createBlog({title,author,url}, token)
            setMessage("Blog Created")
            dispatch({type:"create", payload:"created"})
            setShowForm(false)
        }
        catch(e){
            console.log(e)
        }
        

    }

    const renderMessage = () => {
        if(message){
            setTimeout(()=>setMessage(""), 4000)
            return <h1 style={{color:"green"}}>
                {message}
            </h1>
        }
    }

    return (
        <div>{
            renderMessage()
            }
            <h1>
                Create Blog
            </h1>
            {showForm == false? <button onClick={(e) => setShowForm(true) }>create blog</button>:<BlogForm handleBlogSubmit = {handleBlogSubmit} setShowForm={setShowForm} />
            }
            
        </div>
    )
}

export default CreateBlog