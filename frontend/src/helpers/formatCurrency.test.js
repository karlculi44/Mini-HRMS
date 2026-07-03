import { describe, it, expect } from "vitest";
import { formatCurrency } from "./formatCurrency";

describe("formatCurrency", () => {
  it("formats whole numbers as PHP currency without decimals", () => {
    expect(formatCurrency(250000)).toBe("₱250,000");
  });

  it("rounds decimal values to the nearest whole peso", () => {
    expect(formatCurrency(1234.56)).toBe("₱1,235");
  });

  it("formats zero correctly", () => {
    expect(formatCurrency(0)).toBe("₱0");
  });
});
