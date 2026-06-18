import express from "express";
import db from "../db.js";
import {
  getSalaries,
  getSalaryByEmployeeId,
  saveSalary,
} from "../controllers/salaryController.js";

const router = express.Router();

router.post("/", saveSalary);
router.get("/", getSalaries);
router.get("/:employeeId", getSalaryByEmployeeId);

export default router;
