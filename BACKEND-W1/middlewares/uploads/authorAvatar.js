const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const cloudinary = require("../../utils/cloudinary")

const baseFolder = process.env.CLOUDINARY_FOLDER || "strive-blog";

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: `${baseFolder}/authors`,
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        public_id: (req) => {
            const authorId = req.params.authorId || req.params.userId;
            return `author-${authorId}-${Date.now()}`;
        },
    },
});


module.exports = multer({ storage })

