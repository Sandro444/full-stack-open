import axios from 'axios'
const baseUrl = 'http://localhost:3001/api'

const getAll = () => {
  const request = axios.get(`${baseUrl}/blogs`)
  return request.then(response => response.data)
}

const login = (username, password) => {
  const request = axios.post(`${baseUrl}/login`, {username,password})
  return request.then(response => response.data)
}
export default { getAll, login }