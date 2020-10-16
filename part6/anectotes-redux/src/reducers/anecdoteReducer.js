import Anecdote from "../components/Anecdote"

const getId = () => (100000 * Math.random()).toFixed(0)

export const createAnecdote = (anecdote) => {
  console.log(anecdote)
  return {
    type: "CREATE",
    payload: anecdote
  }
}

export const voteAnecdote = (id) => {
  return {
    type: "VOTE",
    payload: id
  }
}

export const dispatchInitData = (data) => {
  return {
    type: "INIT_DATA",
    data: data
  }


}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      let changedAnectodes = state.map(anectode => {
        if (anectode.id == action.payload) {
          let targetAnecdote = anectode
          targetAnecdote.votes = anectode.votes + 1;
          return targetAnecdote
        } else {
          return anectode
        }
      })
      return changedAnectodes
    case "CREATE":
      return [...state, action.payload]
    case "INIT_DATA":
      return action.data
    default:
      return state
  }

}

export default anecdoteReducer