import React, {useContext, useState} from "react"
import blogServices from "../services/blogs"
import {BlogContext} from "../App"
const CreateBlog = (props) => {
    const {state, dispatch} = useContext(BlogContext)
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")
    const [message, setMessage] = useState("")
    const handleBlogSubmit = async (e) => {
        e.preventDefault()
        const token = JSON.parse(localStorage.getItem("loggedUser")).token
        
        try{
            const blogCreatedDate = await blogServices.createBlog({title,author,url}, token)
            setMessage("Blog Created")
            dispatch({type:"create", payload:"created"})
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
            <form onSubmit={handleBlogSubmit}>
                <p>Title</p>
                <input value={title} onChange={e => setTitle(e.target.value)} />
                <p>Author</p>
                <input value={author} onChange={e => setAuthor(e.target.value)} />
                <p>Url</p>
                <input value={url} onChange={e => setUrl(e.target.value)} />
                <input type="submit" value="submit" />
            </form>
        </div>
    )
}

export default CreateBlog