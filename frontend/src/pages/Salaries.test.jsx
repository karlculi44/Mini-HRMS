import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Salaries from "./Salaries";
import * as salaryServices from "../services/salaryServices";
import * as employeeServices from "../services/employeeServices";
import mockSalaries from "../test/mocks/salariesData";
import { mockEmployees } from "../test/mocks/employeesData";

vi.mock("../services/salaryServices");
vi.mock("../services/employeeServices");

describe("Salaries", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the salaries page heading", async () => {
    vi.mocked(salaryServices.getSalaries).mockResolvedValue([]);
    render(<Salaries />);

    expect(
      await screen.findByRole("heading", {
        name: /salary management/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders employees in the table using the mock salary data", async () => {
    vi.mocked(salaryServices.getSalaries).mockResolvedValue(mockSalaries);

    render(<Salaries />);

    expect(await screen.findByText("Juan Dela Cruz")).toBeInTheDocument();
    expect(screen.getByText("Maria Santos")).toBeInTheDocument();
    expect(screen.getByText("Pedro Reyes")).toBeInTheDocument();
  });

  it("opens the salary modal", async () => {
    const user = userEvent.setup();
    vi.mocked(salaryServices.getSalaries).mockResolvedValue([]);
    vi.mocked(employeeServices.getEmployees).mockResolvedValue([]);

    render(<Salaries />);

    await user.click(screen.getByRole("button", { name: /add salary/i }));

    expect(
      await screen.findByRole("heading", { name: /manage salary/i }),
    ).toBeInTheDocument();
  });

  it("loads the employees in the dropdown", async () => {
    vi.mocked(salaryServices.getSalaries).mockResolvedValue([]);
    vi.mocked(employeeServices.getEmployees).mockResolvedValue(mockEmployees);

    render(<Salaries />);

    await userEvent.click(screen.getByRole("button", { name: /add salary/i }));

    const employeeSelect = await screen.findByRole("combobox");
    const employeeOptions = await screen.findAllByRole("option");

    expect(employeeSelect).toBeInTheDocument();
    expect(
      employeeOptions.some((option) => option.textContent === "Juan Dela Cruz"),
    ).toBe(true);
    expect(
      employeeOptions.some((option) => option.textContent === "Maria Santos"),
    ).toBe(true);
  });

  it("submits a new salary and allows typing in the form", async () => {
    const user = userEvent.setup();
    vi.mocked(salaryServices.getSalaries).mockResolvedValue([]);
    vi.mocked(employeeServices.getEmployees).mockResolvedValue(mockEmployees);
    vi.mocked(salaryServices.createOrUpdateSalary).mockResolvedValue({});

    render(<Salaries />);

    await user.click(screen.getByRole("button", { name: /add salary/i }));

    await user.selectOptions(screen.getByRole("combobox"), "1");

    const basicSalaryInput = screen.getByPlaceholderText(/basic salary/i);
    const allowanceInput = screen.getByPlaceholderText(/allowance/i);
    const deductionsInput = screen.getByPlaceholderText(/deductions/i);

    await user.type(basicSalaryInput, "50000");
    await user.type(allowanceInput, "5000");
    await user.type(deductionsInput, "2000");

    expect(basicSalaryInput).toHaveValue(50000);
    expect(allowanceInput).toHaveValue(5000);
    expect(deductionsInput).toHaveValue(2000);

    await user.click(screen.getByRole("button", { name: /save/i }));

    expect(salaryServices.createOrUpdateSalary).toHaveBeenCalledWith(
      expect.objectContaining({
        employee_id: "1",
        basic_salary: "50000",
        allowance: "5000",
        deductions: "2000",
      }),
    );
  });

  it("edits an existing salary", async () => {
    const user = userEvent.setup();
    vi.mocked(salaryServices.getSalaries).mockResolvedValue(mockSalaries);
    vi.mocked(employeeServices.getEmployees).mockResolvedValue(mockEmployees);
    vi.mocked(salaryServices.createOrUpdateSalary).mockResolvedValue({});

    render(<Salaries />);

    const editButton = await screen.findByRole("button", {
      name: /edit salary for juan dela cruz/i,
    });

    await user.click(editButton);

    expect(
      await screen.findByRole("heading", { name: /update salary/i }),
    ).toBeInTheDocument();

    const employeeLabel = screen.getByText((_, element) => {
      return (
        element?.textContent === "Juan Dela Cruz" &&
        element.tagName.toLowerCase() === "span"
      );
    });

    expect(employeeLabel).toBeInTheDocument();

    const basicSalaryInput = screen.getByPlaceholderText(/basic salary/i);
    await user.clear(basicSalaryInput);
    await user.type(basicSalaryInput, "1000");

    await user.click(screen.getByRole("button", { name: /update/i }));

    expect(
      screen.queryByRole("heading", { name: /update salary/i }),
    ).not.toBeInTheDocument();

    expect(salaryServices.createOrUpdateSalary).toHaveBeenCalledWith({
      employee_id: 1,
      basic_salary: "1000",
      allowance: 10000,
      deductions: 5000,
    });
  });
});
