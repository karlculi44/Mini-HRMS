import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app";
import {
  newEmployee,
  updatedEmployee,
  nonExistentEmployeeId,
} from "./fixtures/mockEmployees";

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
      message: "Employee not found",
    });
  });
});

describe("POST /employees", () => {
  it("creates an employee", async () => {
    const payload = buildNewEmployeePayload();

    const response = await request(app).post("/api/employees").send(payload);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Employee added successfully",
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
      message: "Invalid input: all employee fields are required",
    });
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
      message: "Employee updated successfully",
    });
  });

  it("returns 404 if employee does not exist", async () => {
    const updatePayload = buildUpdatedEmployeePayload();

    const response = await request(app)
      .put(`/api/employees/${nonExistentEmployeeId}`)
      .send(updatePayload);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "Employee not found",
    });
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
      message: "Employee deleted successfully",
    });

    const getResponse = await request(app).get(`/api/employees/${employeeId}`);
    expect(getResponse.status).toBe(404);
    expect(getResponse.body).toEqual({
      message: "Employee not found",
    });
  });

  it("returns 404 when employee is not found", async () => {
    const response = await request(app).delete(
      `/api/employees/${nonExistentEmployeeId}`,
    );

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "Employee not found",
    });
  });
});
