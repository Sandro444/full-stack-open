import { initializeData , createNew, voteFor} from "../services/notes";
const getId = () => (100000 * Math.random()).toFixed(0)

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newNote = await createNew(anecdote)
    dispatch({
      type: "CREATE",
      payload: newNote
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const updated = await voteFor(anecdote)
    dispatch({
      type: "VOTE",
      payload: updated
    })
  }
   
}

export const dispatchInitData = () => {
  return async dispatch => {
    const notes = await initializeData()
    dispatch({
      type: "INIT_DATA",
      payload: notes
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      let changedAnectodes = state.map(anectode => {
        if (anectode.id == action.payload.id) {
          return action.payload
        } else {
          return anectode
        }
      })
      return changedAnectodes
    case "CREATE":
      return [...state, action.payload]
    case "INIT_DATA":
      return action.payload
    default:
      return state
  }

}

export default anecdoteReducer