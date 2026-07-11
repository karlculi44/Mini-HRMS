import db from "../config/db.js";

export const findAllAttendance = async () => {
  const [rows] = await db.query(`
  SELECT
    a.*,
    DATE_FORMAT(a.attendance_date, '%Y-%m-%d') AS attendance_date,
    e.full_name
  FROM attendance a
  JOIN employees e
    ON a.employee_id = e.id
  ORDER BY a.attendance_date DESC
`);

  return rows;
};

export const findEmployeeByIdForAttendance = async (employeeId) => {
  const [rows] = await db.query("SELECT id FROM employees WHERE id = ?", [
    employeeId,
  ]);

  return rows;
};

export const findAttendanceByEmployeeId = async (employeeId) => {
  const [rows] = await db.query(
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

  return rows;
};

export const createAttendanceRecord = async (
  employeeId,
  attendanceDate,
  timeIn,
  timeOut,
  status,
) => {
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
    [employeeId, attendanceDate, timeIn, timeOut, status],
  );

  return result;
};

export const findAttendanceById = async (attendanceId) => {
  const [rows] = await db.query("SELECT id FROM attendance WHERE id = ?", [
    attendanceId,
  ]);

  return rows;
};

export const updateAttendanceRecordById = async (
  attendanceId,
  employeeId,
  attendanceDate,
  timeIn,
  timeOut,
  status,
) => {
  const [result] = await db.query(
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
    [employeeId, attendanceDate, timeIn, timeOut, status, attendanceId],
  );

  return result;
};
