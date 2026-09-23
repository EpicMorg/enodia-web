# enodia-web

Web presence for [enodia](https://github.com/EpicMorg/enodia) — service
inventory and lifecycle/EOL monitoring, with CVE correlation. Three
independent static sites, one repository:

| App | Site | What it is |
|---|---|---|
| [`apps/landing`](apps/landing) | [enodia.sh](https://enodia.sh) | One-page landing: pitch and install one-liners |
| [`apps/get`](apps/get) | [get.enodia.sh](https://get.enodia.sh) | Install page, plus `/unix` and `/windows`, which proxy enodia's `install.sh` / `install.ps1` from GitHub |
| [`apps/docs`](apps/docs) | [docs.enodia.sh](https://docs.enodia.sh) | Documentation, built with [Starlight](https://starlight.astro.build/) |

All three are [Astro](https://astro.build/) projects with their own
`package.json`, built and deployed separately. `landing` and `get` are
plain Astro; `docs` is Astro + Starlight.

## Languages

English, Русский, Español, Português (Brasil), Română, Polski, 简体中文,
Українська — on all three sites. English is the source; the other
languages are translations of it.

- `landing` / `get`: English at the unprefixed root (`/`), every other
  language under its own prefix (`/ru/`, `/es/`, `/pt-br/`, `/ro/`,
  `/pl/`, `/zh-cn/`, `/uk/`). All copy lives in each app's
  `src/i18n/strings.ts`; the locale table is `src/i18n/locales.ts`.
- `docs`: every language has its own prefix, English included (`/en/`,
  `/ru/`, …); `/` redirects to `/en/`. Content is in
  `apps/docs/src/content/docs/<locale>/`, one Markdown tree per language
  with identical file names and structure.

When an English docs page changes, the same change goes into every other
language. `tools/` has the checks for that:

- `tools/i18n-structcheck.py` — every translation has the same files,
  headings, code blocks and callouts as `en/`;
- `tools/i18n-fixanchors.py` — after a build, rewrites `#anchor` links in
  translations to the translated headings (run it, then build again);
- `tools/i18n-cjkjoin.py` — removes line breaks between Chinese
  characters, which would otherwise render as stray spaces.

## Local development

Node.js 22.12 or newer.

```bash
cd apps/docs        # or apps/landing, apps/get
npm ci
npm run dev         # http://localhost:4321
npm run build       # static output in dist/
```

`get`'s `/unix` and `/windows` routes are Cloudflare Pages Functions
(`apps/get/functions/`), not Astro pages — `npm run dev` doesn't serve
them. To test them locally, build and run
`npx wrangler pages dev dist` from `apps/get`.

## Deployment

Each app deploys to its own Cloudflare Pages project through GitHub
Actions (`.github/workflows/deploy-{landing,get,docs}.yml`), path-filtered
so a change to one app only redeploys that app:

- a push to `develop` produces a preview at
  `develop.enodia-{landing,get,docs}.pages.dev`;
- a push to `master` deploys to production.

Changes go to `develop` first and reach `master` through a pull request.

## License

Documentation content (`apps/docs`) is licensed under
[CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) — full text in
[`apps/docs/LICENSE`](apps/docs/LICENSE). enodia itself is
[AGPL-3.0-or-later](https://github.com/EpicMorg/enodia/blob/master/LICENSE).
