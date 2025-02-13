const express = require("express");
const router = express.Router();
const gymController = require("../Controllers/gymController"); 

router.get("/", gymController.getGym);  
router.post("/", gymController.createGym);

module.exports = router;
