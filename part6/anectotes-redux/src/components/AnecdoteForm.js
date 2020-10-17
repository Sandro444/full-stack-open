import React from "react"
import {createAnecdote} from "../reducers/anecdoteReducer"
import {setNotification} from "../reducers/notificationReducer"
import {useDispatch, connect } from 'react-redux'
const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const create = async (content) => {
        props.createAnecdote(content)
        props.setNotification("new anecdote has been created", 5)
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

const mapDispatchToProps = {
    setNotification,
    createAnecdote
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)