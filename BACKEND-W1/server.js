const express = require("express")
const cors = require("cors")

const startServer = require("./database/index")
const authorRoute = require("./author/author.route")

const blogPostsRoute = require("./blogPosts/blogPosts.route")

const PORT = 4545

const app = express()
app.use(express.json())

app.use(cors())

app.use("/", authorRoute)
app.use("/",blogPostsRoute)


startServer(PORT, app)

