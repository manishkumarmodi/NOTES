# Noteverse

Collaborative note discovery platform built with Next.js 15, React 19, and Tailwind CSS 4. The app blends curated landing content, browsing tools, bookmarking, and admin workflows so teams can publish, manage, and review knowledge in one place.

## Features
- **Marketing landing** with hero, testimonials, and value props to explain the product quickly.
- **Browsing & discovery** pages for trending notes, category filters, and rich note previews.
- **Bookmarks & collections** so users can save, revisit, and manage their favorite notes.
- **Detailed note view** including ratings, reviews, and related content blocks.
- **Contributor upload flow** with drag-and-drop file zones and structured forms.
- **Profile & notifications** for managing personal details and communication preferences.
- **Admin dashboard** to oversee users, categories, and note moderation KPIs.
- **Theming support** via Radix + shadcn UI primitives and `next-themes`.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript with React 19
- **Styling:** Tailwind CSS 4, PostCSS, CSS custom properties
- **UI primitives:** Radix UI, shadcn-inspired components, Lucide icons
- **Forms & validation:** React Hook Form + Zod resolvers
- **Data viz & media:** Recharts, Embla carousel, Vaul drawers, Sonner toasts

## Project Structure
```
app/
  ├─ page.tsx                 # Landing page shell
  ├─ admin/                   # Admin dashboard routes
  ├─ bookmarks/               # Saved note views
  ├─ browse/                  # Discovery experience
  ├─ notes/[id]/              # Dynamic note details
  ├─ profile/                 # User settings & notifications
  └─ upload/                  # Contributor submission flow
components/
  ├─ landing/                 # Hero, testimonials, promo sections
  ├─ notes/                   # Note detail widgets & reviews
  ├─ admin/                   # Dashboard widgets & stats
  ├─ ui/                      # Reusable primitives (Radix wrappers)
  └─ layout/                  # Header, footer, theme provider
lib/
  └─ notes-store.ts           # Client-side note store utilities
hooks/
  ├─ use-mobile.ts            # Responsive helpers
  └─ use-toast.ts             # Toast wrapper utilities
```

## Getting Started
1. **Install PNPM** if it is not already available: `corepack enable && corepack prepare pnpm@latest --activate`
2. **Install dependencies**
   ```bash
   pnpm install
   ```
3. **Run the development server**
   ```bash
   pnpm dev
   ```
4. Open http://localhost:3000 to view the app. The server reloads on file edits.

## Available Scripts
- `pnpm dev` – start Next.js in development mode.
- `pnpm build` – create an optimized production build.
- `pnpm start` – serve the production bundle.
- `pnpm lint` – run Next.js lint checks.

## Styling & UI
- Tailwind CSS tokens live in `app/globals.css` and `styles/globals.css`.
- Component theming relies on CSS variables plus the `ThemeProvider` in `components/theme-provider.tsx`.
- Animations leverage `tailwindcss-animate` and `tw-animate-css` utilities.

## Conventions
- All reusable UI primitives sit under `components/ui` (mirroring shadcn patterns).
- Shared hooks live in `hooks/`; avoid duplicating logic inside components.
- Keep new API integrations typed with Zod schemas for safety.

## Next Steps
- Wire real data sources for notes, reviews, and admin metrics.
- Add authentication (the `components/auth` folder already contains the UI scaffolding).
- Configure deployments (Vercel recommended) once environment variables are defined.
