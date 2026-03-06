# T & S — Wedding Experience Website

A premium, illustration-driven wedding microsite built with Next.js 15, featuring immersive parallax storytelling, editorial typography, and cinematic motion design.

## Tech Stack

- **Framework**: Next.js 15 (App Router) + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Animation**: Framer Motion
- **Validation**: Zod (RSVP form)
- **Fonts**: Playfair Display (serif display) + DM Sans (body)

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Landing page
│   ├── itinerary/          # Timeline view of all events
│   ├── chapter/[slug]/     # Dynamic event chapter pages
│   ├── travel/             # Travel information
│   ├── stay/               # Accommodation details
│   ├── gallery/            # Photo gallery with masonry grid
│   ├── faq/                # Frequently asked questions
│   ├── rsvp/               # RSVP form with validation
│   ├── login/              # Guest portal OTP login (UI stub)
│   └── guest/              # Guest dashboard (UI stub)
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── motion/             # ParallaxSection, FadeInView, TextReveal, FloatingParticles
│   ├── sections/           # HeroSection, ChaptersSection, StorySection, QuickInfoStrip
│   ├── shared/             # ChapterCard, CountdownTimer, DressCodeBadge, CTAButton, etc.
│   └── ui/                 # shadcn/ui primitives
├── content/
│   └── events.ts           # ★ Single source of truth for all event data
├── lib/
│   └── utils.ts            # Utility functions
└── types/
    └── index.ts            # TypeScript type definitions
```

## How to Customize

### Changing Event Content

All event data lives in a single file: **`src/content/events.ts`**

```typescript
// Update couple info
export const COUPLE = {
  partner1: "Tanvi",
  partner2: "Sahil",
  hashtag: "#TanviAndSahil",
  weddingDate: "2026-04-21",
  location: "Jaipur, Rajasthan",
  venue: "Fairmont Udaipur",
  tagline: "Different cities, different journeys — one decision.",
};

// Each event in the EVENTS array has:
// slug, title, subtitle, tagline, date, time, location, venue,
// description, longDescription, dressCode, palette, galleryImages
```

### Swapping Images

Place images in the corresponding chapter folder:

```
public/images/chapters/
├── first-chapter/     # Welcome Dinner
├── courtyard-edit/    # Lunch (Apr 20)
├── midnight-cathedral/# Sangeet
├── world-of-our-own/  # Lunch (Apr 21)
├── royal-court/       # Wedding
└── thrill-theory/     # Afterparty
```

Update the `galleryImages` array in `events.ts` to match your filenames.

### Changing Color Palettes

Each event has a `palette` object in `events.ts`:

```typescript
palette: {
  primary: "#1a0a2e",    // Main color
  secondary: "#c9a84c",  // Supporting color
  accent: "#e8c97a",     // Highlight/accent
  background: "#0d0615", // Section background
  foreground: "#f5efe6", // Text color
  muted: "#2a1a3e",      // Subtle backgrounds
  gradientFrom: "#1a0a2e",
  gradientVia: "#2d1b4e",
  gradientTo: "#0d0615",
}
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, story, chapters, info strip |
| `/itinerary` | Full timeline of all events |
| `/chapter/[slug]` | Dedicated page per event |
| `/travel` | Travel and arrival information |
| `/stay` | Accommodation details |
| `/gallery` | Photo gallery with lightbox |
| `/faq` | Frequently asked questions |
| `/rsvp` | RSVP form with Zod validation |
| `/login` | Guest portal login (UI stub) |
| `/guest` | Personalized guest dashboard (UI stub) |

## Deployment (Vercel)

1. Push the repo to GitHub
2. Connect to [Vercel](https://vercel.com)
3. Framework preset will auto-detect Next.js
4. Deploy — no environment variables required for the static site
5. Add your custom domain in Vercel dashboard

```bash
# Or deploy via CLI
npx vercel
```

## QA Checklist

### Performance
- [ ] Lighthouse Performance score > 90
- [ ] All images use `next/image` with proper sizing
- [ ] Non-critical sections lazy loaded
- [ ] Animations use `transform` and `opacity` only (GPU-accelerated)
- [ ] `will-change` used sparingly
- [ ] No layout shifts (CLS < 0.1)

### Accessibility
- [ ] Semantic HTML throughout
- [ ] All interactive elements keyboard-navigable
- [ ] Focus states visible on all buttons/links
- [ ] `prefers-reduced-motion` respected (animations disabled)
- [ ] Form fields have associated labels
- [ ] Error messages linked to inputs with `aria-describedby`
- [ ] Color contrast meets WCAG AA (4.5:1 body, 3:1 large text)

### SEO
- [ ] Metadata on every page (title, description, OG, Twitter)
- [ ] `sitemap.xml` generated at build time
- [ ] `robots.txt` configured (guest portal excluded)
- [ ] Semantic heading hierarchy (single h1 per page)
- [ ] Custom 404 page

### Mobile
- [ ] All pages responsive at 375px, 768px, 1024px, 1440px
- [ ] Navigation collapses to hamburger on mobile
- [ ] Touch targets minimum 44px
- [ ] No horizontal overflow
- [ ] Animations reduced on mobile for performance

### Cross-browser
- [ ] Chrome, Safari, Firefox, Edge
- [ ] iOS Safari, Android Chrome
