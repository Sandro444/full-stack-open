import React from "react"
import Blog from "./Blog"
const Blogs = ({blogs}) => {
    return(
    <div style={{display:"flex",flexDirection:"column-reverse"}}>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>
    )
}

export default Blogs