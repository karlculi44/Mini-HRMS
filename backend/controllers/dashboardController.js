import asyncHandler from "../utils/asyncHandler.js";
import {
  getActiveEmployeesCount,
  getEmployeesOnLeaveCount,
  getTotalEmployeesCount,
  getTotalMonthlyPayrollSum,
} from "../models/dashboardModel.js";

export const getDashboardStats = asyncHandler(async (req, res, next) => {
  const totalEmployees = await getTotalEmployeesCount();

  const activeEmployees = await getActiveEmployeesCount();

  const employeesOnLeave = await getEmployeesOnLeaveCount();

  const totalMonthlyPayroll = await getTotalMonthlyPayrollSum();

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
});
