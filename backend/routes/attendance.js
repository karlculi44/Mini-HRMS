import express from "express";
import db from "../db.js";

const router = express.Router();

//record attendance
router.post("/", async (req, res) => {
  try {
    const {
      employee_id,
      full_name,
      attendance_date,
      time_in,
      time_out,
      status,
    } = req.body;

    // Validate employee exists
    const [employee] = await db.query("SELECT id FROM employees WHERE id = ?", [
      employee_id,
    ]);

    if (employee.length === 0) {
      return res.status(404).json({
        message: "Employee not found",
      });
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
  } catch (error) {
    return res.status(500).json({
      message: "Failed to record attendance",
      error: error.message,
    });
  }
});

//update attendance
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { attendance_date, time_in, time_out, status } = req.body;
    const [employee] = await db.query("SELECT id FROM employees WHERE id = ?", [
      id,
    ]);

    if (employee.length === 0) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    await db.query(
      `
      UPDATE attendance
      SET
        attendance_date = ?,
        time_in = ?,
        time_out = ?,
        status = ?
      WHERE employee_id = ?
      `,
      [attendance_date, time_in, time_out, status, id],
    );

    return res.json({
      message: "Attendance updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update attendance",
      error: error.message,
    });
  }
});

//get all attendance records
router.get("/", async (req, res) => {
  try {
    const [attendance] = await db.query(`
      SELECT
        a.*,
        e.full_name
      FROM attendance a
      JOIN employees e
        ON a.employee_id = e.id
      ORDER BY a.attendance_date DESC
    `);

    return res.json(attendance);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch attendance",
      error: error.message,
    });
  }
});

//get attendance by employee id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [employee] = await db.query("SELECT id FROM employees WHERE id = ?", [
      id,
    ]);

    if (employee.length === 0) {
      return res.status(404).json({
        message: "Employee not found",
      });
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
      [id],
    );

    return res.json(attendance);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch attendance",
      error: error.message,
    });
  }
});

export default router;
