import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { HexColorPicker } from "react-colorful";
import "react-colorful/dist/index.css";
import {voteAnecdote, createAnecdote} from "./reducers/anecdoteReducer"


const App = () => {
  const anecdotes = useSelector(state => state.sort((a,b) => {
    return b.votes - a.votes
  }))
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  const create = (content) => {
    dispatch(createAnecdote(content))
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit = { (e) => {
        e.preventDefault()
        return create(e.target.content.value)
      }}>
        <div><input name="content" /></div>
        <button>create</button>
      </form>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App