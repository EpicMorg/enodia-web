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

## Status: live in production (2026-09-07)

The user decided to start scaffolding ahead of the originally-assumed
sequencing (enodia GitHub release + choco/winget) rather than wait — that
condition in earlier revisions of this file no longer gates work here.

**All three apps exist, are deployed, and are serving real production
traffic** — `apps/docs` (Astro + Starlight), `apps/landing`, `apps/get`
(both plain Astro, hand-scaffolded rather than via `create-astro` — see
their own "Next steps" entries for why). `develop` was merged to
`master` via [PR #1](https://github.com/EpicMorg/enodia-web/pull/1)
(merge commit `d8a46e9`, 2026-09-07) at the user's explicit direction —
each Cloudflare Pages project's `production_branch` is `master`
(Decided item 5), so this merge is what actually took
`docs.enodia.sh`/`enodia.sh`/`get.enodia.sh` from a 522 (no production
deployment had ever landed) to real content.

**enodia itself shipped a real tagged release the same day** — `1.0.0+0`
(2026-09-07), verified live end-to-end (not assumed from the parent
repo's own README, which was momentarily stale — see below): ran the
real `install.sh` in an isolated directory, it downloaded and checksummed
a real binary, `enodia version` reported `1.0.0+0`; also confirmed the
`ghcr.io/epicmorg/enodia:1` multi-arch image manifest and one real
package asset download. A second merge,
[PR #2](https://github.com/EpicMorg/enodia-web/pull/2) (merge commit
`ccfd40e`, 2026-09-07), updated every "no release yet" spot across all
three apps to match — `apps/get`'s Pages Functions needed no code change
(they fetch live) but their 404 messages were generalized away from a
now-resolved-and-therefore-misleading "no release yet" claim;
`apps/landing`'s and `apps/docs`'s copy got real install one-liners and
package instructions in place of placeholders. **Update, 2026-09-08**:
enodia's own `README.md` no longer has this problem — commit `e3f87f2`
fixed it to say "Status: 1.0" and link `docs.enodia.sh` directly, so the
parent repo's own docs and this one now agree; no longer something to
watch for.

**docs.enodia.sh/ (bare root) no longer 404s** — added
`redirects: { '/': '/en/' }` to `apps/docs/astro.config.mjs` (portable,
renders as a meta-refresh page in static output) plus a Cloudflare-native
`apps/docs/public/_redirects` (`/ /en/ 301`, takes priority at Cloudflare's
edge over the static fallback) — verified both live: dev server gives a
real 308, production gives a real 301.

**All RU docs content converted from informal "ты" to formal "Вы"**,
2026-09-08, per explicit user correction — see the RU-translation
feedback memory (`feedback_ru_translation_tone.md`) for the standing
instruction to default to `Вы` in this user's Russian technical writing
going forward.

**Verified live post-merge** via `curl` against all three production
domains after both PRs, not assumed: root redirect, real install
one-liner, `Вы`-form RU text, and `get.enodia.sh` actually serving real
`install.sh`/`install.ps1` content (not its old 404). See each app's own
"Next steps" section below for exactly what's
done vs. still open — production being live doesn't mean every open item
below is closed.

Node.js **v24.20.0** ("Krypton", current LTS as of 2026-09-07) is
installed system-wide under `/usr/local` on this machine (there was no
Node/npm/npx at all before) — confirmed against Astro 7.x's own
`engines.node: >=22.12.0` via the live npm registry, not assumed.

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
   — build with `astro build`, deploy via **`cloudflare/wrangler-action@v4`**
   running `command: pages deploy <dist> --project-name=<name>`, one
   workflow per app (item 2) so each of the three Cloudflare Pages
   projects gets its own `--project-name` and its own trigger. Keeps the
   pipeline consistent with the parent `enodia` repo's own CI approach
   (everything through Actions, nothing configured only in a vendor
   dashboard).

   **Not `cloudflare/pages-action`** — confirmed live via its GitHub repo
   (`gh api repos/cloudflare/pages-action/contents/README.md`) that it's
   deprecated (last release `v1.5.0`, repo archived); Cloudflare's own
   README there points at `wrangler-action` as the replacement, which now
   handles both Workers and Pages. Both need the same API token
   permission (`Account` → `Cloudflare Pages` → `Edit`) and the same two
   repo secrets, `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` — one
   token/account-ID pair reused across all three apps' workflows, no need
   for one per app.

   **Cloudflare Pages project names, decided 2026-09-07**: `enodia-docs`,
   `enodia-landing`, `enodia-get` (matching each `apps/*` folder, prefixed
   for clarity since they're separate Pages projects in the same
   account). **Production branch: `master`** on all three, matching the
   parent `enodia` repo's own main-branch convention — `develop` pushes
   produce Pages preview deployments, not production ones.

   **All three Pages projects created, 2026-09-07** — via the Cloudflare
   API directly (`POST /accounts/{account_id}/pages/projects`, `{"name":
   ..., "production_branch": "master"}`), not the dashboard, using the
   scoped API token from item 5 above. Confirmed live via a follow-up
   `GET .../pages/projects` listing: all three exist with
   `production_branch: master` — `enodia-docs.pages.dev`,
   `enodia-landing.pages.dev`, `enodia-get.pages.dev` (each project's
   `*.pages.dev` subdomain, live before any custom domain is attached).
   Side effect of doing this via API rather than dashboard: whether
   `wrangler pages deploy --project-name=X` would have auto-created a
   missing project in CI was never actually resolved — moot now since
   all three already exist, but don't assume the answer either way if it
   comes up again for some fourth project later.
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
   cache: 10 minutes**, implemented via the Cache API
   (`caches.default.match()`/`.put()`) — a bare `Cache-Control` header on
   a Function's own response is confirmed **not** enough on its own
   (Cloudflare's own docs: Workers/Pages Functions run ahead of the edge
   cache, unlike a plain `fetch()` subrequest's response, which does
   cache automatically off its headers) — an explicit, deliberate value,
   not "no cache" and not the fetched file's own origin cache headers
   passed through as-is; don't change this without asking, it was a
   considered choice on staleness-vs-load tradeoff (10 minutes is fine
   for an install script that changes on
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
    it matters later) — needs `site:` set in `astro.config.mjs`; the
    `integrations: [sitemap()]` line and its `i18n` option are **not
    needed for `apps/docs` and were deliberately left out** — see below,
    resolved by reading source rather than guessing.

    **Resolved (was "Unresolved" in earlier revisions of this file), via
    `apps/docs/node_modules/@astrojs/starlight/dist/integrations/sitemap.js`
    and `dist/index.js` after scaffolding**: Starlight auto-injects its
    own wrapped `@astrojs/sitemap` instance — pre-configured with the
    exact `i18n: { defaultLocale, locales }` derived from Starlight's own
    `locales`/`defaultLocale` config — *whenever the user hasn't already
    added an `@astrojs/sitemap`-named integration themselves*
    (`if (!allIntegrations.find(({ name }) => name === "@astrojs/sitemap"))`
    in `dist/index.js`). `@astrojs/sitemap` is already a direct dependency
    of `@astrojs/starlight` (`^3.7.3`), so it doesn't even need installing
    separately for `apps/docs`. Verified end-to-end after scaffolding:
    `astro build` with only `site:` + Starlight's `locales`/`defaultLocale`
    set (no `sitemap()` in `integrations` at all) produced
    `dist/sitemap-0.xml` with correct `hreflang="en"`/`hreflang="ru"`
    alternate links on every URL, with zero manual `i18n` mapping. Only
    reach for adding `@astrojs/sitemap` explicitly to `integrations` if
    `apps/docs` ever needs sitemap options Starlight's auto-wiring doesn't
    expose (custom `changefreq`, `priority`, a `filter`, …) — doing so
    turns Starlight's auto-injection off, so the `i18n` option would then
    need setting by hand to keep the hreflang alternates.
    `apps/landing`/`apps/get` aren't Starlight sites, so if they ever get
    a sitemap it's the plain integration, added by hand, no such
    auto-wiring available.
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

## Next steps

### `apps/docs` — done so far (2026-09-07)

- Node.js v24.20.0 installed (satisfies Astro 7.x's live-confirmed
  `engines.node: >=22.12.0` — see "Status" above).
- Scaffolded via `npm create astro@latest apps/docs -- --template
  starlight --install --no-git --typescript strict --no-ai --yes`.
  Installed versions: Astro `7.3.1`, `@astrojs/starlight` `0.42.0`
  (matches what "Decided" item 1 expected as of the same date).
- `astro.config.mjs`: `site: 'https://docs.enodia.sh'`,
  `defaultLocale: 'en'`, `locales: { en: {...}, ru: {...} }` (no `root`
  locale — matches item 1's "plain subdirectories" decision), title
  `'enodia'`, social link to `github.com/EpicMorg/enodia`. **No**
  `@astrojs/sitemap` in `integrations` — deliberate, see item 11's
  resolved note above.
- Scaffold's example content moved from `src/content/docs/` straight
  into `src/content/docs/en/` (fixed one relative image path this broke,
  `../../assets/houston.webp` → `../../../assets/houston.webp`). No
  `ru/` content created yet — Starlight auto-generates a fallback
  `/ru/*` page for anything untranslated, confirmed live
  (`astro build` produced `/ru/index.html` etc. with zero `ru` source
  files present) — real `ru/` translations are still open, see below.
- `public/robots.txt` added, pointing at
  `https://docs.enodia.sh/sitemap-index.xml`.
- Verified live end-to-end: `astro build` succeeds, produces
  `dist/sitemap-index.xml` + `dist/sitemap-0.xml` with correct
  `hreflang="en"`/`hreflang="ru"` alternates, Pagefind index builds
  automatically (7 pages found, no config needed). `astro dev` serves
  `/en/` and `/ru/` simultaneously from one process — the original
  Docusaurus pain point (Context, above) confirmed actually fixed, not
  just theoretically fixed by the engine choice.
- Committed to `develop` (`feat(docs): scaffold apps/docs`); not yet
  pushed/PR'd as of this writing — check git log before assuming either
  way.

### `apps/docs` — real content written, 2026-09-07

Eight topic pages per language (`getting-started`, `concepts`,
`configuration`, `cli-reference`, `views`, `reporting`, `products`,
`security`) plus `index`, in both `en/` and `ru/` — 18 content files
total, replacing the Starlight scaffold's placeholder "Example
Guide"/"Reference" pages entirely (sidebar in `astro.config.mjs`
restructured to match, each item with a `translations: { ru: ... }`
label).

**Sourced from the real parent repo, not memory**: the parent `enodia`
repo was built locally from its `develop` branch (`go build
./cmd/enodia`, Go 1.26 toolchain auto-fetched — this machine only had
1.24 installed) specifically to get authoritative `--help` text for
every command and the real `enodia products` table, rather than
transcribing README prose alone. The config schema (`enodia.yaml`,
`credentials.yaml`, `settings.yaml`) was written by reading
`internal/config`'s actual Go structs and their `yaml:` tags directly.

**Two things found in the process, worth knowing for future work here**:

- **enodia's own `master` branch is currently an empty skeleton** — no
  `cmd/`, no `internal/`, just license/contributing boilerplate (17
  files, 2 commits: "Initial commit" and "History start"). All real code
  lives on `develop` and hasn't been merged yet. This is *why*
  `raw.githubusercontent.com/.../master/install.sh` 404s (see `apps/get`
  above) — it's not just "no release," `master` doesn't have the file at
  all yet, independent of tagging. Worth surfacing to the user before
  either repo goes further: this doc site's content and `apps/get`'s
  proxy both currently describe/reference a `master` that doesn't yet
  contain the thing they're pointing at.
- **The generic probe's field is `clean_regex`** (snake_case) — found
  as `cleanregex` (no underscore, untagged yaml.v3 default) on
  2026-09-07, flagged to the user, and **fixed by them the same session**
  in the parent repo: `probe.ParserSpec` now carries explicit `yaml:`
  tags matching `enodia.yaml`'s general snake_case convention (`ca_file`,
  `min_version`, `allow_insecure_transport`, ...). Re-verified empirically
  after the fix (same throwaway-`go test`-against-`internal/config`
  technique, removed afterward both times) — `clean_regex` is correct as
  of this commit; `cleanregex` was only ever correct before the fix, and
  a bare `cleanRegex` has never worked at any point. `configuration.md`
  (en/ru) updated to match. One loose end: the parent repo's new comment
  on `ParserSpec` claims `docs/DECISIONS.md` (D3) and `docs/CLAUDE.md`
  already document `clean_regex` — they don't, both still say `cleanRegex`
  (camelCase, confirmed by the same `grep` used for the original finding)
  — so there's now a second, smaller prose/code mismatch in the parent
  repo, introduced by the fix itself. Not this repo's problem to fix, but
  worth a heads-up if it comes up again.

**Installation content stays honest about current state** (no tagged
release → packages/install-scripts documented as "once published,"
build-from-source as what actually works today) — consistent with
`apps/get`'s Functions already handling the same "no release yet" case
live.

**Verified, not assumed**: every internal cross-reference link across
all 18 files — including every Cyrillic anchor — checked
programmatically against the real built HTML (URL-decoded fragment
compared against actual heading `id`s extracted from `dist/`), zero
broken links found. Sidebar translation (`ru:` labels actually rendering
in Russian) confirmed live via the dev server, not just assumed from the
config shape.

**Still open**: root `docs.enodia.sh/` (no locale prefix) still 404s —
no `root` locale, by design (item 1), and whether a `/` → `/en/`
redirect is wanted was never decided — ask before adding one. The
`Entry docs → 404 was not found` build warning (benign Starlight
scaffold quirk, `dist/404.html` still works) is unchanged, still
cosmetic. **Update, 2026-09-08**: the root redirect got decided and
built (see "Status" at the top of this file) — this specific open item
is closed, left here only as the historical record of when it wasn't.

**Termux/Android — corrected, 2026-09-08, a real verification gap on my
part**: an earlier pass here claimed the plain `linux/arm64` release
binary would run under Termux unmodified, reasoning from `readelf -d`
showing no dynamic section/no `NEEDED` entries (true, and still true).
That reasoning was incomplete — static linking says nothing about ELF
*type* (`ET_EXEC` vs `ET_DYN`/PIE), and `readelf -h`'s `Type:` field
was never checked. The user tested on a real device: Android's Bionic
linker refused the `linux/arm64` binary outright (`"has unexpected
e_type: 2"` — `ET_EXEC`; Android has required PIE since Lollipop, a
kernel/linker policy, nothing to do with libc). Upstream fix
(`docs/DECISIONS.md` D20 in the parent repo): a distinct
`android/arm64` goreleaser build (`GOOS=android`, still
`CGO_ENABLED=0`), producing `ET_DYN` with interpreter
`/system/bin/linker64`; `install.sh` picks it via `$TERMUX_VERSION`
(deliberately not the more generic `$PREFIX` already used for the
install-directory fallback — a wrong guess here downloads a binary that
flat-out cannot execute, a worse failure mode than picking the wrong
directory). Re-verified myself after the fix: downloaded the real
`enodia_android_arm64.tar.gz` asset, confirmed `Type: DYN`, interpreter
`/system/bin/linker64`, and zero `NEEDED` entries in the dynamic
section (still no shared-library dependency, just PIE's own relocation
machinery) — matches D20's claims exactly, not taken on faith.
`getting-started.md`'s Termux callout (en/ru) rewritten to describe
this correctly. **Lesson for next time**: when checking whether a
binary will execute on a given OS/kernel, `readelf -h`'s `Type:` field
(`EXEC` vs `DYN`) is a separate, necessary check from the dynamic
section/`NEEDED`-entries check already being done — don't treat "fully
static" as answering "will this exec here at all."

**Container image now also on Docker Hub and Quay, 2026-09-08** —
upstream commit `849df47`: same multi-arch image, three registries
(GHCR unchanged; `docker.io/epicmorg/enodia` and Quay via org-level
secrets the parent repo doesn't itself mint/rotate). `getting-started.md`
(en/ru) mentions all three. **Docker tag switched from `:1` to
`:latest`** per explicit user request (wanted at least `:1.0` — checked
live via `crane ls ghcr.io/epicmorg/enodia`: actual published tags are
`1`, `1.0.0-1` (full pinned version, `+`→`-` since `+` isn't legal in a
Docker tag), and `latest` — **no `1.0` tag exists**, goreleaser's
`dockers_v2.tags` template only produces those three shapes. Documented
the real available tags rather than inventing the one the user asked
for that doesn't exist; picked `latest` per their stated fallback.

**Rooted-device Termux bug documented, 2026-09-08** — upstream commit
`98bb2cc`: on a rooted device (Magisk/KernelSU), even the correct
`android_arm64` binary can fail to exec as the ordinary Termux user —
[termux-exec#40](https://github.com/termux/termux-exec/issues/40), an
open upstream bug in `termux-exec`'s own process-context detection
(doesn't recognize Magisk/KernelSU/`run-as`/ADB contexts), not anything
enodia's build or `install.sh` can fix. Workaround is `su` + a full
path. Added a caution callout to `getting-started.md` (en/ru). Also
corrected the Android platform-table version: upstream's README now
says **Android 7+** (Termux's own practical floor) rather than the
Android 5.0 Lollipop figure I'd written earlier, which was the right
number for *why* a separate build exists (the PIE requirement) but the
wrong one to lead with as "the minimum" — Termux itself requires newer.

**Formality slip caught and fixed, 2026-09-08** — the Docker Hub/Quay
sentence added in the same session as the `:latest` tag change (after
the big ты→вы conversion pass earlier, so it never got swept by that
pass) still used informal `бери`/`тянешь`/`хочешь`. User flagged it
directly, mid-sentence-annoyed. Rewrote impersonally, re-swept the rest
of the RU docs for the same pattern (informal verb endings,
ты/тебя/твой-family pronouns) — everything else already checked out
formal. **Process lesson**: any RU content added *after* a full
формальность pass needs the same grep sweep applied to it specifically
before considering the work done — a global pass doesn't self-maintain
against later edits.

**Per-product configuration pages added, 2026-09-08** — one page per
supported product (29 × 2 languages = 58 files), at
`(en|ru)/configuration/products/<product>.md`, nested in the sidebar
under Configuration as a collapsed "Product setup" group via Starlight's
`autogenerate`. Each page's content came directly from reading its
`internal/probe/*.go` implementation in the parent repo (endpoint, auth
requirements, recorded `extra` fields), not from `enodia products`'
one-line summary — real gotchas captured this way: TeamCity's bootstrap-
token-vs-personal-access-token Basic/Bearer split, Keycloak being the
only probe with `Required: true` auth, MySQL's MariaDB-masking detection
(`5.5.5-` prefix) causing a deliberate hard failure, Bitbucket's manifest
still self-reporting as `stash`. `products.md` (en/ru) now links each
row to its detail page; `configuration.md` (en/ru) points at the new
sidebar group from the `targets:` section.

**Starlight sidebar gotcha**: the installed Starlight version (`0.42.0`)
no longer supports a `label` + `translations` directly on an
`autogenerate` sidebar item — that pattern was removed in Starlight
v0.39.0. The fix is one more level of nesting: a manual group with
`label`/`translations`/`collapsed` whose own `items` array contains a
bare `{ autogenerate: { directory: ... } }` object. Caught by `astro
build` failing outright with a clear `AstroUserError` naming the exact
fix — not something to guess at from memory if it comes up again for a
different sidebar section.

**Second, real formal-register violation found and fixed the same
session**: `products.md` ru's "## Не нашёл свой продукт?" heading —
singular/informal past-tense verb agreement (`нашёл`, matching an
implied `ты`), not a pronoun, so the earlier pronoun-only grep sweeps
(`\b(ты|тебя|тебе|...)\b`) never caught it. Fixed to "Не нашли свой
продукт?" (plural agreement, matching Вы). **Process lesson, reinforcing
the one above**: a formality sweep must also check verb *conjugation*
(singular vs. plural agreement on past tense and questions addressed to
the reader), not just pronouns and imperative endings — a heading
phrased as a question addressed to "you" is exactly where this slips in
silently, since there's no pronoun token to grep for at all.

**Bamboo's "no lifecycle resolver" claim was wrong, caught by the user,
2026-09-08**: `bamboo.md` (en/ru) originally said "endoflife.date has no
Bamboo calendar," copied from the phrasing used on the genuinely-404
products (owncast, portainer, teamcity, testrail, zou, etc.) without
independently checking this one. [endoflife.date/bamboo](https://endoflife.date/bamboo)
is real and live, confirmed via `endoflife.date/api/bamboo.json`
returning real cycle data — the gap is in enodia's own
`internal/probe/registry.go`, which has `resolver: ""` for bamboo with
none of the sibling probes' explicit "confirmed 404" comment. Re-verified
every other "no calendar" claim across all 29 product pages live at the
same time (`bitwarden`, `vaultwarden`, `jellyfin`, `owncast`,
`perforce-swarm`/`helix-swarm`/`swarm`/`perforce`, `portainer`,
`teamcity`, `testrail`, `zou`/`kitsu`/`cg-wire`) — all still genuinely
404, only bamboo was wrong. Both `bamboo.md` files corrected to describe
this as an apparent gap in enodia itself, not "no calendar exists worth
resolving." **Lesson**: an absent resolver in `registry.go` is not
self-evidently "no calendar exists" — only trust that reading when the
source itself carries the explicit confirmed-404 comment; an empty
`resolver: ""` with no such comment needs its own live check before
writing anything about *why* it's empty.

**enodia jumped from 29 to 87 supported products, 2026-09-08/09** —
the parent repo added 58 new probes in one push: 25 SSH-based OS
identifiers (23 sharing an `osReleaseFamilyProbe` framework reading
`/etc/os-release`'s `ID` field over SSH, 2 sharing a `unameFamilyProbe`
running `uname -sr` for OpenBSD/NetBSD, which have no os-release
equivalent, plus Astra Linux/legacy CentOS/macOS/OPNsense/Oracle
Solaris each reading their own distinct identity file/command), and 27
standalone HTTP/TCP probes (Apache, ClickHouse, ESXi, Forgejo, Graylog,
HAProxy, Harbor, Jaeger, Kibana, Logstash, MongoDB, Nexus, nginx,
oauth2-proxy, OpenSearch, pgAdmin, phpMyAdmin, postgres_exporter,
ProFTPD, Proxmox VE, RouterOS, Synology DSM, Traefik, TrueNAS,
WordPress, YouTrack, Zabbix). A new `kind: ssh-key` credential
(`private_key_file`/`passphrase`) and a `github:<owner/repo>` resolver
type (latest GitHub Release only, no eol/support/lts — GitHub has no
lifecycle opinion) were added alongside. Also: `zou`/`kitsu` split into
two products sharing one probe (different lifecycle resolvers — Zou's
own GitHub repo has no usable Releases), `vcenter`'s probe was rewritten
entirely (SOAP `RetrieveServiceContent` instead of
`vimServiceVersions.xml` — real marketing version instead of the vim25
API schema version, plus a real vCenter-vs-ESXi identity check), and six
existing products got a `github:` resolver wired up for the first time
(`bitwarden`, `vaultwarden`, `jellyfin`, `owncast`, `portainer`, plus the
new `kitsu`).

Wrote one page per new product (58 × 2 languages = 116 files) plus a
shared `ssh-os-probes.md` explainer for the 30 SSH-based products (same
cross-linking pattern as the Atlassian family, just for a much bigger
group — each OS's own page states only its specific `ID`/`VERSION_ID`
facts and resolver, not the shared mechanism). `products.md` (en/ru)
was rewritten from a single 29-row table into two tables ("Applications
and infrastructure services", 57 rows; "Operating systems", 30 rows)
plus a new `zou`/`kitsu` explainer section. `configuration.md` (en/ru)
gained the `ssh-key` credential kind and an "SSH host key verification"
section (reuses the existing `tls.pin_sha256`/`insecure` vocabulary —
`pin_sha256` there is the host key's own wire encoding, not a TLS
certificate).

Every fact came from reading `internal/probe/*.go` directly (66 files)
plus `docs/DECISIONS.md` D23 (which already documents the exact
`ID`/`VERSION_ID` verified per OS, and why three originally-planned
products — `fortios`, `cisco-ios-xe`, `tails` — didn't make it in), not
from `enodia products`' one-line summaries. Caught two now-stale "28
products" mentions in `generic.md` (en/ru) left over from the count
change. Verified: `astro build` succeeds (195 pages, up from 77), a
programmatic link/anchor check against the built HTML found zero broken
internal links, and the RU content got the same formal-register sweep
(pronouns + verb-conjugation questions) as every prior round — clean.

**HashiCorp Vault Agent integration documented, 2026-09-09** — user
request: enodia already reads credentials from env vars
(`${VAR}`/`${VAR:-default}`) and an optional separate `credentials_file`,
so Vault Agent's own `template`/`exec` rendering composes directly with
both, no enodia-side feature needed. Added a "HashiCorp Vault Agent
integration" section to `configuration.md` (en/ru), placed right after
"Environment variable interpolation". Key fact verified in the source
before writing anything (`cmd/enodia/pipeline.go`'s `collectObservations`
→ `internal/config/config.go`'s `Config.Build` → `LoadCredentials`):
config and credentials are reloaded from disk on *every* `enodia check`
invocation and *every* `enodia serve --interval` tick — nothing cached
for the process's lifetime — so a Vault Agent template continuously
re-rendering either file is picked up automatically, no signal or
restart required. Documented two patterns: (1) Vault Agent `exec` mode
injecting env vars into enodia's own process, read via the existing
interpolation; (2) Vault Agent templating a full `credentials_file`
directly in enodia's schema, which needs no `exec`/restart wiring at all
given the reload-every-cycle behavior above. Kept the exact Vault Agent
HCL syntax explicitly hedged ("illustrative — see Vault Agent's own
docs") rather than asserting precise flag names for a tool whose docs
weren't fetched live this session — the enodia-side claims are the ones
actually verified against source.

**Synced with enodia 1.1.0+0, 2026-09-10, and added a Changelog page**
— three real changes plus a new upstream `CHANGELOG.md` this repo now
mirrors:

- **SonarQube split (D25)**: SonarSource split "SonarQube" into Server
  (calendar-versioned `2025.x`/`2026.x`) vs. Community Build (`24.x`/
  `25.x`/`26.x`) at the end of 2024, tracked as two different
  endoflife.date pages. Not a D9-style second `product:` — both
  variants hit the identical endpoint as the identical product.
  `probe.Observation` gained a per-observation `Resolver` override field
  instead; `sonarqubeProbe` now sets it from the version string's
  leading year (four digits → server, two digits from `24` → community,
  smaller → pre-split, treated as community). `sonarqube.md` (en/ru)
  rewritten — it previously documented a single hardcoded
  `sonarqube-community` resolver, which is simply wrong for a Server
  instance.
- **pgAdmin resolver (D24)**: a new `github-tags` resolver type (for a
  GitHub repo with no Releases at all, only non-dotted tags —
  `pgadmin-org/pgadmin4` ships `REL-9_17`) gave pgAdmin its first real
  `DefaultResolver`. Picks the *highest-parsing* tag from the fetched
  page, not the first one — the tags endpoint documents no ordering
  guarantee, unlike Releases. `pgadmin.md` (en/ru) updated from "no
  resolver" to the real one; `products.md` (en/ru) intro now explains
  all three resolver types (`endoflife:`, `github:`, `github-tags:`).
- **`GITHUB_TOKEN` (D24)**: both GitHub-backed resolvers were
  unauthenticated (60/hour, per source IP) until this release —
  `resolver.New` now takes a token, the CLI passes it from the
  environment, same convention `gh`/goreleaser/Actions use. Documented
  in `products.md`'s intro (en/ru), cross-linked from `pgadmin.md`.
- **Docker publishing moved out of enodia's own repo entirely**, into
  `EpicMorg/docker` (own schedule, not tied to enodia's release
  pipeline) — this was *not* mentioned in the user's own summary of the
  release and had to be caught independently by reading the actual
  commit history (`8acc717` and its two precursor/revert commits,
  `440d911`/`ea950ca`) rather than trusting the request's own bullet
  list as exhaustive. Verified live via `crane`/`docker inspect`-style
  checks against all three registries (GHCR/Docker Hub/Quay) before
  writing anything: the image is now `linux/amd64` only (arm64
  dropped), runs as root (not scratch/minimal), and new-pipeline tags
  drop the old `-BUILD` suffix entirely (`1.1.0`, not `1.1.0-0`) — a
  real, observed difference from the pre-migration `1.0.0-1`-shaped
  tags, not assumed from the commit message alone. `getting-started.md`
  (en/ru) Docker section rewritten to match. **Lesson**: a user's release
  summary is a starting point for what to check, not the full list of
  what changed — `git log`/`git show` against the actual diff still
  found something they didn't mention.
- **New `changelog.md`** (en/ru), added to the sidebar right after
  Security — mirrors enodia's own `CHANGELOG.md` (added upstream this
  same release) but with links into the rest of this site wherever a
  change affects actual configuration. This is now a page that needs
  its own update pass alongside every future release sync, same as
  `products.md`.

**Synced with enodia 1.1.1+0, 2026-09-10** — the user's own summary of
this release said only "fixed 2 probes, nothing else changed for
users," which held up under an independent check of the actual commit
range this time (unlike 1.1.0's Docker move, which wasn't mentioned and
had to be caught separately): `debian` and `ubuntu` both moved off the
shared `osReleaseFamilyProbe` mechanism into their own dedicated probes
(D26, D27) — `VERSION_ID` never carries a point release on Debian, and
freezes at first release on Ubuntu, so both were under-reporting the
real installed version (`13` instead of `13.6`, `22.04` instead of
`22.04.5`). No `product:`/credentials/resolver change for either —
`debian.md`/`ubuntu.md` (en/ru) rewritten to explain why each needed
its own probe, and `ssh-os-probes.md` (en/ru)'s shared-mechanism counts
corrected (23 → 21 generic + 2 dedicated). `changelog.md` (en/ru) got
its second entry. Confirmed `1.1.1+0` was a real, fully-built release
(watched the GitHub Actions run to completion, not just checked that
the tag existed) before writing anything or merging to `master`.

**User also flagged, aside: "на главной у нас по прежнему версия
1.0.0"** — checked live, `enodia.sh`/`enodia.sh/ru/`/`get.enodia.sh`
carry no version string anywhere at all (confirmed via `curl` + grep for
any `1.x.x` pattern, all three came back empty) — nothing to fix here.
This must refer to enodia's own `README.md`, which still has `> Status:
1.0.` at the top despite being on 1.1.1 — confirmed via `grep` in
`/opt/git/enodia`. Not fixed: this repo's own established boundary all
session has been "read the parent repo, never write to it directly" —
the user makes every commit there themselves. Flagged back to the user
in this round's response instead of touched directly; don't cross that
line without them explicitly asking for it.

**Synced with enodia 1.2.0+0, 2026-09-10** — two new products, `p4d`
(Perforce Helix Core Server) and `p4p` (Perforce Proxy), added via
`internal/probe/p4d.go`/`p4p.go`/`p4info.go` (D28). Genuinely novel
mechanism, worth remembering if it comes up again: **the first probes in
enodia that shell out to an external CLI** (the operator's own `p4`
binary, path overridable per-target via `options.binary` — the first
real use of `Target.Options`, previously an unused extensibility field)
rather than speaking a wire protocol or HTTP directly. Root cause was a
real, deep investigation: Perforce's RPC protocol was fully reverse-
engineered and a hand-built client's handshake was confirmed
byte-correct against a packet capture, but real direct `p4d` servers
silently drop that exact handshake for reasons invisible from the
client side (TLS and rate-limiting both ruled out live) — shelling out
to the real `p4` binary sidesteps the problem entirely rather than
chasing it further. Wrote `p4d.md`/`p4p.md` (en/ru), bumped
`products.md`'s count (87 → 89) with a note on the CLI dependency, and
cross-linked `options.binary` from `configuration.md`'s `targets`
section. Also caught and documented a real internal bug fix in the same
release: `probe.Observation.Resolver` (added in 1.1.0 for sonarqube) was
a non-pointer struct, so `omitempty` never actually omitted it — every
JSON export since 1.1.0 carried a spurious `"resolver":{}` on every
single observation, not just sonarqube's. Worth remembering if a user
ever asks why their older JSON exports look different from newer ones.

README status line note from last round resolved itself: this release's
own commit `98693a7` bumped `> Status:` from 1.0 to 1.2 and linked
`CHANGELOG.md` directly — the user's repeated "kстати, всё ещё 1.0"
observation across two rounds evidently got noticed and acted on
upstream; nothing left to flag here now unless it drifts stale again.

### `apps/landing` — done, 2026-09-07

- **Hand-scaffolded, not `create-astro`** — a plain Astro app is small
  enough that writing `package.json`/`astro.config.mjs`/`tsconfig.json`
  by hand was faster and more predictable than guessing `create-astro`'s
  non-Starlight template flags. Installed `astro@^7.3.1` (same as
  `docs`), no Starlight dependency at all.
- **i18n via Astro's own core `i18n` config** (not Starlight's, not
  hand-rolled folder routing) — `defaultLocale: 'en'`, `locales: ['en',
  'ru']`, `routing.prefixDefaultLocale: false`. Deliberately different
  from `docs`'s symmetric-prefix approach (item 1): the landing root is
  the one URL people actually type/share (`enodia.sh`, not
  `enodia.sh/en/`), so English lives unprefixed at `/` and Russian at
  `/ru/`.
- **Content pulled from the parent repo's actual README**, not invented
  — tagline "Know what you are running, and how long it has left." and
  the pitch paragraph are close paraphrases of `enodia/README.md`'s own
  wording, not made up. **No install one-liner** — confirmed live
  (read `install.sh` itself) that it resolves the "latest" binary via
  GitHub's `/releases/latest/download/` alias, and no tagged release
  exists yet, so a `curl | sh` line would just fail for anyone who ran
  it. Links to GitHub instead; the source has a comment marking where
  the one-liner goes once a release ships — don't add it before then.
- `public/robots.txt`. **Favicon resolved, 2026-09-07** — the real
  enodia icon (`favicon.ico`, multi-res 16-256px, user-provided,
  byte-identical to `enodia/build/windows/enodia.ico`) plus
  `apple-touch-icon.png` (180×180, downscaled from a genuine 512×512
  source PNG the user provided separately — not an upscale of the ico's
  256px frame) and `og-image.png` (the 512 source itself) with matching
  Open Graph/Twitter Card meta tags, replacing the placeholder
  Starlight-rocket SVG. Source files kept in `assets/` at the repo root
  (`enodia-256.png`, `enodia-512.png`, `apple-touch-icon.png`) so they
  don't need re-deriving if a fourth app or a redesign ever needs them.
- Verified live via local `astro dev`: both `/` (en) and `/ru/` serve
  200.
- `deploy-landing.yml` written (same shape as `deploy-docs.yml`,
  `--project-name=enodia-landing`) and **has run successfully** — pushed
  on `develop`, so it's a preview deployment, confirmed working via curl
  against `https://develop.enodia-landing.pages.dev/` (200, both
  locales). Production (`enodia.sh` itself) stays 522 until this reaches
  `master` — see "Status" above.

### `apps/get` — done, 2026-09-07

- Hand-scaffolded like `landing`, same i18n approach
  (`prefixDefaultLocale: false`) — root stays unprefixed English, `/ru/`
  for Russian, so it matches `/unix` and `/windows` also living
  unprefixed.
- **`functions/unix.ts` and `functions/windows.ts`** (Cloudflare Pages
  Functions, file-based routing confirmed live against Cloudflare's
  current docs: `functions/<name>.ts` → `/<name>`, exactly as assumed).
  Each fetches `raw.githubusercontent.com/EpicMorg/enodia/master/
  install.sh` or `install.ps1` and returns it as `text/plain`.
  **Caching is explicit via the Cache API** (`caches.default.match()` /
  `.put()` on `Cache-Control: public, max-age=600`, 10 minutes) — **not**
  just a `Cache-Control` header on the Function's own response, which
  Cloudflare confirmed (own docs) does *not* get edge-cached
  automatically the way a plain `fetch()` subrequest's response does;
  Workers/Pages Functions run ahead of the edge cache. Verified this
  actually works locally via `wrangler pages dev` (a scratch test
  function against a real GitHub file: first request MISS + real fetch,
  second request HIT from cache, byte-identical) before committing —
  removed the scratch file afterward, never shipped.
- **Found live, not assumed**: `raw.githubusercontent.com/EpicMorg/
  enodia/master/install.sh` currently 404s. `install.sh` only exists on
  enodia's `develop` branch so far (confirmed via the parent repo's own
  `git log -- install.sh`) — it hasn't reached `master` yet. Kept
  `master` as the proxy target anyway (per this file's own Decided item
  9, matching the parent repo's D17-documented long-term URL) rather
  than pointing at `develop` as a workaround — `develop` is a moving
  target, not meant for public consumption. Both functions detect this
  specific case (`upstream.status === 404`) and return a clear,
  uncached `"enodia has no release yet — install.sh is not on master."`
  404 instead of a generic proxied error — verified live on the real
  preview deployment, not just locally. This self-resolves the moment
  `install.sh`/`install.ps1` land on `master`; no redeploy needed here
  when that happens.
- `public/robots.txt`, same real favicon/apple-touch-icon/og-image setup
  as `landing` — see its entry above, resolved 2026-09-07.
- Added `.wrangler/` to **all three** apps' `.gitignore` — local
  `wrangler pages dev` testing (used to verify the Cache API behavior
  above) left Miniflare state files that `git add` picked up; caught and
  unstaged before committing, but worth having the ignore rule for next
  time regardless of which app someone runs it in.
- `deploy-get.yml` written and **has run successfully** as a preview
  deployment — confirmed live: `https://develop.enodia-get.pages.dev/`
  serves the landing page (200), `/unix` and `/windows` both correctly
  return the "no release yet" 404 (not a 500, not a generic proxy
  error). Production (`get.enodia.sh`) stays 522 until `master`, same as
  the other two apps.

### Shared CI/DNS steps (all three apps)

1. ~~Create the three Cloudflare Pages projects~~ **done, 2026-09-07** —
   see Decided item 5's "All three Pages projects created" note. Live at
   their `*.pages.dev` subdomains, and custom domains (item 3 below) are
   attached and active too.
2. Three GitHub Actions workflows (`deploy-landing.yml`, `deploy-get.yml`,
   `deploy-docs.yml`), each: path-filtered to its own `apps/*/**`,
   `astro build` then `cloudflare/wrangler-action@v4` running
   `command: pages deploy <dist> --project-name=<name>` (Decided item 5
   — `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` repo secrets, done
   2026-09-07, confirmed via `gh secret list`) rather than GitHub Pages'
   native deploy action or the deprecated `cloudflare/pages-action`.

   **`deploy-docs.yml` written, 2026-09-07**
   (`.github/workflows/deploy-docs.yml`): triggers on push to
   `master`/`develop` scoped to `apps/docs/**` via a `paths` filter, plus
   `workflow_dispatch`; `actions/checkout@v7` + `actions/setup-node@v7`
   (Node 24, `npm ci` with lockfile caching) + `npm run build`, then
   `cloudflare/wrangler-action@v4` with `workingDirectory: apps/docs` and
   `command: pages deploy dist --project-name=enodia-docs`. Action major
   versions (`@v7`/`@v7`/`@v4`) checked live against each repo's actual
   latest tags before writing this, not assumed off memory — `@v5` for
   checkout/setup-node would have been stale. **Not yet run** — no push
   to `master`/`develop` touching `apps/docs/**` has happened since this
   file was added, so the deploy hasn't actually been exercised end to
   end yet; don't assume it works until a real run is observed.
   `deploy-landing.yml`/`deploy-get.yml` still don't exist (their apps
   don't exist yet either).
3. ~~DNS/custom domains for `enodia.sh`, `get.enodia.sh`,
   `docs.enodia.sh`~~ **done, 2026-09-07, all three `active`**. Mixed
   path: `docs.enodia.sh` was attached via the Pages domains API
   (`POST /accounts/{account_id}/pages/projects/enodia-docs/domains`,
   same scoped `CLOUDFLARE_API_TOKEN` as item 1's project creation) —
   hit exactly the conflict Cloudflare's own docs warn about, but in
   reverse: `docs` already had a CNAME → `@` from the earlier Bulk
   Redirect placeholder setup (Cloudflare dashboard notes, above), so
   attaching left it stuck on `verification_data.error_message: "CNAME
   record not set"` until the user manually repointed that CNAME to
   `enodia-docs.pages.dev` in the dashboard (my token has no
   `Zone:DNS:Edit`, deliberately — Pages custom-domain attachment and
   raw DNS record edits are different permission scopes, and only the
   former was granted). The user then attached `enodia.sh` →
   `enodia-landing` and `get.enodia.sh` → `enodia-get` directly in the
   dashboard themselves (both fresh CNAMEs, no pre-existing-record
   conflict there). All three sat briefly at `validation_data.status:
   pending` (certificate issuance, `google` CA, `http` method) before
   flipping to `active` on a recheck a couple minutes later — this
   happened for `docs` too even with zero real deployments behind any of
   the three projects, so **cert-issuance delay is unrelated to whether
   a project has been deployed yet**, don't read "pending" as "something
   is wrong" on its own.

   **All three custom domains 522 right now — expected, not a config
   problem.** Confirmed by curling the raw `*.pages.dev` URLs directly
   (bypassing the custom domain and this zone's DNS entirely): all three
   `*.pages.dev` subdomains 522 too. A Cloudflare Pages project with zero
   successful deployments has nothing to serve, full stop — the custom
   domain being `active` just means routing/cert are correctly wired to
   an empty project. Don't debug DNS/domain config on the strength of a
   522 alone; check whether the project has ever deployed first. Resolves
   itself the moment each app has a real first deployment (`docs`'s via
   `deploy-docs.yml`, once it actually runs — still "not yet run" as of
   this note).

## Working style

Follow the same rigor as the parent enodia repo's own sessions: verify
claims live (a Node/Astro version requirement, a Starlight config option,
whether a Cloudflare Pages custom-domain setting actually took effect)
rather than asserting from memory, and keep commits scoped and
descriptive.
