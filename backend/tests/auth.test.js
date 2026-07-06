import { afterEach, describe, expect, it, vi } from "vitest";
import request from "supertest";
import app from "../app.js";
import db from "../db.js";
import { validCredentials } from "./fixtures/mockUser.js";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("POST /api/auth/login", () => {
  it("logs in successfully with valid credentials", async () => {
    vi.spyOn(db, "query").mockResolvedValueOnce([
      [{ id: 1, ...validCredentials }],
    ]);

    const response = await request(app)
      .post("/api/auth/login")
      .send(validCredentials);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Login successful",
      user: {
        id: 1,
        email: validCredentials.email,
      },
    });

    expect(db.query).toHaveBeenCalledWith(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [validCredentials.email, validCredentials.password],
    );
  });

  it("returns 400 when email is missing", async () => {
    const spy = vi.spyOn(db, "query");

    const response = await request(app)
      .post("/api/auth/login")
      .send({ password: validCredentials.password });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Email and password required",
    });
    expect(spy).not.toHaveBeenCalled();
  });

  it("returns 400 when password is missing", async () => {
    const spy = vi.spyOn(db, "query");

    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: validCredentials.email });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Email and password required",
    });
    expect(spy).not.toHaveBeenCalled();
  });

  it("returns 400 when both email and password are missing", async () => {
    const spy = vi.spyOn(db, "query");

    const response = await request(app).post("/api/auth/login").send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Email and password required",
    });
    expect(spy).not.toHaveBeenCalled();
  });

  it("returns 401 for invalid credentials", async () => {
    vi.spyOn(db, "query").mockResolvedValueOnce([[]]);

    const response = await request(app)
      .post("/api/auth/login")
      .send(validCredentials);

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Invalid credentials",
    });
  });

  it("returns 500 when database query fails", async () => {
    vi.spyOn(db, "query").mockRejectedValueOnce(new Error("DB down"));

    const response = await request(app)
      .post("/api/auth/login")
      .send(validCredentials);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: "Server error",
      error: "DB down",
    });
  });
});
