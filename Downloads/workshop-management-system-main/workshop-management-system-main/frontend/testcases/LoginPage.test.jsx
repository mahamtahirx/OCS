// LoginPage.test.jsx
import '@testing-library/jest-dom';
import React from "react";
import { render, screen } from "@testing-library/react";
import LoginPage from "../src/Pages/LoginPage";

// Mock child components
jest.mock("../src/Components/Layout/Logo", () => () => <div data-testid="mock-logo">Logo</div>);
jest.mock("../src/Components/Forms/AuthForm", () => ({ children, title }) => (
  <div data-testid="mock-authform">
    <h1>{title}</h1>
    {children}
  </div>
));
jest.mock("../src/Components/Forms/LogInForm", () => () => <form data-testid="mock-loginform">Login Form</form>);

describe("LoginPage", () => {
  test("renders LoginPage with logo, form title, and login form", () => {
    render(<LoginPage />);

    // Check if mocked logo is rendered
    expect(screen.getByTestId("mock-logo")).toBeInTheDocument();

    // Check for "Sign In" heading
    expect(screen.getByRole("heading", { name: /sign in/i })).toBeInTheDocument();

    // Check if mocked login form is rendered
    expect(screen.getByTestId("mock-loginform")).toBeInTheDocument();
  });
});