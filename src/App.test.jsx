import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import App from "./App.jsx";

describe("App", () => {
    const setupUser = () => userEvent.setup();
    const loginDemoUser = async (user) => {
        await user.type(screen.getByPlaceholderText(/username/i), "admin");
        await user.type(screen.getByPlaceholderText(/password/i), "1234");
        await user.click(screen.getByRole("button", { name: /sign in/i }));
    };

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("allows demo user to reach account overview", async () => {
        const user = setupUser();
        vi.spyOn(window, "alert").mockImplementation(() => {});

        render(<App />);

        await loginDemoUser(user);

        expect(await screen.findByText(/account overview/i)).toBeInTheDocument();
    });

    test("shows an alert for invalid credentials", async () => {
        const user = setupUser();
        const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

        render(<App />);

        await user.type(screen.getByPlaceholderText(/username/i), "baduser");
        await user.type(screen.getByPlaceholderText(/password/i), "badpass");
        await user.click(screen.getByRole("button", { name: /sign in/i }));

        expect(alertMock).toHaveBeenCalledWith("Invalid credentials. Try admin / 1234");
    });

    test("processes a transfer and records the transaction", async () => {
        const user = setupUser();
        const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

        render(<App />);

        await loginDemoUser(user);

        expect(await screen.findByText(/account overview/i)).toBeInTheDocument();

        await user.click(screen.getByRole("button", { name: /^Send$/i }));
        await user.type(await screen.findByPlaceholderText(/recipient/i), "Alice");
        await user.type(await screen.findByPlaceholderText(/0\.00/), "100");
        await user.click(screen.getByRole("button", { name: /send money/i }));

        expect(alertMock).toHaveBeenCalledWith("Transfer successful!");

        await user.click(screen.getByRole("button", { name: /^Home$/i }));
        expect(await screen.findByText(/Transfer to Alice/i)).toBeInTheDocument();
    });

    test("blocks transfers that exceed the current balance", async () => {
        const user = setupUser();
        const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

        render(<App />);
        await loginDemoUser(user);
        await screen.findByText(/account overview/i);

        await user.click(screen.getByRole("button", { name: /^Send$/i }));
        await user.type(await screen.findByPlaceholderText(/recipient/i), "Charlie");
        await user.type(await screen.findByPlaceholderText(/0\.00/), "5000");
        await user.click(screen.getByRole("button", { name: /send money/i }));

        expect(alertMock).toHaveBeenCalledWith("Insufficient funds");
    });

    test("requires all signup fields before creating an account", async () => {
        const user = setupUser();
        const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

        render(<App />);

        await user.click(screen.getByRole("button", { name: /^Create account$/i }));
        await user.type(await screen.findByPlaceholderText(/john doe/i), "Sam");
        await user.click(screen.getByRole("button", { name: /^Create Account$/i }));

        expect(alertMock).toHaveBeenCalledWith("Fill in all fields to sign up");
    });

    test("sends reset instructions when an email is provided", async () => {
        const user = setupUser();
        const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

        render(<App />);

        await user.click(screen.getByRole("button", { name: /forgot password\?/i }));
        await user.type(await screen.findByPlaceholderText(/you@example.com/i), "test@example.com");
        await user.click(screen.getByRole("button", { name: /send reset link/i }));

        expect(alertMock).toHaveBeenCalledWith("Reset instructions sent to test@example.com");
        expect(await screen.findByText(/sign in below/i)).toBeInTheDocument();
    });
});
