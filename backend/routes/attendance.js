import express from "express";
import db from "../db.js";
import {
  getAllAttendance,
  getAttendanceByEmployeeId,
  recordAttendance,
  updateAttendance,
} from "../controllers/attendanceController.js";

const router = express.Router();

router.get("/", getAllAttendance);
router.get("/:employeeId", getAttendanceByEmployeeId);
router.put("/:employeeId", updateAttendance);
router.post("/", recordAttendance);

export default router;
