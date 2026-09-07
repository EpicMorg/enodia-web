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
5. DNS: tell the user what Cloudflare DNS record `docs.enodia.sh` needs
   (a CNAME to the Pages project's `*.pages.dev` hostname, proxied) — this
   is entirely inside their Cloudflare account, outside what an agent can
   do for them directly unless they grant API access.
6. Populate initial content from enodia's own `README.md` and
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
