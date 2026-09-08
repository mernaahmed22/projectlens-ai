# ProjectLens AI

ProjectLens AI is an AI-powered project risk analysis application built with Next.js and TypeScript. It helps project managers, team leads, and business teams assess project health by identifying risks, missing information, recommended actions, and an overall risk score.

## Project Brief

ProjectLens AI helps project managers, team leads, and business teams identify project risks before they become costly delays or failures. Many teams manage project information across scattered documents and status updates, making it difficult to recognize emerging risks and prioritize the right actions. I chose this idea because I wanted to build a practical AI tool that transforms project details into a structured, actionable assessment rather than a generic chatbot. Users can enter information about timelines, resources, budgets, dependencies, and blockers, then receive a risk score, key concerns, missing information, and recommended mitigation actions to support more informed decision-making.

## Live Demo

Deployed on Vercel:

https://projectlens-ai.vercel.app

## Features

* AI-powered project risk analysis
* Structured risk score from 0–100
* Risk severity classification
* Executive summary generation
* Identification of key project risks
* Detection of missing project information
* Recommended mitigation actions
* Suggested project priority
* Responsive dashboard with mobile access to New Analysis
* Accessible UI
* Error handling for AI service failures and rate limits

## Tech Stack

* Next.js 16
* React
* TypeScript
* Tailwind CSS
* Gemini API
* Vitest
* React Testing Library
* Vercel

## How It Works

Users enter project information such as project description, status, priority, timeline, budget, team size, expected ROI, blockers, known risks, and additional context.

The application sends this information to Gemini through a server-side API route. Gemini evaluates the project and returns structured JSON containing a risk score, risk level, executive summary, key risks, missing information, recommended actions, and suggested priority.

The frontend converts the structured response into a professional project risk report.

## AI Integration

ProjectLens AI uses the Gemini API to perform project analysis. The prompt instructs Gemini to act as a senior project risk analyst and evaluate schedule, resources, dependencies, financial concerns, operational risks, security risks when relevant, and missing information.

The prompt defines four score ranges:

* 0–29: Low Risk
* 30–59: Medium Risk
* 60–79: High Risk
* 80–100: Critical Risk

Gemini is instructed to provide specific, actionable recommendations and not invent project facts that were not supplied.

The application uses a JSON response schema to request consistent fields and severity values. Structured output was chosen because it makes the report easier to render, test, and consume programmatically.

The API key is stored in a server-side environment variable and is not exposed directly to the browser.

## Environment Variables

Create a `.env.local` file in the root of the project and add:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Replace the placeholder with your own Gemini API key. Never commit a real API key to GitHub.

## Local Setup

Clone the repository:

```bash
git clone https://github.com/mernaahmed22/projectlens-ai.git
```

Move into the project directory:

```bash
cd projectlens-ai
```

Install dependencies:

```bash
npm install
```

Create `.env.local` and add your Gemini API key.

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser. If port 3000 is occupied, Next.js may select another available port.

On Windows PowerShell, if script execution is restricted, use `npm.cmd` instead of `npm`, for example:

```powershell
npm.cmd run dev
```

## Testing

Run the automated test suite:

```bash
npm run test:run
```

The latest verified result was:

* 5 test files passed
* 17 tests passed

The tests cover dashboard rendering, analyze page behavior, risk report rendering, severity logic, API responses, and error handling for service unavailability, rate limits, and empty AI responses. API tests use mocked Gemini responses rather than making real AI requests.

Coverage was measured using Vitest with the V8 coverage provider. The latest coverage run reported 94.23% statement and line coverage overall, with the risk report and severity utility at 100%. Coverage should be rerun after significant code changes.

To generate coverage:

```bash
npx vitest run --coverage
```

On Windows PowerShell, use `npx.cmd` if script execution is restricted.

## Production Build

Run:

```bash
npm run build
```

The latest verified production build completed successfully with TypeScript checks and generated the dashboard, analysis page, and dynamic API route.

## Accessibility and Performance

The application was reviewed using Lighthouse, axe DevTools, and manual accessibility checks.

The latest verified production mobile Lighthouse results were:

* Performance: 85
* Accessibility: 100
* Best Practices: 100
* SEO: 100

A previous Analyze page audit achieved a performance score of 92 and an accessibility score of 100. The dashboard accessibility score also reached 100 after contrast improvements.

An axe DevTools scan of the live application reported 0 detected issues, including 0 critical, serious, moderate, and minor issues, with WCAG 2.1 AA rules selected.

