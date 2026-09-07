# enodia-web

Web presence for [EpicMorg/enodia](https://github.com/EpicMorg/enodia)
(service inventory and lifecycle/EOL monitoring): the `enodia.sh` landing
page, the `get.enodia.sh` install-script proxy, and the `docs.enodia.sh`
documentation site — three separate static surfaces on three separate
subdomains, one monorepo. Docs are built with
[Astro](https://astro.build/) + [Starlight](https://starlight.astro.build/);
landing and get are plain Astro for consistency (see "Decided" below for
why all three are Astro rather than mixing tooling).

Renamed from `enodia-docs` on 2026-09-07, once the scope grew from "just
a docs site" to "everything under `*.enodia.{sh,run}`" — see git history
on the `enodia-docs` name for the docs-only-scoped decisions that predate
the rename; nothing in them was reversed, they just got a home alongside
two siblings.

## Status: not yet scaffolded

This repository currently contains only this file and a placeholder
README. Nothing has been generated yet — pick up from "Next steps" below.
Per the user's own project roadmap (as of 2026-09-07), actual scaffolding
is likely to happen *after* enodia's GitHub release and Chocolatey/winget
packages land, not before — check with the user whether that's still the
sequencing before doing real work here, this file only records decisions
made ahead of time so a future session doesn't start from zero.

## Context

- Parent project lives at `/opt/git/enodia` on this machine (or
  `github.com/EpicMorg/enodia`). Read its `docs/DECISIONS.md` and
  `docs/ROADMAP.md` before writing any content that describes its
  architecture or behavior — those are the source of truth, and enodia's
  own `CLAUDE.md` documents its conventions (Go, stdlib-first, D-numbered
  decisions, etc.) which this docs site should describe accurately, not
  restate from memory.
- The user already runs a Docusaurus site (rehlds.dev) and hit two real
  pain points there that drove the engine choice below: Docusaurus's dev
  server only previews one i18n locale at a time (`docusaurus start --
  --locale ru`), so testing `/en/` and `/ru/` together on localhost isn't
  possible without a full `docusaurus build`; and a TypeScript-churn
  worry, which turned out on investigation to be narrower than feared —
  TS 6.0 deprecates `tsconfig.json`'s own `compilerOptions.baseUrl` (path
  resolution), unrelated to Docusaurus's `docusaurus.config.js` `baseUrl`
  (routing/deploy subpath) despite the name collision. Real Docusaurus v4
  breaking changes exist (Node 24+, React 19.2+, TS 6+, Rspack v2+,
  tracked in `facebook/docusaurus#11719`) but aren't a routing apocalypse
  — the i18n dev-preview limitation was the actual, structural reason to
  pick something else, not the TS scare.

## Decided

1. **Engine: Astro + Starlight** for the docs app, not Docusaurus.
   Starlight's locales are plain subdirectories (`src/content/docs/en/`,
   `src/content/docs/ru/`) inside one Astro content collection, routed
   normally — both locales are live in a single `astro dev` process,
   which directly fixes the localhost-preview problem above. Starlight
   is pre-1.0 (`0.42.x` as of 2026-09-07) but ~2 years in production,
   maintained by the Astro core team, frequent releases, no forced
   major-version coupling like Docusaurus's upcoming TS6 requirement.
   Astro itself (the underlying framework, currently 7.x) and Starlight
   (the docs theme/framework built on top of it, a separate npm package
   `@astrojs/starlight`) are two different things with independent
   version numbers — don't confuse an Astro release announcement with a
   Starlight one.
2. **Repo structure: one monorepo, three independent Astro apps**,
   decided 2026-09-07 when the scope grew from "just docs" to landing +
   get + docs (hence the rename to `enodia-web`):

   ```
   enodia-web/
   ├── apps/
   │   ├── landing/   → enodia.sh (root, brew.sh-style one-pager)
   │   ├── get/        → get.enodia.sh (landing + install-script proxy)
   │   └── docs/        → docs.enodia.sh (Astro + Starlight, en/ru)
   └── .github/workflows/
       ├── deploy-landing.yml   (paths: apps/landing/**)
       ├── deploy-get.yml       (paths: apps/get/**)
       └── deploy-docs.yml      (paths: apps/docs/**)
   ```

   Each `apps/*` is its own Astro project (own `package.json`,
   `astro.config.mjs`) deployed to its own Cloudflare Pages project — one
   monorepo does *not* collapse into one build or one deploy, since
   `enodia.sh`, `get.enodia.sh`, and `docs.enodia.sh` are three different
   custom domains and a single Pages deployment can't serve different
   content per subdomain. The point of the monorepo is one PR history and
   one place to work, not a shared build. **`landing` and `get` are plain
   Astro** (`output: 'static'`, no Starlight) chosen deliberately over
   hand-written HTML for tooling uniformity across all three surfaces —
   same locale-subfolder convention (`en/`/`ru/`) as docs, even though
   landing/get are a couple of simple pages, so translating any of the
   three doesn't need a different mental model. GitHub Actions workflows
   are path-filtered per app so touching one doesn't rebuild/redeploy the
   other two.
