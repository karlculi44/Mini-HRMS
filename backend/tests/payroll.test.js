import { afterEach, describe, expect, it, vi } from "vitest";
import request from "supertest";
import app from "../app";
import db from "../config/db";
import {
  employeePayrollHistory,
  payrollErrors,
  payrollIds,
  payrollList,
  payrollMessages,
  salaryRecord,
} from "./fixtures/mockPayroll";
import generateToken from "./utils/generateToken";
import { employeeList } from "./fixtures/mockEmployees";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("POST /api/payroll/:employeeId", () => {
  it("generates payroll for an employee with a salary record", async () => {
    const querySpy = vi.spyOn(db, "query");

    querySpy.mockResolvedValueOnce([[salaryRecord]]);
    querySpy.mockResolvedValueOnce([{ insertId: 1 }]);

    const token = generateToken(employeeList[0].id);

    const response = await request(app)
      .post(`/api/payroll/${payrollIds.employeeId}`)
      .set("Cookie", `token=${token}`);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: payrollMessages.generated,
    });
  });

  it("returns 404 when the salary record is not found", async () => {
    vi.spyOn(db, "query").mockResolvedValueOnce([[]]);

    const token = generateToken(employeeList[0].id);

    const response = await request(app)
      .post(`/api/payroll/${payrollIds.missingEmployeeId}`)
      .set("Cookie", `token=${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: payrollMessages.salaryNotFound,
    });
  });

  it("returns 500 when payroll generation fails", async () => {
    vi.spyOn(db, "query").mockRejectedValueOnce(
      new Error(payrollErrors.dbDown),
    );

    const token = generateToken(employeeList[0].id);

    const response = await request(app)
      .post(`/api/payroll/${payrollIds.employeeId}`)
      .set("Cookie", `token=${token}`);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: payrollMessages.failedGenerate,
      error: payrollErrors.dbDown,
    });
  });
});

describe("GET /api/payroll", () => {
  it("returns all payroll records", async () => {
    vi.spyOn(db, "query").mockResolvedValueOnce([payrollList]);

    const token = generateToken(employeeList[0].id);

    const response = await request(app)
      .get("/api/payroll")
      .set("Cookie", `token=${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(payrollList);
  });

  it("returns an empty array when there are no payroll records", async () => {
    vi.spyOn(db, "query").mockResolvedValueOnce([[]]);

    const token = generateToken(employeeList[0].id);

    const response = await request(app)
      .get("/api/payroll")
      .set("Cookie", `token=${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("returns 500 when fetching payroll fails", async () => {
    vi.spyOn(db, "query").mockRejectedValueOnce(
      new Error(payrollErrors.dbDown),
    );

    const token = generateToken(employeeList[0].id);

    const response = await request(app)
      .get("/api/payroll")
      .set("Cookie", `token=${token}`);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: payrollMessages.failedFetch,
      error: payrollErrors.dbDown,
    });
  });
});

describe("GET /api/payroll/:employeeId", () => {
  it("returns payroll history for an employee", async () => {
    const querySpy = vi.spyOn(db, "query");

    querySpy.mockResolvedValueOnce([employeePayrollHistory]);

    const token = generateToken(employeeList[0].id);

    const response = await request(app)
      .get(`/api/payroll/${payrollIds.employeeId}`)
      .set("Cookie", `token=${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(employeePayrollHistory);
  });

  it("returns an empty array when the employee has no payroll history", async () => {
    vi.spyOn(db, "query").mockResolvedValueOnce([[]]);

    const token = generateToken(employeeList[0].id);

    const response = await request(app)
      .get(`/api/payroll/${payrollIds.missingEmployeeId}`)
      .set("Cookie", `token=${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("returns 500 when fetching payroll history fails", async () => {
    vi.spyOn(db, "query").mockRejectedValueOnce(
      new Error(payrollErrors.dbDown),
    );

    const token = generateToken(employeeList[0].id);

    const response = await request(app)
      .get(`/api/payroll/${payrollIds.employeeId}`)
      .set("Cookie", `token=${token}`);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: payrollMessages.failedFetchHistory,
      error: payrollErrors.dbDown,
    });
  });
});
