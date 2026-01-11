const mongoose = require("mongoose")

const BlogPostSchema = new mongoose.Schema(
    {
        category: { type: String, required: true },
        title: { type: String, required: true },
        cover: { type: String, default: "" },
        readTime: {
            value: { type: Number, required: true },
            unit: { type: String, required: true },
        },
        author:{type: String, required:true},
        content:{type: String, required: true},
    },
    {timestamps: true}
)

module.exports = mongoose.model("BlogPost", BlogPostSchema)