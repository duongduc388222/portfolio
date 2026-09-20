# portfolio

Duc Duong's personal site — CS at Grinnell, research, badminton, a duck mascot, and a `// SYSTEM`-flavored terminal aesthetic. Pure static HTML/CSS/JS, no build step, deployed on Vercel.

## Run locally

From the repo root:

```sh
python3 -m http.server 4173
```

Then open <http://localhost:4173>. Stop with `Ctrl+C`. Edits show up on a browser refresh — there is nothing to rebuild.

- **Use a server, not `file://`.** Double-clicking `index.html` breaks the root-relative paths (`/fonts/…`, `/favicon.svg`) and the `fetch('/stats.json')` in `js/main.js`.
- **Port in use?** Pick another: `python3 -m http.server 8000`.
- **Clean URLs:** `vercel.json` sets `cleanUrls: true` and rewrites `/work`, `/about`, `/hobbies` (and `/coming-soon` → `/work.html`). The Python server does **not** honor these, so `/work` 404s locally — use `/work.html`. The site's own nav links already use `.html`, so clicking around works.
- **Custom 404:** `404.html` is only served automatically on Vercel; locally open `/404.html` to see it.
- **Token counter:** the hero reads `stats.json`. To refresh it, see `scripts/README.md`.

## Layout

- `index.html`, `hobbies.html`, `coming-soon.html` — pages (top-level, one file per route).
- `css/style.css` — global styles + design tokens (accent `#c5f135`, dark palette, `--font-sans` / `--font-mono`).
- `js/main.js` — global JS: connect modal, hobbies tab switching, game filter, scroll counters.
- `vercel.json` — production routing.
- `plans/formal_portfolio/` — milestone-driven plan for taking this from "legacy site" to "formal portfolio." Start at `overview.md`.

## Conventions

- No build chain. If you find yourself wanting webpack/Vite/Next, that's a smell — the static-HTML constraint is intentional.
- Typography is locked in `plans/formal_portfolio/type_system.md`: Space Grotesk + JetBrains Mono on the main site, Press Start 2P + VT323 scoped to the `.soul-sys` gaming wrapper only.
- Aesthetic guardrails: `plans/formal_portfolio/anti_ai_slop.md`. Read it before adding visuals.

## Fonts

Fonts are self-hosted in `/fonts/` (no `fonts.googleapis.com` / `fonts.gstatic.com` requests at runtime). Files:

- `SpaceGrotesk-variable.woff2` — covers weights 400/500/700 (italic is browser-synthesized; Google Fonts does not ship a Space Grotesk italic file).
- `JetBrainsMono-variable.woff2` — covers weights 400/500.
- `PressStart2P-400.woff2`, `VT323-400.woff2` — gaming-section pixel fonts (scoped to `.soul-sys`, not preloaded).

All subset to the `latin` range only. Every page preloads the two variable fonts above-the-fold via `<link rel="preload" ... crossorigin>`. `font-display: swap` everywhere — FOUT is acceptable, FOIT (or falling back to Inter) is not.

## Image conventions

- Every `<img>` carries `width` and `height` attributes (prevents CLS).
- Below-the-fold images: `loading="lazy"`. Everywhere: `decoding="async"`.
- Raster: `.webp` only (no `.jpg` / `.png` except the single OG share image).
- Vector: `.svg`.
- Sources: real screenshots of Duc's actual work; real photos of Duc. No stock photos. No AI-generated illustrations. No placeholder gradients. A project card without a real screenshot ships with an honest `// IN DEVELOPMENT` block instead of a stand-in.
