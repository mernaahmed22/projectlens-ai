import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AnalyzePage from "@/app/analyze/page";

describe("AnalyzePage", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("shows an error message when the API request fails", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      json: async () => ({
        error: "The AI service is temporarily busy. Please try again in a moment.",
      }),
    } as Response);

    render(<AnalyzePage />);

    fireEvent.change(screen.getByLabelText(/project name/i), {
      target: { value: "Test Project" },
    });

    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Testing project risk analysis." },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /analyze project/i })
    );

    expect(
      screen.getByText(/analyzing project risks/i)
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByText(
          /the ai service is temporarily busy. please try again in a moment./i
        )
      ).toBeInTheDocument();
    });

    expect(
      screen.getByRole("button", { name: /try again/i })
    ).toBeInTheDocument();
  });
});