import { useEffect, useState } from "react";
import { ArrowUpRight, BookOpen, Rss } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DEV_TO_USERNAME, DEV_TO_BASE } from "@/config/blog";
import personalData from "@/data/personal.json";

interface DevToArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  cover_image: string | null;
  published_at: string;
  tag_list: string[];
  reading_time_minutes: number;
}

export default function BlogSection() {
  const [articles, setArticles] = useState<DevToArticle[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!DEV_TO_USERNAME) return;
    const ctrl = new AbortController();
    fetch(
      `${DEV_TO_BASE}/articles?username=${encodeURIComponent(
        DEV_TO_USERNAME,
      )}&per_page=3`,
      { signal: ctrl.signal, headers: { Accept: "application/json" } },
    )
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((j: DevToArticle[]) => setArticles(j))
      .catch(() => setError(true));
    return () => ctrl.abort();
  }, []);

  const githubHandle =
    personalData.socialLinks.github.split("/").filter(Boolean).pop() ||
    "waheed477";
  const rssHref = DEV_TO_USERNAME
    ? `https://dev.to/feed/${DEV_TO_USERNAME}`
    : "";

  return (
    <section
      id="blog"
      className="py-16 md:py-24 bg-muted/30"
      aria-labelledby="blog-heading"
      data-testid="section-blog"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <BookOpen className="h-6 w-6 text-primary" aria-hidden="true" />
          <h2
            id="blog-heading"
            className="font-serif text-3xl md:text-4xl font-semibold text-center"
            data-testid="text-blog-title"
          >
            Writing
          </h2>
        </div>
        <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
          Engineering notes on building AI-powered SaaS, scraping at scale,
          and shipping MERN apps to production.
        </p>
        <div className="w-20 h-1 bg-primary mx-auto mb-12"></div>

        {DEV_TO_USERNAME && articles === null && !error && (
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            aria-hidden="true"
            data-testid="blog-skeleton"
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-56 rounded-md bg-card border border-border/60 animate-pulse"
              />
            ))}
          </div>
        )}

        {articles && articles.length > 0 && (
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-testid="blog-grid"
          >
            {articles.slice(0, 3).map((article) => (
              <Card
                key={article.id}
                className="overflow-hidden hover-elevate transition-all duration-300 flex flex-col"
                data-testid={`blog-card-${article.id}`}
              >
                {article.cover_image && (
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Read: ${article.title}`}
                  >
                    <div className="aspect-video overflow-hidden bg-muted">
                      <img
                        src={article.cover_image}
                        alt=""
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                  </a>
                )}
                <div className="p-5 flex flex-col flex-1">
                  <h3
                    className="font-semibold text-base mb-2 leading-snug line-clamp-2"
                    data-testid="blog-article-title"
                  >
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition"
                    >
                      {article.title}
                    </a>
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                    {article.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {(article.tag_list || []).slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                    <time dateTime={article.published_at}>
                      {new Date(article.published_at).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}
                    </time>
                    <span>{article.reading_time_minutes} min read</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {DEV_TO_USERNAME && articles && articles.length === 0 && (
          <p
            className="text-center text-muted-foreground"
            data-testid="blog-empty-state"
          >
            No articles published yet — your first post will appear here.
          </p>
        )}

        {DEV_TO_USERNAME && error && (
          <p
            className="text-center text-sm text-muted-foreground"
            data-testid="blog-error-state"
          >
            Couldn't reach Dev.to right now. Check back in a moment.
          </p>
        )}

        {/* ── Follow-the-author CTA strip ─────────────────────────────
            Always rendered (regardless of state). Convert visiting
            recruiters into long-term followers, even if they just
            arrive at a 0-article site today. */}
        <div
          className="mt-12 p-6 rounded-lg border border-border bg-card/40 backdrop-blur-sm flex flex-col sm:flex-row items-center justify-between gap-4"
          data-testid="blog-follow-cta"
        >
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="p-2 rounded-md bg-primary/10 shrink-0">
              <Rss className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <p
                className="font-semibold"
                data-testid="blog-follow-title"
              >
                Follow along for future posts
              </p>
              <p className="text-sm text-muted-foreground">
                Subscribe via Dev.to, RSS, or follow on GitHub.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                window.open(`https://dev.to/${githubHandle}`, "_blank")
              }
              aria-label="Open Dev.to profile in a new tab"
              data-testid="blog-follow-devto"
            >
              Dev.to
              <ArrowUpRight
                className="h-3 w-3 ml-1 opacity-70"
                aria-hidden="true"
              />
            </Button>
            {DEV_TO_USERNAME && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => rssHref && window.open(rssHref, "_blank")}
                aria-label="Open RSS feed in a new tab"
                data-testid="blog-follow-rss"
              >
                <Rss className="h-3.5 w-3.5 mr-1.5" aria-hidden="true" />
                RSS feed
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                window.open(`https://github.com/${githubHandle}`, "_blank")
              }
              aria-label="Open GitHub profile in a new tab"
              data-testid="blog-follow-github"
            >
              GitHub
              <ArrowUpRight
                className="h-3 w-3 ml-1 opacity-70"
                aria-hidden="true"
              />
            </Button>
          </div>
        </div>

        {/* ── First-time setup helper ──────────────────────────────── */}
        {!DEV_TO_USERNAME && (
          <p
            className="text-center text-xs text-muted-foreground italic mt-8 leading-relaxed"
            data-testid="blog-setup-note"
          >
            The Dev.to article card grid above will auto-appear the moment
            you set <code>DEV_TO_USERNAME</code> in{" "}
            <code>client/src/config/blog.ts</code>.
          </p>
        )}
      </div>
    </section>
  );
}
