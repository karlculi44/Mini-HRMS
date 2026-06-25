import { describe, it, expect, vi } from "vitest";
import Login from "../../src/pages/Login";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("Login Page", () => {
  it("renders the login form in the page", () => {
    const onSubmit = vi.fn();
    render(
      <MemoryRouter>
        <Login onSubmit={onSubmit} />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("form", {
        name: /login form/i,
      }),
    ).toBeInTheDocument();
  });
});
