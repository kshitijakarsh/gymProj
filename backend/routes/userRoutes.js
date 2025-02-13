const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { uploadImage, uploadMiddleware } = require("../controllers/uploadController");

router.get("/", userController.getUsers);
router.post("/", uploadMiddleware, userController.createUser);

module.exports = router;
