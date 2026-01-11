const BlogPostSchema = require("./blogPosts.schema")

const getBlogPosts = async (query = {}) => {
    const page = Number(query.page) || 1
    const limit = Number(query.limit) || 10
    const skip = (page - 1) * limit

    const filter = {}
    if (query.title) {
        filter.title = { $regex: query.title, $options: "i" }
    }

    if (query.author) {
        filter.author = query.author
    }

    const total = await BlogPostSchema.countDocuments(filter)
    const posts = await BlogPostSchema.find(filter).skip(skip).limit(limit)

    return {
        data: posts,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
    }
}

const getBlogPostsById = async (id) => {
    return await BlogPostSchema.findById(id)
}

const createBlogPost = async (body) => {
    const newPost = new BlogPostSchema(body)
    return await newPost.save()
}

const updateBlogPost = async (id, body) => {
    const options = { new:true, runValidators: true }
    return await BlogPostSchema.findByIdAndUpdate(id, body, options)
}

const deleteBlogPost = async (id) => {
    return await BlogPostSchema.findByIdAndDelete(id)
}

module.exports = {
    getBlogPosts,
    getBlogPostsById,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
}