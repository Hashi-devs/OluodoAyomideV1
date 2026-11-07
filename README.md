# OluodoAyomideV1 — THEE_YMD / Overflow portfolio prototype

Static prototype of Ayomide's portfolio (personal side + Overflow Creative Agency side). Every crossed box or dashed tag is a placeholder for real content.

| Page | File | Reference |
|---|---|---|
| Personal home (About, Skills, Projects, Experience, Contact) | `index.html` | ajanwachuku.work |
| Agency — Overflow | `overflow.html` | fourthcanvas.co |
| Gallery | `gallery.html` | — |
| Alternate layouts (Hero B, Projects B) | `alternates.html` | — |

- Tap the centre name to switch between THEE_YMD and Overflow.
- Sun / moon icon switches light and dark mode (remembered per side).
- Fonts: Geist + Geist Mono (Google Fonts), Thunder LC (`fonts/`, personal-use licence — buy a commercial licence before using it for paid work).

## Run locally

Any static server works, e.g. `npx serve .` or `python3 -m http.server`.

## Deploy

Hosted on Vercel as a static site (no build step). `vercel.json` turns on clean URLs, so `/overflow` serves `overflow.html`.

The final build is planned as Next.js (App Router) + Tailwind per the developer brief; this repo holds the design prototype.
