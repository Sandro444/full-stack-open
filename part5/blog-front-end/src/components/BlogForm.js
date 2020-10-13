import React ,{useState} from "react"

const BlogForm = ({handleBlogSubmit, setShowForm}) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")
    
    return(<>
    <button onClick={(e) => setShowForm(false)}>cancel</button>
            <form onSubmit={(e)=>handleBlogSubmit(e, {title,author,url})}>
                <p>Title</p>
                <input value={title} onChange={e => setTitle(e.target.value)} />
                <p>Author</p>
                <input value={author} onChange={e => setAuthor(e.target.value)} />
                <p>Url</p>
                <input value={url} onChange={e => setUrl(e.target.value)} /><br/>
                <input type="submit" value="submit" />
            </form>
            </>
    )
}

export default BlogForm