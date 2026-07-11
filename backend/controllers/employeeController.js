import db from "../config/db.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

//GET ALL EMPLOYEES
export const getAllEmployees = asyncHandler(async (req, res, next) => {
  const [employees] = await db.query(`
  SELECT
    *,
    DATE_FORMAT(date_hired, '%Y-%m-%d') AS date_hired
  FROM employees
`);
  res.json(employees);
});

//ADD EMPLOYEE
export const addEmployee = asyncHandler(async (req, res, next) => {
  const {
    employee_id,
    full_name,
    email,
    contact_number,
    position,
    department,
    date_hired,
    employment_status,
  } = req.body;

  const requiredFields = {
    employee_id,
    full_name,
    email,
    contact_number,
    position,
    department,
    date_hired,
    employment_status,
  };

  const hasMissingRequiredField = Object.values(requiredFields).some(
    (value) =>
      value === undefined || value === null || `${value}`.trim() === "",
  );

  if (hasMissingRequiredField) {
    throw new AppError("Invalid input: missing required fields", 400);
  }

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!isValidEmail) {
    throw new AppError("Invalid input: email format is invalid", 400);
  }

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
      employee_id,
      full_name,
      email,
      contact_number,
      position,
      department,
      date_hired,
      employment_status,
    ],
  );

  res.status(201).json({
    message: "Employee added successfully",
    id: result.insertId,
  });
});

//GET EMPLOYEE BY ID
export const getEmployeeById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const [employee] = await db.query("SELECT * FROM employees WHERE id = ?", [
    id,
  ]);

  if (employee.length === 0) {
    throw new AppError("Employee not found", 404);
  }

  return res.json(employee[0]);
});

//UPDATE EMPLOYEE
export const updateEmployee = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const {
    employee_id,
    full_name,
    email,
    contact_number,
    position,
    department,
    date_hired,
    employment_status,
  } = req.body;

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
      employee_id,
      full_name,
      email,
      contact_number,
      position,
      department,
      date_hired,
      employment_status,
      id,
    ],
  );

  if (result.affectedRows === 0) {
    throw new AppError("Employee not found", 404);
  }

  return res.json({
    message: "Employee updated successfully",
  });
});

//DELETE EMPLOYEE
export const deleteEmployee = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const [result] = await db.query("DELETE FROM employees WHERE id = ?", [id]);

  if (result.affectedRows === 0) {
    throw new AppError("Employee not found", 404);
  }

  return res.json({
    message: "Employee deleted successfully",
  });
});
