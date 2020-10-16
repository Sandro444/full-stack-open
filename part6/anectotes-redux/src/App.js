import React, { useEffect } from 'react'
import AnendoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Notification from "./components/Notification"
import Filter from "./components/Filter"
import { dispatchInitData } from "./reducers/anecdoteReducer";
import { useDispatch } from "react-redux"
import { initializeData } from "./services/notes";
const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(dispatchInitData())
  },[dispatch])
  return (
    <div>
      <Notification />
      <Filter />
      <AnendoteForm />
      <h2>Anecdotes</h2>
      <AnecdoteList />
    </div>
  )
}

export default App