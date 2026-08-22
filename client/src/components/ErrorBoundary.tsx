import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: unknown;
}

/**
 * ErrorBoundary
 * ────────────────────────────────────────────────────────────────
 * A class-based React error boundary. Catches any render-time
 * exception thrown in the component tree underneath, stops the
 * "blank page on a single bad data field" failure mode, and
 * shows a recoverable fallback instead.
 *
 * Why a class component: React still does not expose
 * `getDerivedStateFromError` to functional components, and this
 * is the one place where a class is the right tool.
 *
 * Where mounted: App.tsx, wrapping <Routes>. So if any page or
 * child component throws — even in async render — the page
 * itself stays interactive (NavBar, footer, theme toggle).
 */
export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown, info: ErrorInfo): void {
    // Light runtime logging. Anything heavier (Sentry, Bugsnag)
    // can be wired here later without changing the boundary.
    // eslint-disable-next-line no-console
    console.error("[ErrorBoundary]", error, info?.componentStack);
  }

  private reload = () => {
    // The cheap-and-cheerful recovery: a real reload pulls a
    // freshly-built bundle and a re-registered service worker,
    // so transient failures (e.g. a malformed JSON value pushed
    // mid-session) clear themselves.
    if (typeof window !== "undefined") window.location.reload();
  };

  private reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      const message =
        this.state.error instanceof Error
          ? this.state.error.message
          : "An unexpected error occurred in this section.";
      return (
        <div
          role="alert"
          aria-live="assertive"
          className="min-h-[40vh] flex items-center justify-center px-6 py-16"
          data-testid="error-boundary-fallback"
        >
          <div className="max-w-md w-full rounded-lg border border-border bg-card p-6 text-center">
            <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle
                className="h-6 w-6 text-destructive"
                aria-hidden
              />
            </div>
            <h2 className="font-serif text-2xl font-bold mb-2">
              Something went wrong rendering this section.
            </h2>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              The rest of the site is still working — only this section
              hit a runtime error. You can reload to recover, or jump to
              another page from the navigation above.
            </p>
            {message && (
              <pre className="text-[10px] text-muted-foreground/80 bg-muted/40 rounded-md p-3 mb-6 overflow-auto text-left max-h-24">
                {message}
              </pre>
            )}
            <div className="flex gap-2 justify-center">
              <button
                type="button"
                onClick={this.reload}
                className={buttonVariants({ variant: "default" })}
                data-testid="error-boundary-reload"
              >
                Reload page
              </button>
              <Button
                type="button"
                variant="outline"
                onClick={this.reset}
                data-testid="error-boundary-reset"
              >
                Try again
              </Button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
