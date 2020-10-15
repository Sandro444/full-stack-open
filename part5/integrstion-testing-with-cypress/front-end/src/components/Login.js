import React, { useState, useContext } from "react"
import blogService from "../services/blogs";
import _ from "underscore"
import CreateBlog from "./CreateBlog"
import { BlogContext } from "../App";

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(undefined)
    const [message, setMessage] = useState("")
    const [removed, setRemoved] = useState(false)

    const {state, dispatch} = useContext(BlogContext)
    const formSubmit = async (e) => {
        e.preventDefault()
        try {
            let loggedUser = await blogService.login(username, password)
            dispatch({type: "set token", payload: loggedUser.token})
            window.localStorage.setItem("loggedUser", JSON.stringify(loggedUser))
            setUser({
                username: loggedUser.username
            })
            setUsername("")
            setPassword("")
        } catch (e) {
            if(e.response.status == 401){
                setMessage(e.response.data.error)
                setTimeout(()=>setMessage(""),4000)
            }
            console.log(e.response.status)
        }

    }

    const logoutHandler = (e) => {
        setUser(undefined)
        setRemoved(true)
        localStorage.removeItem("loggedUser")
    }

    const renderLogin = () => {
        let currentUser = user ? user: localStorage.getItem("loggedUser")? localStorage.getItem("loggedUser") : undefined
        currentUser = _.isEqual(user, currentUser)? currentUser : JSON.parse(currentUser)
        return (
            currentUser == undefined ?
            <div>
            <h1 style={{color:"red"}}>{message? message:""}</h1>
            <h1>Log in</h1>
                <form onSubmit={formSubmit}>
                    <p>username</p>
                    <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <p>password</p>
                    <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input id="login-button" type="submit" value="submit" />
                </form> </div>
                : <div><p> welcome user: {currentUser.username} <button className="logout-button" onClick={logoutHandler}>logout</button> </p>
                    <CreateBlog user={currentUser} />
                </div>
        )
    }

    return (
        renderLogin()
    )
}

export default Login