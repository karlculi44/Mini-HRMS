import express from "express";
import {
  login,
  register,
  getMe,
  logout,
} from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/me", verifyToken, getMe);
router.post("/logout", logout);

export default router;
