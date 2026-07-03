import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Attendance from "./Attendance";
import * as attendanceServices from "../services/attendanceServices";
import * as employeeServices from "../services/employeeServices";
import { mockEmployees } from "../test/mocks/employeesData";
import {
  mockAttendanceDataEdited,
  mockAttendanceData,
} from "../test/mocks/attendanceData";

vi.mock("../services/attendanceServices");
vi.mock("../services/employeeServices");

describe("Attendance", () => {
  it("updates the attendance record with a newly selected employee", async () => {
    const user = userEvent.setup();

    vi.mocked(employeeServices.getEmployees).mockResolvedValue(mockEmployees);
    vi.mocked(attendanceServices.getAttendance)
      .mockResolvedValueOnce(mockAttendanceData)
      .mockResolvedValueOnce(mockAttendanceDataEdited);
    vi.mocked(attendanceServices.updateAttendance).mockResolvedValue();

    render(<Attendance />);

    const juanCell = await screen.findByText("Juan Dela Cruz");
    const attendanceRow = juanCell.closest("tr");

    expect(attendanceRow).not.toBeNull();

    await user.click(
      within(attendanceRow).getByRole("button", {
        name: /edit attendance/i,
      }),
    );

    const employeeSelect = screen.getByDisplayValue("Juan Dela Cruz");

    await user.selectOptions(employeeSelect, "5");
    await await user.click(screen.getByRole("button", { name: /update/i }));

    await waitFor(() => {
      expect(attendanceServices.updateAttendance).toHaveBeenCalledWith(
        10,
        expect.objectContaining({ employee_id: "5" }),
      );
    });

    await waitFor(() => {
      expect(screen.getByText("David Lopez")).toBeInTheDocument();
    });
  });
});
