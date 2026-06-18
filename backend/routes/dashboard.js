import express from "express";
import db from "../db.js";

const router = express.Router();

//get dashboard summary
router.get("/", async (req, res) => {
  try {
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

    res.json({
      totalEmployees: totalEmployees.totalEmployees,
      activeEmployees: activeEmployees.activeEmployees,
      employeesOnLeave: employeesOnLeave.employeesOnLeave,
      totalMonthlyPayroll: totalMonthlyPayroll.totalMonthlyPayroll,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch dashboard statistics",
      error: error.message,
    });
  }
});

export default router;
