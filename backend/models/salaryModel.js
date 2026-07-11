import db from "../config/db.js";

export const findAllSalaries = async () => {
  const [rows] = await db.query(`
      SELECT
        s.*,
        e.full_name
      FROM salaries s
      JOIN employees e
        ON s.employee_id = e.id
      ORDER BY s.id ASC
    `);

  return rows;
};

export const findSalaryByEmployeeId = async (employeeId) => {
  const [rows] = await db.query(
    `
      SELECT
        s.*,
        e.full_name
      FROM salaries s
      JOIN employees e
        ON s.employee_id = e.id
      WHERE s.employee_id = ?
      `,
    [employeeId],
  );

  return rows;
};

export const findEmployeeByIdForSalary = async (employeeId) => {
  const [rows] = await db.query("SELECT * FROM employees WHERE id = ?", [
    employeeId,
  ]);

  return rows;
};

export const findExistingSalaryByEmployeeId = async (employeeId) => {
  const [rows] = await db.query(
    "SELECT * FROM salaries WHERE employee_id = ?",
    [employeeId],
  );

  return rows;
};

export const updateSalaryByEmployeeId = async (
  employeeId,
  basicSalary,
  allowance,
  deductions,
  netSalary,
) => {
  const [result] = await db.query(
    `
        UPDATE salaries
        SET
          basic_salary = ?,
          allowance = ?,
          deductions = ?,
          net_salary = ?
        WHERE employee_id = ?
        `,
    [basicSalary, allowance, deductions, netSalary, employeeId],
  );

  return result;
};

export const createSalary = async (
  employeeId,
  basicSalary,
  allowance,
  deductions,
  netSalary,
) => {
  const [result] = await db.query(
    `
      INSERT INTO salaries
      (
        employee_id,
        basic_salary,
        allowance,
        deductions,
        net_salary
      )
      VALUES (?, ?, ?, ?, ?)
      `,
    [employeeId, basicSalary, allowance, deductions, netSalary],
  );

  return result;
};
