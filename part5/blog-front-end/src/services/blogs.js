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

const createBlog = (blog, token) => {
  const request = axios.post(`${baseUrl}/blogs`, blog, {headers:{"authorization" : `Bearer ${token}`}})
  return request.then(response => response.data)
}

export default { getAll, login, createBlog }