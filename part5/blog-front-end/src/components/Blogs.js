import React from "react"
import Blog from "./Blog"
const Blogs = ({blogs}) => {
  const sortedBlogs = blogs.sort((a,b)=>a.likes-b.likes).map(blog =>
    <Blog key={blog.id} blog={blog} />
  )
    return(
    <div style={{display:"flex",flexDirection:"column-reverse"}}>
      {sortedBlogs}
      </div>
    )
}

export default Blogs