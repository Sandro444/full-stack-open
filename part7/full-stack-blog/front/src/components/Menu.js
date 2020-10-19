import React from "react"
import {Link} from "react-router-dom"

export const Menu = () => {
    return (
        <div style={menuStyle}>
            <Link style={linkStyle} to="/blogs">blogs</Link>
            <Link style={linkStyle} to="/users">users</Link>
            <Link style={linkStyle} to="/">home</Link>
        </div>
    )
}

const menuStyle = {
    display: "block",
    width: "100wh",
    backgroundColor: "black",
    padding: 10
}

const linkStyle = {
    color: "white",
    textDecoration:"none",
    padding: 10
}