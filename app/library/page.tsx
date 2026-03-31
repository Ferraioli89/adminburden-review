import { Suspense } from "react";

import { LiteratureExplorer } from "@/components/literature-explorer";

export default function LibraryPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-marino/20 bg-white p-6 shadow-card">
        <h1 className="font-serif text-4xl text-tinta">Library / Literature Review</h1>
        <p className="mt-2 max-w-3xl text-marino/85">
          A mock database of Administrative Burden scholarship organized around Citizen Experience,
          cost types, and core analytical relationships.
        </p>
      </section>

      <Suspense
        fallback={
          <p className="rounded-2xl border border-marino/20 bg-white p-6 text-center text-marino">
            Loading the literature explorer...
          </p>
        }
      >
        <LiteratureExplorer />
      </Suspense>
    </div>
  );
}
