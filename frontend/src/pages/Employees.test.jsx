import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Employees from "./Employees";
import * as employeeServices from "../services/employeeServices";
import {
  mockEmployees,
  mockEmployeesWithoutJuan,
  mockNewEmployee,
  mockNoEmployees,
} from "../test/mocks/employeesData";

vi.mock("../services/employeeServices");

describe("Employees", () => {
  it("renders the employees properly", async () => {
    vi.mocked(employeeServices.getEmployees).mockResolvedValue(mockEmployees);

    render(<Employees />);

    expect(await screen.findByText("EMP001")).toBeInTheDocument();
    expect(screen.getByText("Juan Dela Cruz")).toBeInTheDocument();
  });

  it("renders no employees found if no employees", async () => {
    vi.mocked(employeeServices.getEmployees).mockResolvedValue(mockNoEmployees);

    render(<Employees />);

    expect(await screen.findByText("No employees found.")).toBeInTheDocument();
  });

  it("shows the modal when user clicks the add employee button", async () => {
    const user = userEvent.setup();
    render(<Employees />);

    const addEmployeeButton = screen.getByRole("button", {
      name: /add employee/i,
    });
    expect(addEmployeeButton).toBeInTheDocument();

    await user.click(addEmployeeButton);

    expect(
      screen.getByRole("heading", {
        name: /add employee/i,
      }),
    ).toBeInTheDocument();
  });

  it("unmounts the employee modal when the cancel button is clicked", async () => {
    const user = userEvent.setup();
    render(<Employees />);

    const addEmployeeButton = screen.getByRole("button", {
      name: /add employee/i,
    });

    expect(addEmployeeButton).toBeInTheDocument();

    await user.click(addEmployeeButton);

    expect(
      screen.getByRole("heading", {
        name: /add employee/i,
      }),
    ).toBeInTheDocument();

    const cancelButton = screen.getByRole("button", {
      name: /cancel/i,
    });

    expect(cancelButton).toBeInTheDocument();

    await user.click(cancelButton);

    expect(
      screen.queryByRole("heading", {
        name: /add employee/i,
      }),
    ).not.toBeInTheDocument();
  });

  it("edits the user with the form prefilled with his/her info", async () => {
    const user = userEvent.setup();
    vi.mocked(employeeServices.getEmployees).mockResolvedValue(mockEmployees);

    render(<Employees />);

    const juanCell = await screen.findByText("Juan Dela Cruz");

    const juanRow = juanCell.closest("tr");

    expect(juanRow).not.toBeNull();

    const editButton = within(juanRow).getByRole("button", {
      name: /edit/i,
    });

    await user.click(editButton);

    expect(
      screen.getByRole("heading", {
        name: /edit employee/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByDisplayValue("EMP001")).toBeInTheDocument();
  });

  it("creates a new employee when the form is submitted", async () => {
    const user = userEvent.setup();
    vi.mocked(employeeServices.getEmployees)
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([mockNewEmployee]);
    vi.mocked(employeeServices.createEmployee).mockResolvedValue();

    render(<Employees />);

    await user.click(screen.getByRole("button", { name: /add employee/i }));

    await user.type(screen.getByPlaceholderText(/employee id/i), "EMP006");
    await user.type(screen.getByPlaceholderText(/full name/i), "New Employee");
    await user.type(screen.getByPlaceholderText(/email/i), "new@example.com");
    await user.type(
      screen.getByPlaceholderText(/contact number/i),
      "09111111111",
    );
    await user.type(screen.getByPlaceholderText(/position/i), "Analyst");
    await user.type(screen.getByPlaceholderText(/department/i), "IT");

    await user.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => {
      expect(employeeServices.createEmployee).toHaveBeenCalledWith(
        expect.objectContaining({
          employee_id: "EMP006",
          full_name: "New Employee",
          email: "new@example.com",
        }),
      );
    });

    expect(
      screen.queryByRole("heading", { name: /add employee/i }),
    ).not.toBeInTheDocument();
  });

  it("updates an employee when the form is submitted", async () => {
    const user = userEvent.setup();
    vi.mocked(employeeServices.getEmployees).mockResolvedValue(mockEmployees);
    vi.mocked(employeeServices.updateEmployee).mockResolvedValue();

    render(<Employees />);

    const juanCell = await screen.findByText("Juan Dela Cruz");
    const juanRow = juanCell.closest("tr");

    expect(juanRow).not.toBeNull();

    await user.click(within(juanRow).getByRole("button", { name: /edit/i }));

    const fullNameInput = screen.getByDisplayValue("Juan Dela Cruz");

    await user.clear(fullNameInput);
    await user.type(fullNameInput, "Juan Santos");
    await user.click(screen.getByRole("button", { name: /update/i }));

    await waitFor(() => {
      expect(employeeServices.updateEmployee).toHaveBeenCalledWith(
        1,
        expect.objectContaining({ full_name: "Juan Santos" }),
      );
    });
  });

  it("removes the user from the table after successful user confirms deletion", async () => {
    const user = userEvent.setup();
    vi.mocked(employeeServices.getEmployees)
      .mockResolvedValueOnce(mockEmployees)
      .mockResolvedValueOnce(mockEmployeesWithoutJuan);
    vi.mocked(employeeServices.removeEmployee).mockResolvedValue();

    render(<Employees />);

    const juanCell = await screen.findByText("Juan Dela Cruz");

    const juanRow = juanCell.closest("tr");

    expect(juanRow).not.toBeNull();

    const deleteButton = within(juanRow).getByRole("button", {
      name: /delete/i,
    });

    await user.click(deleteButton);

    const confirmDeleteButton = screen.getByRole("button", {
      name: /confirm delete/i,
    });

    await user.click(confirmDeleteButton);

    expect(employeeServices.removeEmployee).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(screen.queryByText("Juan Dela Cruz")).not.toBeInTheDocument();
    });
  });
});
