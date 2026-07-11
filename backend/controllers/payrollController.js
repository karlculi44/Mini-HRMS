import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";
import {
  createPayrollRecord,
  findAllPayroll,
  findPayrollByEmployeeId,
  findSalaryForPayroll,
} from "../models/payrollModel.js";

//GENERATE PAYROLL
export const generatePayroll = asyncHandler(async (req, res, next) => {
  const { employeeId } = req.params;

  const salary = await findSalaryForPayroll(employeeId);

  if (salary.length === 0) {
    throw new AppError("Salary record not found", 404);
  }

  const { basic_salary, allowance, deductions, net_salary } = salary[0];

  await createPayrollRecord(
    employeeId,
    basic_salary,
    allowance,
    deductions,
    net_salary,
  );

  return res.status(201).json({
    message: "Payroll generated successfully",
  });
});

//GET PAYROLL SUMMARY
export const getPayroll = asyncHandler(async (req, res, next) => {
  const payroll = await findAllPayroll();

  return res.json(payroll);
});

//GET PAYROLL HISTORY BY EMPLOYEE ID
export const getPayrollByEmployeeId = asyncHandler(async (req, res, next) => {
  const { employeeId } = req.params;

  const payroll = await findPayrollByEmployeeId(employeeId);

  return res.json(payroll);
});
