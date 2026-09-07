"use client";

import { useState } from "react";
import RiskReport, { type AnalysisResult } from "./RiskReport";

export default function AnalyzePage() {
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Planning");
  const [submittedData, setSubmittedData] =
    useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);
    setSubmittedData(null);
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);

    const projectData = {
      projectName: String(formData.get("projectName") || ""),
      description: String(formData.get("description") || ""),
      status: String(formData.get("status") || ""),
      priority: String(formData.get("priority") || ""),
      startDate: String(formData.get("startDate") || ""),
      targetDate: String(formData.get("targetDate") || ""),
      budget: String(formData.get("budget") || ""),
      teamSize: String(formData.get("teamSize") || ""),
      roi: String(formData.get("roi") || ""),
      blockers: String(formData.get("blockers") || ""),
      knownRisks: String(formData.get("knownRisks") || ""),
      context: String(formData.get("context") || ""),
    };

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(
          data.error || "We couldn't analyze this project right now."
        );
        return;
      }

      setSubmittedData(data);
    } catch {
      setErrorMessage(
        "Something went wrong while connecting to the AI service. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f8fa] text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        {/* Sidebar */}
        <aside className="hidden w-64 border-r border-slate-200 bg-white p-6 lg:block">
          <div className="mb-10">
            <h1 className="text-xl font-semibold tracking-tight">
              ProjectLens AI
            </h1>

            <p className="mt-1 text-sm text-slate-600">
              Project Intelligence
            </p>
          </div>

          <nav aria-label="Main navigation" className="space-y-2">
            <a
              href="/"
              className="block w-full rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            >
              Dashboard
            </a>

            <a
              href="/analyze"
              aria-current="page"
              className="block w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white"
            >
              New Analysis
            </a>

            
          </nav>
        </aside>

        {/* Main content */}
        <section className="flex-1 px-6 py-8 md:px-10 md:py-10">
          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <div className="mb-8">
              <a
                href="/"
                className="mb-5 inline-block text-sm font-medium text-slate-600 transition hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
              >
                ← Back to dashboard
              </a>

              <p className="text-sm font-medium text-slate-600">
                AI Project Analysis
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                Analyze a project
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                Give ProjectLens enough context to evaluate project health,
                uncover risks, and recommend the most important next actions.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 01 */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Step 01
                  </p>

                  <h3 className="mt-2 text-xl font-semibold">
                    Project information
                  </h3>

                  <p className="mt-1 text-sm text-slate-600">
                    Tell us what you&apos;re working on.
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="projectName"
                      className="mb-2 block text-sm font-medium"
                    >
                      Project name
                      <span className="ml-1 text-red-600">*</span>
                    </label>

                    <input
                      id="projectName"
                      name="projectName"
                      type="text"
                      required
                      placeholder="e.g. Mobile Banking Redesign"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-500 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="mb-2 block text-sm font-medium"
                    >
                      Project description
                      <span className="ml-1 text-red-600">*</span>
                    </label>

                    <textarea
                      id="description"
                      name="description"
                      required
                      rows={5}
                      placeholder="Describe the project, its goals, current progress, and what success looks like..."
                      className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-slate-500 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                    />
                  </div>
                </div>
              </section>

              {/* Step 02 */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Step 02
                  </p>

                  <h3 className="mt-2 text-xl font-semibold">
                    Current state
                  </h3>

                  <p className="mt-1 text-sm text-slate-600">
                    Help the analysis understand where the project stands.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="status"
                      className="mb-2 block text-sm font-medium"
                    >
                      Project status
                    </label>

                    <select
                      id="status"
                      name="status"
                      value={status}
                      onChange={(event) => setStatus(event.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                    >
                      <option>Planning</option>
                      <option>In Progress</option>
                      <option>At Risk</option>
                      <option>Completed</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="priority"
                      className="mb-2 block text-sm font-medium"
                    >
                      Current priority
                    </label>

                    <select
                      id="priority"
                      name="priority"
                      value={priority}
                      onChange={(event) => setPriority(event.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Critical</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Step 03 */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Step 03
                  </p>

                  <h3 className="mt-2 text-xl font-semibold">
                    Timeline &amp; resources
                  </h3>

                  <p className="mt-1 text-sm text-slate-600">
                    Add context around delivery expectations and resources.
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="startDate"
                      className="mb-2 block text-sm font-medium"
                    >
                      Start date
                    </label>

                    <input
                      id="startDate"
                      name="startDate"
                      type="date"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="targetDate"
                      className="mb-2 block text-sm font-medium"
                    >
                      Target completion
                    </label>

                    <input
                      id="targetDate"
                      name="targetDate"
                      type="date"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="budget"
                      className="mb-2 block text-sm font-medium"
                    >
                      Estimated budget
                    </label>

                    <input
                      id="budget"
                      name="budget"
                      type="text"
                      placeholder="e.g. $50,000"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-500 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="teamSize"
                      className="mb-2 block text-sm font-medium"
                    >
                      Team size
                    </label>

                    <input
                      id="teamSize"
                      name="teamSize"
                      type="number"
                      min="1"
                      placeholder="e.g. 8"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-500 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="roi"
                      className="mb-2 block text-sm font-medium"
                    >
                      Expected business impact / ROI
                    </label>

                    <input
                      id="roi"
                      name="roi"
                      type="text"
                      placeholder="e.g. Reduce processing time by 30%"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-500 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                    />
                  </div>
                </div>
              </section>

              {/* Step 04 */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Step 04
                  </p>

                  <h3 className="mt-2 text-xl font-semibold">
                    Risk context
                  </h3>

                  <p className="mt-1 text-sm text-slate-600">
                    The more context you provide, the more useful the analysis.
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="blockers"
                      className="mb-2 block text-sm font-medium"
                    >
                      Current blockers
                    </label>

                    <textarea
                      id="blockers"
                      name="blockers"
                      rows={3}
                      placeholder="What is currently slowing down or blocking the project?"
                      className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-slate-500 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="knownRisks"
                      className="mb-2 block text-sm font-medium"
                    >
                      Known risks
                    </label>

                    <textarea
                      id="knownRisks"
                      name="knownRisks"
                      rows={3}
                      placeholder="List any risks the team is already aware of..."
                      className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-slate-500 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="context"
                      className="mb-2 block text-sm font-medium"
                    >
                      Additional context
                    </label>

                    <textarea
                      id="context"
                      name="context"
                      rows={3}
                      placeholder="Anything else ProjectLens should consider?"
                      className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-slate-500 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                    />
                  </div>
                </div>
              </section>

              {/* Submit */}
              <div className="rounded-2xl bg-slate-900 p-6 text-white md:flex md:items-center md:justify-between md:p-8">
                <div>
                  <p className="text-sm font-semibold">
                    Ready for analysis?
                  </p>

                  <p className="mt-1 max-w-lg text-sm leading-6 text-slate-300">
                    ProjectLens will evaluate the information above and generate
                    a structured project risk assessment.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-5 w-full rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-60 md:mt-0 md:w-auto"
                >
                  {isLoading
                    ? "Analyzing project..."
                    : "Analyze Project →"}
                </button>
              </div>

              {/* Loading */}
              {isLoading && (
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900"
                      aria-hidden="true"
                    />

                    <div>
                      <p className="font-semibold text-slate-900">
                        Analyzing project risks...
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        ProjectLens is reviewing your timeline, resources,
                        blockers, dependencies, and risk context.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error */}
              {errorMessage && !isLoading && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm"
                >
                  <p className="font-semibold text-red-900">
                    Analysis unavailable
                  </p>

                  <p className="mt-2 text-sm leading-6 text-red-800">
                    {errorMessage}
                  </p>

                  <button
                    type="submit"
                    className="mt-4 rounded-xl bg-red-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-900 focus:ring-offset-2"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* AI Report */}
              {submittedData && <RiskReport data={submittedData} />}
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}