import { describe, it, expect, vi } from "vitest";
import Login from "../../src/pages/Login";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { userEvent } from "@testing-library/user-event";

describe("Login Page", () => {
  it("enables typing on the email and password textboxes", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    await user.type(screen.getByPlaceholderText(/email/i), "kaikai");

    expect(screen.getByPlaceholderText(/email/i)).toHaveValue("kaikai");

    await user.type(screen.getByPlaceholderText(/password/i), "kaikai");

    expect(screen.getByPlaceholderText(/password/i)).toHaveValue("kaikai");
  });
});
