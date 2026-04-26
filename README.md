# JABV Labs Web

JABV Labs is a full-stack web application with two distinct frontend surfaces:

- `client/` contains the public marketing site for JABV Labs.
- root `src/` contains the separate portal and admin app.

The public site is a React + Vite frontend with an editorial visual system, a shared marketing content layer, approved-only case-study scaffolding, and a lightweight contact flow that posts to the existing Express API.

## Repo Structure

- `client/src/content/`
  Public marketing copy, service definitions, navigation data, and case-study scaffolding.
- `client/src/components/marketing/`
  Shared public-site components such as the site header, footer, reveal motion, contact form, and service-page layout.
- `client/src/pages/`
  Public routes for the homepage, contact page, and service pages.
- `server/`
  Express server, API routes, and Vite integration.
- `shared/`
  Shared contracts such as the contact schema used by both client and server.
- `src/`
  Client/admin portal code. This is intentionally separate from the public marketing site.

## Public Site Notes

- The public site preserves the existing route structure:
  - `/`
  - `/contact`
  - `/services/mobile-app-development`
  - `/services/interactive-websites`
  - `/services/website-redesigns`
- Case studies are scaffolded in `client/src/content/case-studies.ts`.
- Only case studies with `status: "approved"` should ever render publicly.
- The contact form uses a lighter local-state flow on the client while preserving the existing `POST /api/contact` API and shared Zod contract.

## Stack

- React 18 + TypeScript
- Vite
- Wouter
- Tailwind CSS
- Express
- Drizzle ORM
- Zod

## Commands

```bash
npm install
npm run dev
npm run build
```

The dev server runs on port `5000`.

## API

The public contact form continues to post to:

- `POST /api/contact`

Validation is still defined in [shared/schema.ts](/C:/Users/Lenovo/Desktop/JABV%20LABS%20PAGE/JABVwebsieCodebase/shared/schema.ts:1).

## Design Direction

The current public site uses:

- `Fraunces` for display typography
- `Manrope` for body and interface text
- A restrained red-and-charcoal palette
- Short reveal motion with reduced-motion support

The goal is a premium, deliberate presentation rather than a flashy portfolio aesthetic.
