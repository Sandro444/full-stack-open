import axios from "axios"

const baseUrl = 'http://localhost:3001/api'

const fetchUsers = () => {
    let response = axios.get(`${baseUrl}/users`)
    return response.then(response=>response.data)
}

export default {
    fetchUsers
}