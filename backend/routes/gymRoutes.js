const express = require("express");
const router = express.Router();
const gymController = require("../controllers/gymController"); 

router.get("/", gymController.getGym);  
router.post("/", gymController.createGym);
router.get("/search", gymController.searchGym);

module.exports = router;
