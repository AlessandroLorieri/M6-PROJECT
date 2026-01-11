const AuthorSchema =require("./author.schema")

const getAuthors = async (query = {}) => {
    const page = Number(query.page) || 1
    const limit = Number (query.limit) || 10
    const skip = (page - 1) * limit

    const total = await AuthorSchema.countDocuments()
    const users = await AuthorSchema.find().skip(skip).limit(limit)

    return {data: users, page, limit, total, totalPages:Math.ceil(total/limit)}
}



const getAuthorById= async (userId) => {
    const user = await AuthorSchema.findById(userId)
    return user
}

const createAuthor = async (body) => {
    const newAuthor = new AuthorSchema(body)
    const savedUser = await newAuthor.save()
    return savedUser
}

const updateAuthor = async (userId,body) => {
    const options ={new:true}
    return await AuthorSchema.findByIdAndUpdate(userId,body,options)
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