import db from "../config/db.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

//GET ALL SALARIES
export const getSalaries = asyncHandler(async (req, res, next) => {
  const [salaries] = await db.query(`
      SELECT
        s.*,
        e.full_name
      FROM salaries s
      JOIN employees e
        ON s.employee_id = e.id
      ORDER BY s.id ASC
    `);

  return res.json(salaries);
});

//GET SALARY BY EMPLOYEE ID
export const getSalaryByEmployeeId = asyncHandler(async (req, res, next) => {
  const { employeeId } = req.params;

  const [salary] = await db.query(
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

  if (salary.length === 0) {
    throw new AppError("Salary record not found", 404);
  }

  return res.json(salary[0]);
});

//ADD OR UPDATE SALARY
export const saveSalary = asyncHandler(async (req, res, next) => {
  const { employee_id, basic_salary, allowance, deductions } = req.body;

  const net_salary =
    Number(basic_salary) + Number(allowance) - Number(deductions);

  const [employee] = await db.query("SELECT * FROM employees WHERE id = ?", [
    employee_id,
  ]);

  const [existingSalary] = await db.query(
    "SELECT * FROM salaries WHERE employee_id = ?",
    [employee_id],
  );

  if (employee.length === 0) {
    throw new AppError("Employee not found", 404);
  }

  if (existingSalary.length > 0) {
    await db.query(
      `
        UPDATE salaries
        SET
          basic_salary = ?,
          allowance = ?,
          deductions = ?,
          net_salary = ?
        WHERE employee_id = ?
        `,
      [basic_salary, allowance, deductions, net_salary, employee_id],
    );

    return res.json({
      message: "Salary updated successfully",
    });
  }

  await db.query(
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
    [employee_id, basic_salary, allowance, deductions, net_salary],
  );

  return res.status(201).json({
    message: "Salary added successfully",
  });
});
