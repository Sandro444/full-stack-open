const blogsRouter = require("express").Router();
const { request, response } = require("express");
const Blog = require("../models/Blog");

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
});

blogsRouter.post("/", (request, response) => {
    const blog = new Blog(request.body);

    blog.save().then((result) => {
        response.status(201).json(result);
    }).catch(e => {
        console.log(e.name === 'ValidationError')
        response.status(400).end()
    })
});

module.exports = blogsRouter