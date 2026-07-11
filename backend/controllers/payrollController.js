import db from "../config/db.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

//GENERATE PAYROLL
export const generatePayroll = asyncHandler(async (req, res, next) => {
  const { employeeId } = req.params;

  const [salary] = await db.query(
    `
      SELECT *
      FROM salaries
      WHERE employee_id = ?
      `,
    [employeeId],
  );

  if (salary.length === 0) {
    throw new AppError("Salary record not found", 404);
  }

  const { basic_salary, allowance, deductions, net_salary } = salary[0];

  await db.query(
    `
      INSERT INTO payroll
      (
        employee_id,
        payroll_date,
        basic_salary,
        allowance,
        deductions,
        net_salary
      )
      VALUES (?, CURDATE(), ?, ?, ?, ?)
      `,
    [employeeId, basic_salary, allowance, deductions, net_salary],
  );

  return res.status(201).json({
    message: "Payroll generated successfully",
  });
});

//GET PAYROLL SUMMARY
export const getPayroll = asyncHandler(async (req, res, next) => {
  const [payroll] = await db.query(`
    SELECT
      p.*,
      e.full_name
    FROM payroll p
    JOIN employees e
      ON p.employee_id = e.id
    ORDER BY p.id DESC
  `);

  return res.json(payroll);
});

//GET PAYROLL HISTORY BY EMPLOYEE ID
export const getPayrollByEmployeeId = asyncHandler(async (req, res, next) => {
  const { employeeId } = req.params;

  const [payroll] = await db.query(
    `
      SELECT
        p.*,
        e.full_name
      FROM payroll p
      JOIN employees e
        ON p.employee_id = e.id
      WHERE p.employee_id = ?
      ORDER BY p.id DESC
      `,
    [employeeId],
  );

  return res.json(payroll);
});
