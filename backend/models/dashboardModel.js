import db from "../config/db.js";

export const getTotalEmployeesCount = async () => {
  const [[row]] = await db.query(`
      SELECT COUNT(*) AS totalEmployees
      FROM employees
    `);

  return row;
};

export const getActiveEmployeesCount = async () => {
  const [[row]] = await db.query(`
      SELECT COUNT(*) AS activeEmployees
      FROM employees
      WHERE employment_status = 'Active'
    `);

  return row;
};

export const getEmployeesOnLeaveCount = async () => {
  const [[row]] = await db.query(`
      SELECT COUNT(*) AS employeesOnLeave
      FROM employees
      WHERE employment_status = 'On Leave'
    `);

  return row;
};

export const getTotalMonthlyPayrollSum = async () => {
  const [[row]] = await db.query(`
      SELECT COALESCE(SUM(net_salary), 0) AS totalMonthlyPayroll
      FROM salaries
    `);

  return row;
};
