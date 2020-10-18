import React ,{useState} from "react"

const BlogForm = ({handleBlogSubmit, setShowForm}) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")
    
    return(<>
    <button onClick={(e) => setShowForm(false)}>cancel</button>
            <form className="create-form" onSubmit={(e)=>handleBlogSubmit(e, {title,author,url})}>
                <p>Title</p>
                <input className="blog-create-title" value={title} onChange={e => setTitle(e.target.value)} />
                <p>Author</p>
                <input className="blog-create-author" value={author} onChange={e => setAuthor(e.target.value)} />
                <p>Url</p>
                <input className="blog-create-url" value={url} onChange={e => setUrl(e.target.value)} /><br/>
                <input type="submit" value="submit" />
            </form>
            </>
    )
}

export default BlogForm