# enodia-docs

Documentation site for [EpicMorg/enodia](https://github.com/EpicMorg/enodia)
(service inventory and lifecycle/EOL monitoring), built with
[Docusaurus](https://docusaurus.io/).

## Status: not yet scaffolded

This repository currently contains only this file and a placeholder
README. Nothing has been generated yet — pick up from "Next steps" below.

## Context

- Parent project lives at `/opt/git/enodia` on this machine (or
  `github.com/EpicMorg/enodia`). Read its `docs/DECISIONS.md` and
  `docs/ROADMAP.md` before writing any content that describes its
  architecture or behavior — those are the source of truth, and enodia's
  own `CLAUDE.md` documents its conventions (Go, stdlib-first, D-numbered
  decisions, etc.) which this docs site should describe accurately, not
  restate from memory.
- Goal: a public docs site, deployed via GitHub Pages from this repo, most
  likely at a `docs.enodia.<tld>` custom subdomain.
- As of 2026-09-07, this machine has no Node.js/npm/npx installed at all
  (Debian trixie; `apt-get install nodejs npm` is the likely path, or
  nvm — verify whatever Docusaurus's current major version requires as a
  minimum Node before scaffolding, don't assume).

## Open decisions — ask the user before proceeding

These were deliberately left unresolved rather than guessed:

1. **Domain**: `docs.enodia.sh` vs `docs.enodia.run` vs undecided (in
   which case default to GitHub Pages' own
   `epicmorg.github.io/enodia-docs` URL and revisit later). This is baked
   into `docusaurus.config`'s `url`/`baseUrl` and a `static/CNAME` file,
   so it needs settling before scaffolding, not after.
2. **Languages**: which locales for `i18n.locales`. English is the
   likely default/primary (enodia's own README and docs/ are all
   English), but the user writes to Claude in Russian, so a second
   locale is plausible — not decided, and don't assume it's only Russian
   either; ask which ones.
3. **License for the docs content itself**, separate from enodia's own
   AGPL-3.0-or-later (that license fits code; prose/docs more
   conventionally use something like CC-BY-4.0, but this wasn't decided
   and enodia's own licensing rationale — DECISIONS.md D16 — doesn't
   directly address a docs-only repo).

## Next steps once those are answered

1. Install Node (see above), then scaffold: `npx create-docusaurus@latest
   . classic` into this directory (ask whether TypeScript is wanted).
2. Configure `docusaurus.config`: title, `url`/`baseUrl` per the domain
   decision, `i18n.locales` per the language decision.
3. Add a GitHub Actions workflow to build and deploy to GitHub Pages
   (either the `gh-pages` branch approach or Pages' native Actions-based
   deploy — pick one, don't do both).
4. If a custom domain was chosen, add `static/CNAME` containing exactly
   that hostname, and tell the user what DNS record (CNAME to
   `epicmorg.github.io`) they need to create — that part is outside this
   repo and outside what an agent can do for them.
5. Populate initial content from enodia's own `README.md` and `docs/*.md`
   as a starting point — translated/reorganized for a docs-site structure
   (sidebar navigation, separate pages per topic) rather than copied
   verbatim, and kept in sync with the parent repo's actual current
   state, not a stale snapshot.

## Working style

Follow the same rigor as the parent enodia repo's own sessions: verify
claims live (a Node version requirement, a Docusaurus config option,
whether a GitHub Pages custom-domain setting actually took effect) rather
than asserting from memory, and keep commits scoped and descriptive.
