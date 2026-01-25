const express = require("express")
const router = express.Router()

const authorizationController = require("./authorization.controller")
const authorizationMiddleware = require("../middlewares/authorization/authorization")

console.log("MW TYPE:", typeof authorizationMiddleware)
console.log("ME TYPE:", typeof authorizationController.me)

router.post("/login", authorizationController.login)
router.get("/me", authorizationMiddleware, authorizationController.me)

module.exports = router
