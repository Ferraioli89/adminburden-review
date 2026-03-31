"use client";

import { useMemo, useState } from "react";

import { useAuth } from "@/components/providers/auth-provider";
import { useAppState } from "@/components/providers/app-state-provider";
import { Badge } from "@/components/ui/badge";
import { canSubmitProposal } from "@/lib/auth/guards";
import {
  analyticalRelationships,
  burdenTypes,
  countries,
  experiencePhases,
  researchMethods
} from "@/lib/options";
import type { ProposalInput } from "@/lib/types";

const initialForm: ProposalInput = {
  title: "",
  authors: "",
  year: new Date().getFullYear(),
  source: "",
  doiOrLink: "Pending",
  abstract: "",
  burdenType: "Learning Costs",
  analyticalRelationship: "Institutional Design -> Citizen Experience",
  experiencePhase: "Discovering rights and eligibility",
  country: "Spain",
  method: "Qualitative",
  population: "",
  tags: [],
  rationale: ""
};

export function ProposalForm() {
  const { currentProfile } = useAuth();
  const { addProposal, proposals } = useAppState();
  const [form, setForm] = useState<ProposalInput>(initialForm);
  const [tagsInput, setTagsInput] = useState("");
  const [feedback, setFeedback] = useState<{ tone: "success" | "warn"; message: string } | null>(
    null
  );

  const receivedProposals = useMemo(() => proposals.slice(0, 8), [proposals]);
  const canPropose = canSubmitProposal(currentProfile);

  function updateField<K extends keyof ProposalInput>(key: K, value: ProposalInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const tags = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const result = addProposal({
      ...form,
      tags,
      doiOrLink: form.doiOrLink.trim() || "Pending"
    });

    setFeedback({ tone: result.ok ? "success" : "warn", message: result.message });

    if (!result.ok) {
      return;
    }

    setForm(initialForm);
    setTagsInput("");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-marino/20 bg-white p-5 shadow-card"
      >
        <h2 className="font-serif text-2xl text-tinta">Submission Form</h2>
        <div className="rounded-2xl border border-marino/15 bg-fondo p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-marino/60">
            Auth-ready session
          </p>
          <p className="mt-2 text-sm font-semibold text-tinta">
            {currentProfile?.displayName ?? "No active session"}
          </p>
          <p className="text-sm text-marino/80">
            Current role: {currentProfile?.role ?? "none"}.
          </p>
          <p className="mt-2 text-xs text-marino/75">
            The submission will be associated with the active profile. In phase 2 this will come
            from Supabase Auth and ORCID OIDC.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Title"
            required
            value={form.title}
            onChange={(value) => updateField("title", value)}
          />
          <Field
            label="Authors"
            required
            value={form.authors}
            onChange={(value) => updateField("authors", value)}
          />
          <Field
            label="Year"
            type="number"
            required
            value={String(form.year)}
            onChange={(value) => updateField("year", Number(value))}
          />
          <Field
            label="Journal or source"
            required
            value={form.source}
            onChange={(value) => updateField("source", value)}
          />
          <Field
            label="DOI or link"
            value={form.doiOrLink}
            onChange={(value) => updateField("doiOrLink", value)}
          />
          <Field
            label="Country"
            required
            value={form.country}
            onChange={(value) => updateField("country", value)}
            list="country-options"
          />
          <SelectField
            label="Burden Type"
            value={form.burdenType}
            onChange={(value) => updateField("burdenType", value as ProposalInput["burdenType"])}
            options={burdenTypes}
          />
          <SelectField
            label="Method"
            value={form.method}
            onChange={(value) => updateField("method", value as ProposalInput["method"])}
            options={researchMethods}
          />
        </div>

        <SelectField
          label="Primary Analytical Relationship"
          value={form.analyticalRelationship}
          onChange={(value) =>
            updateField(
              "analyticalRelationship",
              value as ProposalInput["analyticalRelationship"]
            )
          }
          options={analyticalRelationships}
        />

        <SelectField
          label="Citizen Experience Stage"
          value={form.experiencePhase}
          onChange={(value) =>
            updateField("experiencePhase", value as ProposalInput["experiencePhase"])
          }
          options={experiencePhases}
        />

        <TextAreaField
          label="Abstract"
          required
          value={form.abstract}
          onChange={(value) => updateField("abstract", value)}
        />

        <Field
          label="Population"
          required
          value={form.population}
          onChange={(value) => updateField("population", value)}
        />

        <Field
          label="Tags (comma-separated)"
          value={tagsInput}
          onChange={setTagsInput}
          placeholder="non-take-up, digitalization, frontline services"
        />

        <TextAreaField
          label="Why should this be included?"
          required
          value={form.rationale}
          onChange={(value) => updateField("rationale", value)}
        />

        <button
          type="submit"
          disabled={!canPropose}
          className="rounded-full bg-marino px-5 py-2 text-sm font-semibold text-white transition hover:bg-tinta disabled:cursor-not-allowed disabled:opacity-50"
        >
          Submit proposal
        </button>

        {feedback && (
          <p
            className={`rounded-xl p-3 text-sm ${
              feedback.tone === "success"
                ? "border border-musgo/30 bg-musgo/10 text-musgo"
                : "border border-burdeos/30 bg-burdeos/10 text-burdeos"
            }`}
          >
            {feedback.message}
          </p>
        )}

        <datalist id="country-options">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
      </form>

      <aside className="space-y-4 rounded-2xl border border-marino/20 bg-white p-5 shadow-card">
        <div>
          <h3 className="font-serif text-xl text-tinta">Received Proposals</h3>
          <p className="text-sm text-marino/80">
            This list uses local browser storage for the static demo.
          </p>
        </div>

        <ul className="space-y-3">
          {receivedProposals.map((proposal) => (
            <li key={proposal.id} className="rounded-xl border border-marino/15 bg-fondo p-3">
              <p className="font-medium text-tinta">{proposal.title}</p>
              <p className="text-xs text-marino/80">
                {proposal.authors} · {proposal.year} · {proposal.country}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge>{proposal.burdenType}</Badge>
                <Badge tone={proposal.editorialStatus === "Included" ? "success" : "default"}>
                  {proposal.editorialStatus}
                </Badge>
              </div>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

interface BasicFieldProps {
  label: string;
  value: string;
  required?: boolean;
  placeholder?: string;
  onChange: (value: string) => void;
}

function Field({
  label,
  value,
  onChange,
  required,
  placeholder,
  type = "text",
  list
}: BasicFieldProps & { type?: "text" | "number"; list?: string }) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="font-semibold text-marino">{label}</span>
      <input
        type={type}
        required={required}
        value={value}
        list={list}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-marino/25 bg-fondo px-3 py-2 outline-none focus:border-marino"
      />
    </label>
  );
}

function TextAreaField({ label, value, onChange, required }: BasicFieldProps) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="font-semibold text-marino">{label}</span>
      <textarea
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        className="rounded-xl border border-marino/25 bg-fondo px-3 py-2 outline-none focus:border-marino"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="font-semibold text-marino">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-marino/25 bg-fondo px-3 py-2 outline-none focus:border-marino"
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
