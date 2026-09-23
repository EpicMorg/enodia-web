---
title: Reporting
description: export --format json/prometheus/html, and what settings.yaml changes about the HTML report.
---

`enodia export` writes a report in one of three formats. All three
accept `--from` (read an existing inventory instead of collecting) and
`-o`/`--output` (a file path, or `-` for stdout, the default).

```bash
enodia export --format json
enodia export --format prometheus
enodia export --format html -o report.html
```

`--format`'s built-in default is `json`, but `settings.yaml`'s
`export.default_format` overrides that whenever `--format` itself isn't
passed — an explicit `--format` always wins, the same precedence
`render.default_view`/`html.view` already use elsewhere. See
[Configuration](/en/configuration/#settingsyaml).

## `--format json`

Every observation and every assessment, in full — `--view` is ignored.
This is the format to consume if you want to apply your own severity
policy on top of enodia's facts (see
[Concepts](/en/concepts/#facts-and-judgement-are-separate)).

With a [`cve:` block](/en/cve/) configured, each assessment also carries
a `cves` array — one entry per finding, per source (a CVE present in
both БДУ and NVD appears twice; NVD once per matching CPE):

```json
{
  "Source": "bdu",
  "AdvisoryID": "BDU:2026-11879",
  "CVEIDs": ["CVE-2026-19478"],
  "Title": "Уязвимость программной платформы … GitLab EE/ CE …",
  "Severity": "Высокий уровень опасности (базовая оценка CVSS 2.0 составляет 9,7) …",
  "MatchedName": "Gitlab",
  "RangeText": "от 19.2.0 до 19.2.4",
  "FixStatus": "Уязвимость устранена",
  "CVSS": { "Version": "3.1", "Score": 9.4, "Severity": "CRITICAL" }
}
```

`Severity` and `RangeText` are the source's own text, verbatim; `CVSS`
is one rating parsed out of it, picked CVSS 3.1/3.0 first, then 4.0,
then 2.0 — 3.x is the version nearly every CVE carries in both sources,
so scores in one list stay on the same scale. The `CVES` column in the
table views counts distinct CVEs across these entries, not the entries
themselves.

## `--format prometheus`

A Prometheus textfile, meant for
[`node_exporter`'s textfile collector](https://github.com/prometheus/node_exporter)
— write it somewhere `node_exporter` is configured to scan, on a
schedule, same as any other textfile metric. CVE findings aren't
exported as metrics.

## `--format html`

A single, self-contained file. There's no built-in web server —
`enodia` doesn't serve this itself (see
[Concepts](/en/concepts/#no-built-in-web-server-that-polls-on-request));
point nginx at it, and regenerate it from cron or a systemd timer. `enodia
serve` (see [CLI reference](/en/cli-reference/#enodia-serve)) is the
alternative if you do want it served automatically, on its own schedule.

`--view` restricts the report to one view instead of all four stacked
sections. `settings.yaml`'s `html.view` does the same when the flag
isn't passed.

### Offline by default

`settings.yaml`'s `html.assets` controls what the generated file needs:

- **`inline`** (default) — zero external resources. Verified: no
  `<script` anywhere in the output and nothing loaded over
  `http(s)://` — the only such URLs are plain links (the footer, the CVE
  list's NVD/cve.org/БДУ pages). Renders identically inside a fully
  closed network.
- **`cdn`** — loads Bootstrap and a [Bootswatch](https://bootswatch.com/)
  theme from a CDN, and adds a visible in-page warning that the report
  needs internet access to render styled. `html.theme` picks the theme
  (`none`, `default`, or any of Bootswatch's 26 real themes); `html.cdn`
  picks the CDN — `auto` (default) races jsdelivr and cdnjs via a `HEAD`
  request each and upgrades to whichever answers first, so one CDN being
  blocked on a given network doesn't take the report's styling down with
  it. The very first paint always uses jsdelivr; racing only ever
  *upgrades* the stylesheet after that. The report also gets a theme
  picker, remembered per viewer in the browser's `localStorage`, and the
  warning's close button is remembered the same way — dismissed once, it
  stays dismissed in that browser across regenerated reports.

See [Configuration](/en/configuration/#settingsyaml) for the full
`settings.yaml` example.

### The CVE list

With a [`cve:` block](/en/cve/) configured, the `compact` and `drift`
sections' `CVES` cell becomes a link opening that target's CVE list: one
line per CVE, most severe first, with links to NVD, cve.org and, for
БДУ findings, the bdu.fstec.ru page, and the rating as colored badges
(`CRITICAL · CVSS 3.1 9.8`). The description is БДУ's Russian text when
БДУ has the CVE, NVD's English one otherwise. It's pure CSS (a `:target`
modal), so it works the same in `inline` mode with no script at all.

### Row colors in CDN mode

With `html.assets: cdn`, each row gets a Bootstrap contextual class —
red for a failed instance, green for a reachable one — in whatever
theme is configured, not a hardcoded color enodia maintains per theme:

```html
<table class="table table-striped table-hover table-sm align-middle">
<thead><tr><th>PRODUCT</th><th>VERSION</th><th>STATUS</th><th>COUNT</th><th>INSTANCES</th></tr></thead>
<tbody>
<tr class="table-danger"><td>gitlab</td><td>(unknown)</td><td>auth</td><td>1</td><td>gitlab-2</td></tr>
<tr class="table-success"><td>gitlab</td><td>18.2.1</td><td>ok</td><td>1</td><td>gitlab-1</td></tr>
<tr class="table-danger"><td>jira</td><td>(unknown)</td><td>unreachable</td><td>1</td><td>jira-staging</td></tr>
<tr class="table-success"><td>jira</td><td>10.3.1</td><td>ok</td><td>1</td><td>jira-3</td></tr>
<tr class="table-success"><td>jira</td><td>10.3.2</td><td>ok</td><td>2</td><td>jira-1, jira-2</td></tr>
</tbody>
</table>
```

### Footer and favicon

Every generated report's footer links back to the project on GitHub,
plus `enodia.sh` and `docs.enodia.sh` — plain `<a href>`s, not a
resource fetch, so this doesn't affect the `inline` mode's offline
guarantee (that's specifically about *loaded* resources, not inert
hyperlink text). Both modes also get a tab favicon: `inline` embeds a
small base64 copy of `enodia.sh`'s own `apple-touch-icon.png` directly
in the file (not the full multi-resolution `favicon.ico`, which would
add roughly half a megabyte to every report for a tab icon); `cdn` mode
links the live icons on `enodia.sh` instead, since that mode already
needs internet access to render at all.

### Third-party assets

`html.assets: cdn` loads Bootstrap and, unless `html.theme: none`, a
Bootswatch theme — both MIT licensed — from jsdelivr or cdnjs at the
moment someone opens the report in a browser. Neither is bundled into
enodia itself or into any release artifact; every CDN-mode report
credits both by name with a link to their license in its own footer.

## History across many inventories

`enodia collect -o "$(date +%F).jsonl"` on a schedule already produces
most of what `enodia history` needs — a directory of dated inventories.
`history --dir <that directory>` reads every `*.jsonl` file in it and
evaluates each one as of its own collection time, building one timeline
per target ID. See [CLI reference](/en/cli-reference/#enodia-history).
