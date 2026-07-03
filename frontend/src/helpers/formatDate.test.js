import { describe, it, expect } from "vitest";
import { formatDate } from "./formatDate";

describe("formatDate", () => {
  it("formats date strings as MM/DD/YYYY", () => {
    expect(formatDate("2026-07-03T00:00:00")).toBe("07/03/2026");
  });

  it("keeps single-digit month and day zero-padded", () => {
    expect(formatDate("2026-01-05T00:00:00")).toBe("01/05/2026");
  });

  it("accepts other date format", () => {
    expect(formatDate("12-15-23")).toBe("12/15/2023");
  });

  it("returns Invalid Date for malformed input", () => {
    expect(formatDate("not-a-date")).toBe("Invalid Date");
  });
});
