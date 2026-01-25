const express = require("express")
const cors = require("cors")
require("dotenv").config();

const passport = require("passport")
require("./authorization/google.strategy")

const startServer = require("./database/index")
const authorRoute = require("./author/author.route")
const blogPostsRoute = require("./blogPosts/blogPosts.route")
const authorizationRoute = require("./authorization/authorization.route")

const PORT = process.env.PORT || 4545

const app = express()
app.use(express.json())
app.use(cors())

app.use(passport.initialize())

app.use("/", authorizationRoute)

app.use("/", authorRoute)
app.use("/", blogPostsRoute)


startServer(PORT, app)

