# HOTTWIREE

Marketing and portfolio site for **HOTTWIREE** — freelance web development by
Vysan Chellan, Durban, KwaZulu-Natal.

> The name is spelled with a **double T**. That's the brand mark, not a typo, and
> the logotype makes it literal: the mark is drawn in SVG as bent-wire lettering
> (`src/components/site/WireMark.tsx`), and the two T crossbars are a single hot
> wire strung between two terminals. It isn't a font — change the lettering by
> editing the paths in that file.

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
| Turnaround (currently 5 business days) | `src/lib/site.ts` → `turnaround` |
| The four numbers in the band under the hero | `src/lib/site.ts` → `specs` |
| Phone / email / WhatsApp message | `src/lib/site.ts` → `contact` |
| The five demo builds | `src/lib/site.ts` → `projects` |
| Your bio and study details | `src/lib/site.ts` → `owner` |
| Tagline (4 options written, 1 in use) | `src/lib/site.ts` → `site.tagline` |
| Colours, fonts, motion curves | `src/app/globals.css` → the `@theme` block |
| Section order | `src/app/page.tsx` |

### Things marked TODO for you

- Each build's one-line description says what that build demonstrates. Every
  one is tagged `{/* TODO: Vysan confirm/replace this description */}` in
  `src/lib/site.ts` and `src/components/site/ProjectCard.tsx`.
- **If any of the five ever becomes real client work, say so.** The site
  currently calls them demonstration builds everywhere they appear — heading,
  badge on each card, and the closing panel. That's deliberate (see below);
  swap the wording the day it stops being true, not before.
- The "Who builds it" panel shows a `VC` monogram plate where your photo should
  go. Drop a photo at `public/vysan.jpg` and swap the marked block in
  `src/components/site/Who.tsx` for a `next/image`. It's deliberately not a
  stock face — a stock face on a one-person site reads as a lie.

### Tagline options

1. **"Websites for businesses that can't be found."** ← in use
2. "Built properly. Live in five days."
3. "Wired for business. Built in Durban."
4. "A real website, for what a template costs."

---

## Why the sections are in this order

Hero → **Spec band** → Search proof → Work → Pricing → Process → Who → Contact.

The four numbers land second, before anything asks the visitor to read. Almost
everyone here arrived from a cold WhatsApp message and is trying to answer one
question before they'll invest attention: *what does this cost.* Making them
hunt for it loses them.

Then the argument runs in order — here's the problem, here's proof I can build,
here's the exact price, here's how little you have to do, here's who you're
dealing with, here are two ways to start. Reorder in `src/app/page.tsx` if you
disagree; nothing depends on the order.

---

## The demo builds are labelled as demo builds

The five sites are real, deployed and fully working, but they were built around
invented businesses to demonstrate a standard. They are **not** client work.

The site says so in three places: the section heading, a "Demo build" badge on
every card, and the closing panel. An earlier draft implied they were live
client sites doing work for real owners — that reads better right up until a
prospect asks for a reference, and then it costs you the deal and the
reputation. The craft on display is real, which is the part that actually
sells.

Same reasoning applies to the search illustration in the section above it: the
caption states plainly that it's drawn, and that the rankings and ratings are
invented to show a pattern.

---

## The search illustration

The "(01) The problem" section draws a search results page and lets you flip
between *without a website* and *with a website*.

It is drawn, not screenshotted, and it deliberately does **not** use Google's
logo, wordmark or colours. Putting their branding on a fabricated result
implies an endorsement you don't have, and it's a trademark problem attached to
your business rather than to a design decision. The copy refers to Google by
name — which is ordinary descriptive use — while the panel stays a clearly
labelled illustration.

The competing results are drawn as grey bars rather than invented company
names. It keeps the eye on the one row that matters and avoids putting a named
business, real or invented, in a losing position.

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
- **Framer Motion** — entrances, the mobile menu, the search-proof toggle
- **Raw WebGL2** for the hero's filament field; **canvas 2D** for the cursor trail
- **Hand-drawn SVG logotype** (`WireMark`) — monoline strokes with square caps;
  draw-on animation in the hero, static in the nav and footer

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

### On the nav

The nav is a title block, not a floating pill: a full-width strip divided into
cells by hairlines — mark / numbered sections / Durban wall-clock / the phone
number. The number sits where a "get started" button usually goes because the
number is the offer, and a visitor who only reads the top of the page still
leaves with it.

### On the cursor

The pointer drags a length of hot wire behind it — a chain of points easing
toward the one ahead, drawn as a tapering stroke that cools from white through
ember to dark. It whips on direction changes and collapses to nothing when you
stop moving.

The native cursor is deliberately **left visible**. Replacing it with a dot and
a lagging ring is the single most recognisable "designer portfolio" tell, and
hiding the real pointer costs usability on a page whose entire job is getting
someone to press a button.

### Accessibility and motion

`prefers-reduced-motion` is honoured throughout: Lenis doesn't initialise, the
cursor trail doesn't draw, the shader doesn't run, Framer Motion drops to
opacity-only via `MotionConfig`, and the pinned horizontal gallery is replaced
by the plain vertical stack — so no content becomes unreachable.

There is no preloader. An earlier draft had an "ignition" sequence with a
0–100 counter; a percentage countdown in front of a sales page costs more in
bounced visitors than the drama is worth, particularly on a phone on mobile
data.

### On the palette

Two colours, and they mean different things. The ember ramp
(`#e8480a → #ff7a1a → #ffc978`) is the brand and carries every accent. The
WhatsApp green (`#25d366`) appears **only** on WhatsApp affordances, so it
reads as a platform signal rather than decoration. An earlier draft had an acid
green as a second brand accent; two competing accents plus a four-stop gradient
read as a template, so both were cut.

---

## Deploying to Vercel

Standard Next.js deployment, no extra configuration:

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — Vercel detects
   Next.js automatically.
3. Deploy.

After you have a real domain, update `site.url` in `src/lib/site.ts` so the
Open Graph image, sitemap and structured data point at the right place.
