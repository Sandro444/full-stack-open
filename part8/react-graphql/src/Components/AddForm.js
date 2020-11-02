import React, { useState } from "react"
import { useMutation } from "@apollo/client";
import {addBook, getAllBooks, getAllAuthors} from "../queries"
export const AddForm = () => {
    const [title, setTitle] = useState("")
    const [published, setPublished] = useState("")
    const [author, setAuthor] = useState("")
    const [genres, setGenres] = useState([])
    const [genreValue, setGenreValue] = useState("")
    const [createBook] = useMutation(addBook, {refetchQueries: [{query : getAllBooks, getAllAuthors},
        {query : getAllAuthors}]})
    const submitBook = (e) => {
        e.preventDefault()
        console.log(title,published, author)
        createBook({variables: {
            title:title,
            published:Number(published),
            genres:genres,
            author:author}})
        setGenreValue("")
        setGenres([])
        setAuthor("")
        setPublished("")
        setTitle("")
    }
    return (
        <div>
            <h2>Add Book</h2>
            title: <input value={title} onChange={e=>setTitle(e.target.value)} /> <br />
        published: <input type="number" value={published} onChange={e=>setPublished(e.target.value)} /> <br />
        author: <input value={author} onChange={e=>setAuthor(e.target.value)} /> <br />
        add genre: <input value={genreValue} onChange={e=>setGenreValue(e.target.value)} />  <button onClick={() => {
            setGenres(genres.concat(genreValue))
            setGenreValue("")
        }}>add</button> <br />
            {genres.map(g => <ul>{g}</ul>)}

            <button type="submit" onClick={submitBook}>submit</button>
        </div>
    )
}