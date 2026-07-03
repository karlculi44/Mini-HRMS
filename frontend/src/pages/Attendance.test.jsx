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
  it("renders the attendance page heading and description", async () => {
    vi.mocked(employeeServices.getEmployees).mockResolvedValue(mockEmployees);
    vi.mocked(attendanceServices.getAttendance).mockResolvedValue(
      mockAttendanceData,
    );

    render(<Attendance />);

    expect(
      await screen.findByRole("heading", { name: /attendance management/i }),
    ).toBeInTheDocument();
  });

  it("renders the table with the attendance records", async () => {
    vi.mocked(employeeServices.getEmployees).mockResolvedValue(mockEmployees);
    vi.mocked(attendanceServices.getAttendance).mockResolvedValue(
      mockAttendanceData,
    );

    render(<Attendance />);

    expect(await screen.findByRole("table")).toBeInTheDocument();
    expect(screen.getByText("Juan Dela Cruz")).toBeInTheDocument();
  });

  it("records a new attendance", async () => {
    const user = userEvent.setup();
    vi.mocked(employeeServices.getEmployees).mockResolvedValue(mockEmployees);
    vi.mocked(attendanceServices.getAttendance).mockResolvedValue(
      mockAttendanceData,
    );
    vi.mocked(attendanceServices.createAttendance).mockResolvedValue();

    render(<Attendance />);

    await user.click(
      screen.getByRole("button", { name: /record attendance/i }),
    );

    expect(
      screen.getByRole("heading", { name: /record attendance/i }),
    ).toBeInTheDocument();

    const employeeSelect = screen.getByLabelText(/select employee/i);

    await user.selectOptions(employeeSelect, "1");
    await user.type(screen.getByLabelText(/attendance date/i), "2026-07-03");
    await user.type(screen.getByLabelText(/time in/i), "08:00");
    await user.type(screen.getByLabelText(/time out/i), "17:00");
    await user.selectOptions(screen.getByLabelText(/status/i), "Present");

    await user.click(screen.getByRole("button", { name: /^record$/i }));

    await waitFor(() => {
      expect(attendanceServices.createAttendance).toHaveBeenCalledWith(
        expect.objectContaining({
          employee_id: "1",
          attendance_date: "2026-07-03",
          time_in: "08:00",
          time_out: "17:00",
          status: "Present",
        }),
      );
    });
  });

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

    expect(
      screen.getByRole("heading", {
        name: /edit attendance/i,
      }),
    ).toBeInTheDocument();

    const employeeSelect = screen.getByDisplayValue("Juan Dela Cruz");

    await user.selectOptions(employeeSelect, "5");
    await user.click(screen.getByRole("button", { name: /update/i }));

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
