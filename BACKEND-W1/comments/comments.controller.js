const mongoose = require("mongoose")
const commentsService = require("./comments.services")

const getCommentsForBlogPost = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).send({ message: "Invalid blogPost id" })
    }

    try {
        const comments = await commentsService.getByBlogPostId(id)
        return res.status(200).send(comments)
    } catch (err) {
        return next(err)
    }
}

const getSingleCommentForBlogPost = async (req, res, next) => {
    const { id, commentId } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).send({ message: "Invalid blogPost id" })
    }

    if (!mongoose.isValidObjectId(commentId)) {
        return res.status(400).send({ message: "Invalid comment id" })
    }

    try {
        const comment = await commentsService.getOneByBlogPostAndCommentId(id, commentId)

        if (!comment) {
            return res.status(404).send({ message: "Comment not found for this blog post" })
        }

        return res.status(200).send(comment)
    } catch (err) {
        return next(err)
    }
}


const createCommentForBlogPost = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).send({ message: "Invalid blogPost id" })
    }

    const { author, text } = req.body

    if (!author || !text) {
        return res.status(400).send({ message: "author and text are required" })
    }

    try {
        const created = await commentsService.createForBlogPost(id, { author, text })
        return res.status(201).send(created)
    } catch (err) {
        return next(err)
    }
}


const updateCommentForBlogPost = async (req, res, next) => {
    const { id, commentId } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).send({ message: "Invalid blogPost id" })
    }
    if (!mongoose.isValidObjectId(commentId)) {
        return res.status(400).send({ message: "Invalid comment id" })
    }

    const updates = {}
    if (req.body.author !== undefined) updates.author = req.body.author
    if (req.body.text !== undefined) updates.text = req.body.text

    if (Object.keys(updates).length === 0) {
        return res.status(400).send({ message: "Nothing to update" })
    }

    try {
        const updated = await commentsService.updateOneByBlogPostAndCommentId(id, commentId, updates)

        if (!updated) {
            return res.status(404).send({ message: "Comment not found for this blog post" })
        }

        return res.status(200).send(updated)
    } catch (err) {
        return next(err)
    }
}


const deleteCommentForBlogPost = async (req, res, next) => {
    const { id, commentId } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).send({ message: "Invalid blogPost id" })
    }
    if (!mongoose.isValidObjectId(commentId)) {
        return res.status(400).send({ message: "Invalid comment id" })
    }

    try {
        const deleted = await commentsService.deleteOneByBlogPostAndCommentId(id, commentId)

        if (!deleted) {
            return res.status(404).send({ message: "Comment not found for this blog post" })
        }

        return res.status(204).send()
    } catch (err) {
        return next(err)
    }
}



module.exports = {
    getCommentsForBlogPost,
    getSingleCommentForBlogPost,
    createCommentForBlogPost,
    updateCommentForBlogPost,
    deleteCommentForBlogPost
}
