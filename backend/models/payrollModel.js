import db from "../config/db.js";

export const findSalaryForPayroll = async (employeeId) => {
  const [rows] = await db.query(
    `
      SELECT *
      FROM salaries
      WHERE employee_id = ?
      `,
    [employeeId],
  );

  return rows;
};

export const createPayrollRecord = async (
  employeeId,
  basicSalary,
  allowance,
  deductions,
  netSalary,
) => {
  const [result] = await db.query(
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
    [employeeId, basicSalary, allowance, deductions, netSalary],
  );

  return result;
};

export const findAllPayroll = async () => {
  const [rows] = await db.query(`
    SELECT
      p.*,
      e.full_name
    FROM payroll p
    JOIN employees e
      ON p.employee_id = e.id
    ORDER BY p.id DESC
  `);

  return rows;
};

export const findPayrollByEmployeeId = async (employeeId) => {
  const [rows] = await db.query(
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

  return rows;
};
