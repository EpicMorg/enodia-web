---
title: CVE correlation
description: Matching every probed version against БДУ ФСТЭК and NIST NVD, from files you download yourself.
---

Since 2.0, enodia can tell you which known vulnerabilities affect the
exact version each target reports — alongside the patch/lifecycle/branch
axes, not instead of them. It matches against two public databases:

- **БДУ ФСТЭК** — FSTEC's (Russia's) vulnerability database,
  [bdu.fstec.ru](https://bdu.fstec.ru/).
- **NIST NVD** — the US National Vulnerability Database,
  [nvd.nist.gov](https://nvd.nist.gov/).

Either works alone; with both configured, their findings are merged per
CVE. It's entirely opt-in: a config without a `cve:` block behaves
exactly as 1.x did.

## enodia never downloads the databases itself

You download the files, you decide when to refresh them, and you point
enodia at them. enodia has no code path that reaches bdu.fstec.ru or
nvd.nist.gov on its own — the same closed-network reasoning as the
[two-phase design](/en/concepts/#two-phases-deliberately-separable): the
machine running `check` doesn't need internet access for CVE matching,
only a copy of the files.

### БДУ ФСТЭК

One file, FSTEC's full export (about 33 MB zipped):

```bash
curl -fL --cacert ru-chain.pem \
  -o /var/lib/enodia/cve/bdu/vulxml.zip \
  https://bdu.fstec.ru/files/documents/vulxml.zip
```

bdu.fstec.ru uses a certificate from Russia's national CA (Минцифры),
which isn't in the usual system trust stores — a plain `curl` fails
with a certificate error. The server also doesn't send its intermediate
certificate, and `curl` (unlike a browser) won't fetch a missing one on
its own, so installing only the root isn't enough. Build a bundle from
the root and the intermediate the site's certificate names:

```bash
curl -fsS -o root.crt https://gu-st.ru/content/lending/russian_trusted_root_ca_pem.crt
curl -fsS -o sub.crt  http://nuc-cdp.digital.gov.ru/cdp/subca_ssl_rsa2024.crt
{ cat root.crt; echo; cat sub.crt; } > ru-chain.pem
```

Checked live on 2026-09-23. If it stops working, the intermediate has
most likely been rotated: the site certificate's own *Authority
Information Access* field names the current one (`openssl s_client
-connect bdu.fstec.ru:443 | openssl x509 -noout -ext authorityInfoAccess`).
`curl -k` also gets the file, but skips verifying what you're about to
feed into your security report.

### NIST NVD

One file per year, `nvdcve-2.0-<year>.json.gz`, 2002 through the current
year. Put the ones you want in one directory:

```bash
mkdir -p /var/lib/enodia/cve/nvd && cd /var/lib/enodia/cve/nvd
for y in $(seq 2002 "$(date +%Y)"); do
  curl -fsSLO "https://nvd.nist.gov/feeds/json/cve/2.0/nvdcve-2.0-$y.json.gz"
done
```

The current year's file is updated daily; older years change rarely.
Each file has a `.meta` sidecar (`nvdcve-2.0-<year>.meta`) with its size
and `sha256` — note the hash is of the *uncompressed* JSON, not the
`.gz`.

## Configuration

A `cve:` block in `enodia.yaml` — not `settings.yaml`, since it changes
the evaluation, not just the display:

```yaml title="enodia.yaml"
schemaVersion: 1
cve:
  bdu:
    path: /var/lib/enodia/cve/bdu/vulxml.zip
  nvd:
    path: /var/lib/enodia/cve/nvd
targets:
  - id: gitlab-main
    product: gitlab
    address: https://gitlab.example.com
    credentials: gitlab-token
```

| Field | Accepts |
|---|---|
| `cve.bdu.path` | a `.xml`, `.zip` (the export as published), or `.tar.gz`/`.tgz` |
| `cve.nvd.path` | a single `.json`, `.json.gz` or `.json.zip` file, or a directory of them |

Relative paths resolve against the directory of the config file that
names them, the same as `credentials_file`. The block is read from
whichever config the run actually uses — `--config`, `$ENODIA_CONFIG`,
or the [default search paths](/en/configuration/#file-locations).
That includes `check --from inventory.jsonl`: an inventory collected
inside a closed network is correlated wherever `check` runs, as long as
a config with a `cve:` block is found there. With no config located at
all, `check --from` still works, just without CVEs.

**A configured path that doesn't exist is an error**, not a silent
skip — `check` exits with `stat ...: no such file or directory` rather
than producing a report that quietly has no CVEs in it. `enodia config
validate` checks the block's shape (including the control-character
check below) but not whether the files exist — that's only checked when
a run actually loads them.

:::caution[Windows paths]
Write a Windows path unquoted, in single quotes, with forward slashes,
or as a UNC path. In YAML **double** quotes, `\t` and `\n` become a tab
and a newline — `"C:\tmp\bdu.zip"` would silently point somewhere else,
so enodia rejects a path containing a control character at load time,
with a hint.
:::

## First run and caching

Both sources are stream-parsed and the result is cached in the OS cache
directory (`$XDG_CACHE_HOME/enodia/cve`, i.e. `~/.cache/enodia/cve` by
default on Linux; `~/Library/Caches/enodia/cve` on macOS;
`%LocalAppData%\enodia\cve` on Windows). The first run after a file changes parses it in full —
about a minute for all of NVD plus БДУ; measured on 2026-09-23 with
БДУ plus NVD's 2026 file alone, 25 s. Every later run reads the cache:
0.2 s for the same data, an 11 MB cache. There is no TTL — the cache is
keyed on the files themselves (size and modification time) and on
enodia's own product tables, so replacing a file, adding a year to the
NVD directory, or upgrading enodia each trigger a rebuild on their own.

`enodia serve` re-reads the `cve:` block and the files on every
`--interval` cycle (cheaply, from the cache), so replacing the files
from cron takes effect without restarting the server.

## Where findings show up

- **`check`** — a `CVES` column in the [`compact` and `drift`
  views](/en/views/): the number of distinct CVEs affecting that exact
  version. `-` means no findings — none affect that version, there's no `cve:`
  block, or enodia doesn't match the product (see below); the column
  itself is always there. `lifecycle` and `fleet` don't carry
  the column.
- **`export --format html`** — the same column with an info link opening
  a per-target list: one line per CVE, most severe first, with links to
  NVD, cve.org and, for БДУ findings, the bdu.fstec.ru page; БДУ's
  Russian text when БДУ has the CVE, NVD's English description
  otherwise; and the rating as colored badges, e.g. `CRITICAL · CVSS 3.1
  9.8`. It's pure CSS — the default offline report still contains no
  JavaScript at all.
- **`export --format json`** — every per-source finding in full under
  each assessment's `cves` array: the source (`bdu`/`nvd`), advisory ID,
  CVE IDs, title, the source's own severity text, the matched product
  name or CPE, the version range, and a parsed CVSS rating. Unlike the
  table and the HTML list, which count one line per CVE, JSON keeps every
  source's finding separately — the same CVE can appear once from БДУ
  and once per matching NVD CPE.
- **`export --format prometheus`** — no CVE data.

**CVEs don't affect severity or the exit code.** `SEVERITY` is still
computed from the patch/lifecycle/branch axes only, and `--fail-on`
only knows those three axes too — a finding is a fact to look
at, not a verdict enodia has made on your behalf. Whether and how a CVE
should escalate severity is an open question upstream.

## Which products are matched

52 of the 90 products, each vendor/product name checked verbatim against
the real full exports — see each product's own page under
[Product setup](/en/products/) for its sources.

Not matched, each for a reason:

- **General-purpose Linux distributions** (Debian, Ubuntu, RHEL, Alma,
  Rocky, Fedora, RED OS, Astra Linux, …) — their CVEs are package
  vulnerabilities; a release number can't say which packages have been
  patched since.
- **The BSDs and Oracle Solaris** — NVD records their patch levels
  (FreeBSD's `-p5`, OpenBSD errata) in a CPE field this matcher doesn't
  read; matching on the release alone would flag a fully patched host
  with every CVE ever fixed in that release.
- **ESXi and vCenter** — the same problem: almost all their entries are
  `7.0` + `update_1`-style literals.
- **Synology DSM** — bounds like `6.2.4-25556-3` that the strict range
  parser rejects.
- **TrueNAS** — too few entries, versioned differently from what the
  probe reports.
- **No usable data in either source** — Kitsu, Zou, postgres_exporter,
  Perforce Proxy, Perforce Helix Swarm.
- **`generic`** — a hand-written parser has no product identity to look
  up.

### Edition-aware matching

GitLab, HashiCorp Vault, Nextcloud and MongoDB publish separate CVE
lists for their community and enterprise editions. Their probes record
the server's own edition in `extra.enterprise`, and a community instance
no longer sees enterprise-only findings — on real data, GitLab 19.2.2 CE
sees 4 of NVD's 9, Nextcloud 27.1.3 CE 11 of 23. When the edition is
unknown (an older server that doesn't report it), every finding is kept.

### SSH

The [`ssh`](/en/configuration/products/ssh/) probe covers any SSH
implementation, so it's matched by banner: `OpenSSH_…` looks up
OpenSSH, `dropbear_…` looks up Dropbear, and any other SSH stack gets no
lookup rather than borrowing OpenSSH's CVEs.

## Known limitations

- **БДУ can over-report across branches.** One БДУ entry often lists a
  separate range per maintenance branch, all sharing one lower bound, so
  a version that is already the fix on its own branch can still fall
  inside a sibling branch's wider range (Confluence 8.3.3 against
  CVE-2023-22515 is the documented example). NVD's ranges for the same
  CVE carry their own lower bounds and don't have this problem. enodia
  deliberately errs toward reporting a finding to double-check rather
  than silently missing a real one.
- **NVD entries with no version constraint at all are dropped.** Measured
  against the full exports, they were almost all decades-old CVEs
  attached to current releases; the cost is the rare genuinely-unfixed
  CVE recorded that way.
- **NVD's multi-product conditions** ("vulnerable only with library Y")
  aren't evaluated — a probe reports one product per target, so each
  vulnerable entry for a matched product counts on its own.
