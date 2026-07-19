import express from "express";
import { authMe, searchUserByUsername, test, uploadAvatar } from "../controllers/userController.js";
import {upload} from "../middlewares/uploadMiddleware.js";


const router = express.Router();

router.get("/me",authMe);
router.get("/search", searchUserByUsername);
router.post("/upload",upload.single("file"), uploadAvatar);
// router.get("/test",test);
export default router;