# /img — Image Assets

All images for the portfolio live here, organized by which page consumes them. Drop files into the matching folder and reference them with a root-relative path (`/img/...`) from the HTML.

## Folder map

| Folder              | What goes here                                                   | Slot in the UI                                |
|---------------------|------------------------------------------------------------------|-----------------------------------------------|
| `home/`             | Profile pic / avatar for the home hero                           | `index.html` hero, beside the `DUC.` mark     |
| `about/`            | About-page avatar, optional snapshots                            | `about.html` intro block (built in M5)        |
| `work/`             | Project thumbnails — one per project, 16:9                       | `work.html` project cards (built in M4)       |
| `hobbies/sports/`   | Photos for Badminton, Football cards (4:3)                       | `hobbies.html` `.sport-card` thumbnails       |
| `hobbies/games/`    | Cover art / icons for PUBG, Arena of Valor, FIFA (1:1)           | `hobbies.html` `.game-card` thumbnails        |
| `hobbies/teams/`    | Crests for Real Madrid, Portugal, France (SVG preferred)         | `hobbies.html` `.team-item` left bar          |
| `og/`               | Open Graph share image — single 1200×630 PNG named `og-image.png`| Referenced by `<meta property="og:image">`    |

## Naming
- Lowercase kebab-case only: `badminton-match.webp`, `real-madrid.svg`.
- No spaces, no underscores, no uppercase.
- One purpose per file — don't reuse `cover.webp` across folders.

## Format & size targets

| Slot                  | Aspect | Display size       | Export (2×)    | Format |
|-----------------------|--------|--------------------|----------------|--------|
| Home avatar           | 1:1    | 96–128px           | 256×256        | webp   |
| About avatar          | 1:1    | 160–200px          | 400×400        | webp   |
| Project thumbnail     | 16:9   | full card width    | 800×450        | webp   |
| Sport card thumbnail  | 4:3    | full card width    | 600×450        | webp   |
| Game card thumbnail   | 1:1    | ~120px square      | 240×240        | webp   |
| Team crest            | 1:1    | 24–32px            | vector         | svg    |
| Open Graph share      | 1.91:1 | n/a (shown remote) | 1200×630       | png    |

Always `.webp` for raster (50–80% smaller than JPEG, lossless option available). Always `.svg` for icons/logos/crests. No `.jpg` or `.png` going forward except the OG image (some social crawlers still prefer PNG).

## HTML usage contract
Every `<img>` added to the site uses this exact attribute set:
```html
<img
  src="/img/<category>/<slug>.webp"
  alt="<descriptive>"
  width="<export-w>" height="<export-h>"
  loading="lazy"
  decoding="async">
```
Above-the-fold images (home avatar, hero) drop `loading="lazy"` so they load eagerly.

Wrap thumbnails in the M3 `.thumb` system to enforce aspect ratio:
```html
<div class="thumb thumb-16x9">
  <img src="/img/work/myproject/cover.webp" alt="MyProject screenshot"
       width="800" height="450" loading="lazy" decoding="async">
</div>
```

## Licensing reminder
- Avatars / project shots / sport photos → your own.
- Team crests, game art → trademarked. Use abstract SVG outlines you create yourself, or keep the existing colored-bar abstraction. Don't ship copyrighted PNGs.

## Tracking what's in here
Each folder ships with a `.gitkeep` so it stays in git while empty. As you add real assets, update this table:

| File                                       | Used by                                | Status   |
|--------------------------------------------|----------------------------------------|----------|
| `home/avatar.webp`                         | `index.html` hero                      | pending  |
| `about/avatar.webp`                        | `about.html` intro                     | pending  |
| `work/<project-slug>/cover.webp`           | `work.html` project card               | pending  |
| `hobbies/sports/badminton.webp`            | `hobbies.html` Badminton card          | pending  |
| `hobbies/sports/football.webp`             | `hobbies.html` Football card           | pending  |
| `hobbies/games/pubg.webp`                  | `hobbies.html` PUBG card               | pending  |
| `hobbies/games/arena-of-valor.webp`        | `hobbies.html` Arena of Valor card     | pending  |
| `hobbies/games/fifa.webp`                  | `hobbies.html` FIFA card               | pending  |
| `hobbies/teams/real-madrid.svg`            | `hobbies.html` Real Madrid item        | pending  |
| `hobbies/teams/portugal.svg`               | `hobbies.html` Portugal item           | pending  |
| `hobbies/teams/france.svg`                 | `hobbies.html` France item             | pending  |
| `og/og-image.png`                          | Open Graph meta on every page          | pending  |
