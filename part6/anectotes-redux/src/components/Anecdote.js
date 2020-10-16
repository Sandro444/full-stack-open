import React from "react"
import {useDispatch} from 'react-redux'
import {voteAnecdote} from "../reducers/anecdoteReducer"
import {setNotification} from "../reducers/notificationReducer"
const Anecdote = ({ anecdote }) => {
    const dispatch = useDispatch()
    const vote = (id) => {
        dispatch(voteAnecdote(id))
        dispatch(setNotification(`you voted for: ${anecdote.content}`))
    }
    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
        </div>
    )
}

export default Anecdote