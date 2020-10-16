import React from "react"
import {createAnecdote} from "../reducers/anecdoteReducer"
import {useDispatch } from 'react-redux'
const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const create = (content) => {
        dispatch(createAnecdote(content))
    }
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={(e) => {
                e.preventDefault()
                return create(e.target.content.value)
            }}>
                <div><input name="content" /></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm