import { getSeverityClasses } from "@/app/lib/severity";

type RiskItem = {
  title: string;
  severity: string;
  explanation: string;
};

type RecommendedAction = {
  action: string;
  priority: string;
};

export type AnalysisResult = {
  riskScore: number;
  riskLevel: string;
  executiveSummary: string;
  risks: RiskItem[];
  missingInformation: string[];
  recommendedActions: RecommendedAction[];
  suggestedPriority: string;
};

type RiskReportProps = {
  data: AnalysisResult;
};

export default function RiskReport({ data }: RiskReportProps) {
  return (
    <section
      aria-labelledby="analysis-heading"
      className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
    >
      <div className="flex flex-col gap-5 border-b border-slate-200 pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">
            AI Risk Assessment
          </p>

          <h3
            id="analysis-heading"
            className="mt-2 text-2xl font-semibold"
          >
            Project Risk Analysis
          </h3>

          <p className="mt-2 text-sm text-slate-600">
            Generated from the project information you provided.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-900 px-6 py-5 text-white">
          <p className="text-sm text-slate-200">Risk score</p>

          <div className="mt-1 flex items-end gap-2">
            <span className="text-4xl font-bold">{data.riskScore}</span>
            <span className="pb-1 text-sm text-slate-300">/ 100</span>
          </div>

          <span
            className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${getSeverityClasses(
              data.riskLevel
            )}`}
          >
            {data.riskLevel} Risk
          </span>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold">Executive Summary</h4>

        <p className="mt-3 leading-7 text-slate-600">
          {data.executiveSummary}
        </p>
      </div>

      <div>
        <h4 className="text-lg font-semibold">Key Risks</h4>

        <div className="mt-4 space-y-3">
          {data.risks.map((risk, index) => (
            <div
              key={`${risk.title}-${index}`}
              className="rounded-xl border border-slate-200 p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-semibold">{risk.title}</p>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getSeverityClasses(
                    risk.severity
                  )}`}
                >
                  {risk.severity}
                </span>
              </div>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {risk.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold">Missing Information</h4>

        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          {data.missingInformation.map((item, index) => (
            <li key={`${item}-${index}`} className="flex gap-3">
              <span
                className="font-semibold text-slate-900"
                aria-hidden="true"
              >
                •
              </span>

              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-lg font-semibold">Recommended Actions</h4>

        <div className="mt-4 space-y-3">
          {data.recommendedActions.map((item, index) => (
            <div
              key={`${item.action}-${index}`}
              className="flex gap-4 rounded-xl bg-slate-50 p-4"
            >
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white"
                aria-hidden="true"
              >
                {index + 1}
              </div>

              <div>
                <p className="text-sm font-medium">{item.action}</p>

                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Priority: {item.priority}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
        <p className="text-sm text-slate-600">
          Suggested project priority
        </p>

        <p className="mt-1 text-xl font-semibold">
          {data.suggestedPriority}
        </p>
      </div>
    </section>
  );
}