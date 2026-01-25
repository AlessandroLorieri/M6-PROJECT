const AuthorSchema = require("./author.schema")
const bcrypt = require("bcrypt")

const SALT_ROUNDS = 10

const getAuthors = async (query = {}) => {
    const page = Number(query.page) || 1
    const limit = Number(query.limit) || 10
    const skip = (page - 1) * limit

    const total = await AuthorSchema.countDocuments()
    const users = await AuthorSchema.find().skip(skip).limit(limit)

    return { data: users, page, limit, total, totalPages: Math.ceil(total / limit) }
}



const getAuthorById = async (userId) => {
    const user = await AuthorSchema.findById(userId)
    return user
}

const createAuthor = async (body) => {
    const { name, surname, email, password, dob, avatar } = body

    if (!email) {
        const err = new Error("Email is required")
        err.statusCode = 400
        throw err
    }

    if (!password) {
        const err = new Error("Password is required")
        err.statusCode = 400
        throw err
    }

    const normalizedEmail = String(email).trim().toLowerCase()

    const existing = await AuthorSchema.findOne({ email: normalizedEmail })
    if (existing) {
        const err = new Error("Email already in use")
        err.statusCode = 409
        throw err
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    const newAuthor = new AuthorSchema({
        name,
        surname,
        email: normalizedEmail,
        password: hashedPassword,
        dob,
        avatar,
    })

    const savedUser = await newAuthor.save()

    const obj = savedUser.toObject()
    delete obj.password
    return obj

}

const updateAuthor = async (userId, body) => {
    const options = { new: true }
    return await AuthorSchema.findByIdAndUpdate(userId, body, options)
}

const deleteAuthor = async (userId) => {
    return await AuthorSchema.findByIdAndDelete(userId)
}
module.exports = {
    getAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
}