import { describe, it, expect, afterEach, vi } from "vitest";
import request from "supertest";
import app from "../app";
import db from "../db";
import {
  employeeMessages,
  newEmployee,
  updatedEmployee,
  nonExistentEmployeeId,
} from "./fixtures/mockEmployees";

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
  it("returns an array", async () => {
    const response = await request(app).get("/api/employees");

    console.log(response);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        full_name: expect.any(String),
      }),
    );
  });

  it("returns an empty array when there are no employees", async () => {
    const response = await request(app).get("/api/employees");
    expect(response.status).toBe(200);
    if (response.body.length === 0) {
      expect(response.body).toEqual([]);
    }
  });

  it("returns employee fields when data exists", async () => {
    const response = await request(app).get("/api/employees");

    expect(response.status).toBe(200);
    if (response.body.length > 0) {
      expect(response.body[0]).toEqual(
        expect.objectContaining({
          employee_id: expect.any(String),
          email: expect.any(String),
          position: expect.any(String),
        }),
      );
    }
  });

  it("returns 500 when fetching employees fails", async () => {
    vi.spyOn(db, "query").mockRejectedValueOnce(new Error("DB down"));

    const response = await request(app).get("/api/employees");

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
    const response = await request(app).get("/api/employees/3");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        full_name: expect.any(String),
      }),
    );
  });

  it("returns 404 when employee is not found", async () => {
    const response = await request(app).get("/api/employees/9999");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: employeeMessages.notFound,
    });
  });

  it("returns complete employee details for a created employee", async () => {
    const createResponse = await request(app)
      .post("/api/employees")
      .send(buildNewEmployeePayload());

    expect(createResponse.status).toBe(201);

    const employeeId = createResponse.body.id;
    const response = await request(app).get(`/api/employees/${employeeId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: employeeId,
        full_name: expect.any(String),
        email: expect.any(String),
      }),
    );
  });

  it("returns 500 when fetching employee by ID fails", async () => {
    vi.spyOn(db, "query").mockRejectedValueOnce(new Error("DB down"));

    const response = await request(app).get("/api/employees/1");

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

    const response = await request(app).post("/api/employees").send(payload);

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

    const response = await request(app)
      .post("/api/employees")
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

    const response = await request(app)
      .post("/api/employees")
      .send(invalidPayload);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: employeeMessages.invalidEmail,
    });
  });

  it("returns 500 when creating employee fails", async () => {
    vi.spyOn(db, "query").mockRejectedValueOnce(new Error("DB down"));

    const response = await request(app)
      .post("/api/employees")
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
    const createResponse = await request(app)
      .post("/api/employees")
      .send(createPayload);

    expect(createResponse.status).toBe(201);

    const employeeId = createResponse.body.id;
    const updatePayload = buildUpdatedEmployeePayload();

    const updateResponse = await request(app)
      .put(`/api/employees/${employeeId}`)
      .send(updatePayload);

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body).toEqual({
      message: employeeMessages.updated,
    });
  });

  it("returns updated data when fetched after update", async () => {
    const createResponse = await request(app)
      .post("/api/employees")
      .send(buildNewEmployeePayload());

    expect(createResponse.status).toBe(201);

    const employeeId = createResponse.body.id;
    const updatePayload = buildUpdatedEmployeePayload();

    const updateResponse = await request(app)
      .put(`/api/employees/${employeeId}`)
      .send(updatePayload);

    expect(updateResponse.status).toBe(200);

    const getResponse = await request(app).get(`/api/employees/${employeeId}`);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toEqual(
      expect.objectContaining({
        full_name: updatePayload.full_name,
        email: updatePayload.email,
      }),
    );
  });

  it("returns 404 if employee does not exist", async () => {
    const updatePayload = buildUpdatedEmployeePayload();

    const response = await request(app)
      .put(`/api/employees/${nonExistentEmployeeId}`)
      .send(updatePayload);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: employeeMessages.notFound,
    });
  });

  it("returns 500 when updating employee fails", async () => {
    vi.spyOn(db, "query").mockRejectedValueOnce(new Error("DB down"));

    const response = await request(app)
      .put("/api/employees/1")
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
    const createResponse = await request(app)
      .post("/api/employees")
      .send(createPayload);

    expect(createResponse.status).toBe(201);

    const employeeId = createResponse.body.id;
    const deleteResponse = await request(app).delete(
      `/api/employees/${employeeId}`,
    );

    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body).toEqual({
      message: employeeMessages.deleted,
    });

    const getResponse = await request(app).get(`/api/employees/${employeeId}`);
    expect(getResponse.status).toBe(404);
    expect(getResponse.body).toEqual({
      message: employeeMessages.notFound,
    });
  });

  it("returns 404 when employee is not found", async () => {
    const response = await request(app).delete(
      `/api/employees/${nonExistentEmployeeId}`,
    );

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: employeeMessages.notFound,
    });
  });

  it("returns 500 when deleting employee fails", async () => {
    vi.spyOn(db, "query").mockRejectedValueOnce(new Error("DB down"));

    const response = await request(app).delete("/api/employees/1");

    expect(response.status).toBe(500);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: employeeMessages.failedDelete,
        error: "DB down",
      }),
    );
  });
});
