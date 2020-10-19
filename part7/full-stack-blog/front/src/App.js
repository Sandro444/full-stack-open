import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Blogs from './components/Blogs'
import Blog from "./components/Blog"
import blogService from './services/blogs'
import userService from "./services/users"
import Login from "./components/Login";
import Users from "./components/Users"
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import User from "./components/User"
import { Menu } from "./components/Menu"
const App = () => {
  const [blogs, setBlogs] = useState([])
  const state = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  const userMatch = useRouteMatch("/users/:id")
  const user = userMatch ? state.allUsers.find(user => user._id == userMatch.params.id) : null
  const blogMatch = useRouteMatch("/blogs/:id")
  const blog = blogMatch ? blogs.find(blog => blog.id == blogMatch.params.id) : null
  useEffect(() => {
    let user;
    const token = localStorage.getItem("loggedUser") ? JSON.parse(localStorage.getItem("loggedUser")).token : "none"

    if (token !== "none") {
      user = JSON.parse(localStorage.getItem("loggedUser"))
      dispatch({ type: "set user", payload: user })
    }
    blogService.getAll(token).then(blogs =>
      setBlogs(blogs)
    )
    dispatch({ type: "set token", payload: token })
  }, [])

  useEffect(() => {
    userService.fetchUsers()
      .then(data => dispatch({ type: "set all users", payload: data }))
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("loggedUser") ? JSON.parse(localStorage.getItem("loggedUser")).token : "none"
    blogService.getAll(token).then(blogs =>
      setBlogs(blogs)
    )
    setTimeout(() => dispatch({ type: "updated", payload: "" }), 4000)
  }, [state.status])

  return (
    <div>
      <h1>{state.status}</h1>
      <div>
        <Login />
        <Menu />
      </div>

      <Switch>
        <Route exact path="/">
          <Blogs blogs={blogs} />
          <Users users={state.allUsers} />
        </Route>
        <Route exact path="/users" >
          <Users users={state.allUsers} />
        </Route>
        <Route exact path="/blogs" >
          <Blogs blogs={blogs} />
        </Route>
        <Route path="/users/:id">
          <User user={user} />
        </Route>
        <Route path="/blogs/:id">
          <Blog blog={blog} />
        </Route>
      </Switch>
    </div>
  )
}

export default App