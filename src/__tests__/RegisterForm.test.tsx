import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import RegisterForm from "@/app/(auth)/_components/RegisterForm";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

jest.mock("next/link", () => {
  return function Link({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

jest.mock("@/lib/action/auth-action", () => ({
  handleRegister: jest.fn(),
}));

import { handleRegister } from "@/lib/action/auth-action";
const mockHandleRegister = handleRegister as jest.Mock;

describe("RegisterForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render all form fields", () => {
    render(<RegisterForm />);
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
  });

  test("should render register button", () => {
    render(<RegisterForm />);
    expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
  });

  test("should render login link", () => {
    render(<RegisterForm />);
    expect(screen.getByText(/log in/i)).toBeInTheDocument();
  });

  test("should show validation error for empty form", async () => {
    render(<RegisterForm />);
    fireEvent.click(screen.getByRole("button", { name: /register/i }));
    await waitFor(() => {
      expect(screen.getByText(/enter your first name/i)).toBeInTheDocument();
    });
  });

  test("should show error on failed registration", async () => {
    mockHandleRegister.mockResolvedValue({
      success: false,
      message: "Email already exists",
    });
    render(<RegisterForm />);
    await userEvent.type(screen.getByLabelText(/first name/i), "Shreesha");
    await userEvent.type(screen.getByLabelText(/last name/i), "Shrestha");
    await userEvent.type(screen.getByLabelText(/username/i), "shreesha123");
    await userEvent.type(screen.getByLabelText(/email/i), "existing@example.com");
    await userEvent.type(screen.getByLabelText("Password"), "password123");
    await userEvent.type(screen.getByLabelText(/confirm password/i), "password123");
    fireEvent.click(screen.getByRole("button", { name: /register/i }));
    await waitFor(() => {
      expect(screen.getByText(/email already exists/i)).toBeInTheDocument();
    });
  });

  test("should show error when passwords do not match", async () => {
    render(<RegisterForm />);
    await userEvent.type(screen.getByLabelText(/first name/i), "Shreesha");
    await userEvent.type(screen.getByLabelText(/last name/i), "Shrestha");
    await userEvent.type(screen.getByLabelText(/username/i), "shreesha123");
    await userEvent.type(screen.getByLabelText(/email/i), "shreesha@example.com");
    await userEvent.type(screen.getByLabelText("Password"), "password123");
    await userEvent.type(screen.getByLabelText(/confirm password/i), "differentpassword");
    fireEvent.click(screen.getByRole("button", { name: /register/i }));
    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
  });

  test("should call handleRegister with correct data", async () => {
    mockHandleRegister.mockResolvedValue({ success: true });
    render(<RegisterForm />);
    await userEvent.type(screen.getByLabelText(/first name/i), "Shreesha");
    await userEvent.type(screen.getByLabelText(/last name/i), "Shrestha");
    await userEvent.type(screen.getByLabelText(/username/i), "shreesha123");
    await userEvent.type(screen.getByLabelText(/email/i), "shreesha@example.com");
    await userEvent.type(screen.getByLabelText("Password"), "password123");
    await userEvent.type(screen.getByLabelText(/confirm password/i), "password123");
    fireEvent.click(screen.getByRole("button", { name: /register/i }));
    await waitFor(() => {
      expect(mockHandleRegister).toHaveBeenCalledWith({
        firstName: "Shreesha",
        lastName: "Shrestha",
        username: "shreesha123",
        email: "shreesha@example.com",
        password: "password123",
        confirmPassword: "password123",
      });
    });
  });

  test("should call handleRegister when form submitted successfully", async () => {
    mockHandleRegister.mockResolvedValue({ success: true });
    render(<RegisterForm />);
    await userEvent.type(screen.getByLabelText(/first name/i), "Shreesha");
    await userEvent.type(screen.getByLabelText(/last name/i), "Shrestha");
    await userEvent.type(screen.getByLabelText(/username/i), "shreesha123");
    await userEvent.type(screen.getByLabelText(/email/i), "shreesha@example.com");
    await userEvent.type(screen.getByLabelText("Password"), "password123");
    await userEvent.type(screen.getByLabelText(/confirm password/i), "password123");
    fireEvent.click(screen.getByRole("button", { name: /register/i }));
    await waitFor(() => {
      expect(mockHandleRegister).toHaveBeenCalled();
    });
  });
});