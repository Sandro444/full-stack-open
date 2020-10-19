import React from "react"
import { Link} from "react-router-dom";
const Users = ({users}) => {
    return (
        <div>
            <h1>
                All Users
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