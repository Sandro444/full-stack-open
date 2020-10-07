const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/Blog')
const { initialBlogs } = require('./test_helpers')
const helper = require("./test_helpers")
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
  
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
  
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
  })

test('blogs are returned as json', async () => {
    const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const contents = response.body.map(r => r.content)

  expect(response.body).toHaveLength(initialBlogs.length)
  /* expect(contents).toContain(
    'async/await simplifies making async calls'
  ) */
})

test('id key is defined', async () => {
    const response = await api.get('/api/blogs')

    const {id} = response.body[0]
    expect(id).toBeDefined()
})

test('blogs are created', async () => {
    const blog = {
        title: "Example",
        author: "Admin",
        url: "none",
        likes: 0

    }
    await api.post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const contents = response.body.map(g => g.title)

  expect(contents).toHaveLength(initialBlogs.length + 1)
  expect(contents).toContain(
    'Example'
  )
})

test('blogs have default 0 like', async () => {
    const blog = {
        title: "0 like",
        author: "Admin",
        url: "none"

    }
    await api.post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const contents = response.body.map(g => g.title)
    const {likes} = response.body[response.body.length - 1]
  expect(contents).toContain(
    '0 like'
  )
  expect(likes).toBe(0)
})

test('blogs have required parameters', async () => {
    const blog = {
        author: "Admin",
        likes: 0

    }
    await api.post('/api/blogs')
    .send(blog)
    .expect(400)


})

test('blog with correct id is deleted', async () => {
    const blog = await api.get('/api/blogs');
    const id = blog.body[0].id;

    api.delete(`/api/blogs/${id}`)
    .expect(204)
})

test('blog with correct id is updated', async () => {
    const blog = await api.get('/api/blogs');
    const id = blog.body[0].id

    const newBlog = {
        title: "updated",
        author: "updateman",
        url: "none",
        likes: 30
    }

    const data = await api.put(`/api/blogs/${id}`).send(newBlog).expect(201)

    expect(data.body.title).toEqual("updated")
})
afterAll(() => {
  mongoose.connection.close()
})