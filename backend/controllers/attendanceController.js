import db from "../db.js";

//GET ALL ATTENDANCE
export const getAllAttendance = async (req, res) => {
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
};

//GET ATTENDACE HISTORY BY EMPLOYEE ID
export const getAttendanceByEmployeeId = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const [employee] = await db.query("SELECT id FROM employees WHERE id = ?", [
      employeeId,
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
      [employeeId],
    );

    return res.json(attendance);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch attendance",
      error: error.message,
    });
  }
};

//RECORD ATTENDANCE
export const recordAttendance = async (req, res) => {
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
};

//UPDATE ATTENDANCE
export const updateAttendance = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { attendance_date, time_in, time_out, status } = req.body;
    const [employee] = await db.query("SELECT id FROM employees WHERE id = ?", [
      employeeId,
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
      [attendance_date, time_in, time_out, status, employeeId],
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
};
