import React from "react"
import { useSelector, useDispatch } from "react-redux";
import {setFilter} from "../reducers/filterReducer"
const Filter = () => {
    const filterValue = useSelector(state => state.filter)
    const allAnecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()
    const filterAnecdotes = () => {
        if(filterValue !== ""){
            let filtered = allAnecdotes.filter(anecdote => {
                return anecdote.content.toLowerCase().indexOf(filterValue) >= 0
            })

            return filtered.map(anecdote => {
                return <li key={anecdote.id}> {anecdote.content} </li>
            })
        }
    }
    return <div>
        filter <input value={filterValue} onChange={e => dispatch(setFilter(e.target.value))}></input>
        <div>
            {filterAnecdotes()}
        </div>
    </div>
}

export default Filter