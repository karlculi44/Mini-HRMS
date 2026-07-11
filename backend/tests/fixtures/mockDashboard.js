export const dashboardMessages = {
  failedFetch: "Failed to fetch dashboard statistics",
};

export const dashboardQueryMocks = {
  defaultSuccess: [
    [[{ totalEmployees: 10 }]],
    [[{ activeEmployees: 8 }]],
    [[{ employeesOnLeave: 2 }]],
    [[{ totalMonthlyPayroll: 123456.78 }]],
  ],

  zeroData: [
    [[{ totalEmployees: 0 }]],
    [[{ activeEmployees: 0 }]],
    [[{ employeesOnLeave: 0 }]],
    [[{ totalMonthlyPayroll: 0 }]],
  ],
};

export const expectedDashboardStats = [
  {
    name: "Total Employees",
    value: 10,
    type: "number",
    color: "text-blue-600",
  },
  {
    name: "Active Employees",
    value: 8,
    type: "number",
    color: "text-green-600",
  },
  {
    name: "Employees On Leave",
    value: 2,
    type: "number",
    color: "text-amber-500",
  },
  {
    name: "Total Monthly Payroll",
    value: 123456.78,
    type: "currency",
    color: "text-black",
  },
];

export const dashboardErrors = {
  dbDown: "DB down",
};

export const dashboardAuthErrors = {
  noToken: "Access Denied. No token provided.",
};
