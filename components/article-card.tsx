import type { Article } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-2xl border border-marino/15 bg-white p-5 shadow-card">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="font-serif text-xl leading-tight text-tinta">{article.title}</h3>
        <Badge tone="accent">{article.year}</Badge>
      </div>

      <div className="space-y-1 text-sm text-marino/80">
        <p>
          <span className="font-semibold text-marino">Authors:</span> {article.authors}
        </p>
        <p>
          <span className="font-semibold text-marino">Source:</span> {article.source}
        </p>
      </div>

      <p className="text-sm text-tinta/90">{article.abstract}</p>

      <div className="flex flex-wrap gap-2">
        <Badge>{article.burdenType}</Badge>
        <Badge>{article.method}</Badge>
        <Badge tone={article.publicationStatus === "Published" ? "success" : "default"}>
          {article.publicationStatus}
        </Badge>
      </div>

      <div className="space-y-1 text-xs text-marino/80">
        <p>
          <span className="font-semibold">Analytical Relationship:</span>{" "}
          {article.analyticalRelationship}
        </p>
        <p>
          <span className="font-semibold">Citizen Experience Stage:</span>{" "}
          {article.experiencePhase}
        </p>
        <p>
          <span className="font-semibold">Country:</span> {article.country}
        </p>
      </div>

      <div className="mt-auto space-y-3">
        <p className="flex flex-wrap gap-2 text-xs">
          {article.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-fondo px-2 py-1 text-marino">
              #{tag}
            </span>
          ))}
        </p>

        <p className="text-sm">
          <span className="font-semibold text-marino">DOI / link:</span>{" "}
          {article.doiOrLink === "Pending" ? (
            <span className="text-marino/80">Pending</span>
          ) : (
            <a
              href={article.doiOrLink}
              target="_blank"
              rel="noreferrer"
              className="text-marino underline decoration-marino/30 underline-offset-2"
            >
              {article.doiOrLink}
            </a>
          )}
        </p>
      </div>
    </article>
  );
}
