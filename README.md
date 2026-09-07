# ProjectLens AI

ProjectLens AI is an AI-powered project risk analysis application built with Next.js and TypeScript. It helps project managers, team leads, and business teams assess project health by identifying risks, missing information, recommended actions, and an overall risk score.

## Live Demo

Deployed on Vercel:

https://projectlens-ai.vercel.app

## Features

- AI-powered project risk analysis
- Structured risk score from 0–100
- Risk severity classification
- Executive summary generation
- Identification of key project risks
- Detection of missing project information
- Recommended mitigation actions
- Suggested project priority
- Responsive dashboard
- Accessible UI
- Error handling for AI service failures and rate limits

## Tech Stack

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- Gemini API
- Vitest
- React Testing Library
- Vercel

## How It Works

Users enter project information such as:

- Project description
- Status and priority
- Timeline
- Budget
- Team size
- Expected ROI
- Current blockers
- Known risks
- Additional context

The application sends this information to the Gemini API through a server-side API route.

Gemini evaluates the project and returns structured JSON containing:

- Risk score
- Risk level
- Executive summary
- Key risks
- Missing information
- Recommended actions
- Suggested priority

The frontend then converts the structured response into a professional project risk report.

## AI Integration

ProjectLens AI uses the Gemini API to perform the project analysis.

The AI prompt is designed to make Gemini act as a project risk analyst. It receives the full project context and is instructed to return a structured response instead of conversational text.

The structured format was chosen because it makes the AI output predictable and easier to display, validate, and test in the frontend.

The API key is stored securely as an environment variable and is never exposed directly in the browser.

## Environment Variables

Create a `.env.local` file in the root of the project and add:

```env
GEMINI_API_KEY=your_gemini_api_key