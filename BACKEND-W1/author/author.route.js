const express = require ("express")

const router = express.Router()
const authorController= require ("./author.controller")
const uploadAuthorAvatar = require ("../middlewares/uploads/authorAvatar")
const authorizationMiddleware = require("../middlewares/authorization/authorization")

//l unica rotta senza controllo token
router.post("/authors",authorController.create)

// da qui rotte con controllo del token
router.use(authorizationMiddleware)

router.get("/authors",authorController.findAll)
router.get("/authors/:userId",authorController.findOne)
router.get("/authors/:userId/blogPosts", authorController.getAuthorBlogPosts)

router.patch("/authors/:userId",authorController.update)
router.patch("/authors/:authorId/avatar",uploadAuthorAvatar.single("avatar"),authorController.uploadAvatar)

router.delete("/authors/:userId",authorController.deleteOne)
module.exports= router