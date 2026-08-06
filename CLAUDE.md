# RYVEN Shopify Theme

Shopify theme for **RYVEN**, a premium football accessories brand. Built on
top of Shopify's **Horizon** theme (v4.1.3), customized for RYVEN branding.

## Current focus: Coming Soon / Waitlist page

The store is pre-launch. Recent work (see `git log`) has centered on the
coming-soon experience:

- `templates/index.json` — homepage template, currently set to a coming-soon
  layout using `coming-soon-hero` + `ryven-waitlist` sections.
- `sections/coming-soon-hero.liquid` — hero section ("Engineered for the
  Elite" headline, brand name, notify-me CTA).
- `sections/coming-soon-countdown.liquid` / `assets/coming-soon-countdown.js`
  — countdown timer.
- `sections/ryven-waitlist.liquid` — email signup/waitlist form section.
- Mobile header/menu are hidden on the coming-soon page (see recent commits
  `def90e1`, `7f932fa`) to avoid duplicate CTAs and nav clutter.

Recent commits have mostly been iterative polish: fixing the hero's green
accent period rendering, waitlist CTA/schema fixes, and mobile header
cleanup.

## Structure

Standard Shopify theme layout:

- `layout/` — `theme.liquid` (main layout), `password.liquid`.
- `templates/` — JSON templates per page type (index, product, collection,
  cart, blog, etc.).
- `sections/` — page-level Liquid sections.
- `blocks/` — reusable content blocks used inside sections (prefixed `_` =
  theme-internal blocks not meant for merchant selection).
- `snippets/` — shared Liquid partials (buttons, cart drawer, styles, etc.).
- `assets/` — JS/CSS assets (mostly vanilla JS web components, e.g.
  `component.js`, `cart-drawer.js`).
- `config/` — `settings_schema.json` (theme editor settings) and
  `settings_data.json` (current settings values).
- `locales/` — translation files.
- `*.zip` (`CustomTheme.zip`, `locales.zip`, `ryven-theme.zip`) — theme
  export/backup archives at the repo root; not part of the live theme source.

## Working with this repo

- No build step / package.json — this is plain Liquid, CSS, and JS deployed
  directly via the Shopify CLI.
- Useful commands (already allowlisted in `.claude/settings.json`):
  - `shopify theme check` — lint the theme.
  - `shopify theme dev` / `shopify theme push` — preview / deploy.
- Git remote: `origin` → `https://github.com/Rickard-Kujala/ryven-theme.git`,
  branch `main`.

## Picking up where you left off

1. Run `git status` and `git log --oneline -10` to see the latest state.
2. Check `templates/index.json` to confirm which sections are live on the
   homepage.
3. If continuing coming-soon polish, check `sections/coming-soon-hero.liquid`,
   `sections/ryven-waitlist.liquid`, and their related snippets/assets first.
