const express = require("express")
const router = express.Router({ mergeParams: true })

const commentsController = require("./comments.controller")

router.get("/", commentsController.getCommentsForBlogPost)
router.get("/:commentId", commentsController.getSingleCommentForBlogPost)

router.post("/", commentsController.createCommentForBlogPost)

router.patch("/:commentId", commentsController.updateCommentForBlogPost)

router.delete("/:commentId", commentsController.deleteCommentForBlogPost)


module.exports = router

