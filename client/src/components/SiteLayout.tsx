import Navbar from "@/components/Navbar";
import SkipToMainContent from "@/components/SkipToMainContent";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";

/**
 * SiteLayout — shared chrome for every routed page.
 * ────────────────────────────────────────────────────────────────
 * Phase-2 helper. Every page (Portfolio, AboutPage, future
 * ExperiencePage etc.) wraps its own <main> in this component
 * so the chrome is consistent everywhere — same skip link,
 * same navbar, same reading-progress bar, same footer, same
 * back-to-top.
 *
 * Using a wrapper keeps the navbar navigation updated by
 * react-router as the user moves between pages; scroll-spy
 * still wires the active-section highlight but only on the
 * home route (the only place that actually has sections).
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <SkipToMainContent />
      <ReadingProgressBar />
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        {children}
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
}
