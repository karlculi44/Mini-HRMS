import { id } from "zod/v4/locales";

export const newEmployee = {
  employee_id: "EMP",
  full_name: "Employee Test",
  email: "employee@test.com",
  contact_number: "099227166254",
  position: "Intern",
  department: "IT",
  date_hired: "2026-07-02",
  employment_status: "Active",
};

export const updatedEmployee = {
  employee_id: "EMP-UPDATED",
  full_name: "Updated Employee",
  email: "updated.employee@test.com",
  contact_number: "09123456789",
  position: "Software Engineer",
  department: "Engineering",
  date_hired: "2026-07-03",
  employment_status: "Active",
};

export const nonExistentEmployeeId = 999999;

export const employeeMessages = {
  notFound: "Employee not found",
  created: "Employee added successfully",
  updated: "Employee updated successfully",
  deleted: "Employee deleted successfully",
  invalidRequired: "Invalid input: missing required fields",
  invalidEmail: "Invalid input: email format is invalid",
  failedFetchAll: "Failed to fetch employees",
  failedFetchOne: "Failed to fetch employee",
  failedCreate: "Failed to add employee",
  failedUpdate: "Failed to update employee",
  failedDelete: "Failed to delete employee",
};

export const mockEmployee = {
  id: 1,
  employee_id: "TEST EMP",
  full_name: "Test Employee",
  email: "test.employee@test.com",
  contact_number: "09123456789",
  position: "Software Engineer",
  department: "Engineering",
  date_hired: "2026-07-03",
  employment_status: "Active",
};

export const employeeList = [
  {
    employee_id: "EMP1",
    full_name: "Employee One",
    email: "employee1@test.com",
    contact_number: "099227166254",
    position: "Intern",
    department: "IT",
    date_hired: "2026-07-02",
    employment_status: "Active",
  },
  {
    employee_id: "EMP2",
    full_name: "Employee Two",
    email: "employee2@test.com",
    contact_number: "099227166255",
    position: "Software Engineer",
    department: "IT",
    date_hired: "2025-11-15",
    employment_status: "Active",
  },
  {
    employee_id: "EMP3",
    full_name: "Employee Three",
    email: "employee3@test.com",
    contact_number: "099227166256",
    position: "HR Officer",
    department: "Human Resources",
    date_hired: "2024-09-10",
    employment_status: "Active",
  },
  {
    employee_id: "EMP4",
    full_name: "Employee Four",
    email: "employee4@test.com",
    contact_number: "099227166257",
    position: "Accountant",
    department: "Finance",
    date_hired: "2023-06-20",
    employment_status: "Inactive",
  },
  {
    employee_id: "EMP5",
    full_name: "Employee Five",
    email: "employee5@test.com",
    contact_number: "099227166258",
    position: "Project Manager",
    department: "Operations",
    date_hired: "2022-03-01",
    employment_status: "Active",
  },
];

export const emptyEmployeeArray = [];

export const employeeErrors = {
  dbDown: "DB down",
};
