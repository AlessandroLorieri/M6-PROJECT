const Comment = require("./comments.schema")

//cerca tutti i commenti di un post

const getByBlogPostId = (blogPostId) => {
    return Comment.find({ blogPost: blogPostId }).sort({ createdAt: -1 })
}

//cerca commento specifico di uno specifico post 

const getOneByBlogPostAndCommentId = (blogPostId, commentId) => {
    return Comment.findOne({ _id: commentId, blogPost: blogPostId })
}

//crea un nuovo commento

const createForBlogPost = (blogPostId, commentData) => {
    return Comment.create({
        blogPost: blogPostId,
        author: commentData.author,
        text: commentData.text,
    })
}

//modifica un commento

const updateOneByBlogPostAndCommentId = (blogPostId, commentId, updates) => {
    return Comment.findOneAndUpdate(
        { _id: commentId, blogPost: blogPostId },
        { $set: updates },
        { new: true, runValidators: true }
    )
}


// elimina un commento

const deleteOneByBlogPostAndCommentId = (blogPostId, commentId) => {
    return Comment.findOneAndDelete({ _id: commentId, blogPost: blogPostId })
}






module.exports = {
    getByBlogPostId,
    getOneByBlogPostAndCommentId,
    createForBlogPost,
    updateOneByBlogPostAndCommentId,
    deleteOneByBlogPostAndCommentId
}
