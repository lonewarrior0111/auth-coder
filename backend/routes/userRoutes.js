import express from "express";
import { getUserController } from "../controllers/user.controller.js";
import {
  loginUserController,
  logoutUserController,
  signupUserController,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/signup", signupUserController);
router.post("/login", loginUserController);
router.post("/logout", logoutUserController);
router.get("/", verifyToken, getUserController);
router.post("/logout", verifyToken, logoutUserController);

export default router;
