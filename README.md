# HOTTWIREE

Marketing and portfolio site for **HOTTWIREE** — freelance web development by
Vysan Chellan, Durban, KwaZulu-Natal.

> The name is spelled with a **double T**. That's the brand mark, not a typo, and
> the site leans into it: the `TT` is the only part of the wordmark that carries
> the filament gradient, everywhere it appears.

---

## Running it

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>. `npm run build` produces the production build.

---

## Where to change things

**Almost everything you'll want to edit lives in one file: [`src/lib/site.ts`](src/lib/site.ts).**
Copy, prices, the phone number, the email, the demo list, the process steps and
the nav links all come from there. Change it once and the whole page follows —
including the WhatsApp deep links, the page title, and the structured data
Google reads.

| What | Where |
| --- | --- |
| Prices, package contents, 21-day support wording | `src/lib/site.ts` → `pricing` |
| Phone / email / WhatsApp message | `src/lib/site.ts` → `contact` |
| The five demo projects | `src/lib/site.ts` → `projects` |
| Your bio and study details | `src/lib/site.ts` → `owner` |
| Tagline (5 options written, 1 in use) | `src/lib/site.ts` → `site.tagline` |
| Colours, fonts, motion curves | `src/app/globals.css` → the `@theme` block |
| Section order | `src/app/page.tsx` |

### Things marked TODO for you

- Each project's one-line description is a sensible read of what the site does,
  taken from the live site itself — but it's a guess about how *you'd* describe
  the job. Every one is tagged `{/* TODO: Vysan confirm/replace this description */}`
  in `src/lib/site.ts` and `src/components/site/ProjectCard.tsx`.
- The "Who builds it" panel shows a `VC` monogram plate where your photo should
  go. Drop a photo at `public/vysan.jpg` and swap the marked block in
  `src/components/site/Who.tsx` for a `next/image`. It's deliberately not a
  stock face — a stock face on a one-person site reads as a lie.

### Tagline options

1. **"Websites with a live current."** ← in use
2. "Sites that don't sit still."
3. "Wired for business. Built in Durban."
4. "Your business, fully charged."
5. "Cold outreach. Hot websites."

---

## Why the sections are in this order

Hero → **Work** → Pricing → Process → Who → Contact.

The proof comes before the story. Nearly everyone landing here arrives from a
cold WhatsApp message with exactly one question — *can this guy actually build?*
— so the five live demos answer it before anything asks them to read a bio. If
you'd rather lead with the About section, reorder the components in
`src/app/page.tsx`; nothing else depends on the order except `<Preloader />`,
which must stay first (the hero waits on the flag it sets).

---

## How the demo previews work

Each card shows a real screenshot of the live site. On desktop, hold the pointer
over a card for about half a second and the **actual live site loads in an
iframe** behind the screenshot, scaled down from a 1440px desktop viewport. Only
one preview mounts at a time, and it unmounts on pointer-out. On touch devices
it never mounts at all — the screenshot stands on its own and the whole card is
a link to the real thing.

The screenshots in `public/work/` were captured from the live sites. To refresh
them: drop new PNGs in `public/work/`, then

```bash
node scripts/optimize-shots.mjs
```

which converts them to WebP and regenerates the blur placeholders in
`src/lib/blur.json`.

---

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — tokens defined in `@theme`, no config file
- **shadcn/ui** primitives (`Button`, `Switch`) — kept, then re-skinned end to
  end so nothing reads as default
- **GSAP + ScrollTrigger** — the pinned horizontal gallery and the charging wire
  in the Process section
- **Lenis** — smooth scroll, wired to GSAP's ticker so ScrollTrigger and the
  scroll position share one clock
- **Framer Motion** — entrances, the mobile menu, micro-interactions
- **Raw WebGL2** for the hero's filament field

### On the hero shader

The background is a domain-warped noise field, ridged and raised to a high power
so only the crests survive as thin incandescent wires, warming under the
pointer. It's a hand-written GLSL fragment shader on one full-screen triangle
rather than React Three Fiber — the whole effect is a single draw call, so a
renderer would have cost ~600 kB to do nothing. It renders at 45–62% of native
resolution (the field is all soft glow, so the upscale is invisible), pauses when
off-screen or when the tab is hidden, and doesn't run at all under reduced
motion. If WebGL is unavailable the static gradient underneath carries the
design.

### Accessibility and motion

`prefers-reduced-motion` is honoured throughout: Lenis doesn't initialise, the
custom cursor stays off, the shader doesn't run, the ignition preloader is
skipped, Framer Motion drops to opacity-only via `MotionConfig`, and the pinned
horizontal gallery is replaced by the plain vertical stack — so no content
becomes unreachable.

---

## Deploying to Vercel

Standard Next.js deployment, no extra configuration:

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — Vercel detects
   Next.js automatically.
3. Deploy.

After you have a real domain, update `site.url` in `src/lib/site.ts` so the
Open Graph image, sitemap and structured data point at the right place.
