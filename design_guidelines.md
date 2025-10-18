# Design Guidelines: Waheed Aslam - MERN Developer Portfolio

## Design Approach
**Reference-Based Approach** drawing inspiration from modern developer portfolios (Linear, Stripe, Brittany Chiang's portfolio) with emphasis on clean professionalism, subtle interactions, and project-focused visual hierarchy.

## Core Design Elements

### A. Color Palette
**Dark Mode Primary** (recommended default):
- Background: 217 33% 7% (deep navy-black)
- Surface: 217 25% 12% (elevated navy)
- Primary: 217 91% 60% (vibrant blue)
- Text Primary: 0 0% 98% (off-white)
- Text Secondary: 217 15% 70% (muted blue-gray)
- Accent (sparingly): 158 64% 52% (teal for success states)

**Light Mode Alternative**:
- Background: 0 0% 98%
- Surface: 0 0% 100%
- Primary: 217 91% 55%
- Text Primary: 217 33% 17%

### B. Typography
**Font Stack** (via Google Fonts):
- Primary: 'Inter' - Modern, technical feel for UI text
- Headings: 'Space Grotesk' - Distinctive, geometric for hero/section titles
- Code/Tech: 'JetBrains Mono' - For skill badges and technical references

**Scale**:
- Hero Title: text-5xl md:text-7xl, font-bold (Space Grotesk)
- Section Headings: text-3xl md:text-4xl, font-semibold
- Body: text-base md:text-lg (Inter)
- Captions: text-sm, text-secondary

### C. Layout System
**Spacing Primitives**: Tailwind units 4, 8, 12, 16, 20, 24
- Section Padding: py-16 md:py-24
- Component Gaps: gap-8 md:gap-12
- Card Padding: p-6 md:p-8
- Max Container: max-w-6xl mx-auto

**Grid Systems**:
- Projects: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Skills: grid-cols-2 md:grid-cols-4 lg:grid-cols-6
- Contact: md:grid-cols-2 (form + info)

### D. Component Library

**Navigation**:
- Fixed top navbar with backdrop blur
- Logo/Name left, nav links right with smooth scroll
- Mobile: Hamburger menu with slide-in drawer
- Active section indicator with subtle underline

**Hero Section** (80vh):
- Full-width background with subtle gradient overlay
- Large professional headshot (circular, 200-300px, left-aligned or centered)
- Bold introduction: "Hi, I'm Waheed Aslam" + MERN Stack Developer
- Brief tagline: "Bachelor in Computer Science | Building modern web experiences"
- Primary CTA: "View Projects" + Secondary: "Download Resume"
- Tech stack icons floating/animated subtly in background

**About Section**:
- Two-column layout: Professional photo left (if not in hero), content right
- Education highlight card with CS degree details
- Developer journey timeline or key milestones
- Technologies overview with icon grid

**Projects Showcase**:
- Card-based grid with hover elevate effect
- Each card: Project thumbnail/screenshot, title, brief description, tech stack badges, "View Project" link
- Filter tabs by technology (React, Node.js, Full Stack, etc.)
- Featured project spotlight with larger card

**Skills Section**:
- MERN stack prominently displayed with large icons
- Additional skills in categorized grid: Frontend, Backend, Tools, Databases
- Proficiency indicators using progress bars or star ratings
- Bootstrap badge styling for technology tags

**Contact Section**:
- Two-column: Form (name, email, message) left, contact info + social links right
- Social icons: GitHub, LinkedIn, Email with hover effects
- Location/availability status
- Form with floating labels, validation states

### E. Component Enhancements

**Cards & Surfaces**:
- Subtle shadows: shadow-lg for elevation
- Border radius: rounded-lg (8px) for cards, rounded-xl (12px) for featured elements
- Hover states: transform scale-105, shadow-2xl transition

**Buttons**:
- Primary: bg-primary, rounded-md, px-6 py-3
- Outline (on images): backdrop-blur-md, border-2, hover:bg-white/10
- Icon buttons for social: rounded-full, p-3

**Form Inputs**:
- Floating labels with Bootstrap styling
- Focus: border-primary ring effect
- Dark mode: bg-surface with lighter borders

### F. Animations (Minimal)
- Fade-in on scroll for sections (Intersection Observer)
- Subtle hover transforms on cards (scale, translate)
- Smooth scroll behavior for navigation
- Page load: Hero content fade-up stagger

## Images
**Hero Background**: Abstract tech/code background or geometric gradient (dark blue to purple gradient with subtle grid pattern overlay)
**Professional Headshot**: Circular image, 250px diameter, subtle border glow in hero or about section
**Project Screenshots**: Rectangular thumbnails (16:9 aspect ratio) showing project interfaces, 400x225px minimum
**Placement**: Hero background full-width, headshot in hero left-aligned or about section, project images in card headers

## Accessibility
- WCAG AA contrast ratios (4.5:1 text, 3:1 UI)
- Keyboard navigation for all interactive elements
- ARIA labels for icon buttons
- Focus visible indicators with primary color outline
- Semantic HTML structure (nav, main, section, footer)