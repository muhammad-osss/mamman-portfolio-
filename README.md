# Mamman Portfolio — Next.js + Three.js + AI Assistant

A cinematic, AI-themed portfolio site built with Next.js 14 (App Router), Tailwind CSS,
Framer Motion, and React Three Fiber. Features a 3D robot boot-sequence intro, a 3D
interactive book for projects, and an AI assistant backed by the Anthropic API.

## 1. Install & run locally

```bash
npm install
cp .env.example .env.local   # then add your real ANTHROPIC_API_KEY
npm run dev
```

Open http://localhost:3000. Note: this project was written outside a Node
environment, so it has **not** been through `npm install` / `npm run build` yet.
After installing, run `npm run build` once locally and fix anything your exact
dependency versions flag before deploying — 99% of it should be plug-and-play,
but pin exact versions if you hit a peer-dependency mismatch.

## 2. Edit your content in one place

Everything text-based — your name, projects, skills, services, experience, and the
knowledge the AI assistant uses to answer questions — lives in:

```
lib/data.js
```

Change it there and it updates everywhere (including the assistant's answers).

## 3. Replace placeholder assets

These were auto-generated as placeholders so the site runs without 404s. Swap them
for the real thing:

- `public/images/project-drop.jpg`, `project-pulsewatch.jpg`, `project-counter.jpg` — real project screenshots
- `public/images/og-cover.jpg` — social share image (1200×630)
- `public/Mamman-CV.pdf` — your actual CV (the Download CV button already points here)

## 4. The AI assistant

`app/api/assistant/route.js` calls the Anthropic API server-side. Your API key is
never exposed to the browser. Set it as an environment variable:

- Local: `.env.local` → `ANTHROPIC_API_KEY=sk-ant-...`
- Vercel: Project Settings → Environment Variables

Without a key set, the assistant chat widget still opens but returns a friendly
"not configured yet" message instead of erroring.

The assistant's knowledge comes from `assistantKnowledge` at the bottom of
`lib/data.js` — it's generated from the same data as the rest of the site, so you
only maintain one source of truth.

## 5. Geolocation

`hooks/useGeolocation.js` wraps the browser's Geolocation API. It is **never**
called automatically — only when a visitor taps "Share my location" in the
Contact section (e.g. for booking an on-site visit). If they deny permission or
their browser doesn't support it, the rest of the site continues to work
normally — nothing is blocked.

## 6. The intro robot — upgrading to a photorealistic model

The robot in `components/intro/RobotModel.jsx` and the book in
`components/sections/BookModel.jsx` are built procedurally from Three.js
primitives (capsules, spheres, emissive materials) rather than an imported 3D
asset — there was no way to source a licensed, rigged, photorealistic humanoid
model in this environment. It's a real, animated, stylized robot (idle bob,
wave, point gestures) — just not photoreal.

To upgrade to a fully photorealistic robot:

1. Get a rigged `.glb`/`.gltf` humanoid model (e.g. Mixamo, Sketchfab, or a
   custom Blender export) and its animation clips (idle, wave, point).
2. Drop it in `public/models/robot.glb`.
3. In `RobotModel.jsx`, replace the primitive meshes with:
   ```jsx
   import { useGLTF, useAnimations } from "@react-three/drei";
   const { scene, animations } = useGLTF("/models/robot.glb");
   const { actions } = useAnimations(animations, scene);
   // actions["Wave"]?.play() when stage === "greet", etc.
   ```
4. Swap `actions[...].play()` calls in based on the `stage` prop instead of the
   manual rotation math currently there.

Same pattern applies to the book if you want real page-texture illustrations
instead of the glowing placeholder pages.

## 7. Deployment

Built for Vercel (zero-config for Next.js):

```bash
npm i -g vercel
vercel
```

Or connect the repo in the Vercel dashboard and set `ANTHROPIC_API_KEY` as an
environment variable there. Any other Next.js-compatible host works too.

## 8. Project structure

```
app/                    routes (App Router)
  page.js                 home page (intro + all sections)
  layout.js               fonts, metadata, global AI assistant mount
  api/assistant/route.js   AI assistant backend
  projects/[slug]/page.js  case study pages (statically generated)
  sitemap.js, globals.css
components/
  intro/                  robot boot sequence + 3D robot model + particles
  layout/                 navbar, footer
  sections/               hero, about, services, projects book, experience, contact
  ai/                     floating AI assistant widget
  ui/                      shared primitives (glass cards, scroll reveal)
hooks/                    useGeolocation, useReducedMotion
lib/data.js               all site content + AI assistant knowledge base
```

## 9. Accessibility & performance notes already built in

- Respects `prefers-reduced-motion` (intro skips straight to the ready state,
  global CSS shortens all transitions)
- Visible focus rings, skip-to-content link, alt/aria labels on icon-only buttons
- Geolocation is opt-in and non-blocking
- Images use Next's `<Image>`-ready structure (swap `<img>`/CSS backgrounds for
  `next/image` once real screenshots are in place, for automatic optimization)
- Security headers set in `next.config.mjs`
