import express from "express";
import db from "../db.js";
import {
  generatePayroll,
  getPayroll,
  getPayrollByEmployeeId,
} from "../controllers/payrollController.js";

const router = express.Router();

router.post("/:employeeId", generatePayroll);
router.get("/", getPayroll);
router.get("/:employeeId", getPayrollByEmployeeId);

export default router;
