import { afterEach, describe, expect, it, vi } from "vitest";
import request from "supertest";
import app from "../app";
import db from "../config/db";
import generateToken from "../utils/generateToken.js";
import { employeeList } from "./fixtures/mockEmployees";
import {
  authErrors,
  existingSalaryRecord,
  salaryErrors,
  salaryIds,
  salaryList,
  salaryMessages,
  salaryPayload,
  updatedSalaryPayload,
} from "./fixtures/mockSalary";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("GET /api/salaries", () => {
  it("returns all salary records", async () => {
    vi.spyOn(db, "query").mockResolvedValueOnce([salaryList]);

    const token = generateToken(employeeList[0].id);

    const response = await request(app)
      .get("/api/salaries")
      .set("Cookie", `token=${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(salaryList);
  });

  it("returns an empty array when no salary records exist", async () => {
    vi.spyOn(db, "query").mockResolvedValueOnce([[]]);

    const token = generateToken(employeeList[0].id);

    const response = await request(app)
      .get("/api/salaries")
      .set("Cookie", `token=${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("returns 401 when token is missing", async () => {
    const response = await request(app).get("/api/salaries");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: authErrors.noToken,
    });
  });

  it("returns 400 when token is invalid", async () => {
    const response = await request(app)
      .get("/api/salaries")
      .set("Cookie", "token=invalid-token");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: authErrors.invalidToken,
    });
  });

  it("returns 500 when fetching salary records fails", async () => {
    vi.spyOn(db, "query").mockRejectedValueOnce(new Error(salaryErrors.dbDown));

    const token = generateToken(employeeList[0].id);

    const response = await request(app)
      .get("/api/salaries")
      .set("Cookie", `token=${token}`);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: salaryErrors.dbDown,
    });
  });
});

describe("POST /api/salaries", () => {
  it("adds a salary record when no existing salary is found", async () => {
    const querySpy = vi.spyOn(db, "query");

    querySpy.mockResolvedValueOnce([[{ id: salaryIds.employeeId }]]);
    querySpy.mockResolvedValueOnce([[]]);
    querySpy.mockResolvedValueOnce([{ insertId: 101 }]);

    const token = generateToken(employeeList[0].id);

    const response = await request(app)
      .post("/api/salaries")
      .set("Cookie", `token=${token}`)
      .send(salaryPayload);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: salaryMessages.added,
    });
    expect(querySpy).toHaveBeenCalledWith(
      expect.stringContaining("INSERT INTO salaries"),
      [
        salaryPayload.employee_id,
        salaryPayload.basic_salary,
        salaryPayload.allowance,
        salaryPayload.deductions,
        salaryPayload.basic_salary +
          salaryPayload.allowance -
          salaryPayload.deductions,
      ],
    );
  });

  it("updates salary record when an existing salary is found", async () => {
    const querySpy = vi.spyOn(db, "query");

    querySpy.mockResolvedValueOnce([[{ id: salaryIds.employeeId }]]);
    querySpy.mockResolvedValueOnce([[existingSalaryRecord]]);
    querySpy.mockResolvedValueOnce([{ affectedRows: 1 }]);

    const token = generateToken(employeeList[0].id);

    const response = await request(app)
      .post("/api/salaries")
      .set("Cookie", `token=${token}`)
      .send(updatedSalaryPayload);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: salaryMessages.updated,
    });
    expect(querySpy).toHaveBeenCalledWith(
      expect.stringContaining("UPDATE salaries"),
      [
        updatedSalaryPayload.basic_salary,
        updatedSalaryPayload.allowance,
        updatedSalaryPayload.deductions,
        updatedSalaryPayload.basic_salary +
          updatedSalaryPayload.allowance -
          updatedSalaryPayload.deductions,
        updatedSalaryPayload.employee_id,
      ],
    );
  });

  it("returns 404 when employee does not exist", async () => {
    const querySpy = vi.spyOn(db, "query");

    querySpy.mockResolvedValueOnce([[]]);
    querySpy.mockResolvedValueOnce([[]]);

    const token = generateToken(employeeList[0].id);

    const response = await request(app)
      .post("/api/salaries")
      .set("Cookie", `token=${token}`)
      .send({
        ...salaryPayload,
        employee_id: salaryIds.missingEmployeeId,
      });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: salaryMessages.employeeNotFound,
    });
  });

  it("returns 401 when token is missing", async () => {
    const response = await request(app)
      .post("/api/salaries")
      .send(salaryPayload);

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: authErrors.noToken,
    });
  });

  it("returns 400 when token is invalid", async () => {
    const response = await request(app)
      .post("/api/salaries")
      .set("Cookie", "token=invalid-token")
      .send(salaryPayload);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: authErrors.invalidToken,
    });
  });

  it("returns 500 when saving salary fails", async () => {
    vi.spyOn(db, "query").mockRejectedValueOnce(new Error(salaryErrors.dbDown));

    const token = generateToken(employeeList[0].id);

    const response = await request(app)
      .post("/api/salaries")
      .set("Cookie", `token=${token}`)
      .send(salaryPayload);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: salaryErrors.dbDown,
    });
  });
});
