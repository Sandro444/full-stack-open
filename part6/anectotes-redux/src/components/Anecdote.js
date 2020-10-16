import React from "react"
import {useDispatch} from 'react-redux'
import {voteAnecdote} from "../reducers/anecdoteReducer"
import {setNotification} from "../reducers/notificationReducer"
import {voteFor} from "../services/notes"
const Anecdote = ({ anecdote }) => {
    const dispatch = useDispatch()
    const vote = (anecdote) => {
        //dispatch(voteAnecdote(id))
        dispatch(voteAnecdote(anecdote))
        dispatch(setNotification(`you voted for: ${anecdote.content}`, 5))
    }
    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
            </div>
        </div>
    )
}

export default Anecdote