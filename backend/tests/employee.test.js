import { describe, it, expect, afterEach, vi } from "vitest";
import request from "supertest";
import app from "../app";
import db from "../config/db";
import {
  employeeMessages,
  newEmployee,
  updatedEmployee,
  nonExistentEmployeeId,
  employeeList,
  emptyEmployeeArray,
  mockEmployee,
} from "./fixtures/mockEmployees";
import jwt from "jsonwebtoken";

afterEach(() => {
  vi.restoreAllMocks();
});

const buildNewEmployeePayload = () => {
  const uniqueToken = Date.now();

  return {
    ...newEmployee,
    employee_id: `EMP${uniqueToken}`,
    email: `employee${uniqueToken}@test.com`,
  };
};

const buildUpdatedEmployeePayload = () => {
  const uniqueToken = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

  return {
    ...updatedEmployee,
    employee_id: `EMP-U-${uniqueToken}`,
    email: `updated${uniqueToken}@test.com`,
  };
};

describe("GET /employees", () => {
  it("returns an array of employees", async () => {
    vi.spyOn(db, "query").mockResolvedValueOnce([employeeList]);

    const token = jwt.sign({ id: employeeList[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const response = await request(app)
      .get("/api/employees")
      .set("Cookie", `token=${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(employeeList);
  });

  it("returns an empty array when there are no employees", async () => {
    vi.spyOn(db, "query").mockResolvedValueOnce([emptyEmployeeArray]);

    const token = jwt.sign({ id: employeeList[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const response = await request(app)
      .get("/api/employees")
      .set("Cookie", `token=${token}`);

    expect(response.status).toBe(200);
    if (response.body.length === 0) {
      expect(response.body).toEqual([]);
    }
  });

  it("returns 500 when fetching employees fails", async () => {
    vi.spyOn(db, "query").mockRejectedValueOnce(new Error("DB down"));

    const token = jwt.sign({ id: employeeList[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const response = await request(app)
      .get("/api/employees")
      .set("Cookie", `token=${token}`);

    expect(response.status).toBe(500);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: employeeMessages.failedFetchAll,
        error: "DB down",
      }),
    );
  });
});

describe("GET /employees/:id", () => {
  it("returns a single employee by ID", async () => {
    vi.spyOn(db, "query").mockResolvedValueOnce([mockEmployee]);

    const token = jwt.sign({ id: employeeList[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const response = await request(app)
      .get(`/api/employees/${mockEmployee.id}`)
      .set("Cookie", `token=${token}`);

    expect(response.status).toBe(200);
  });

  it("returns 404 when employee is not found", async () => {
    const token = jwt.sign({ id: employeeList[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const response = await request(app)
      .get(`/api/employees/${nonExistentEmployeeId}`)
      .set("Cookie", `token=${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: employeeMessages.notFound,
    });
  });

  it("returns 500 when fetching employee by ID fails", async () => {
    vi.spyOn(db, "query").mockRejectedValueOnce(new Error("DB down"));

    const token = jwt.sign({ id: employeeList[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const response = await request(app)
      .get("/api/employees/1")
      .set("Cookie", `token=${token}`);

    expect(response.status).toBe(500);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: employeeMessages.failedFetchOne,
        error: "DB down",
      }),
    );
  });
});

describe("POST /employees", () => {
  it("creates an employee", async () => {
    const payload = buildNewEmployeePayload();
    const token = jwt.sign({ id: employeeList[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const response = await request(app)
      .post("/api/employees")
      .set("Cookie", `token=${token}`)
      .send(payload);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: employeeMessages.created,
        id: expect.any(Number),
      }),
    );
  });

  it("rejects invalid employee input", async () => {
    const invalidPayload = {
      ...buildNewEmployeePayload(),
      full_name: "",
    };
    const token = jwt.sign({ id: employeeList[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const response = await request(app)
      .post("/api/employees")
      .set("Cookie", `token=${token}`)
      .send(invalidPayload);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: employeeMessages.invalidRequired,
    });
  });

  it("rejects invalid email format", async () => {
    const invalidPayload = {
      ...buildNewEmployeePayload(),
      email: "invalid-email-format",
    };
    const token = jwt.sign({ id: employeeList[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const response = await request(app)
      .post("/api/employees")
      .set("Cookie", `token=${token}`)
      .send(invalidPayload);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: employeeMessages.invalidEmail,
    });
  });

  it("returns 500 when creating employee fails", async () => {
    vi.spyOn(db, "query").mockRejectedValueOnce(new Error("DB down"));
    const token = jwt.sign({ id: employeeList[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const response = await request(app)
      .post("/api/employees")
      .set("Cookie", `token=${token}`)
      .send(buildNewEmployeePayload());

    expect(response.status).toBe(500);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: employeeMessages.failedCreate,
        error: "DB down",
      }),
    );
  });
});

describe("PUT /employees/:id", () => {
  it("updates an employee", async () => {
    const createPayload = buildNewEmployeePayload();

    const token = jwt.sign({ id: employeeList[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const createResponse = await request(app)
      .post("/api/employees")
      .set("Cookie", `token=${token}`)
      .send(createPayload);

    expect(createResponse.status).toBe(201);

    const employeeId = createResponse.body.id;
    const updatePayload = buildUpdatedEmployeePayload();

    const updateResponse = await request(app)
      .put(`/api/employees/${employeeId}`)
      .set("Cookie", `token=${token}`)
      .send(updatePayload);

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body).toEqual({
      message: employeeMessages.updated,
    });
  });

  it("returns 404 if employee does not exist", async () => {
    const updatePayload = buildUpdatedEmployeePayload();

    const token = jwt.sign({ id: employeeList[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const response = await request(app)
      .put(`/api/employees/${nonExistentEmployeeId}`)
      .set("Cookie", `token=${token}`)

      .send(updatePayload);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: employeeMessages.notFound,
    });
  });

  it("returns 500 when updating employee fails", async () => {
    vi.spyOn(db, "query").mockRejectedValueOnce(new Error("DB down"));

    const token = jwt.sign({ id: employeeList[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const response = await request(app)
      .put("/api/employees/1")
      .set("Cookie", `token=${token}`)

      .send(buildUpdatedEmployeePayload());

    expect(response.status).toBe(500);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: employeeMessages.failedUpdate,
        error: "DB down",
      }),
    );
  });
});

describe("DELETE /employees/:id", () => {
  it("deletes an employee", async () => {
    const createPayload = buildNewEmployeePayload();

    const token = jwt.sign({ id: employeeList[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const createResponse = await request(app)
      .post("/api/employees")
      .set("Cookie", `token=${token}`)
      .send(createPayload);

    expect(createResponse.status).toBe(201);

    const employeeId = createResponse.body.id;
    const deleteResponse = await request(app)
      .delete(`/api/employees/${employeeId}`)
      .set("Cookie", `token=${token}`);

    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body).toEqual({
      message: employeeMessages.deleted,
    });

    const getResponse = await request(app)
      .get(`/api/employees/${employeeId}`)
      .set("Cookie", `token=${token}`);
    expect(getResponse.status).toBe(404);
    expect(getResponse.body).toEqual({
      message: employeeMessages.notFound,
    });
  });

  it("returns 404 when employee is not found", async () => {
    const token = jwt.sign({ id: employeeList[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const response = await request(app)
      .delete(`/api/employees/${nonExistentEmployeeId}`)
      .set("Cookie", `token=${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: employeeMessages.notFound,
    });
  });

  it("returns 500 when deleting employee fails", async () => {
    vi.spyOn(db, "query").mockRejectedValueOnce(new Error("DB down"));
    const token = jwt.sign({ id: employeeList[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const response = await request(app)
      .delete("/api/employees/1")
      .set("Cookie", `token=${token}`);

    expect(response.status).toBe(500);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: employeeMessages.failedDelete,
        error: "DB down",
      }),
    );
  });
});
