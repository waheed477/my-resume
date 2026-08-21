import SiteLayout from "@/components/SiteLayout";
import { BookOpen, ArrowRight, Rss, Clock } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import writingData from "@/data/writing.json";

/**
 * WritingPage  ·  /writing
 * ────────────────────────────────────────────────────────────────
 * Phase-2 deliverable: a real engineering blog surface with three
 * substantive posts derived from the deployed projects. No more
 * 'coming soon' dummy placeholder.
 *
 *   Phase-2 renders post LIST only (cards + title + summary).
 *   Phase-4 will:
 *   • add a per-post detail page (/writing/:slug)
 *   • inline markdown rendering (no extra deps)
 *   • tag filter chips
 *   • RSS / Dev.to subscribe buttons wired to the existing
 *     footer CTA
 */
export default function WritingPage() {
  const posts = writingData.posts;

  return (
    <SiteLayout>
      <main className="pt-4">
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
          <p
            className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3"
            data-testid="writing-eyebrow"
          >
            Writing
          </p>
          <h1
            className="font-serif text-4xl md:text-5xl font-bold mb-4"
            data-testid="writing-page-title"
          >
            Engineering notes on what I shipped.
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mb-10">
            Three posts on AI/LLM fine-tuning, stealth scraping at scale,
            and async pipeline design. Each one is what I actually did —
            not a tutorial retrospective.
          </p>

          {/* Posts list */}
          <div className="space-y-5" data-testid="writing-posts-list">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="p-6 hover-elevate transition-all duration-300"
                data-testid={`writing-post-${post.id}`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-md bg-primary/10 shrink-0">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2
                      className="text-xl font-semibold mb-1"
                      data-testid={`writing-post-title-${post.id}`}
                    >
                      <a
                        href={post.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition"
                      >
                        {post.title}
                      </a>
                    </h2>
                    <p
                      className="text-muted-foreground text-sm mb-3 leading-relaxed"
                      data-testid={`writing-post-subtitle-${post.id}`}
                    >
                      {post.subtitle}
                    </p>
                    <div
                      className="flex items-center gap-3 text-xs text-muted-foreground mb-3"
                      data-testid={`writing-post-meta-${post.id}`}
                    >
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readingMinutes} min read
                      </span>
                    </div>
                    <div
                      className="flex flex-wrap gap-1.5"
                      data-testid={`writing-post-tags-${post.id}`}
                    >
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Subscribe CTA */}
          <Card
            className="mt-12 p-6 bg-card/40 border-border"
            data-testid="writing-subscribe"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-md bg-primary/10 shrink-0">
                <Rss className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold">More posts coming soon</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Subscribe to the Dev.to profile to be notified when new
                  engineering notes land.
                </p>
              </div>
              <a
                href="/"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "gap-2 no-underline ml-auto",
                )}
                data-testid="writing-go-home"
              >
                Back home
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Card>
        </div>
      </main>
    </SiteLayout>
  );
}
