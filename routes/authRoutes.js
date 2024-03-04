//package imports
import express from "express";

//internal imports
import { registerController } from "../controllers/authController.js";

//router object
const router = express.Router();

//route
router.post("/register-post", registerController);

export default router;
