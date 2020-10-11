const blogsRouter = require("express").Router();
const { request, response } = require("express");
const Blog = require("../models/Blog");
const User = require("../models/User")
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }
  


blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", {username: 1, name:1})
    response.json(blogs)
});

blogsRouter.post("/", async (request, response) => {
    const body = request.body;
    const token = getTokenFrom(request);
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    try{
        const blog = new Blog({
            title: body.title,
            url: body.url,
            author: body.author,
            likes: body.likes,
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
    const data = await Blog.findByIdAndDelete(request.params.id)
    try {
        response.status(204).end()
    } catch (e) {
        next(e)
    }
    
})

module.exports = blogsRouter