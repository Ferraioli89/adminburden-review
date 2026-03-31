import Link from "next/link";

import { ConceptMap } from "@/components/concept-map";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-marino/20 bg-white p-7 shadow-card md:p-10">
        <div className="absolute -right-20 -top-16 h-56 w-56 rounded-full bg-arena/60 blur-2xl" />
        <div className="absolute -bottom-16 left-8 h-40 w-40 rounded-full bg-musgo/20 blur-2xl" />

        <div className="relative space-y-5">
          <Badge tone="accent">Collaborative platform</Badge>
          <h1 className="max-w-4xl font-serif text-4xl leading-tight text-tinta md:text-5xl">
            A collaborative literature review on Administrative Burden and Citizen Experience
          </h1>
          <p className="max-w-3xl text-lg text-marino/85">
            An academic space for mapping empirical and theoretical work on Administrative Burden
            in the tradition of Herd and Moynihan, with a focus on how citizens experience the
            state.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/library"
              className="rounded-full bg-marino px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-tinta"
            >
              Explore the literature
            </Link>
            <Link
              href="/submit"
              className="rounded-full border border-marino/30 bg-white px-5 py-2.5 text-sm font-semibold text-marino transition hover:bg-fondo"
            >
              Submit an article
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <InfoCard
          title="What this platform is"
          text="A collaborative review that combines thematic exploration, article submission, and a mock editorial workflow for discussing new evidence."
        />
        <InfoCard
          title="What you can do"
          text="Filter the literature by burden type, analytical relationship, Citizen Experience stage, country, method, and publication status."
        />
        <InfoCard
          title="How it will evolve"
          text="The architecture is already prepared for future Supabase integration, ORCID login, and real double-approval editorial logic."
        />
      </section>

      <ConceptMap />
    </div>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <article className="rounded-2xl border border-marino/20 bg-white p-5 shadow-card">
      <h2 className="font-serif text-xl text-tinta">{title}</h2>
      <p className="mt-2 text-sm text-marino/80">{text}</p>
    </article>
  );
}
