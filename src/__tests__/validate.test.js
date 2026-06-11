import { describe, it, expect } from "vitest";
import { validate } from "../pages/Login";
import '@testing-library/jest-dom'

describe("validate", () => {
  it("returns error for invalid email", () => {
    const errors = validate("notanemail", "password123");
    expect(errors.email).toBeDefined();
  });

  it("returns error for short password", () => {
    const errors = validate("test@dal.ca", "abc");
    expect(errors.password).toBeDefined();
  });

  it("returns no errors for valid input", () => {
    const errors = validate("test@dal.ca", "password123");
    expect(Object.keys(errors).length).toBe(0);
  });
});