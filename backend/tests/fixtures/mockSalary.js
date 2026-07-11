export const salaryMessages = {
  added: "Salary added successfully",
  updated: "Salary updated successfully",
  employeeNotFound: "Employee not found",
};

export const salaryErrors = {
  dbDown: "DB down",
};

export const authErrors = {
  noToken: "Access Denied. No token provided.",
  invalidToken: "Invalid token",
};

export const salaryIds = {
  employeeId: 1,
  missingEmployeeId: 999999,
};

export const salaryPayload = {
  employee_id: salaryIds.employeeId,
  basic_salary: 30000,
  allowance: 5000,
  deductions: 2000,
};

export const updatedSalaryPayload = {
  employee_id: salaryIds.employeeId,
  basic_salary: 32000,
  allowance: 4500,
  deductions: 1500,
};

export const salaryList = [
  {
    id: 1,
    employee_id: 1,
    basic_salary: 30000,
    allowance: 5000,
    deductions: 2000,
    net_salary: 33000,
    full_name: "Employee Test",
  },
  {
    id: 2,
    employee_id: 2,
    basic_salary: 26000,
    allowance: 4000,
    deductions: 1000,
    net_salary: 29000,
    full_name: "Another Employee",
  },
];

export const existingSalaryRecord = {
  id: 1,
  employee_id: 1,
  basic_salary: 30000,
  allowance: 5000,
  deductions: 2000,
  net_salary: 33000,
};
