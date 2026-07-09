import express from "express";
import {
  getSalaries,
  getSalaryByEmployeeId,
  saveSalary,
} from "../controllers/salaryController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.use(verifyToken); // Apply the verifyToken middleware to all routes in this router

router.post("/", saveSalary);
router.get("/", getSalaries);

export default router;
