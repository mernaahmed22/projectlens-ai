import { beforeEach, describe, expect, it, vi } from "vitest";

const { generateContentMock } = vi.hoisted(() => ({
  generateContentMock: vi.fn(),
}));

vi.mock("@google/genai", () => ({
  GoogleGenAI: class {
    models = {
      generateContent: generateContentMock,
    };
  },
  Type: {
    OBJECT: "OBJECT",
    NUMBER: "NUMBER",
    STRING: "STRING",
    ARRAY: "ARRAY",
  },
}));

import { POST } from "@/app/api/analyze/route";

const mockAnalysis = {
  riskScore: 85,
  riskLevel: "Critical",
  executiveSummary: "The project has significant delivery risks.",
  risks: [],
  missingInformation: [],
  recommendedActions: [],
  suggestedPriority: "Critical",
};

function createRequest() {
  return new Request("http://localhost:3000/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      projectName: "Test Project",
      description: "A project with delivery risks.",
    }),
  });
}

describe("POST /api/analyze", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("GEMINI_API_KEY", "test-api-key");
  });

  it("returns a structured analysis for a valid request", async () => {
    generateContentMock.mockResolvedValue({
      text: JSON.stringify(mockAnalysis),
    });

    const response = await POST(createRequest());
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockAnalysis);
    expect(generateContentMock).toHaveBeenCalledOnce();
  });

  it("returns an error when the API key is missing", async () => {
    vi.stubEnv("GEMINI_API_KEY", "");

    const response = await POST(createRequest());
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe("Gemini API key is not configured.");
    expect(generateContentMock).not.toHaveBeenCalled();
  });

  it("returns a friendly error when Gemini is temporarily busy", async () => {
    generateContentMock.mockRejectedValue({
      status: 503,
      message: "Service unavailable",
    });

    const response = await POST(createRequest());
    const data = await response.json();

    expect(response.status).toBe(503);
    expect(data.error).toMatch(/temporarily busy/i);
  });

  it("returns a friendly error when the rate limit is reached", async () => {
    generateContentMock.mockRejectedValue({
      status: 429,
      message: "Rate limit exceeded",
    });

    const response = await POST(createRequest());
    const data = await response.json();

    expect(response.status).toBe(429);
    expect(data.error).toMatch(/request limit/i);
  });

  it("returns an error when Gemini returns an empty response", async () => {
    generateContentMock.mockResolvedValue({
      text: "",
    });

    const response = await POST(createRequest());
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toMatch(/couldn't analyze this project/i);
  });
});