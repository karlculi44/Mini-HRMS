import db from "../db.js";

//GENERATE PAYROLL
export const generatePayroll = async (req, res) => {
  try {
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
      return res.status(404).json({
        message: "Salary record not found",
      });
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
  } catch (error) {
    return res.status(500).json({
      message: "Failed to generate payroll",
      error: error.message,
    });
  }
};

//GET PAYROLL SUMMARY
export const getPayroll = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch payroll",
      error: error.message,
    });
  }
};

//GET PAYROLL HISTORY BY EMPLOYEE ID
export const getPayrollByEmployeeId = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch payroll history",
      error: error.message,
    });
  }
};
