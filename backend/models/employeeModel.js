import db from "../config/db.js";

export const findAllEmployees = async () => {
  const [rows] = await db.query(`
  SELECT
    *,
    DATE_FORMAT(date_hired, '%Y-%m-%d') AS date_hired
  FROM employees
`);

  return rows;
};

export const createEmployee = async (
  employeeId,
  fullName,
  email,
  contactNumber,
  position,
  department,
  dateHired,
  employmentStatus,
) => {
  const [result] = await db.query(
    `
      INSERT INTO employees
      (
        employee_id,
        full_name,
        email,
        contact_number,
        position,
        department,
        date_hired,
        employment_status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
    [
      employeeId,
      fullName,
      email,
      contactNumber,
      position,
      department,
      dateHired,
      employmentStatus,
    ],
  );

  return result;
};

export const findEmployeeById = async (id) => {
  const [rows] = await db.query("SELECT * FROM employees WHERE id = ?", [id]);

  return rows;
};

export const updateEmployeeById = async (
  id,
  employeeId,
  fullName,
  email,
  contactNumber,
  position,
  department,
  dateHired,
  employmentStatus,
) => {
  const [result] = await db.query(
    `
      UPDATE employees
      SET
        employee_id = ?,
        full_name = ?,
        email = ?,
        contact_number = ?,
        position = ?,
        department = ?,
        date_hired = ?,
        employment_status = ?
      WHERE id = ?
      `,
    [
      employeeId,
      fullName,
      email,
      contactNumber,
      position,
      department,
      dateHired,
      employmentStatus,
      id,
    ],
  );

  return result;
};

export const deleteEmployeeById = async (id) => {
  const [result] = await db.query("DELETE FROM employees WHERE id = ?", [id]);

  return result;
};
