const express = require ("express")

const router = express.Router()
const authorController= require ("./author.controller")

router.get("/authors",authorController.findAll)

router.get("/authors/:userId",authorController.findOne)

router.get("/authors/:userId/blogPosts", authorController.getAuthorBlogPosts)


router.post("/authors",authorController.create)

router.patch("/authors/:userId",authorController.update)

router.delete("/authors/:userId",authorController.deleteOne)
module.exports= router