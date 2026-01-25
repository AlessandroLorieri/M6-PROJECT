const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const AuthorSchema = require("../author/author.schema")

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).send({
                statusCode: 400,
                message: "Email and password are required",
            })
        }

        const normalizedEmail = String(email).trim().toLowerCase()

        const user = await AuthorSchema.findOne({ email: normalizedEmail }).select("+password")

        if (!user) {
            return res.status(401).send({
                statusCode: 401,
                message: "Invalid credentials",
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(401).send({
                statusCode: 401,
                message: "Invalid credentials",
            })
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
        )

        return res.status(200).send({
            statusCode: 200,
            accessToken: token,
        })
    } catch (error) {
        return res.status(500).send({
            statusCode: 500,
            message: "Error during the request",
        })
    }
}

const me = async (req, res) => {
    return res.status(200).send({
        statusCode: 200,
        user: req.user,
    })
}

const googleCallback = async (req, res) => {
    const user = req.user 

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    )

    return res.redirect(`${process.env.FRONTEND_URL}/oauth/google/callback?token=${token}`)
}


module.exports = {
    login,
    me,
    googleCallback
}
