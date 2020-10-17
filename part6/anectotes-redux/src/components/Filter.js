import React from "react"
import { useSelector, useDispatch, connect } from "react-redux";
import {setFilter} from "../reducers/filterReducer"
const Filter = (props) => {
    const filterValue = props.filter
    const allAnecdotes = props.anecdotes
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
        filter <input value={filterValue} onChange={e =>props.setFilter(e.target.value)}></input>
        <div>
            {filterAnecdotes()}
        </div>
    </div>
}

const mapStateToProps = (state) => {
    return {
        filter: state.filter,
        anecdotes: state.anecdotes
    }
}

const mapDispatchToProps = {
    setFilter
}
export default connect(mapStateToProps, mapDispatchToProps)(Filter)