import db from "../db.js";

export const getDashboardStats = async (req, res) => {
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
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch dashboard statistics",
      error: error.message,
    });
  }
};
