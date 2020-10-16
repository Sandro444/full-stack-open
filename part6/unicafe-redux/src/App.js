import React from 'react'
import AnendoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
const App = () => {
  

  return (
    <div>
      <AnendoteForm />
      <h2>Anecdotes</h2>
      <AnecdoteList />
    </div>
  )
}

export default App