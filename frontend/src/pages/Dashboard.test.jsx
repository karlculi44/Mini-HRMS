import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { mockDashboardStats } from "../test/mocks/dashboardData";
import * as dashboardServices from "../services/dashboardServices";

vi.mock("../services/dashboardServices");

describe("Dashboard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the dashboard page heading and description", async () => {
    vi.mocked(dashboardServices.getDashboardStats).mockResolvedValue(
      mockDashboardStats,
    );

    render(<Dashboard />);

    expect(
      await screen.findByRole("heading", { name: /welcome back/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/monitor employees from a single dashboard/i),
    ).toBeInTheDocument();
  });

  it("renders dashboard statistics", async () => {
    vi.mocked(dashboardServices.getDashboardStats).mockResolvedValue(
      mockDashboardStats,
    );

    render(<Dashboard />);

    expect(await screen.findByText("Total Employees")).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();

    expect(screen.getByText("Active Employees")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();

    expect(screen.getByText("Employees On Leave")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();

    expect(screen.getByText("Total Monthly Payroll")).toBeInTheDocument();
    expect(screen.getByText("₱250,000")).toBeInTheDocument();

    expect(dashboardServices.getDashboardStats).toHaveBeenCalledTimes(1);
  });
});
