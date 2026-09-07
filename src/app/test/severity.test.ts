import { describe, expect, it } from "vitest";
import { getSeverityClasses } from "@/app/lib/severity";

describe("getSeverityClasses", () => {
  it("returns red styling for Critical risk", () => {
    expect(getSeverityClasses("Critical")).toContain("bg-red-100");
  });

  it("returns orange styling for High risk", () => {
    expect(getSeverityClasses("High")).toContain("bg-orange-100");
  });

  it("returns yellow styling for Medium risk", () => {
    expect(getSeverityClasses("Medium")).toContain("bg-yellow-100");
  });

  it("returns green styling for Low risk", () => {
    expect(getSeverityClasses("Low")).toContain("bg-green-100");
  });

  it("returns neutral styling for an unknown severity", () => {
    expect(getSeverityClasses("Unknown")).toContain("bg-slate-100");
  });
});