const blogPostService = require("./blogPosts.services")
const AuthorSchema = require("../author/author.schema")

const findAll = async (request, response) => {
    try {
        const result = await blogPostService.getBlogPosts(request.query)

        response.status(200).send({
            statusCode: 200,
            ...result,
        })
    } catch (error) {
        response.status(500).send({
            statusCode: 500,
            message: "Error during the request",
        })
    }
}

const findOne = async (request, response) => {
    try {
        const { id } = request.params
        if (!id) {
            return response.status(400).send({
                statusCode: 400,
                message: "Invalid param provider",
            })
        }

        const post = await blogPostService.getBlogPostsById(id)
        if (!post) {
            return response.status(404).send({
                statusCode: 404,
                message: "Blog post not found"
            })
        }

        response.status(200).send({
            statusCode: 200,
            post,
        })
    } catch (error) {
        response.status(500).send({
            statusCode: 500,
            message: "Error during the request"
        })
    }
}

const create = async (request, response) => {
    try {
        const { body } = request

        if (!body.category || !body.title || !body.author || !body.content || !body.readTime?.value || !body.readTime?.unit) {
            return response.status(400).send({
                statusCode: 400,
                message: "invalid body provided",
            })
        }

        const newPost = await blogPostService.createBlogPost(body)

        await AuthorSchema.findByIdAndUpdate(request.user.id, { isAuthor: true })

        response.status(201).send({
            statusCode: 201,
            message: "Blog post created succesfully",
            newPost,
        })
    } catch (error) {
        response.status(500).send({
            statusCode: 500,
            message: "Error during the request",
        })
    }

}

const update = async (request, response) => {
    try {
        const { id } = request.params
        const { body } = request

        if (!id) {
            return response.status(400).send({
                statusCode: 400,
                message: "Invalid param provider"
            })
        }

        const updatedPost = await blogPostService.updateBlogPost(id, body)

        if (!updatedPost) {
            return response.status(404).send({
                statusCode: 404,
                message: "Blog post not found",
            })
        }

        response.status(200).send({
            statusCode: 200,
            message: "Blog post updated succesfully",
            updatedPost,
        })
    } catch (error) {
        response.status(500).send({
            statusCode: 500,
            message: "Error during the request"
        })
    }
}


const deletedOne = async (request, response) => {
    try {
        const { id } = request.params
        if (!id) {
            return response.status(400).send({
                statusCode: 400,
                message: "Invalid param provided",
            })
        }

        const deleted = await blogPostService.deleteBlogPost(id)

        if (!deleted) {
            return response.status(404).send({
                statusCode: 404,
                message: "Blog post not found",
            })
        }

        response.status(200).send({
            statusCode: 200,
            message: " Blog post deleted succesfully",
        })
    } catch (error) {
        response.status(500).send({
            statusCode: 500,
            message: "Error during the request"
        })
    }
}


const updateCover = async (request, response) => {
    try {
        const { blogPostId } = request.params;

        if (!request.file) {
            return response.status(400).send({
                statusCode: 400,
                message: "No file uploaded. Send form-data with key 'cover'.",
            });
        }

        const updatedPost = await blogPostService.updateBlogPost(blogPostId, {
            cover: request.file.path,
        });

        if (!updatedPost) {
            return response.status(404).send({
                statusCode: 404,
                message: "Blog post not found",
            });
        }

        return response.status(200).send({
            statusCode: 200,
            message: "Cover updated successfully",
            post: updatedPost,
        });
    } catch (error) {
        return response.status(500).send({
            statusCode: 500,
            message: "Error during the request",
            error: error.message,
        });
    }
};


module.exports = {
    findAll,
    findOne,
    create,
    update,
    deletedOne,
    updateCover
}