import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getDashboardStats);

export default router;
