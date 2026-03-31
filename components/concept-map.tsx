import Link from "next/link";

const sideNodes = [
  {
    label: "Distributive Factors",
    href: "/library?relationship=Distributive%20Factors%20-%3E%20Citizen%20Experience"
  },
  {
    label: "Implementation / Street-Level Bureaucracy",
    href: "/library?relationship=Implementation%20%2F%20Street-Level%20Bureaucracy%20-%3E%20Citizen%20Experience"
  },
  {
    label: "Intermediation and Supports",
    href: "/library?relationship=Intermediation%20and%20Supports%20-%3E%20Citizen%20Experience"
  },
  {
    label: "Feedback / Burden Tolerance / State Action",
    href: "/library?relationship=Feedback%20%2F%20Burden%20Tolerance%20%2F%20State%20Action%20-%3E%20Institutional%20Design"
  }
];

const burdenNodes = [
  { label: "Learning Costs", href: "/library?burden=Learning%20Costs" },
  { label: "Compliance Costs", href: "/library?burden=Compliance%20Costs" },
  { label: "Psychological Costs", href: "/library?burden=Psychological%20Costs" }
];

export function ConceptMap() {
  return (
    <section className="space-y-4 rounded-3xl border border-marino/20 bg-white p-6 shadow-card">
      <h2 className="font-serif text-2xl text-tinta">Navigable Concept Map</h2>
      <p className="max-w-3xl text-sm text-marino/80">
        Click any node to open a filtered literature view. The map follows the logic:
        Institutional Design -&gt; Citizen Experience -&gt; Outcomes.
      </p>

      <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr_1fr]">
        <div className="space-y-3">
          {sideNodes.slice(0, 2).map((node) => (
            <Link
              key={node.label}
              href={node.href}
              className="block rounded-2xl border border-marino/20 bg-fondo p-4 text-sm font-medium text-marino transition hover:-translate-y-0.5 hover:shadow-md"
            >
              {node.label}
            </Link>
          ))}
        </div>

        <div className="rounded-2xl border border-marino/20 bg-gradient-to-b from-fondo to-white p-5">
          <div className="grid gap-3">
            <Link
              href="/library?relationship=Institutional%20Design%20-%3E%20Citizen%20Experience"
              className="rounded-xl bg-arena px-4 py-3 text-center text-sm font-semibold text-marino transition hover:bg-arena/80"
            >
              Institutional Design
            </Link>

            <div className="rounded-xl border border-marino/20 bg-white p-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-marino/60">
                Citizen Experience
              </p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {burdenNodes.map((node) => (
                  <Link
                    key={node.label}
                    href={node.href}
                    className="rounded-full bg-marino px-3 py-1 text-xs font-semibold text-white transition hover:bg-tinta"
                  >
                    {node.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/library?relationship=Citizen%20Experience%20-%3E%20Outcomes"
              className="rounded-xl bg-musgo px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-musgo/90"
            >
              Outcomes
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          {sideNodes.slice(2).map((node) => (
            <Link
              key={node.label}
              href={node.href}
              className="block rounded-2xl border border-marino/20 bg-fondo p-4 text-sm font-medium text-marino transition hover:-translate-y-0.5 hover:shadow-md"
            >
              {node.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
