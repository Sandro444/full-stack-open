import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  let anecdoteVotes = []
  props.anecdotes.forEach((element, index) => {
    
    anecdoteVotes.push({
      [index]: 0
    })
  });

  const [votes, setVotes] = useState(anecdoteVotes)

  const nextAnecdote = () => {
    let index = Math.floor(Math.random() * props.anecdotes.length)
    setSelected(index)
  }
  
  const mostVotes = () => {
    let mostVote = 0;
    let mostVoteIndex = 0;
    votes.map((vote, index) => {
      if(vote[index] > mostVote){
        mostVote = vote[index]
        mostVoteIndex = index
      }
      return null
    })

    return(
      <>
      <p> {anecdotes[mostVoteIndex]} </p>
      <p> has {mostVote} votes </p>
      </>
    )
  }

  const voteAnecdote = () => {
    let newVotes = votes.concat()
    newVotes[selected][selected] = newVotes[selected][selected] + 1
    setVotes(newVotes)
  }

  return (
    <div>
      <h1>Anecdote of the dat</h1>
      {props.anecdotes[selected]}
      <br></br>
      votes: {votes[selected][selected]}
      <br></br>
      <button onClick={nextAnecdote}>next anecdote</button>
      <button onClick={voteAnecdote}>vote</button>

      <h1>Anecdote with most votes</h1>
      {mostVotes()}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)