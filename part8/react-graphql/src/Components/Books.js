import React from "react"

export const Books = ({ books }) => {
    return (
        <div>
            {books.map((book) => {
                return (
                    <ul key={book.id}>
                        <li style={liStyle}>
                            <b>title:</b> {book.title}
                        </li> {" | "}
                        <li style={liStyle}>
                            <b>published:</b> {book.published}
                        </li> {" | "}
                        <li style={liStyle}>
                            <b>author</b>: {book.author}
                        </li> {" | "}
                        <li style={liStyle}>
                            <b>genres</b>: {book.genres.map(g=>g + ", ")}
                        </li>
                    </ul>
                )
            })}
        </div>
    )
}

const liStyle = {
    display: "inline-block"
}