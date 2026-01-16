const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../../utils/cloudinary");

const baseFolder = process.env.CLOUDINARY_FOLDER || "strive-blog";

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: `${baseFolder}/blogPosts`,
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        public_id: (req) => {
            const blogPostId = req.params.blogPostId || req.params.id;
            return `post-${blogPostId}-${Date.now()}`;
        },
    },
});

module.exports = multer({ storage });
