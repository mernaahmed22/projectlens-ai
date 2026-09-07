import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import RiskReport, {
  type AnalysisResult,
} from "@/app/analyze/RiskReport";

const mockAnalysis: AnalysisResult = {
  riskScore: 85,
  riskLevel: "Critical",
  executiveSummary: "The project has significant delivery risks.",
  risks: [
    {
      title: "Schedule Delay",
      severity: "High",
      explanation: "The backend integration is two weeks late.",
    },
  ],
  missingInformation: ["Contingency budget"],
  recommendedActions: [
    {
      action: "Escalate the backend integration delay.",
      priority: "High",
    },
  ],
  suggestedPriority: "Critical",
};

describe("RiskReport", () => {
  it("renders the risk score and risk level", () => {
    render(<RiskReport data={mockAnalysis} />);

    expect(screen.getByText("85")).toBeInTheDocument();
    expect(screen.getByText("Critical Risk")).toBeInTheDocument();
  });

  it("renders the executive summary", () => {
    render(<RiskReport data={mockAnalysis} />);

    expect(
      screen.getByText("The project has significant delivery risks.")
    ).toBeInTheDocument();
  });

  it("renders the identified risks", () => {
    render(<RiskReport data={mockAnalysis} />);

    expect(screen.getByText("Schedule Delay")).toBeInTheDocument();
    expect(
      screen.getByText("The backend integration is two weeks late.")
    ).toBeInTheDocument();
  });

  it("renders missing information", () => {
    render(<RiskReport data={mockAnalysis} />);

    expect(screen.getByText("Contingency budget")).toBeInTheDocument();
  });

  it("renders recommended actions and suggested priority", () => {
    render(<RiskReport data={mockAnalysis} />);

    expect(
      screen.getByText("Escalate the backend integration delay.")
    ).toBeInTheDocument();
    expect(screen.getByText("Priority: High")).toBeInTheDocument();
    expect(
      screen.getByText("Suggested project priority")
    ).toBeInTheDocument();
  });
});