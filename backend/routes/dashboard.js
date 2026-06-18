import express from "express";
import db from "../db.js";
import { getDashboardStats } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/", getDashboardStats);

export default router;
