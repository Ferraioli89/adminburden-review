import { Badge } from "@/components/ui/badge";

const burdenBlocks = [
  {
    title: "Learning Costs",
    text: "Cognitive demands involved in understanding rights, eligibility rules, and procedural steps."
  },
  {
    title: "Compliance Costs",
    text: "Time, effort, documentation, and coordination required by administrative procedures."
  },
  {
    title: "Psychological Costs",
    text: "Emotional and symbolic costs such as stigma, stress, uncertainty, and perceived arbitrariness."
  }
];

const phases = [
  "Discovering rights and eligibility",
  "Application and documentation",
  "Waiting and follow-up",
  "Interactions with frontline offices and digital channels",
  "Administrative errors and correction",
  "Appeal",
  "Intermediation and supports",
  "Distributive effects and non-take-up"
];

export default function FrameworkPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-marino/20 bg-white p-6 shadow-card">
        <h1 className="font-serif text-4xl text-tinta">Conceptual Framework</h1>
        <p className="mt-2 max-w-3xl text-marino/85">
          This framework organizes the literature by burden type and Citizen Experience trajectory,
          connecting institutional design, implementation, intermediation, and outcomes.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {burdenBlocks.map((block) => (
          <article
            key={block.title}
            className="rounded-2xl border border-marino/20 bg-white p-5 shadow-card"
          >
            <Badge tone="accent">Cost Type</Badge>
            <h2 className="mt-3 font-serif text-2xl text-tinta">{block.title}</h2>
            <p className="mt-2 text-sm text-marino/80">{block.text}</p>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-marino/20 bg-white p-6 shadow-card">
        <h2 className="font-serif text-3xl text-tinta">Citizen Experience Stages</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {phases.map((phase) => (
            <article key={phase} className="rounded-xl border border-marino/15 bg-fondo px-4 py-3">
              <p className="text-sm font-medium text-marino">{phase}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
