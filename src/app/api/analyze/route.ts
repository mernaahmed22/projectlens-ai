import { GoogleGenAI, Type } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(request: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key is not configured." },
        { status: 500 }
      );
    }

    const project = await request.json();

    const prompt = `
You are a senior project risk analyst.

Analyze the following project information and produce a concise,
professional project risk assessment.

Project information:
${JSON.stringify(project, null, 2)}

When assigning the score:
- 0-29 = Low Risk
- 30-59 = Medium Risk
- 60-79 = High Risk
- 80-100 = Critical Risk

Focus on:
- schedule and delivery risk
- resource and staffing risk
- dependencies and blockers
- financial or ROI concerns
- operational risk
- security risk when relevant
- missing information that prevents confident decision-making

Recommendations must be specific and actionable.
Do not invent project facts that were not supplied.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskScore: {
              type: Type.NUMBER,
            },

            riskLevel: {
              type: Type.STRING,
              enum: ["Low", "Medium", "High", "Critical"],
            },

            executiveSummary: {
              type: Type.STRING,
            },

            risks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: {
                    type: Type.STRING,
                  },

                  severity: {
                    type: Type.STRING,
                    enum: ["Low", "Medium", "High", "Critical"],
                  },

                  explanation: {
                    type: Type.STRING,
                  },
                },

                required: ["title", "severity", "explanation"],
              },
            },

            missingInformation: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },

            recommendedActions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  action: {
                    type: Type.STRING,
                  },

                  priority: {
                    type: Type.STRING,
                    enum: ["Low", "Medium", "High", "Critical"],
                  },
                },

                required: ["action", "priority"],
              },
            },

            suggestedPriority: {
              type: Type.STRING,
              enum: ["Low", "Medium", "High", "Critical"],
            },
          },

          required: [
            "riskScore",
            "riskLevel",
            "executiveSummary",
            "risks",
            "missingInformation",
            "recommendedActions",
            "suggestedPriority",
          ],
        },
      },
    });

    if (!response.text) {
      throw new Error("Gemini returned an empty response.");
    }

    const analysis = JSON.parse(response.text);

    return NextResponse.json(analysis);
  } catch (error: unknown) {
    console.error("Project analysis failed:", error);

    const apiError = error as {
      status?: number;
      message?: string;
    };

    if (apiError?.status === 503) {
      return NextResponse.json(
        {
          error:
            "The AI service is temporarily busy. Please try again in a moment.",
        },
        { status: 503 }
      );
    }

    if (apiError?.status === 429) {
      return NextResponse.json(
        {
          error:
            "The AI request limit has been reached. Please wait a moment and try again.",
        },
        { status: 429 }
      );
    }

    if (apiError?.status === 401 || apiError?.status === 403) {
      return NextResponse.json(
        {
          error:
            "The AI service could not authenticate the request.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error:
          "We couldn't analyze this project right now. Please try again.",
      },
      { status: 500 }
    );
  }
}