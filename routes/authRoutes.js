//package imports
import express from "express";

//internal imports
import {
  registerController,
  loginController,
} from "../controllers/authController.js";

//router object
const router = express.Router();

//routes
// Register || post
router.post("/register-post", registerController);

//Login || post
router.post("/login", loginController);

export default router;
