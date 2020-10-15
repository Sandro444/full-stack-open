const Blog = require("../models/Blog")
const initialBlogs = [
    {
      title: 'HTML is easy',
      author: "Guest",
      url: "none",
      likes: 1
    },
    {
        title: 'CSS is easy',
        author: "Guest",
        url: "none",
        likes: 2
      }
  ]
  
  const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon', author: "Admin", url: "none", likes: 0 })
    await blog.save()
    await blog.remove()
  
    return blog._id.toString()
  }
  
  const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }
  
  module.exports = {
    initialBlogs, nonExistingId, blogsInDB
  }