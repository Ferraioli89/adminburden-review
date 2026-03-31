import { ProposalForm } from "@/components/proposal-form";

export default function SubmitPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-marino/20 bg-white p-6 shadow-card">
        <h1 className="font-serif text-4xl text-tinta">Submit an Article</h1>
        <p className="mt-2 max-w-3xl text-marino/85">
          Suggest new references to strengthen the review. This version stores proposals in local
          mock state and shows them immediately in the editorial workflow.
        </p>
      </section>

      <ProposalForm />
    </div>
  );
}
