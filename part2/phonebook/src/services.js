import axios from "axios"

const getPersons = () => {
    let request = axios.get('http://localhost:3001/persons')
    return request.then(response=>response.data)
}

const createPerson = (personObject) => {
    let request = axios.post("http://localhost:3001/persons", personObject)
    return request.then(response=>response.data)
}

const updatePerson = (id, personObject) => {
    let request = axios.put(`http://localhost:3001/persons/${id}`, personObject)
    return request.then(response=>response.data)
}

const deletePerson = (id) => {
    let request = axios.delete(`http://localhost:3001/persons/${id}`)
    return request.then(response=>response.data)
}

export default {getPersons, createPerson, updatePerson, deletePerson}