3. **Domain: `docs.enodia.sh`** for the docs app specifically (landing
   sits at bare `enodia.sh`, get at `get.enodia.sh` — see items 8-9). The
   user owns both `enodia.sh` (primary) and `enodia.run` (spare/backup —
   `enodia.run` gets a path-preserving 301 to `enodia.sh` via a
   Cloudflare Bulk Redirect, not a single-URL Page Rule, so shared links
   to specific `.run` paths don't break; kept deliberately
   non-duplicated content-wise). Both domains are purchased and, as of
   2026-09-07, both added as Cloudflare zones with registrar nameservers
   switched over — see "Cloudflare dashboard setup notes" below for the
   live redirect topology now in place.
4. **Hosting: Cloudflare Pages** (all three apps), as a deliberate
   experiment against rehlds.dev's GitHub Pages setup (an A/B across the
   user's two docs projects — easy to redeploy to GitHub Pages if this
   doesn't work out, nothing about Astro's output is Cloudflare-specific
   for `landing`/`docs`; `get` leans on Cloudflare Pages Functions
   specifically, see item 9). Reasoning beyond "let's try it": the user's
   own self-hosted server (behind a Cloudflare proxy) has a known,
   specific RU/RKN-related failure mode — ISP-level filtering on the path
   from Cloudflare's edge to their origin IP truncated proxied responses
   to exactly the first 38KB for about six months. Cloudflare Pages
   serves static assets directly from Cloudflare's own edge with no
   origin fetch at request time at all (confirmed against Cloudflare's
   own Pages docs), so that specific failure mode doesn't apply — there's
   no origin to reach. Both domains are on Cloudflare's free plan; Pages'
   free tier fits that. `enodia.run` may also get deployed to Pages in
   parallel as a second, lower-stakes experiment — not a firm commitment,
   just an idea the user floated.
5. **Build/deploy: GitHub Actions**, not Cloudflare's own git integration
   — build with `astro build`, deploy the output via Cloudflare's
   `cloudflare/pages-action` (or `wrangler pages deploy`), one workflow
   per app (item 2) so each of the three Cloudflare Pages projects gets
   its own `projectName` and its own trigger. Keeps the pipeline
   consistent with the parent `enodia` repo's own CI approach (everything
   through Actions, nothing configured only in a vendor dashboard).
6. **Languages: `en` + `ru`**, across all three apps for consistency
   (item 2), even where `landing`/`get` only need a couple of strings
   translated.
7. **Docs content license: CC-BY-4.0** — scoped to the `docs` app's
   prose specifically, separate from enodia's own AGPL-3.0-or-later
   (code) and distinct from `landing`/`get`'s copy (marketing/infra text,
   not "documentation" in the licensed sense — no separate license
   decided for those, ask if it comes up).
8. **Root landing page — location resolved: `apps/landing`**, deployed to
   bare `enodia.sh`. A plain static one-pager (no Starlight sidebar, no
   docs chrome) in the style of brew.sh — install one-liner(s), a short
   pitch, links out to the real docs and to GitHub.
