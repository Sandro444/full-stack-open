import React, { useState } from "react"
import blogService from "../services/blogs";
const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(undefined)

    const formSubmit = async (e) => {
        e.preventDefault()
        try {
            let loggedUser = await blogService.login(username, password)
            window.localStorage.setItem("loggedUser", loggedUser)
            setUser({
                username: loggedUser.username
            })
        } catch (e) {
            console.log(e)
        }

    }

    const renderLogin = () => {
        return (
            user == undefined ?
            <>
            <h1>Log in</h1>
                <form onSubmit={formSubmit}>
                    <p>username</p>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} />
                    <p>password</p>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="submit" value="submit" />
                </form> </>
                : <p> welcome user: {user.username} </p>
        )
    }

    return (
        renderLogin()
    )
}

export default Login