import React,{useState} from 'react'
import {BlogInfo} from "./BlogInfo"
const Blog = ({ blog }) => {
  const [showMore, setShowMore] = useState(false)
  return(<div style = {singleBlogStyle}>

    <h4 className="blog-title">{blog.title}</h4>
    <p className="blog-author"> {blog.author} </p>
    <button onClick = {(e)=> setShowMore(!showMore)}> show {showMore == true? "less":"more"}</button>
    {showMore == false? null:<BlogInfo blog={blog} />}
  </div>)}


const singleBlogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}
export default Blog
