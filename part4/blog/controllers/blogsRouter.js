const blogsRouter = require("express").Router();
const { request, response } = require("express");
const Blog = require("../models/Blog");

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
});

blogsRouter.post("/", async (request, response) => {
    const blog = new Blog(request.body);

    try{
        const data = await blog.save()
        response.status(201).json(data);
    }catch(e) {
        console.log(e.name === 'ValidationError')
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