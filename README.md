# OluodoAyomideV1 — THEE_YMD / Overflow portfolio prototype

Static prototype of Ayomide's portfolio (personal side + Overflow Creative Agency side). Every crossed box or dashed tag is a placeholder for real content.

| Page | File | Notes |
|---|---|---|
| Home | `index.html` | Intro, hero visual area, Trusted by, Skills, Featured Projects (filter), Fragments teaser, Experience |
| Me | `me.html` | About + facts, Writings, Gallery (lightbox), Also Seen In |
| Fragments | `fragments.html` | Captionless masonry, optional year/tool tag, lightbox |
| Creative Direction | `creative-direction.html` | Coming soon + notify-me (not wired yet) + 30-day index layout |
| Side Quests | `side-quests.html` | Minimal cards with role tags |
| Overflow (agency) | `overflow.html` | FourthCanvas-style agency side |

Shared styles live in `css/site.css`, behaviour in `js/site.js`. Contact is the footer on every page (`#contact`).

- Tap the centre name to switch between THEE_YMD and Overflow.
- Sun / moon icon switches light and dark mode (remembered per side).
- Fonts: Geist + Geist Mono (Google Fonts), Thunder LC (`fonts/`, personal-use licence — buy a commercial licence before using it for paid work).

## Run locally

Any static server works, e.g. `npx serve .` or `python3 -m http.server`.

## Deploy

Hosted on Vercel as a static site (no build step). `vercel.json` turns on clean URLs, so `/overflow` serves `overflow.html`.

The final build is planned as Next.js (App Router) + Tailwind per the developer brief; this repo holds the design prototype.
