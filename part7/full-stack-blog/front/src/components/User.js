import React from "react"

const User = ({user}) => {
    if(!user){
        return <div></div>
    }else{
        return (
            <div>
                <h1>user: {user.name}</h1>
                <h2>blogs</h2>
                <ul>
                    {user.blogs.map(blog => {
                        return <li key={blog.id}>
                            {blog.title}
                        </li>
                    })}
                </ul>
            </div>
        )
    }
    
}

export default User