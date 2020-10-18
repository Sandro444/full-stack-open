import React from "react"
import Blog from "./Blog"
import {Link} from "react-router-dom"
const Blogs = ({blogs}) => {
  const sortedBlogs = blogs.sort((a,b)=>a.likes-b.likes).map(blog =>{
    return <Link to={`/blogs/${blog.id}`}> {blog.title} </Link>
  }
    
    
  )
    return(
      <><h1>All</h1>
    <div style={{display:"flex",flexDirection:"column-reverse"}}>
      
      {sortedBlogs}
      </div>
      </>
    )
}

export default Blogs