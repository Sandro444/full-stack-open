import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { getAllAuthors, getAllBooks } from "./queries";
import { Authors } from "./Components/Authors"
import { Books } from "./Components/Books"
import {AddForm} from "./Components/AddForm"
function App() {
  const authors = useQuery(getAllAuthors)
  const books = useQuery(getAllBooks)
  const [mode, setMode] = useState("authors")
  if (authors.loading || books.loading) {
    return <div>loading...</div>
  }
  return (
    <div className="App">
      <h1>apollo client</h1>
      <button onClick={() => setMode("authors")}>authors</button>
      <button onClick={() => setMode("books")}>books</button>
      <button onClick={() => setMode("add")}>add book</button>
      {mode == "authors" ? <Authors authors={authors.data.getAllAuthors} /> : mode === "add"? <AddForm /> : <Books books={books.data.getAllBooks} />}
    </div>
  );
}

export default App;
