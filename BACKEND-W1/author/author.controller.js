const authorService = require("./author.services")
const blogPostsService = require("../blogPosts/blogPosts.services")
const EmailService = require("../utils/mail/EmailService");
const emailService = new EmailService();



const findAll = async (request, response) => {
    try {
        const result = await authorService.getAuthors(request.query)

        response.status(200).send({
            statusCode: 200,
            ...result,
        })
    } catch (error) {
        response.status(500).send({
            statusCode: 500,
            message: "Error during the request"
        })
    }
}

const findOne = async (request, response) => {
    try {
        const { userId } = request.params
        if (!userId) {
            return response.status(400).send({
                statusCode: 400,
                message: "Invalid param provided"
            })
        }
        const author = await authorService.getAuthorById(userId)
        if (!author) {
            return response.status(404).send({
                statusCode: 404,
                message: "Author not found"
            })
        }
        response.status(200).send({
            statusCode: 200,
            author
        })
    } catch (error) {
        response.status(500).send({
            statusCode: 500,
            message: "Error during the request"
        })
    }
}

const create = async (request, response) => {
    const { body } = request
    try {
        const newAuthor = await authorService.createAuthor(body)

        try {
            await emailService.send({
                to: newAuthor.email,
                subject: "Registrazione completata!",
                html: `<h1>Ciao ${newAuthor.name} </h1><p>Registrazione completata.</p>`,
        });
        } catch (err) {
            console.log("EMAIL ERROR:", err.message);
        }

        response.status(201).send({
            statusCode: 201,
            message: "Author created succesfully",
            newAuthor
        })
    } catch (error) {
        response.status(500).send({
            statusCode: 500,
            message: "Error during the request"
        })
    }
}

const update = async (request, response) => {
    const { body } = request
    const { userId } = request.params
    try {
        const updateAuthor = await authorService.updateAuthor(userId, body)
        if (!userId) {
            return response.status(400).send({
                statusCode: 400,
                message: "Cannot update Author"
            })
        }
        response.status(200).send({
            statusCode: 200,
            message: "Author update succesfully",
            updateAuthor
        })
    } catch (error) {
        response.status(500).send({
            statusCode: 500,
            message: "Error during the request"
        })
    }

}

const deleteOne = async (request, response) => {
    const { userId } = request.params
    try {
        if (!userId) {
            return response.status(400).send({
                statusCode: 400,
                message: "Invalid params provider"
            })
        }
        await authorService.deleteAuthor(userId)

        response.status(200).send({
            statusCode: 200,
            message: "Author delete succesfully"
        })
    } catch (error) {
        response.status(500).send({
            statusCode: 500,
            message: "Error during the request"
        })
    }
}


const getAuthorBlogPosts = async (request, response) => {
    try {
        const { userId } = request.params;

        const author = await authorService.getAuthorById(userId);
        if (!author) {
            return response.status(404).send({
                statusCode: 404,
                message: "Author not found",
            });
        }

        const result = await blogPostsService.getBlogPosts({
            ...request.query,
            author: author.email,
        });

        return response.status(200).send({
            statusCode: 200,
            author,
            ...result,
        });
    } catch (error) {
        return response.status(500).send({
            statusCode: 500,
            message: "Error during the request",
        });
    }
};



const uploadAvatar = async (request, response) => {
    try {
        const { authorId } = request.params;

        if (!request.file || !request.file.path) {
            return response.status(400).send({
                statusCode: 400,
                message: "No file uploaded (field must be 'avatar')",
            });
        }

        const updatedAuthor = await authorService.updateAuthor(authorId, {
            avatar: request.file.path,
        });

        if (!updatedAuthor) {
            return response.status(404).send({
                statusCode: 404,
                message: "Author not found",
            });
        }

        return response.status(200).send({
            statusCode: 200,
            message: "Avatar updated successfully",
            author: updatedAuthor,
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
    deleteOne,
    getAuthorBlogPosts,
    uploadAvatar
}