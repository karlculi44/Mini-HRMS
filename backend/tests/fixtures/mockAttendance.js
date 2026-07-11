export const attendanceMessages = {
  fetchFailed: "Failed to fetch attendance",
  recordFailed: "Failed to record attendance",
  updateFailed: "Failed to update attendance",
  employeeNotFound: "Employee not found",
  recordNotFound: "Attendance record not found",
  recorded: "Attendance recorded successfully",
  updated: "Attendance updated successfully",
};

export const attendancePayload = {
  employee_id: 1,
  full_name: "Employee Test",
  attendance_date: "2026-07-06",
  time_in: "08:00:00",
  time_out: "17:00:00",
  status: "Present",
};

export const updatedAttendancePayload = {
  employee_id: 1,
  full_name: "Employee Test",
  attendance_date: "2026-07-07",
  time_in: "09:00:00",
  time_out: "18:00:00",
  status: "Late",
};

export const attendanceRecord = {
  id: 10,
  employee_id: 1,
  attendance_date: "2026-07-06",
  time_in: "08:00:00",
  time_out: "17:00:00",
  status: "Present",
  full_name: "Employee Test",
};

export const attendanceList = [
  attendanceRecord,
  {
    id: 11,
    employee_id: 1,
    attendance_date: "2026-07-05",
    time_in: "08:15:00",
    time_out: "17:05:00",
    status: "Present",
    full_name: "Employee Test",
  },
];

export const attendanceIds = {
  employeeId: 1,
  missingEmployeeId: 999999,
  attendanceId: 10,
  missingAttendanceId: 888888,
};

export const attendanceErrors = {
  dbDown: "DB down",
};

export const attendanceAuthErrors = {
  noToken: "Access Denied. No token provided.",
};
