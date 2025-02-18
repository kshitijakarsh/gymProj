import { getGym, createGym, searchGym } from "../Controllers/gymController.js";
import express from "express";
const router = express.Router();

router.get("/", getGym);  
router.post("/", createGym);
router.get("/search", searchGym);

export default router;
    