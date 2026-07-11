import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";
import {
  createSalary,
  findAllSalaries,
  findEmployeeByIdForSalary,
  findExistingSalaryByEmployeeId,
  findSalaryByEmployeeId,
  updateSalaryByEmployeeId,
} from "../models/salaryModel.js";

//GET ALL SALARIES
export const getSalaries = asyncHandler(async (req, res, next) => {
  const salaries = await findAllSalaries();

  return res.json(salaries);
});

//GET SALARY BY EMPLOYEE ID
export const getSalaryByEmployeeId = asyncHandler(async (req, res, next) => {
  const { employeeId } = req.params;

  const salary = await findSalaryByEmployeeId(employeeId);

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

  const employee = await findEmployeeByIdForSalary(employee_id);

  const existingSalary = await findExistingSalaryByEmployeeId(employee_id);

  if (employee.length === 0) {
    throw new AppError("Employee not found", 404);
  }

  if (existingSalary.length > 0) {
    await updateSalaryByEmployeeId(
      employee_id,
      basic_salary,
      allowance,
      deductions,
      net_salary,
    );

    return res.json({
      message: "Salary updated successfully",
    });
  }

  await createSalary(
    employee_id,
    basic_salary,
    allowance,
    deductions,
    net_salary,
  );

  return res.status(201).json({
    message: "Salary added successfully",
  });
});
