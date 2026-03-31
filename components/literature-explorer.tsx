"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { ArticleCard } from "@/components/article-card";
import { mockArticles } from "@/data/mockArticles";
import {
  analyticalRelationships,
  burdenTypes,
  countries,
  experiencePhases,
  publicationStatuses,
  researchMethods
} from "@/lib/options";

const allOption = "All";

export function LiteratureExplorer() {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");
  const [burden, setBurden] = useState(searchParams.get("burden") ?? allOption);
  const [relationship, setRelationship] = useState(
    searchParams.get("relationship") ?? allOption
  );
  const [phase, setPhase] = useState(searchParams.get("phase") ?? allOption);
  const [country, setCountry] = useState(searchParams.get("country") ?? allOption);
  const [method, setMethod] = useState(searchParams.get("method") ?? allOption);
  const [status, setStatus] = useState(searchParams.get("status") ?? allOption);

  const filteredArticles = useMemo(() => {
    const query = search.trim().toLowerCase();

    return mockArticles.filter((article) => {
      const matchesSearch =
        query.length === 0 ||
        [
          article.title,
          article.authors,
          article.source,
          article.abstract,
          article.tags.join(" ")
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);

      return (
        matchesSearch &&
        (burden === allOption || article.burdenType === burden) &&
        (relationship === allOption ||
          article.analyticalRelationship === relationship) &&
        (phase === allOption || article.experiencePhase === phase) &&
        (country === allOption || article.country === country) &&
        (method === allOption || article.method === method) &&
        (status === allOption || article.publicationStatus === status)
      );
    });
  }, [burden, country, method, phase, relationship, search, status]);

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-marino/20 bg-white p-5 shadow-card">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <label className="col-span-full flex flex-col gap-1 text-sm">
            <span className="font-semibold text-marino">Search</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Title, authors, journal, tags..."
              className="rounded-xl border border-marino/25 bg-fondo px-3 py-2 text-sm outline-none transition focus:border-marino"
            />
          </label>

          <FilterSelect
            label="Burden Type"
            value={burden}
            options={[allOption, ...burdenTypes]}
            onChange={setBurden}
          />
          <FilterSelect
            label="Analytical Relationship"
            value={relationship}
            options={[allOption, ...analyticalRelationships]}
            onChange={setRelationship}
          />
          <FilterSelect
            label="Citizen Experience Stage"
            value={phase}
            options={[allOption, ...experiencePhases]}
            onChange={setPhase}
          />
          <FilterSelect
            label="Country"
            value={country}
            options={[allOption, ...countries]}
            onChange={setCountry}
          />
          <FilterSelect
            label="Method"
            value={method}
            options={[allOption, ...researchMethods]}
            onChange={setMethod}
          />
          <FilterSelect
            label="Publication Status"
            value={status}
            options={[allOption, ...publicationStatuses]}
            onChange={setStatus}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-marino">
          Results: <span className="font-bold text-tinta">{filteredArticles.length}</span>
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <p className="rounded-2xl border border-marino/20 bg-white p-6 text-center text-marino">
          No articles match the current filters. Adjust your criteria to widen the results.
        </p>
      )}
    </section>
  );
}

interface FilterSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

function FilterSelect({ label, value, options, onChange }: FilterSelectProps) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="font-semibold text-marino">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-marino/25 bg-fondo px-3 py-2 text-sm outline-none transition focus:border-marino"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
