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
  invalidRequired: "Invalid input: all employee fields are required",
  invalidEmail: "Invalid input: email format is invalid",
  failedFetchAll: "Failed to fetch employees",
  failedFetchOne: "Failed to fetch employee",
  failedCreate: "Failed to add employee",
  failedUpdate: "Failed to update employee",
  failedDelete: "Failed to delete employee",
};
