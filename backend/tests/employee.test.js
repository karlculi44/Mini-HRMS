import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app";

describe("Employees API", () => {
  it("GET /employees returns 200", async () => {
    const response = await request(app).get("/api/employees");

    expect(response.status).toBe(200);
  });
});
