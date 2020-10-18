import React from "react"
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import User from "./User"
const Users = ({users}) => {
    console.log(users)
    return (
        <div>
            <h1>
                users
            </h1>
            <ul>
                {users.map(user=>{
                    return <li key={user.username}><Link to={`/users/${user._id}`}><strong>{user.name}</strong> has created {user.blogs.length} blogs</Link></li>
                })}
            </ul>
        
        </div>
        
    )
}

export default Users