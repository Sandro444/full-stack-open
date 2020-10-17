import React from "react"
import { useSelector, connect } from 'react-redux'
import Anecdote from "./Anecdote"
const AnecdoteList = (props) => {
    const anecdotes = props.anecdotes.sort((a, b) => {
        return b.votes - a.votes
    })

    return (
        <>
            {anecdotes.map(anecdote =>
                <Anecdote key={anecdote.id}
                    anecdote={anecdote} />

            )}
        </>)
}

const mapStateToProps = (state) => {
    return {anecdotes:state.anecdotes}
}

export default connect(mapStateToProps)(AnecdoteList)