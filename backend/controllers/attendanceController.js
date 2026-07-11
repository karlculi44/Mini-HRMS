import db from "../config/db.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

//GET ALL ATTENDANCE
export const getAllAttendance = asyncHandler(async (req, res) => {
  const [attendance] = await db.query(`
  SELECT
    a.*,
    DATE_FORMAT(a.attendance_date, '%Y-%m-%d') AS attendance_date,
    e.full_name
  FROM attendance a
  JOIN employees e
    ON a.employee_id = e.id
  ORDER BY a.attendance_date DESC
`);

  return res.json(attendance);
});

//GET ATTENDACE HISTORY BY EMPLOYEE ID
export const getAttendanceByEmployeeId = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;
  const [employee] = await db.query("SELECT id FROM employees WHERE id = ?", [
    employeeId,
  ]);

  if (employee.length === 0) {
    throw new AppError("Employee not found", 404);
  }

  const [attendance] = await db.query(
    `
      SELECT
        a.*,
        e.full_name
      FROM attendance a
      JOIN employees e
        ON a.employee_id = e.id
      WHERE a.employee_id = ?
      ORDER BY a.attendance_date DESC
      `,
    [employeeId],
  );

  return res.json(attendance);
});

//RECORD ATTENDANCE
export const recordAttendance = asyncHandler(async (req, res, next) => {
  const { employee_id, full_name, attendance_date, time_in, time_out, status } =
    req.body;

  // Validate employee exists
  const [employee] = await db.query("SELECT id FROM employees WHERE id = ?", [
    employee_id,
  ]);

  if (employee.length === 0) {
    return next(new AppError("Employee not found", 404));
  }

  const [result] = await db.query(
    `
      INSERT INTO attendance
      (
        employee_id,
        attendance_date,
        time_in,
        time_out,
        status
      )
      VALUES (?,?,?,?,?)
      `,
    [employee_id, attendance_date, time_in, time_out, status],
  );

  return res.status(201).json({
    message: "Attendance recorded successfully",
    id: result.insertId,
  });
});

//UPDATE ATTENDANCE
export const updateAttendance = asyncHandler(async (req, res, next) => {
  const { attendanceId } = req.params;
  const { employee_id, attendance_date, time_in, time_out, status } = req.body;

  const [attendance] = await db.query(
    "SELECT id FROM attendance WHERE id = ?",
    [attendanceId],
  );

  if (attendance.length === 0) {
    return next(new AppError("Attendance record not found", 404));
  }

  const [employee] = await db.query("SELECT id FROM employees WHERE id = ?", [
    employee_id,
  ]);

  if (employee.length === 0) {
    return next(new AppError("Employee not found", 404));
  }

  await db.query(
    `
      UPDATE attendance
      SET
        employee_id = ?,
        attendance_date = ?,
        time_in = ?,
        time_out = ?,
        status = ?
      WHERE id = ?
      `,
    [employee_id, attendance_date, time_in, time_out, status, attendanceId],
  );

  return res.json({
    message: "Attendance updated successfully",
  });
});
