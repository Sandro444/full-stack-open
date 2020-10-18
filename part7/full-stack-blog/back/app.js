const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require("./controllers/blogsRouter")
const usersRouter = require('./controllers/usersRouter')
const loginRouter = require('./controllers/loginRouter')
const middleware = require("./utils/middleware")

//app.use(middleware.tokenExtractor)
app.use(cors())
app.use(express.json())
app.use("/api/blogs", middleware.tokenExtractor , blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

module.exports = app