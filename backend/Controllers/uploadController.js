const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure Cloudinary
cloudinary.config({
    cloud_name: "GymProj",
});

// Set up Cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "profile_pictures",
        format: async () => "jpg",
        public_id: (req, file) => file.originalname.split(".")[0], // Use filename without extension
    },
});

// Multer middleware for handling single image uploads
const uploadMiddleware = multer({ storage }).single("pfp");

// Function to upload an image manually
const uploadImage = async (filePath) => {
    try {
        const uploadResult = await cloudinary.uploader.upload(filePath, { folder: "profile_pictures" });
        return uploadResult.secure_url;
    } catch (err) {
        throw new Error("Image upload failed: " + err.message);
    }
};


exports.uploadMiddleware = uploadMiddleware;
exports.uploadImage = uploadImage;