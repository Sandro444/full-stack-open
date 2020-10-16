import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

export const initializeData = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export const createNew = async (content) => {
    const anecdote = {
        content: content,
        votes: 0
    }
    const response = await axios.post(baseUrl, anecdote)
    return response.data
}

export const voteFor = async (anecdote) => {
    const toUpdate = {...anecdote, votes: anecdote.votes + 1}
    const response  = await axios.put(`${baseUrl}/${anecdote.id}`, toUpdate)
    return response.data
}