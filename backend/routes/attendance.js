import express from "express";
import db from "../config/db.js";
import {
  getAllAttendance,
  getAttendanceByEmployeeId,
  recordAttendance,
  updateAttendance,
} from "../controllers/attendanceController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(verifyToken); // Apply the verifyToken middleware to all routes in this router

router.get("/", getAllAttendance);
router.get("/:employeeId", getAttendanceByEmployeeId);
router.put("/:attendanceId", updateAttendance);
router.post("/", recordAttendance);

export default router;
