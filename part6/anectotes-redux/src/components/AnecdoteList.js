import React from "react"
import { useSelector } from 'react-redux'
import Anecdote from "./Anecdote"
const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes.sort((a, b) => {
        return b.votes - a.votes
    }))

    return (
        <>
            {anecdotes.map(anecdote =>
                <Anecdote key={anecdote.id}
                    anecdote={anecdote} />

            )}
        </>)
}

export default AnecdoteList