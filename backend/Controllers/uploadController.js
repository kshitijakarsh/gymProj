import cloudinary from "../config/cloudinaryConfig.js";
import multer from "multer";

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload_stream(
            { folder: "uploads" },
            (error, uploadResult) => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({ error: "Upload failed" });
                }
                res.json({ imageUrl: uploadResult.secure_url });
            }
        ).end(req.file.buffer);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

// Middleware to handle file upload
export const uploadMiddleware = upload.single("image");
