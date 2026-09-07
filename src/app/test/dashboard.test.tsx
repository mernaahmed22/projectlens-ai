import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import DashboardPage from "@/app/page";

describe("DashboardPage", () => {
  it("renders the main dashboard content", () => {
    render(<DashboardPage />);

    expect(
      screen.getByText(/understand project risk before it becomes expensive/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "New Analysis" })
    ).toHaveAttribute("href", "/analyze");

    expect(screen.getByText("Total Projects")).toBeInTheDocument();
    expect(screen.getByText("At Risk")).toBeInTheDocument();
    expect(screen.getByText("Critical")).toBeInTheDocument();

    expect(screen.getByText("Mobile Banking Redesign")).toBeInTheDocument();
    expect(screen.getByText("CRM Migration")).toBeInTheDocument();
    expect(screen.getByText("Website Redesign")).toBeInTheDocument();

    expect(screen.getByText("Demo data")).toBeInTheDocument();

    expect(
      screen.queryByRole("link", { name: "Start New Analysis" })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: "Reports" })
    ).not.toBeInTheDocument();
  });
});