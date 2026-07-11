import db from "../config/db.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getDashboardStats = asyncHandler(async (req, res, next) => {
  const [[totalEmployees]] = await db.query(`
      SELECT COUNT(*) AS totalEmployees
      FROM employees
    `);

  const [[activeEmployees]] = await db.query(`
      SELECT COUNT(*) AS activeEmployees
      FROM employees
      WHERE employment_status = 'Active'
    `);

  const [[employeesOnLeave]] = await db.query(`
      SELECT COUNT(*) AS employeesOnLeave
      FROM employees
      WHERE employment_status = 'On Leave'
    `);

  const [[totalMonthlyPayroll]] = await db.query(`
      SELECT COALESCE(SUM(net_salary), 0) AS totalMonthlyPayroll
      FROM salaries
    `);

  res.json([
    {
      name: "Total Employees",
      value: totalEmployees.totalEmployees,
      type: "number",
      color: "text-blue-600",
    },
    {
      name: "Active Employees",
      value: activeEmployees.activeEmployees,
      type: "number",
      color: "text-green-600",
    },
    {
      name: "Employees On Leave",
      value: employeesOnLeave.employeesOnLeave,
      type: "number",
      color: "text-amber-500",
    },
    {
      name: "Total Monthly Payroll",
      value: totalMonthlyPayroll.totalMonthlyPayroll,
      type: "currency",
      color: "text-black",
    },
  ]);
});
