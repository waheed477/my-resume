// ──────────────────────────────────────────────────────────────────
//  Contact form configuration
// ──────────────────────────────────────────────────────────────────
//
//  This portfolio sends the contact form to Formspree, which forwards
//  submissions to your email inbox without you ever running a backend.
//
//  ╭──────────────────────────────────────────────────────────────╮
//  │  SETUP (one-time, ~2 minutes):                              │
//  │                                                              │
//  │  1. Go to https://formspree.io and create a free account    │
//  │  2. Create a new form, set the "Email To" to:                │
//  │         waheeddd62@gmail.com                                 │
//  │  3. Copy the endpoint that looks like:                       │
//  │         https://formspree.io/f/xxxxxxxx                     │
//  │  4. Paste it below, replacing the placeholder.               │
//  │                                                              │
//  │  Once set, every submission lands directly in your inbox.   │
//  ╰──────────────────────────────────────────────────────────────╯
//
//  While LEFT BLANK, the form gracefully falls back to opening the
//  user's mail client pre-filled with the same content to your
//  email address — so the form is never broken.
//
// ──────────────────────────────────────────────────────────────────

export const FORMSPREE_ENDPOINT = ""; // e.g. "https://formspree.io/f/abcd1234"

export const FALLBACK_EMAIL = "waheeddd62@gmail.com";