Accessibility checks included keyboard navigation, visible focus states, required-field validation, a basic screen-reader label check, mobile layout inspection, semantic headings, accessible navigation labels, and improved text contrast.

The dashboard includes a visible New Analysis button on mobile and tablet screen sizes, ensuring users can access the main AI workflow when the desktop sidebar is hidden. The responsive dashboard and analysis form were reviewed at a 375px viewport, with no visible clipping or horizontal overflow. The mobile navigation button was also tested locally and confirmed to open the analysis page.

These automated and manual checks provide evidence of accessibility improvements but do not constitute a formal WCAG certification.

## Error Handling

The application handles common AI service failures, including:

* Temporary service unavailability
* API rate limits
* Authentication failures
* Empty AI responses
* Network or connection failures

Users receive friendly error messages rather than raw provider errors. The form also provides loading feedback and a retry action.

## Architecture

The project uses the Next.js App Router.

```text
src/app/
├── page.tsx
├── analyze/
│   ├── page.tsx
│   └── RiskReport.tsx
├── api/
│   └── analyze/
│       └── route.ts
├── lib/
│   └── severity.ts
└── test/
```

The frontend collects project information and sends it to `/api/analyze`. The server-side route communicates with Gemini and returns the structured result. The RiskReport component displays the analysis, while the severity utility provides consistent visual styling.

## Limitations

* Analyses are not currently saved between sessions.
* The dashboard uses sample data for demonstration purposes.
* The application does not include authentication.
* AI-generated results should support human decision-making rather than replace professional judgment.
* Gemini output may vary between analyses.
* The current implementation relies on the AI provider for the generated assessment and does not independently verify every project fact or recommendation.

## Future Improvements

Possible future improvements include:

* Saving previous project analyses
* User authentication
* Team workspaces
* Historical risk tracking
* Project comparison
* Exporting reports as PDF
* Integration with project management tools
* Real project portfolio dashboards
* Stronger runtime validation of AI responses
* Automated monitoring and alerting

## Deployment

The application is deployed on Vercel from the GitHub repository.

The `GEMINI_API_KEY` environment variable is configured securely in Vercel. The live Gemini integration was tested successfully after deployment using a fictional Mobile Banking App Redesign project.

The live test generated a structured report with an 85/100 Critical Risk score, executive summary, key risks, missing information, and recommended actions.

The mobile navigation improvement was committed and pushed to GitHub in commit `c060f87`, adding a visible New Analysis button for smaller screens.

## Deployment Checklist

### Before Deployment

* [x] Run the automated test suite and confirm all tests pass.
* [x] Run the production build successfully.
* [x] Confirm TypeScript checks pass.
* [x] Verify the Gemini environment variable is configured.
* [x] Confirm `.env.local` is excluded from Git.
* [x] Test the dashboard and analysis flow locally.
* [x] Review responsive layout and accessibility.

### After Deployment

* [x] Confirm Vercel reports a successful deployment.
* [x] Open the live application.
* [x] Test the New Analysis flow with fictional project data.
* [x] Confirm Gemini returns a structured risk report.
* [x] Perform a final browser-console and Vercel-log review.
* [x] Recheck the live layout on desktop and mobile.
* [x] Verify that the mobile New Analysis button opens the analysis page locally.

### Sign-off

Prepared by: Merna Basyouny

Status: Production deployed and core functionality verified. Browser-console and Vercel-log review and responsive-layout checks completed. The mobile navigation improvement was tested locally and pushed for production deployment. The latest Lighthouse Performance score is 85, meeting the assignment's minimum requirement.

## Rollback Plan

If a production deployment introduces a critical issue:

1. Open the ProjectLens AI project in Vercel.
2. Go to the Deployments section.
3. Identify the previous known-good deployment.
4. Use Vercel's available rollback or redeployment controls to restore the stable version.
5. Investigate and fix the issue locally.
6. Run the full test suite and production build before deploying the fix.
7. Verify the live AI flow after the replacement deployment.

The project is also tracked in GitHub, so a stable commit can be used to recover the source code if necessary.

## Monitoring

ProjectLens AI currently uses lightweight manual monitoring rather than a dedicated monitoring service.

Monitoring includes:

* Checking Vercel deployment status
* Reviewing runtime and server logs
* Testing the live AI flow after production changes
* Watching for Gemini rate-limit and service-unavailable errors
* Confirming the API continues returning structured responses

Future production improvements could include automated uptime checks, error tracking, analytics, and alerting.

## Author

Built as part of the Frontend AI Engineering Capstone.
