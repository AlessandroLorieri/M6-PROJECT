const express = require("express")
const router = express.Router()
const blogPostController = require ("./blogPosts.controller")

router.get("/blogPosts",blogPostController.findAll)
router.get("/blogPosts/:id", blogPostController.findOne)

router.post("/blogPosts", blogPostController.create)

router.patch("/blogPosts/:id",blogPostController.update)

router.delete("/blogPosts/:id", blogPostController.deletedOne)

module.exports = router