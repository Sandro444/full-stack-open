import React from "react"
import {createAnecdote} from "../reducers/anecdoteReducer"
import {setNotification} from "../reducers/notificationReducer"
import {useDispatch } from 'react-redux'
const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const create = async (content) => {
        dispatch(createAnecdote(content))
        dispatch(setNotification("new anecdote has been created", 5))
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