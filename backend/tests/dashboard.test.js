import { afterEach, describe, expect, it, vi } from "vitest";
import request from "supertest";
import app from "../app";
import db from "../config/db";
import {
  dashboardErrors,
  dashboardMessages,
  dashboardQueryMocks,
  expectedDashboardStats,
} from "./fixtures/mockDashboard";
import { employeeList } from "./fixtures/mockEmployees";
import jwt from "jsonwebtoken";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("GET /api/dashboard", () => {
  it("returns dashboard statistics with expected labels and values", async () => {
    const querySpy = vi.spyOn(db, "query");

    dashboardQueryMocks.defaultSuccess.forEach((result) => {
      querySpy.mockResolvedValueOnce(result);
    });

    const token = jwt.sign({ id: employeeList[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const response = await request(app)
      .get("/api/dashboard")
      .set("Cookie", `token=${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedDashboardStats);
  });

  it("returns zero total employees when there are no employees", async () => {
    const querySpy = vi.spyOn(db, "query");

    dashboardQueryMocks.zeroData.forEach((result) => {
      querySpy.mockResolvedValueOnce(result);
    });

    const token = jwt.sign({ id: employeeList[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const response = await request(app)
      .get("/api/dashboard")
      .set("Cookie", `token=${token}`);

    expect(response.status).toBe(200);
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        name: "Total Employees",
        value: 0,
        type: "number",
      }),
    );
  });

  it("returns zero active employees when there are no active employees", async () => {
    const querySpy = vi.spyOn(db, "query");

    dashboardQueryMocks.zeroData.forEach((result) => {
      querySpy.mockResolvedValueOnce(result);
    });
    const token = jwt.sign({ id: employeeList[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const response = await request(app)
      .get("/api/dashboard")
      .set("Cookie", `token=${token}`);

    expect(response.status).toBe(200);
    expect(response.body[1]).toEqual(
      expect.objectContaining({
        name: "Active Employees",
        value: 0,
        type: "number",
      }),
    );
  });

  it("returns zero employees on leave when there are no employees on leave", async () => {
    const querySpy = vi.spyOn(db, "query");

    dashboardQueryMocks.zeroData.forEach((result) => {
      querySpy.mockResolvedValueOnce(result);
    });

    const token = jwt.sign({ id: employeeList[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const response = await request(app)
      .get("/api/dashboard")
      .set("Cookie", `token=${token}`);

    expect(response.status).toBe(200);
    expect(response.body[2]).toEqual(
      expect.objectContaining({
        name: "Employees On Leave",
        value: 0,
        type: "number",
      }),
    );
  });

  it("returns zero payroll value when payroll sum is zero", async () => {
    const querySpy = vi.spyOn(db, "query");

    dashboardQueryMocks.zeroData.forEach((result) => {
      querySpy.mockResolvedValueOnce(result);
    });

    const token = jwt.sign({ id: employeeList[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const response = await request(app)
      .get("/api/dashboard")
      .set("Cookie", `token=${token}`);

    expect(response.status).toBe(200);
    expect(response.body[3]).toEqual(
      expect.objectContaining({
        name: "Total Monthly Payroll",
        value: 0,
        type: "currency",
      }),
    );
  });

  it("returns 500 when the first dashboard query fails", async () => {
    vi.spyOn(db, "query").mockRejectedValueOnce(
      new Error(dashboardErrors.dbDown),
    );

    const token = jwt.sign({ id: employeeList[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const response = await request(app)
      .get("/api/dashboard")
      .set("Cookie", `token=${token}`);

    expect(response.status).toBe(500);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: dashboardMessages.failedFetch,
        error: dashboardErrors.dbDown,
      }),
    );
  });
});
