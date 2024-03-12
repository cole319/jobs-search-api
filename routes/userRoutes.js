import express from "express";
import {
  getUserController,
  updateUserController,
} from "../controllers/userController.js";
import userAuth from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//router

//GET USERS || GET
router.get("/get-users", getUserController);

//UPDATE USERS || PUT
router.put("/update-user", userAuth, updateUserController);

export default router;
