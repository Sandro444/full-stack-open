import React from "react"
import {useDispatch} from 'react-redux'
import {voteAnecdote} from "../reducers/anecdoteReducer"
import {setNotification} from "../reducers/notificationReducer"
const Anecdote = ({ anecdote }) => {
    const dispatch = useDispatch()
    const vote = (id) => {
        dispatch(voteAnecdote(id))
        dispatch(setNotification(`anecdote with id ${anecdote.id} has gained 1 vote`))
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