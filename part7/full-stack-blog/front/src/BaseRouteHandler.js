import React, { useState, useEffect } from 'react'
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./components/Login"
import App from "./App"
import User from "./components/User"
const BaseRouteHandler = () => {
    const state = useSelector(state=>state.blogs)
    const match = useRouteMatch("/users/:id")
    const user = match? state.allUsers.find(user=>user._id == match.params.id):null
    console.log(state)
    return <div>
        <Switch>
            <Route exact path="/">
              <App />
            </Route>
            <Route path="/users/:id">
                <div>
                <Login />
                <User user = {user}></User>
                </div>
            </Route>
        </Switch>
    </div>
}

export default BaseRouteHandler