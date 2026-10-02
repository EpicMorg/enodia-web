---
title: CVE correlation
description: Matching every probed version against БДУ ФСТЭК and NIST NVD, and Linux hosts' installed packages against their vendors' own security data — from files you download yourself.
---

Since 2.0, enodia can tell you which known vulnerabilities affect the
exact version each target reports — alongside the patch/lifecycle/branch
axes, not instead of them. It matches against two public databases:

- **БДУ ФСТЭК** — FSTEC's (Russia's) vulnerability database,
  [bdu.fstec.ru](https://bdu.fstec.ru/).
- **NIST NVD** — the US National Vulnerability Database,
  [nvd.nist.gov](https://nvd.nist.gov/).

Either works alone; with both configured, their findings are merged per
CVE.

Since 2.1, ten Linux distributions are also matched **per installed
package** against their vendors' own security data — the Debian
Security Tracker, vendor OVAL files and Alpine's secdb (see
[Package-level CVEs for Linux distributions](#package-level-cves-for-linux-distributions)).

It's all opt-in: a config without a `cve:` block behaves exactly as 1.x
did, and each source works on its own.

## enodia never downloads the databases itself

You download the files, you decide when to refresh them, and you point
enodia at them. enodia has no code path that reaches any of these
sources on its own — the same closed-network reasoning as the
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

### Debian Security Tracker

One file, the tracker's full JSON export (about 80 MB), for `debian`
targets:

```bash
curl -fsSL -o /var/lib/enodia/cve/debian.json \
  https://security-tracker.debian.org/tracker/data/json
```

`.json.gz` and `.json.zip` copies work too.

### Vendor OVAL

One file per distribution release in your fleet, all in one directory,
for `ubuntu`, `linuxmint`, `rhel`, `rocky-linux`, `almalinux`,
`oracle-linux`, `astra-linux` and `redos` targets:

| Targets | File |
|---|---|
| Ubuntu, Linux Mint (its Ubuntu base) | `https://security-metadata.canonical.com/oval/com.ubuntu.<codename>.usn.oval.xml.bz2` |
| RHEL **and Rocky Linux** | `https://security.access.redhat.com/data/oval/v2/RHEL<N>/rhel-<N>.oval.xml.bz2` |
| AlmaLinux | `https://security.almalinux.org/oval/org.almalinux.alsa-<N>.xml.bz2` |
| Oracle Linux | `https://linux.oracle.com/security/oval/com.oracle.elsa-ol<N>.xml.bz2` |
| Astra Linux SE 1.7, 1.8 | `https://dl.astralinux.ru/astra/oval/<1.7\|1.8>_x86-64/oval-definitions-alse-<1.7\|1.8>.xml` |
| RED OS 7.3, 8.0 | `https://redos.red-soft.ru/support/secure/<7.3\|8.0>/redos.xml` |

```bash
mkdir -p /var/lib/enodia/cve/oval && cd /var/lib/enodia/cve/oval
curl -fsSLO https://security-metadata.canonical.com/oval/com.ubuntu.noble.usn.oval.xml.bz2
curl -fsSLO https://security.access.redhat.com/data/oval/v2/RHEL9/rhel-9.oval.xml.bz2
curl -fsSL -o redos-8.0.xml https://redos.red-soft.ru/support/secure/8.0/redos.xml
```

Files are taken as published, `.xml` or `.xml.bz2`. Which release a file
is for is read from its content, never from its name — so the two RED
OS files, both published as `redos.xml`, only need distinct names on
disk. Two files are refused on purpose, with an error naming the file
to use instead:

- **Rocky Linux's own OVAL** (`org.rockylinux.rlsa-<N>.xml`) — it holds
  a small fraction of Rocky's advisories and doesn't pass OVAL schema
  validation. Rocky rebuilds Red Hat's packages with the same versions,
  so Rocky hosts are matched against Red Hat's file.
- **Ubuntu's `oci.` variant** — it checks the dpkg status file with
  regular expressions instead of packages.

All URLs checked live on 2026-10-02.

### Alpine secdb

Two files per Alpine branch in your fleet, `main` and `community`, for
`alpine-linux` targets. They share names across branches, so save them
under distinct ones:

```bash
mkdir -p /var/lib/enodia/cve/alpine && cd /var/lib/enodia/cve/alpine
for b in v3.20 v3.22; do
  for r in main community; do
    curl -fsSL -o "$b-$r.json" "https://secdb.alpinelinux.org/$b/$r.json"
  done
done
```

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
  debian:
    path: /var/lib/enodia/cve/debian.json
  oval:
    path: /var/lib/enodia/cve/oval
  alpine:
    path: /var/lib/enodia/cve/alpine
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
| `cve.debian.path` | the tracker's export: `.json`, `.json.gz` or `.json.zip` |
| `cve.oval.path` | one OVAL file (`.xml` or `.xml.bz2`), or a directory of them |
| `cve.alpine.path` | one secdb `.json` file, or a directory of them |

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
than producing a report that quietly has no CVEs in it. Since 2.1,
`enodia config validate` checks that every configured path exists too,
so a typo shows up there first. Whether a file actually parses is still
only found out when a run loads it.

:::caution[Windows paths]
Write a Windows path unquoted, in single quotes, with forward slashes,
or as a UNC path. In YAML **double** quotes, `\t` and `\n` become a tab
and a newline — `"C:\tmp\bdu.zip"` would silently point somewhere else,
so enodia rejects a path containing a control character at load time,
with a hint.
:::

## First run and caching

БДУ and NVD are stream-parsed and the result is cached in the OS cache
directory (`$XDG_CACHE_HOME/enodia/cve`, i.e. `~/.cache/enodia/cve` by
default on Linux; `~/Library/Caches/enodia/cve` on macOS;
`%LocalAppData%\enodia\cve` on Windows). The first run after a file changes parses it in full —
about a minute for all of NVD plus БДУ; measured on 2026-09-23 with
БДУ plus NVD's 2026 file alone, 25 s. Every later run reads the cache:
0.2 s for the same data, an 11 MB cache. There is no TTL — the cache is
keyed on the files themselves (size and modification time) and on
enodia's own product tables, so replacing a file, adding a year to the
NVD directory, or upgrading enodia each trigger a rebuild on their own.

Parsed OVAL is cached the same way — about 11 s to parse Ubuntu noble's,
RHEL 9's, AlmaLinux 9's and Oracle Linux 9's files together, most of it
bzip2. The Debian tracker export (about a second to parse) and Alpine's
secdb (a few hundred KB) aren't cached. With every source configured at
once (БДУ, NVD, Debian, eight OVAL files, Alpine), upstream measured
`check` at about 22 s cold and 3.4 s warm, peaking at 0.5–0.6 GB of
memory — less if `cve.oval.path` holds only the releases you actually
run.

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
  9.8`. Package-level findings are one line per package instead —
  `linux 6.12.107-1 → 6.12.111-1`, linked to the advisory that carries
  the fix, with its CVE list folded underneath. It's pure CSS — the
  default offline report still contains no JavaScript at all.
- **`export --format json`** — every per-source finding in full under
  each assessment's `cves` array: the source (`bdu`/`nvd`), advisory ID,
  CVE IDs, title, the source's own severity text, the matched product
  name or CPE, the version range, and a parsed CVSS rating. Unlike the
  table and the HTML list, which count one line per CVE, JSON keeps every
  source's finding separately — the same CVE can appear once from БДУ
  and once per matching NVD CPE. Package-level findings (source
  `debian`, `oval` or `alpine`) also carry the installed and fixed
  versions — see [Reporting](/en/reporting/#--format-json).
- **`export --format prometheus`** — no CVE data.

**CVEs don't affect severity or the exit code.** `SEVERITY` is still
computed from the patch/lifecycle/branch axes only, and `--fail-on`
only knows those three axes too — a finding is a fact to look
at, not a verdict enodia has made on your behalf. Whether and how a CVE
should escalate severity is an open question upstream.

## Which products are matched

63 of the 96 products: 53 by product name against БДУ and NVD, each
vendor/product name checked verbatim against the real full exports, and
10 Linux distributions per installed package (see the next section).
See each product's own page under [Product setup](/en/products/) for
its sources.

Not matched, each for a reason:

- **The other general-purpose Linux distributions** (Fedora, CentOS
  Stream, Amazon Linux, openSUSE, …) — their CVEs are package
  vulnerabilities, a release number can't say which packages have been
  patched since, and there's no package-level source for them yet.
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
- **Not mapped yet** — MariaDB, pfSense and the three BMC probes
  (Supermicro, Dell iDRAC, HP iLO 4), all new in 2.1. Upstream left their
  CVE mapping for a later, dedicated pass.

## Package-level CVEs for Linux distributions

A release number can't tell which packages on a host have been patched
since, so these ten distributions are matched per installed package
instead. Their probes read the installed packages and the running
kernel in the same SSH round trip as the version itself, and each
package is checked against its distribution's own security data:

| Probe | Source | Key |
|---|---|---|
| `debian` | Debian Security Tracker | `cve.debian.path` |
| `ubuntu` | Canonical OVAL | `cve.oval.path` |
| `linuxmint` | Canonical OVAL, for its Ubuntu base | `cve.oval.path` |
| `rhel`, `rocky-linux` | Red Hat OVAL | `cve.oval.path` |
| `almalinux` | AlmaLinux OVAL | `cve.oval.path` |
| `oracle-linux` | Oracle OVAL | `cve.oval.path` |
| `astra-linux` | Astra Linux OVAL (SE 1.7, 1.8) | `cve.oval.path` |
| `redos` | RED OS OVAL (7.3, 8.0) | `cve.oval.path` |
| `alpine-linux` | Alpine secdb | `cve.alpine.path` |

**Only CVEs that already have a fix newer than what's installed are
reported** — what an upgrade (and, for the kernel, a reboot) would
close. CVEs the vendor hasn't fixed yet are left out: they're the same
on every host of a release and nobody can act on them, so they'd bury
the actionable ones.

**One finding per package, not per CVE.** A lagging kernel alone can
carry over a thousand CVEs; a per-CVE list would be unreadable. Each
finding names the package, its installed version, the version that
closes every CVE in it, and the advisory carrying that fix (USN, RHSA,
ALSA, ELSA, Astra bulletin, ROS, or the Debian/Alpine tracker page).
The `CVES` column still counts CVEs, not packages.

**Versions are compared by each package manager's own rules** — dpkg's,
rpm's and apk's ordering, checked upstream against `apt_pkg`, rpm and
apk-tools on thousands of real version pairs each — plus AppStream
module streams (a package is only matched against its own stream's
fixes), Oracle Linux's architecture, FIPS and Ksplice variants, and the
**running** kernel rather than whatever kernel packages happen to be
installed. Every source was cross-checked upstream against
`oscap oval eval`, `dnf updateinfo`, python3-apt or `apk version -t` on
real hosts and containers, with identical results.

**Proxmox VE** gets package findings as a second target: an SSH
[`debian`](/en/configuration/products/debian/) target on the same host,
next to its API [`proxmox`](/en/configuration/products/proxmox/) one.
Debian's `linux` package is only matched against a running Debian
kernel, so Proxmox's own kernel isn't mistaken for one.

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
- **Package-level coverage has gaps of its own.** The Debian tracker
  only covers releases Debian's security team still supports (bookworm,
  trixie, testing, sid) — older hosts get no package findings. Alpine
  edge has no numbered branch and gets none either. OVAL isn't evaluated
  as a full interpreter: package signing keys aren't checked, so a
  third-party package with a distribution package's name is compared as
  if it were the distribution's. Astra Linux's kernel packages are
  compared as installed, not as running.
- **NVD's multi-product conditions** ("vulnerable only with library Y")
  aren't evaluated — a probe reports one product per target, so each
  vulnerable entry for a matched product counts on its own.
