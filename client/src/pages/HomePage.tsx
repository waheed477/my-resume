/**
 * HomePage  ·  /
 * ────────────────────────────────────────────────────────────────
 * Phase-2 wiring: the home route renders the trimmed Portfolio
 * (the bio / languages / core-strengths blocks have moved to
 * /about). SiteLayout wrapper brings consistent navbar / footer
 * / progress / back-to-top chrome.
 */
import SiteLayout from "@/components/SiteLayout";
import Portfolio from "./Portfolio";

export default function HomePage() {
  return (
    <SiteLayout>
      <Portfolio />
    </SiteLayout>
  );
}
