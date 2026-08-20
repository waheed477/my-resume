import { useEffect, useState } from "react";
import { Github, GitCommit, Star, GitPullRequest } from "lucide-react";
import personalData from "@/data/personal.json";

/**
 * GitHubStatsWidget
 * ────────────────────────────────────────────────────────────────
 * Lightweight, self-contained GitHub activity widget. Uses the
 * public GitHub REST API at runtime so it always shows current
 * numbers. Renders a tasteful skeleton if the request is still in
 * flight, and degrades gracefully (a "Couldn't reach GitHub" note)
 * if it fails — never breaks the page.
 *
 * No third-party widget service is used (those are typically the
 * first thing to break after GitHub throttles them).
 */
interface GhData {
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
}

export default function GitHubStatsWidget() {
  const username = (personalData.socialLinks.github || "")
    .split("/")
    .filter(Boolean)
    .pop();
  const [data, setData] = useState<GhData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!username) return;
    const ctrl = new AbortController();
    fetch(`https://api.github.com/users/${username}`, {
      signal: ctrl.signal,
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((j: GhData) => setData(j))
      .catch(() => setError(true));
    return () => ctrl.abort();
  }, [username]);

  return (
    <section
      id="github"
      className="py-12 md:py-16 bg-background border-y border-border/60"
      aria-label="GitHub activity"
      data-testid="section-github-stats"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-center gap-2 mb-8 text-muted-foreground">
          <Github className="h-5 w-5" />
          <h2
            className="text-sm md:text-base font-medium uppercase tracking-widest"
            data-testid="text-github-heading"
          >
            Open Source Activity · @{username}
          </h2>
        </div>

        {error ? (
          <p
            className="text-center text-sm text-muted-foreground"
            data-testid="text-github-fallback"
          >
            GitHub stats temporarily unavailable —{" "}
            <a
              href={personalData.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              see full activity on the profile
            </a>
            .
          </p>
        ) : !data ? (
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
            data-testid="github-skeleton"
            aria-hidden="true"
          >
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 rounded-md bg-muted animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
            data-testid="grid-github-stats"
          >
            <GhStat
              icon={<GitCommit className="h-5 w-5" />}
              label="Public repos"
              value={data.public_repos}
            />
            <GhStat
              icon={<Star className="h-5 w-5" />}
              label="Followers"
              value={data.followers}
            />
            <GhStat
              icon={<GitPullRequest className="h-5 w-5" />}
              label="Following"
              value={data.following}
            />
            <GhStat
              icon={<Github className="h-5 w-5" />}
              label="Public gists"
              value={data.public_gists}
            />
          </div>
        )}
      </div>
    </section>
  );
}

function GhStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div
      className="rounded-md border border-border/60 bg-card p-4 text-center hover-elevate"
      data-testid={`github-stat-${label.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="inline-flex items-center justify-center h-9 w-9 rounded-md bg-primary/10 text-primary mb-2">
        {icon}
      </div>
      <div className="text-2xl font-bold text-primary" data-testid="stat-value">
        {value}
      </div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
