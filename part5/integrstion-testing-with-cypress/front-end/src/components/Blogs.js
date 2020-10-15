import React from "react"
import Blog from "./Blog"
const Blogs = ({blogs}) => {
  const sortedBlogs = blogs.sort((a,b)=>a.likes-b.likes).map((blog,index) =>
    <Blog key={blog.id} blog={blog} index={index} />
  )
    return(
    <div className="all-blogs" style={{display:"flex",flexDirection:"column-reverse"}}>
      {sortedBlogs}
      </div>
    )
}

export default Blogs