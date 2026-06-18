import express from "express";
import db from "../db.js";

const router = express.Router();

//get employee
router.get("/", async (req, res) => {
  try {
    const [employees] = await db.query("SELECT * FROM employees");
    res.json(employees);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch employees", error: error.message });
  }
});

//get employee by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [employee] = await db.query("SELECT * FROM employees WHERE id = ?", [
      id,
    ]);

    if (employee.length === 0) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    return res.json(employee[0]);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch employee", error: error.message });
  }
});

//add new employee
router.post("/", async (req, res) => {
  try {
    const {
      employee_id,
      full_name,
      email,
      contact_number,
      position,
      department,
      date_hired,
      employment_status,
    } = req.body;

    const [result] = await db.query(
      `
      INSERT INTO employees
      (
        employee_id,
        full_name,
        email,
        contact_number,
        position,
        department,
        date_hired,
        employment_status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        employee_id,
        full_name,
        email,
        contact_number,
        position,
        department,
        date_hired,
        employment_status,
      ],
    );

    res.status(201).json({
      message: "Employee added successfully",
      id: result.insertId,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add employee",
      error: error.message,
    });
  }
});

//update employee
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      employee_id,
      full_name,
      email,
      contact_number,
      position,
      department,
      date_hired,
      employment_status,
    } = req.body;

    const [result] = await db.query(
      `
      UPDATE employees
      SET
        employee_id = ?,
        full_name = ?,
        email = ?,
        contact_number = ?,
        position = ?,
        department = ?,
        date_hired = ?,
        employment_status = ?
      WHERE id = ?
      `,
      [
        employee_id,
        full_name,
        email,
        contact_number,
        position,
        department,
        date_hired,
        employment_status,
        id,
      ],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.json({
      message: "Employee updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update employee",
      error: error.message,
    });
  }
});

//delete employee
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query("DELETE FROM employees WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete employee",
      error: error.message,
    });
  }
});

export default router;
