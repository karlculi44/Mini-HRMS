import express from "express";
import {
  login,
  register,
  getMe,
  logout,
} from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { validateInputs } from "../middlewares/validateInputs.js";
import { loginSchema, registerSchema } from "../schema/authSchema.js";

const router = express.Router();

router.post("/login", validateInputs(loginSchema), login);
router.post("/register", validateInputs(registerSchema), register);
router.get("/me", verifyToken, getMe);
router.post("/logout", logout);

export default router;
