import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Payroll from "./Payroll";
import * as payrollServices from "../services/payrollServices";
import * as employeeServices from "../services/employeeServices";
import mockPayrollData from "../test/mocks/payrollData";
import { mockEmployees } from "../test/mocks/employeesData";

vi.mock("../services/payrollServices");
vi.mock("../services/employeeServices");

describe("Payroll", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the page properly", async () => {
    vi.mocked(payrollServices.getPayrolls).mockResolvedValue(mockPayrollData);
    vi.mocked(employeeServices.getEmployees).mockResolvedValue(mockEmployees);

    render(<Payroll />);

    expect(
      await screen.findByRole("heading", { name: /payroll management/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/generate payroll records, calculate earnings/i),
    ).toBeInTheDocument();
  });

  it("renders the table with the payroll data", async () => {
    vi.mocked(payrollServices.getPayrolls).mockResolvedValue(mockPayrollData);
    vi.mocked(employeeServices.getEmployees).mockResolvedValue(mockEmployees);

    render(<Payroll />);

    const payrollTable = await screen.findByRole("table");

    expect(payrollTable).toBeInTheDocument();
    expect(
      within(payrollTable).getByText("Juan Dela Cruz"),
    ).toBeInTheDocument();
    expect(within(payrollTable).getByText("Maria Santos")).toBeInTheDocument();
    expect(within(payrollTable).getByText("David Lopez")).toBeInTheDocument();
  });

  it("generates payroll for a single employee using the dropdown", async () => {
    const user = userEvent.setup();
    vi.mocked(payrollServices.getPayrolls).mockResolvedValue(mockPayrollData);
    vi.mocked(employeeServices.getEmployees).mockResolvedValue(mockEmployees);
    vi.mocked(payrollServices.generatePayroll).mockResolvedValue({});

    render(<Payroll />);

    const employeeDropdown = await screen.findByRole("combobox");

    await user.selectOptions(employeeDropdown, "1");
    await user.click(
      screen.getByRole("button", {
        name: /generate payroll/i,
      }),
    );

    await waitFor(() => {
      expect(payrollServices.generatePayroll).toHaveBeenCalledWith("1");
    });
  });

  it("generates all payrolls", async () => {
    const user = userEvent.setup();
    vi.mocked(payrollServices.getPayrolls).mockResolvedValue(mockPayrollData);
    vi.mocked(employeeServices.getEmployees).mockResolvedValue(mockEmployees);
    vi.mocked(payrollServices.generatePayroll).mockResolvedValue({});

    render(<Payroll />);

    await user.click(
      await screen.findByRole("button", {
        name: /generate all/i,
      }),
    );

    await waitFor(() => {
      expect(payrollServices.generatePayroll).toHaveBeenCalledTimes(
        mockEmployees.length,
      );
    });

    for (const employee of mockEmployees) {
      expect(payrollServices.generatePayroll).toHaveBeenCalledWith(employee.id);
    }
  });
});
