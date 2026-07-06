import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../app.js";

describe("Root endpoint", () => {
  it("returns the API status message", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "HRMS API running",
    });
  });
});
