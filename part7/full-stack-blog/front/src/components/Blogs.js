import React from "react"
import Blog from "./Blog"
import {Link} from "react-router-dom"
const Blogs = ({blogs}) => {
  const sortedBlogs = blogs.sort((a,b)=>a.likes-b.likes).map(blog =>{
    return <li key={blog.id}><Link to={`/blogs/${blog.id}`}> {blog.title} </Link></li>
  }
    
    
  )
    return(
      <><h1>All Blogs</h1>
    <div style={{display:"flex",flexDirection:"column-reverse"}}>
      <ul>
      {sortedBlogs}
      </ul>
      </div>
      </>
    )
}

export default Blogs