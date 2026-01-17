const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema(
    {
        blogPost: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "BlogPost",
            required: true,
            index: true,
        },
        author: { 
            type: String, 
            required: true, 
            },
        text: { 
            type: String,
            required: true, 
            },
    },
    { timestamps: true }
)

module.exports = mongoose.model("Comment", CommentSchema)