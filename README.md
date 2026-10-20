# Shrika Dreams — Real Estate Consultant Website (Phase 1: Home Page)

Production-ready implementation of the approved Figma design for the Phase 1 Home Page.

## Tech Stack
- Next.js (App Router) + React + TypeScript
- Tailwind CSS v4 (theme tokens for brand colors/fonts in `app/globals.css`)
- motion/react for subtle entrance animations
- lucide-react for icons
- Supabase (planned for later phases — see `lib/data/`)

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project Structure

```
app/
  layout.tsx          Fonts (Libre Baskerville + DM Sans) and metadata
  page.tsx            Composes the Home Page sections
  projects/page.tsx   Projects listing page
  globals.css         Tailwind + brand theme tokens
components/
  layout/             Header (overlay/solid variants), Footer, FloatingWhatsApp
  home/                Hero, Search, Builders, Featured Projects, Trust, Testimonials, CTA, Contact
  projects/            ProjectsHero, ProjectFilters, ProjectGrid, ProjectPagination,
                        ProjectsCTA, ProjectsExplorer (client state/filtering wrapper)
  motion/FadeIn.tsx    Shared scroll-in-view fade/slide animation
lib/
  constants.ts        Brand info + nav links
  data/                Typed mock data (builders, projects, testimonials, trust/stats, filters)
```

### Pages
- `/` — Home Page
- `/projects` — Projects listing with property-type tabs, search, locality/builder/budget/BHK/possession
  filters, sorting, and pagination — all working against the in-memory mock data in `lib/data/projects.ts`.
  The `ProjectCard` is reused as-is from the Home Page so both pages share the same visual language.

The `Header` component takes a `variant` prop: `"overlay"` (default, transparent-over-hero,
turns solid on scroll — used on `/`) or `"solid"` (always navy — used on `/projects`, which has
no hero image behind it).

## Notes on Data
All content in `lib/data/` is realistic mock data shaped to match what a future
Supabase schema would look like (e.g. a `projects` table). Swapping to live data
later just means replacing the static arrays with a server-side fetch — the
components that consume them (`ProjectCard`, `TestimonialCard`, etc.) don't need
to change.

## Note on Fonts in Restricted Environments
This project uses `next/font/google` to self-host Libre Baskerville and DM Sans.
Building in a network-restricted sandbox without access to `fonts.googleapis.com`
will fail at the font-fetch step — this is expected and resolves normally in any
environment with standard internet access (local dev machine, CI, Vercel).

## Out of Scope (Phase 1)
No additional pages, no Supabase wiring, no Phase 2–5 features. The search and
contact forms are UI-only for now (not yet connected to a backend).

## Blog Gallery Lightbox

Gallery images in blog posts open in a full-screen viewer (close, previous/next, Escape, backdrop click, arrow keys, swipe on touch screens, scroll lock, reduced-motion aware).

- `app/components/blog/GalleryLightbox.tsx` — viewer + gallery grid (client component)
- `app/components/blog/TiptapRenderer.tsx` — gallery blocks render through `GalleryLightbox`

No new dependencies were added. To run locally:

```bash
npm install
npm run dev
```
