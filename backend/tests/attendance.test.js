import { afterEach, describe, expect, it, vi } from "vitest";
import request from "supertest";
import app from "../app";
import db from "../db";
import {
  attendanceErrors,
  attendanceIds,
  attendanceList,
  attendanceMessages,
  attendancePayload,
  attendanceRecord,
  updatedAttendancePayload,
} from "./fixtures/mockAttendance";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("GET /api/attendance", () => {
  it("returns all attendance records", async () => {
    vi.spyOn(db, "query").mockResolvedValueOnce([attendanceList]);

    const response = await request(app).get("/api/attendance");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(attendanceList);
  });

  it("returns an empty array when no attendance records exist", async () => {
    vi.spyOn(db, "query").mockResolvedValueOnce([[]]);

    const response = await request(app).get("/api/attendance");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("returns 500 when fetching attendance fails", async () => {
    vi.spyOn(db, "query").mockRejectedValueOnce(
      new Error(attendanceErrors.dbDown),
    );

    const response = await request(app).get("/api/attendance");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: attendanceMessages.fetchFailed,
      error: attendanceErrors.dbDown,
    });
  });
});

describe("GET /api/attendance/:employeeId", () => {
  it("returns attendance history by employee ID", async () => {
    const querySpy = vi.spyOn(db, "query");

    querySpy.mockResolvedValueOnce([[{ id: attendanceIds.employeeId }]]);
    querySpy.mockResolvedValueOnce([attendanceList]);

    const response = await request(app).get(
      `/api/attendance/${attendanceIds.employeeId}`,
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(attendanceList);
  });

  it("returns 404 when employee is not found", async () => {
    vi.spyOn(db, "query").mockResolvedValueOnce([[]]);

    const response = await request(app).get(
      `/api/attendance/${attendanceIds.missingEmployeeId}`,
    );

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: attendanceMessages.employeeNotFound,
    });
  });

  it("returns 500 when fetching attendance history fails", async () => {
    vi.spyOn(db, "query").mockRejectedValueOnce(
      new Error(attendanceErrors.dbDown),
    );

    const response = await request(app).get(
      `/api/attendance/${attendanceIds.employeeId}`,
    );

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: attendanceMessages.fetchFailed,
      error: attendanceErrors.dbDown,
    });
  });
});

describe("POST /api/attendance", () => {
  it("records attendance", async () => {
    const querySpy = vi.spyOn(db, "query");

    querySpy.mockResolvedValueOnce([[{ id: attendancePayload.employee_id }]]);
    querySpy.mockResolvedValueOnce([{ insertId: attendanceIds.attendanceId }]);

    const response = await request(app)
      .post("/api/attendance")
      .send(attendancePayload);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: attendanceMessages.recorded,
      id: attendanceIds.attendanceId,
    });
  });

  it("returns 404 when recording attendance for a missing employee", async () => {
    vi.spyOn(db, "query").mockResolvedValueOnce([[]]);

    const response = await request(app)
      .post("/api/attendance")
      .send({
        ...attendancePayload,
        employee_id: attendanceIds.missingEmployeeId,
      });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: attendanceMessages.employeeNotFound,
    });
  });

  it("returns 500 when recording attendance fails", async () => {
    vi.spyOn(db, "query").mockRejectedValueOnce(
      new Error(attendanceErrors.dbDown),
    );

    const response = await request(app)
      .post("/api/attendance")
      .send(attendancePayload);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: attendanceMessages.recordFailed,
      error: attendanceErrors.dbDown,
    });
  });
});

describe("PUT /api/attendance/:attendanceId", () => {
  it("updates attendance", async () => {
    const querySpy = vi.spyOn(db, "query");

    querySpy.mockResolvedValueOnce([[{ id: attendanceIds.attendanceId }]]);
    querySpy.mockResolvedValueOnce([
      [{ id: updatedAttendancePayload.employee_id }],
    ]);
    querySpy.mockResolvedValueOnce([{ affectedRows: 1 }]);

    const response = await request(app)
      .put(`/api/attendance/${attendanceIds.attendanceId}`)
      .send(updatedAttendancePayload);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: attendanceMessages.updated,
    });
  });

  it("returns 404 when attendance record is not found", async () => {
    vi.spyOn(db, "query").mockResolvedValueOnce([[]]);

    const response = await request(app)
      .put(`/api/attendance/${attendanceIds.missingAttendanceId}`)
      .send(updatedAttendancePayload);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: attendanceMessages.recordNotFound,
    });
  });

  it("returns 404 when updating attendance for a missing employee", async () => {
    const querySpy = vi.spyOn(db, "query");

    querySpy.mockResolvedValueOnce([[{ id: attendanceIds.attendanceId }]]);
    querySpy.mockResolvedValueOnce([[]]);

    const response = await request(app)
      .put(`/api/attendance/${attendanceIds.attendanceId}`)
      .send({
        ...updatedAttendancePayload,
        employee_id: attendanceIds.missingEmployeeId,
      });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: attendanceMessages.employeeNotFound,
    });
  });

  it("returns 500 when updating attendance fails", async () => {
    vi.spyOn(db, "query").mockRejectedValueOnce(
      new Error(attendanceErrors.dbDown),
    );

    const response = await request(app)
      .put(`/api/attendance/${attendanceIds.attendanceId}`)
      .send(updatedAttendancePayload);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: attendanceMessages.updateFailed,
      error: attendanceErrors.dbDown,
    });
  });
});
