const blogsRouter = require("express").Router();
const { request, response } = require("express");
const Blog = require("../models/Blog");
const User = require("../models/User")
const jwt = require('jsonwebtoken')


  


blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", {username: 1, name:1})
    response.json(blogs)
});

blogsRouter.post("/", async (request, response) => {
    const body = request.body;
    const token = request.token;
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    console.log(
        "Decoded", decodedToken
    )
    const user = await User.findById(decodedToken.id)
    console.log("user", user)
    try{
        const blog = new Blog({
            title: body.title,
            url: body.url,
            author: body.author,
            likes: body.likes? body.likes : 0,
            user: user._id
        })
        const data = await blog.save()
        const blogId = data._id
        user.blogs = user.blogs.concat(blogId)
        await user.save();
        response.status(201).json(data);
    }catch(e) {
        console.log(e.name === 'ValidationError')
        console.log(e)
        response.status(400).end()
    }
})

blogsRouter.put("/:id", async (request, response, next) => {
    const blog = request.body;
    const data = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    try{
        response.status(201).json(data)
    }catch(e) {
        console.log(e.name === 'ValidationError')
        response.status(400).end()
    }
});

blogsRouter.delete("/:id", async (request, response, next) => {
    console.log("here:blog-delete")
    const token = request.token;
    
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const userId = decodedToken.id;
    const targetedBlog = await Blog.findById(request.params.id);
    if(targetedBlog.user.toString() == userId.toString()){
        
        const data = await Blog.findByIdAndDelete(request.params.id)
        try {
            response.status(204).json({"info":"blog deleted"}).end()
        } catch (e) {
            next(e)
        }
    } else{
        console.log("user-id and blog id dont match")
        console.log(targetedBlog.user.toString())
        console.log(userId.toString())
    }
    
})

module.exports = blogsRouter