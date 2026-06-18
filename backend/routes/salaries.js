import express from "express";
import db from "../db.js";

const router = express.Router();

//add or update salary for an employee
router.post("/", async (req, res) => {
  try {
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
      return res.status(404).json({
        message: "Employee not found",
      });
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
  } catch (error) {
    return res.status(500).json({
      message: "Failed to save salary",
      error: error.message,
    });
  }
});

//get all salaries
router.get("/", async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch salaries",
      error: error.message,
    });
  }
});

//get a salary by employee id
router.get("/:employeeId", async (req, res) => {
  try {
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
      return res.status(404).json({
        message: "Salary not found",
      });
    }

    return res.json(salary[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch salary",
      error: error.message,
    });
  }
});

export default router;
