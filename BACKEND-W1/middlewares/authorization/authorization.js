const jwt = require("jsonwebtoken")
const Author = require("../../author/author.schema")

const authorizationMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).send({
                statusCode: 401,
                message: "Missing or invalid Authorization header",
            })
        }

        const token = authHeader.split(" ")[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await Author.findById(decoded.id)

        if (!user) {
            return res.status(401).send({
                statusCode: 401,
                message: "User not found",
            })
        }

        req.user = user

        next()
    } catch (error) {
        return res.status(401).send({
            statusCode: 401,
            message: "Invalid or expired token",
        })
    }
}

module.exports = authorizationMiddleware
