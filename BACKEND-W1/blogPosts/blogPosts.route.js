const express = require("express")
const router = express.Router()


const blogPostController = require("./blogPosts.controller")
const blogPostCover = require("../middlewares/uploads/blogPostCover");
const commentsRouter = require("../comments/comments.route")
const authorizationMiddleware = require("../middlewares/authorization/authorization")

router.use(authorizationMiddleware)
router.use("/blogPosts/:id/comments", commentsRouter)



router.get("/blogPosts", blogPostController.findAll)
router.get("/blogPosts/:id", blogPostController.findOne)

router.post("/blogPosts", blogPostController.create)

router.patch("/blogPosts/:id", blogPostController.update)
router.patch("/blogPosts/:blogPostId/cover", blogPostCover.single("cover"), blogPostController.updateCover
);


router.delete("/blogPosts/:id", blogPostController.deletedOne)

module.exports = router