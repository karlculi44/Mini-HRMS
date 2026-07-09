import express from "express";
import {
  generatePayroll,
  getPayroll,
  getPayrollByEmployeeId,
} from "../controllers/payrollController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.use(verifyToken); // Apply the verifyToken middleware to all routes in this router

router.post("/:employeeId", generatePayroll);
router.get("/", getPayroll);
router.get("/:employeeId", getPayrollByEmployeeId);

export default router;