9. **`get.enodia.sh` — `apps/get`, Cloudflare Pages + Pages Functions**,
   decided 2026-09-07 (supersedes the earlier "likely a Cloudflare
   Worker, not decided which repo" note). Modeled on `get.docker.com`/
   `sh.rustup.rs`: root serves a small static landing page with two
   copy-pasteable one-liners —

   ```
   curl -fsSL https://get.enodia.sh/unix | sh
   irm https://get.enodia.sh/windows | iex
   ```

   — and two routes proxy enodia's real install scripts from GitHub
   (`raw.githubusercontent.com/EpicMorg/enodia/master/install.sh` and
   `.../master/install.ps1`, **`master` branch**, matching D17 in the
   parent repo's own release tooling): `/unix` (covers Mac + Linux — one
   script handles OS/arch itself via `uname`, per the parent repo's D17,
   nothing to branch on server-side) and `/windows`. Implemented as
   **Cloudflare Pages Functions** (`apps/get/functions/unix.ts`,
   `apps/get/functions/windows.ts`) rather than a standalone Cloudflare
   Worker — a Pages Function is the same edge runtime, colocated in the
   same repo/app/deploy as the static landing page, needs no separate
   Workers & Pages → Custom Domain step (just the one Pages custom domain
   `get.enodia.sh`, same flow as `docs.enodia.sh`), and closes the
   "which repo does the Worker live in" question by not having a
   separate Worker at all. Each function does a plain fetch-and-return
   against `raw.githubusercontent.com` so the one-liners never have to
   name that host directly and don't take an extra redirect hop. **Edge
   cache: 10 minutes** (`Cache-Control: public, max-age=600` on the
   Function's response, or `caches.default` with a matching TTL) — an
   explicit, deliberate value, not "no cache" and not the fetched file's
   own origin cache headers passed through as-is; don't change this
   without asking, it was a considered choice on staleness-vs-load
   tradeoff (10 minutes is fine for an install script that changes on
   releases, not every commit).
10. **Search: Pagefind** (Starlight's own zero-config default, `docs` app
    only) — not Algolia DocSearch, even though the user's other project
    (rehlds.dev, `docusaurus.config.ts`'s `themeConfig.algolia`) uses
    that. Deliberate: DocSearch needs an external Algolia account/crawl
    and an OSS-program application; Pagefind is a build-time static index
    with nothing external to configure, matching the same "fewer moving
    parts" reason Docusaurus itself got dropped. `@astrojs/starlight-docsearch`
    exists if this is ever reconsidered, but there's no reason to reach
    for it now.
11. **Sitemap: `@astrojs/sitemap`** (official Astro integration, `3.7.4`
    as of 2026-09-07, `docs` app primarily — `landing`/`get` are single
    static pages each, a sitemap there is low-value but cheap to add if
    it matters later) — needs `site:` set in `astro.config.mjs` plus
    `integrations: [sitemap()]`, and has a dedicated `i18n: {
    defaultLocale, locales }` option that generates per-locale URLs and
    `hreflang` alternates automatically, which matters here (en+ru).
    Unresolved: `withastro/starlight`'s own package tree has an
    `integrations/sitemap.ts` file hinting at some internal sitemap
    glue, but its content couldn't be fetched/confirmed and Starlight's
    own configuration reference documents no sitemap-specific option at
    all — verify by hand at implementation time whether plain
    `@astrojs/sitemap` needs any extra Starlight-side wiring, don't
    assume either way from this note alone.
12. **robots.txt: a plain static `public/robots.txt` file per app**, not
    an integration. Neither community option (`astro-robots-txt`, stale
    since 2023; `astro-robots`, stale since late 2024) looked maintained
    enough to justify a dependency for something this simple — Astro
    copies `public/` verbatim to the build output regardless, and each
    `apps/*` builds/deploys independently (item 2) so each needs its own
    copy rather than one shared file.

## Cloudflare dashboard setup notes (verified live, 2026-09-07)

Cloudflare's UI/terminology shifts over time — re-verify before following
this blindly if it's been a while. As of writing:

- **Zones**: both `enodia.sh` and `enodia.run` are added as Cloudflare
  zones with registrar nameservers pointed at Cloudflare — **done** as of
  2026-09-07. Prerequisite for everything below (redirects, Pages custom
  domains, and Worker custom domains all require an active, proxied
  zone).
- **DNS records (both zones, identical shape)**: each zone carries 4
  proxied (orange-cloud) records — `@` (root, currently an A/AAAA record
  pointing at the user's own existing server — this is temporary
  scaffolding to give the redirect engine something to intercept, not a
  final target) and `www` / `get` / `docs`, each a CNAME to that zone's
  own `@`. The 3 non-root records exist purely so Bulk Redirects has a
  proxied hostname to match against for each subdomain that needs a
  rule — `get.enodia.sh` and `docs.enodia.sh` will eventually stop being
  CNAMEs-to-@ and become real endpoints (both Cloudflare Pages custom
  domains — see below, `get` included since it's a Pages project with
  Pages Functions, not a standalone Worker, per Decided item 9), but for
  now they're placeholders like everything else.
- **Bulk Redirects — done and verified live, 2026-09-07**: one account-level
  Redirect List (Rules → Overview → Bulk Redirects), not the legacy Page
  Rules, holding 5 rules — all with **"Preserve path suffix"** on and
  **"Include subdomains"** off (explicit per-hostname rules were chosen
  over one wildcard `Include subdomains` rule):

  | Source | Target | Notes |
  |---|---|---|
  | `enodia.run` (bare) | `https://enodia.sh` | canonical cross-domain redirect |
  | `www.enodia.sh` | `http://enodia.sh` | scheme note below |
  | `www.enodia.run` | `http://enodia.run` | deliberate double-hop, see below |
  | `get.enodia.run` | `http://get.enodia.sh` | scheme note below |
  | `docs.enodia.run` | `http://docs.enodia.sh` | scheme note below |

  **`www.enodia.run` is a deliberate two-hop redirect**, not a shortcut
  directly to `enodia.sh`: it lands on `enodia.run` first, which then
  matches the bare-domain rule above and redirects again to `enodia.sh`.
  Confirmed working end-to-end via `curl --resolve` (bypassing local/ISP
  DNS cache by resolving through `1.1.1.1` first) — both hops preserve
  path and query string correctly.

  **Four of the five targets use `http://`, not `https://`, on purpose.**
  These were originally entered without an explicit scheme (Cloudflare's
  Bulk Redirect form defaults to `http://` when none is given) and the
  user chose to leave them rather than fix the scheme, because the
  `enodia.sh` and `enodia.run` zones both have **Always Use HTTPS**
  enabled (confirmed live via `curl --resolve` against plain `http://`
  on both zones — every one of them 301s straight to `https://` with the
  path preserved). Net effect: these 4 hosts take one extra 301 hop
  (`https://www.enodia.sh` → `http://enodia.sh` → `https://enodia.sh`)
  compared to a same-scheme target, since HSTS is **not** enabled on
  either zone (no rule forces the browser to skip the plaintext hop
  client-side). Accepted cost, not an oversight — don't "fix" this to
  `https://` without checking with the user first, it was a considered
  choice. Only the bare `enodia.run` → `enodia.sh` rule has an explicit
  `https://` target (entered that way from the start).

  Free-plan item cap is unclear — official docs claim a 10,000 rollout,
  community reports still see a cap of 20 on some accounts; irrelevant
  here, 5 rules fits either way.
- **`docs.enodia.sh` and `get.enodia.sh` (both Cloudflare Pages)**: don't
  create either CNAME by hand — Pages project → Custom domains → "Set up
  a domain" → enter the hostname, Cloudflare creates the DNS record
  itself since the zone is already theirs. A manually-created CNAME ahead
  of this causes a 522 until the domain is attached the right way. `get`
  gets no separate Workers & Pages → Custom Domain step — it's a Pages
  project like `docs`, just with a `functions/` directory alongside its
  static output (Decided item 9), so the exact same Custom domains flow
  applies to both.
- **No single "routing" screen**: DNS, Rules, and Workers & Pages are
  three separate top-level dashboard sections — there's no nginx-style
  unified place to see everything at once.

## Explicitly not this repo's concern

- **Chocolatey and winget** packages: the user is building these
  themselves, in a separate vendor repo, based on enodia's GitHub
  releases — not something to touch here or in the parent `enodia` repo.
- **NSIS/GUI Windows installer**: explicitly decided against. winget/choco
  already give Windows users a "one command, done" experience; enodia is
  an admin/DevOps CLI tool, not something that needs a double-click
  wizard, Start Menu entry, or Control-Panel uninstaller. `install.ps1`
  (parent repo) stays the manual fallback for people without a package
  manager — it deliberately does *not* check for or prefer winget/choco
  itself (same reasoning as `install.sh` not checking for apt/dnf/pacman:
  it's the no-package-manager path, checking would just be dead weight).
  Once choco/winget packages exist, document install precedence (package
  manager first, script as fallback) in the parent repo's README and
  eventually here — not before they exist.
- **Homebrew tap / MacPorts port**: investigated, both paused/parked, not
  started:
  - Homebrew: a personal tap (`homebrew-tap` repo, no review needed,
    `brew install epicmorg/tap/enodia`) is the realistic near-term path;
    `homebrew-core` needs a PR and a stricter acceptance bar. goreleaser
    has a `brews:` key that can auto-push a Formula to a tap on release,
    but it's flagged deprecated as of goreleaser v2.10 in favor of
    `homebrew_casks` — unclear whether that deprecation actually applies
    to a plain CLI formula (casks are traditionally for GUI/`.app`
    installs) or is just a legacy-flag on an API that still works. Verify
    against a current real-world example before wiring anything into
    `.goreleaser.yaml`, don't guess from the deprecation notice alone.
  - MacPorts: no tap-equivalent exists at all. The only real channel is a
    PR (a Tcl `Portfile`) to `github.com/macports/macports-ports`,
    reviewed by the portmgr team — same review gate as `homebrew-core`,
    no lighter path.

## Next steps once scaffolding actually starts

Three apps (Decided item 2) — `docs` is the involved one (Starlight,
i18n, sitemap); `landing` and `get` are much smaller but shouldn't be
built before checking the shared groundwork below, since all three share
the Node/Astro-version verification and the "one Pages project per app"
deploy shape.

1. Verify current Node version requirements for Astro 7.x /
   `@astrojs/starlight` live (`engines`/peer deps) before installing —
   don't assume a number from memory, it was unverified as of writing
   this. This machine had no Node/npm/npx installed at all as of
   2026-09-07. One check covers all three apps (same Astro major).
2. Scaffold each app separately, into `apps/landing/`, `apps/get/`,
   `apps/docs/`:
   - `apps/docs`: `npm create astro@latest -- --template starlight` (or
     the current equivalent — check Starlight's own getting-started docs
     for the exact command, it changes across versions).
   - `apps/landing` and `apps/get`: plain `npm create astro@latest` (no
     Starlight), `output: 'static'`.
3. Configure each `astro.config.mjs`'s `site:` to its own domain
   (`https://enodia.sh`, `https://get.enodia.sh`,
   `https://docs.enodia.sh`) — no `base` needed for any of them, all
   three are custom-domain root deploys, not subpath deploys (confirmed
   against Astro's own deploy docs — `base` is only for something like
   `user.github.io/repo`). `apps/docs` additionally gets Starlight's
   `locales` for `en`/`ru`; `apps/landing`/`apps/get` follow the same
   `en`/`ru` folder convention by hand (Decided item 2/6) since they
   don't have Starlight's i18n plumbing to lean on.
4. `apps/get/functions/unix.ts` and `apps/get/functions/windows.ts`
   (Cloudflare Pages Functions, Decided item 9): fetch-and-return against
   `raw.githubusercontent.com/EpicMorg/enodia/master/install.sh` /
   `install.ps1` respectively, `Cache-Control: public, max-age=600`
   (10 minutes, deliberate — see item 9, don't change without asking).
   Verify Pages Functions' exact file-based routing convention live
   (`functions/<name>.ts` → `/<name>`) against Cloudflare's current docs
   before assuming the shape, it changes.
5. Three GitHub Actions workflows (`deploy-landing.yml`, `deploy-get.yml`,
   `deploy-docs.yml`), each: path-filtered to its own `apps/*/**`,
   `astro build` then `cloudflare/pages-action` with that app's own
   `projectName` (needs a Cloudflare API token + account ID as repo
   secrets — ask the user to create these, an agent can't do it for
   them) rather than GitHub Pages' native deploy action.
6. DNS: **don't** tell the user to manually create CNAMEs for
   `enodia.sh`, `get.enodia.sh`, or `docs.enodia.sh` — confirmed via
   Cloudflare's own Pages docs that doing so *before* the domain is
   attached in the Pages dashboard causes a 522. The correct flow, per
   app/domain: Pages project → Custom domains → "Set up a domain" →
   enter the hostname → Cloudflare creates the CNAME itself, since both
   zones are already theirs. Entirely inside their Cloudflare account,
   outside what an agent can do for them unless they grant API access.
7. `apps/docs`: wire up `@astrojs/sitemap` (`site:` +
   `integrations: [sitemap()]` + the `i18n` option for en/ru — see
   "Decided" above) and add a static `public/robots.txt` referencing the
   sitemap URL. Pagefind needs no wiring at all — it's Starlight's
   default, active as soon as the site builds. `apps/landing`/`apps/get`
   each get their own plain `public/robots.txt` too (Decided item 12),
   sitemap optional/low-priority for those two (item 11).
8. `apps/docs`: populate initial content from enodia's own `README.md`
   and `docs/*.md` as a starting point — translated/reorganized for a
   docs-site structure (sidebar navigation, separate pages per topic)
   rather than copied verbatim, and kept in sync with the parent repo's
   actual current state, not a stale snapshot. Per the user's own
   roadmap, content about install methods (packages, `install.sh`/`.ps1`,
   choco/winget) should reflect what's *actually released* at the time of
   writing, not what's planned — check the parent repo's real state
   first. `apps/landing`'s one-liner(s) and `apps/get`'s landing copy
   draw from the same source of truth (what's actually released), kept
   in sync with each other and with `apps/docs`'s install-methods page.

## Working style

Follow the same rigor as the parent enodia repo's own sessions: verify
claims live (a Node/Astro version requirement, a Starlight config option,
whether a Cloudflare Pages custom-domain setting actually took effect)
rather than asserting from memory, and keep commits scoped and
descriptive.
