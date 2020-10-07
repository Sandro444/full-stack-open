const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require("./controllers/blogsRouter")
const usersRouter = require('./controllers/usersRouter')
app.use(cors())
app.use(express.json())
app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)

module.exports = app