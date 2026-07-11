export const payrollMessages = {
  generated: "Payroll generated successfully",
  salaryNotFound: "Salary record not found",
  failedGenerate: "Failed to generate payroll",
  failedFetch: "Failed to fetch payroll",
  failedFetchHistory: "Failed to fetch payroll history",
};

export const payrollIds = {
  employeeId: 1,
  missingEmployeeId: 999999,
};

export const salaryRecord = {
  employee_id: 1,
  basic_salary: 30000,
  allowance: 5000,
  deductions: 2000,
  net_salary: 33000,
};

export const payrollList = [
  {
    id: 12,
    employee_id: 1,
    payroll_date: "2026-07-06",
    basic_salary: 30000,
    allowance: 5000,
    deductions: 2000,
    net_salary: 33000,
    full_name: "Employee Test",
  },
  {
    id: 11,
    employee_id: 2,
    payroll_date: "2026-06-30",
    basic_salary: 25000,
    allowance: 3000,
    deductions: 1500,
    net_salary: 26500,
    full_name: "Another Employee",
  },
];

export const employeePayrollHistory = [
  {
    id: 12,
    employee_id: 1,
    payroll_date: "2026-07-06",
    basic_salary: 30000,
    allowance: 5000,
    deductions: 2000,
    net_salary: 33000,
    full_name: "Employee Test",
  },
  {
    id: 10,
    employee_id: 1,
    payroll_date: "2026-06-30",
    basic_salary: 30000,
    allowance: 5000,
    deductions: 1000,
    net_salary: 34000,
    full_name: "Employee Test",
  },
];

export const payrollErrors = {
  dbDown: "DB down",
};

export const payrollAuthErrors = {
  noToken: "Access Denied. No token provided.",
};
