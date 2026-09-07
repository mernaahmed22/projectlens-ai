export default function Home() {
  const demoProjects = [
    {
      name: "Mobile Banking Redesign",
      status: "High Risk",
      score: "78",
    },
    {
      name: "CRM Migration",
      status: "Medium Risk",
      score: "58",
    },
    {
      name: "Website Redesign",
      status: "Low Risk",
      score: "24",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f7f8fa] text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl">
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
              aria-current="page"
              className="block w-full rounded-lg bg-slate-900 px-4 py-3 text-left text-sm font-medium text-white"
            >
              Dashboard
            </a>

            <a
              href="/analyze"
              className="block w-full rounded-lg px-4 py-3 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            >
              New Analysis
            </a>
          </nav>
        </aside>

        <section className="flex-1 p-6 md:p-10">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10">
              <p className="text-sm font-medium text-slate-600">
                Project Intelligence
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                Understand project risk before it becomes expensive.
              </h2>

              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                Use AI-powered analysis to uncover risks, identify missing
                information, and generate practical next steps.
              </p>

              
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-slate-600">
                  Total Projects
                </p>
                <p className="mt-3 text-3xl font-semibold">12</p>
                <p className="mt-2 text-sm text-slate-600">
                  Sample project portfolio
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-slate-600">
                  At Risk
                </p>
                <p className="mt-3 text-3xl font-semibold">3</p>
                <p className="mt-2 text-sm text-slate-600">
                  Sample projects requiring attention
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-slate-600">
                  Critical
                </p>
                <p className="mt-3 text-3xl font-semibold">2</p>
                <p className="mt-2 text-sm text-slate-600">
                  Sample projects with critical risk
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Sample analyses
                  </p>
                  <h3 className="mt-1 text-xl font-semibold">
                    Project health overview
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Illustrative examples of how ProjectLens presents project
                    risk. These are not saved AI analyses.
                  </p>
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  Demo data
                </span>
              </div>

              <div className="space-y-4">
                {demoProjects.map((project) => (
                  <div
                    key={project.name}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 p-4"
                  >
                    <div>
                      <p className="font-medium">{project.name}</p>
                      <p className="mt-1 text-sm text-slate-600">
                        Example AI risk assessment
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold">
                        {project.score}/100
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        {project.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-6 text-sm leading-6 text-slate-600">
              Ready to assess your own project? Select New Analysis from the
              navigation to generate a structured AI risk report.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}