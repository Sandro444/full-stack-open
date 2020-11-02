import React, { useState } from "react"
import { useMutation } from "@apollo/client";
import { editBornYear, getAllAuthors } from "../queries";

export const BornYearForm = () => {
    const [name, setName] = useState("")
    const [year, setYear] = useState("")
    
    const [setBornYear] = useMutation(editBornYear)
    const changeYear = (e) => {
        e.preventDefault()
        setBornYear({variables: {
            author: name,
            bornYear: Number(year)
        }}).then(()=>console.log("finished"))
    }
    return(
        <div>
            <h2>change author born year</h2>
            name: <input value={name} onChange={e=>setName(e.target.value)} /> <br />
            year: <input type="number" value={year} onChange={e=>setYear(e.target.value)} /> <br />
            <button onClick={changeYear} type="submit">submit</button>
        </div>
    )
}