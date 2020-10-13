import React from "react"

export const BlogInfo = ({blog}) => {
    return (
        <>
        <p>Author: {blog.author}</p>
        <p>Likes: {blog.likes} <button>like</button> </p>
        <p>Url: {blog.url} </p>
        </>
    )
}