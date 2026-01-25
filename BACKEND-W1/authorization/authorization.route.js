const express = require("express")
const router = express.Router()

const passport = require("passport")

const authorizationController = require("./authorization.controller")
const authorizationMiddleware = require("../middlewares/authorization/authorization")

console.log("MW TYPE:", typeof authorizationMiddleware)
console.log("ME TYPE:", typeof authorizationController.me)

router.post("/login", authorizationController.login)
router.get("/me", authorizationMiddleware, authorizationController.me)

router.get(
    "/auth/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        session: false,
    })
)

router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: `${process.env.FRONTEND_URL}/login`,
    }),
    authorizationController.googleCallback
)


module.exports = router
