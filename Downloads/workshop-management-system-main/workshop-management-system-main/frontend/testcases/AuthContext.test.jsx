import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor, screen } from "@testing-library/react";
import { AuthProvider, useAuth } from "../src/Context/AuthContext";

// Dummy child that uses context
const TestComponent = () => {
  const { username, loading } = useAuth();
  return (
    <div>
      <div data-testid="username">{username || "Guest"}</div>
      <div data-testid="loading">{loading ? "true" : "false"}</div>
    </div>
  );
};

describe("AuthProvider", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("sets username if fetch succeeds", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ username: "maham" }),
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => expect(screen.getByTestId("loading")).toHaveTextContent("false"));
    expect(screen.getByTestId("username")).toHaveTextContent("maham");
  });

  it("sets username to null if fetch fails", async () => {
    fetch.mockRejectedValueOnce(new Error("Unauthorized"));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => expect(screen.getByTestId("loading")).toHaveTextContent("false"));
    expect(screen.getByTestId("username")).toHaveTextContent("Guest");
  });
});
