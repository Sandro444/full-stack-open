import axios from 'axios'
const baseUrl = 'http://localhost:3001/api'

const getAll = (token) => {
  const request = axios.get(`${baseUrl}/blogs`, {headers:{
    "Authorization":`Bearer ${token}`
  }})
  return request.then(response => response.data)
}

const login = (username, password) => {
  const request = axios.post(`${baseUrl}/login`, {username,password})
  return request.then(response => response.data)
}

const deleteBlog = (blog, token) => {
  const request = axios.delete(`${baseUrl}/blogs/${blog.id}`, {headers:{
    "authorization": `Bearer ${token}`
  }})
  return request.then(response => response.data)
}

const updateBlog = (blog, token) => {
  const request = axios.put(`${baseUrl}/blogs/${blog.id}`, {
    author: blog.author,
    id: blog.id,
    likes: blog.likes + 1,
    url: blog.url,
    user: blog.user["id"]
  },
  {headers:{"authorization" : `Bearer ${token}`}})
  return request.then(response=>response.data)
}

const createBlog = (blog, token) => {
  const request = axios.post(`${baseUrl}/blogs`, blog, {headers:{"authorization" : `Bearer ${token}`}})
  return request.then(response => response.data)
}

export default { getAll, login, createBlog, updateBlog, deleteBlog}