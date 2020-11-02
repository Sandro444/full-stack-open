import React from "react"
import { BornYearForm } from "./BornYearForm";
export const Authors = ({ authors }) => {
    return (
        <div>
            {authors.map((author) => {
                return <ul key={author.id}>
                    <li style={liStyle}>
                        <b>name:</b> {author.name}
                    </li> {" | "}
                    <li style={liStyle}>
                        <b>born:</b> {author.born? author.born: "N/A"}
                    </li> {" | "}
                    <li style={liStyle}>
                        <b>book count</b>: {author.bookCount}
                    </li>
                </ul>
            })}
            <BornYearForm />
        </div>
    )
}

const liStyle = {
    display: "inline-block"
}