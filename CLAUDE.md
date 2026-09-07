# enodia-docs

Documentation site for [EpicMorg/enodia](https://github.com/EpicMorg/enodia)
(service inventory and lifecycle/EOL monitoring), built with
[Astro](https://astro.build/) + [Starlight](https://starlight.astro.build/).

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

1. **Engine: Astro + Starlight**, not Docusaurus. Starlight's locales are
   plain subdirectories (`src/content/docs/en/`, `src/content/docs/ru/`)
   inside one Astro content collection, routed normally — both locales
   are live in a single `astro dev` process, which directly fixes the
   localhost-preview problem above. Starlight is pre-1.0 (`0.42.x` as of
   2026-09-07) but ~2 years in production, maintained by the Astro core
   team, frequent releases, no forced major-version coupling like
   Docusaurus's upcoming TS6 requirement. Astro itself (the underlying
   framework, currently 7.x) and Starlight (the docs theme/framework
   built on top of it, a separate npm package `@astrojs/starlight`) are
   two different things with independent version numbers — don't confuse
   an Astro release announcement with a Starlight one.
2. **Domain: `docs.enodia.sh`**. The user owns both `enodia.sh` (primary)
   and `enodia.run` (spare/backup — `enodia.run` gets a path-preserving
   301 to `enodia.sh` via a Cloudflare Bulk Redirect, not a single-URL
   Page Rule, so shared links to specific `.run` paths don't break; kept
   deliberately non-duplicated content-wise). Both domains are already
   purchased but not yet configured in Cloudflare as of 2026-09-07.
3. **Hosting: Cloudflare Pages**, as a deliberate experiment against
   rehlds.dev's GitHub Pages setup (an A/B across the user's two docs
   projects — easy to redeploy to GitHub Pages if this doesn't work out,
   nothing about Starlight's output is Cloudflare-specific). Reasoning
   beyond "let's try it": the user's own self-hosted server (behind a
   Cloudflare proxy) has a known, specific RU/RKN-related failure mode —
   ISP-level filtering on the path from Cloudflare's edge to their origin
   IP truncated proxied responses to exactly the first 38KB for about six
   months. Cloudflare Pages serves static assets directly from
   Cloudflare's own edge with no origin fetch at request time at all
   (confirmed against Cloudflare's own Pages docs), so that specific
   failure mode doesn't apply — there's no origin to reach. Both domains
   are on Cloudflare's free plan; Pages' free tier fits that.
   `enodia.run` may also get deployed to Pages in parallel as a second,
   lower-stakes experiment — not a firm commitment, just an idea the user
   floated.
4. **Build/deploy: GitHub Actions**, not Cloudflare's own git integration
   — build with `astro build`, deploy the output via Cloudflare's
   `cloudflare/pages-action` (or `wrangler pages deploy`). Keeps the
   pipeline consistent with the parent `enodia` repo's own CI approach
   (everything through Actions, nothing configured only in a vendor
   dashboard).
5. **Languages: `en` + `ru`.**
6. **Docs content license: CC-BY-4.0** — separate from enodia's own
   AGPL-3.0-or-later, which fits code, not prose.
7. **Root landing page**: a plain static one-pager (no Starlight sidebar,
   no docs chrome) in the style of brew.sh — install one-liner(s), a
   short pitch, links out to the real docs and to GitHub. Exactly where
   this lives (`enodia.sh` root vs `docs.enodia.sh` root before the docs
   proper) wasn't pinned down — ask if it matters when the time comes.
8. **`get.enodia.sh`** is a related but *separate* piece of infrastructure,
   not part of this docs site: a subdomain modeled on `get.docker.com`/
   `sh.rustup.rs` — its root serves a small landing page with two
   copy-pasteable one-liners (Unix via `curl`, Windows via `irm`/`iex`),
   and two specific paths transparently proxy enodia's real
   `install.sh`/`install.ps1` from GitHub (likely a Cloudflare Worker
   doing a plain fetch-and-return against `raw.githubusercontent.com`,
   since `get.enodia.sh` will live on the same Cloudflare account/zone as
   everything else here) — so the one-liners never have to name
   `raw.githubusercontent.com` directly and don't take an extra redirect
   hop. Not started; not decided which repo the Worker script itself
   should live in (this one, a new one, or something under
   `EpicMorg/enodia` proper) — ask.
9. **Search: Pagefind** (Starlight's own zero-config default) — not
   Algolia DocSearch, even though the user's other project (rehlds.dev,
   `docusaurus.config.ts`'s `themeConfig.algolia`) uses that. Deliberate:
   DocSearch needs an external Algolia account/crawl and an OSS-program
   application; Pagefind is a build-time static index with nothing
   external to configure, matching the same "fewer moving parts" reason
   Docusaurus itself got dropped. `@astrojs/starlight-docsearch` exists if
   this is ever reconsidered, but there's no reason to reach for it now.
10. **Sitemap: `@astrojs/sitemap`** (official Astro integration, `3.7.4`
    as of 2026-09-07) — needs `site:` set in `astro.config.mjs` plus
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
11. **robots.txt: a plain static `public/robots.txt` file**, not an
    integration. Neither community option (`astro-robots-txt`, stale
    since 2023; `astro-robots`, stale since late 2024) looked maintained
    enough to justify a dependency for something this simple — Astro
    copies `public/` verbatim to the build output regardless.

## Cloudflare dashboard setup notes (verified live, 2026-09-07)

Cloudflare's UI/terminology shifts over time — re-verify before following
this blindly if it's been a while. As of writing:

- **Zones first**: both `enodia.sh` and `enodia.run` need to actually be
  added as Cloudflare zones (DNS → Add a domain → point the registrar's
  nameservers at Cloudflare's) before anything below works — redirects,
  Pages custom domains, and Worker custom domains all require an active,
  proxied zone.
- **`enodia.run` → `enodia.sh` path-preserving redirect**: use **Bulk
  Redirects** (Rules → Overview → Bulk Redirects in the account-level
  nav), not the legacy Page Rules. One rule: source `enodia.run`, target
  `https://enodia.sh`, with both **"Include subdomains"** and **"Preserve
  path suffix"** toggled on. `enodia.run` needs at least one proxied
  (orange-cloud) DNS record for the redirect engine to see its traffic at
  all, even if it points nowhere real. Free-plan item cap is unclear —
  official docs claim a 10,000 rollout, community reports still see a cap
  of 20 on some accounts; irrelevant here since only one rule is needed.
- **`docs.enodia.sh` (Cloudflare Pages)**: don't create the CNAME by hand
  — Pages project → Custom domains → "Set up a domain" → enter
  `docs.enodia.sh`, Cloudflare creates the DNS record itself since the
  zone is already theirs. A manually-created CNAME ahead of this causes a
  522 until the domain is attached the right way.
- **`get.enodia.sh` (Cloudflare Worker)**: same shape, different tab —
  Workers & Pages → (the Worker) → Settings → Domains & Routes → Add
  Custom Domain → `get.enodia.sh`. This is the currently-recommended
  mechanism (Cloudflare's own docs say to migrate off the older "Workers
  Routes" pattern toward Custom Domains for internet-facing Workers); DNS
  + TLS are handled automatically, same as Pages.
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

1. Verify current Node version requirements for Astro 7.x /
   `@astrojs/starlight` live (`engines`/peer deps) before installing —
   don't assume a number from memory, it was unverified as of writing
   this. This machine had no Node/npm/npx installed at all as of
   2026-09-07.
2. Scaffold via `npm create astro@latest -- --template starlight` (or the
   current equivalent — check Starlight's own getting-started docs for
   the exact command, it changes across versions) into this directory.
3. Configure `astro.config.mjs`: `site: 'https://docs.enodia.sh'`, no
   `base` needed for a custom-domain root deploy (confirmed against
   Astro's own deploy docs — `base` is only for subpath deploys like
   `user.github.io/repo`), Starlight's `locales` for `en`/`ru`.
4. GitHub Actions workflow: `astro build` then `cloudflare/pages-action`
   (needs a Cloudflare API token + account ID as repo secrets — ask the
   user to create these, an agent can't do it for them) rather than
   GitHub Pages' native deploy action.
5. DNS: **don't** tell the user to manually create a CNAME for
   `docs.enodia.sh` — confirmed via Cloudflare's own Pages docs that doing
   so *before* the domain is attached in the Pages dashboard causes a 522.
   The correct flow: Pages project → Custom domains → "Set up a domain" →
   enter `docs.enodia.sh` → Cloudflare creates the CNAME itself, since
   `enodia.sh` is already their zone. Entirely inside their Cloudflare
   account, outside what an agent can do for them unless they grant API
   access.
6. Wire up `@astrojs/sitemap` (`site:` + `integrations: [sitemap()]` +
   the `i18n` option for en/ru — see "Decided" above) and add a static
   `public/robots.txt` referencing the sitemap URL. Pagefind needs no
   wiring at all — it's Starlight's default, active as soon as the site
   builds.
7. Populate initial content from enodia's own `README.md` and
   `docs/*.md` as a starting point — translated/reorganized for a
   docs-site structure (sidebar navigation, separate pages per topic)
   rather than copied verbatim, and kept in sync with the parent repo's
   actual current state, not a stale snapshot. Per the user's own
   roadmap, content about install methods (packages, `install.sh`/`.ps1`,
   choco/winget) should reflect what's *actually released* at the time of
   writing, not what's planned — check the parent repo's real state
   first.

## Working style

Follow the same rigor as the parent enodia repo's own sessions: verify
claims live (a Node/Astro version requirement, a Starlight config option,
whether a Cloudflare Pages custom-domain setting actually took effect)
rather than asserting from memory, and keep commits scoped and
descriptive.
