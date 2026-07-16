import express from "express";
import { authMe, searchUserByUsername, test } from "../controllers/userController.js";
const router = express.Router();

router.get("/me",authMe);
router.get("/search", searchUserByUsername);

// router.get("/test",test);
export default router;