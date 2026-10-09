---
title: Changelog
description: Notable changes to enodia, release by release.
---

The canonical source is enodia's own
[`CHANGELOG.md`](https://github.com/EpicMorg/enodia/blob/master/CHANGELOG.md)
— this page mirrors it, kept in sync alongside the rest of this site on
every release, with links into the rest of these docs where a change
affects how you'd actually configure something. Tags follow
`MAJOR.MINOR.PATCH+BUILD`, no `v` prefix; `+BUILD` is semver build
metadata, used only for a rebuild with no functional change, not to
sidestep a real version bump.

## 2.2.0+0 — 2026-10-09

`enodia cve update` downloads the CVE databases itself, vendors' own
security data (MariaDB, Atlassian, PostgreSQL, nginx) joins БДУ and NVD,
CVE matching reaches iLO 4, iDRAC and Synology DSM, and 27 new probes
land — 123 in total. Every new `cve:` key is optional, and 2.1 configs
and inventories work unchanged — except a credential of a kind its
product never reads, which is now an error (see Fixed).

### Added

- **[`enodia cve update`](/en/cve/#enodia-cve-update)** downloads the
  CVE databases every configured `cve.*.path` names — БДУ, NVD (this
  year, last year and missing years; `--all-years` for all), Debian,
  OVAL and Alpine (the releases already on disk, those `--from`
  inventories need, `--oval`/`--alpine`), MariaDB, Atlassian, PostgreSQL
  (`--postgresql` for per-major pages) and nginx. If-Modified-Since; a
  download replaces a file only after it loads. TLS is verified against
  the system roots plus `cve.update.ca_file` and `cve.update.ca_dir`, or
  not at all with `cve.update.tls_skip_verify`. Every other command
  still never downloads anything.
- **27 new probes:**
  - [`splunk`](/en/configuration/products/splunk/) — splunkd's management API on 8089, Basic or a Splunk token.
  - [`code-server`](/en/configuration/products/code-server/) — `codeServerVersion` from the login page.
  - [`phpipam`](/en/configuration/products/phpipam/) — the login page's footer and asset version.
  - [`domainmod`](/en/configuration/products/domainmod/) — the CHANGELOG in its web root.
  - [`netdata`](/en/configuration/products/netdata/) — the agent's anonymous `/api/v1/info`.
  - [`libretranslate`](/en/configuration/products/libretranslate/) — the public OpenAPI document `/spec`.
  - [`torrserver`](/en/configuration/products/torrserver/) — `/echo`.
  - [`kafka`](/en/configuration/products/kafka/) — the broker's version over SSH from its own jar, optionally in a container; Confluent Platform builds are reported as `confluent` with the Apache Kafka line they carry.
  - [`home-assistant`](/en/configuration/products/home-assistant/) — `/api/config` with a long-lived access token, `kind: bearer`.
  - [`openhab`](/en/configuration/products/openhab/) — the anonymous REST root `/rest/`.
  - [`doxygen`](/en/configuration/products/doxygen/) — which Doxygen generated a docs site, from its generator mark.
  - [`qbittorrent`](/en/configuration/products/qbittorrent/) — the Web UI API after a form login, `kind: password`.
  - [`netbox`](/en/configuration/products/netbox/) — the anonymous login page's `data-netbox-version`.
  - [`greenbone`](/en/configuration/products/greenbone/) — (aliases `openvas`, `gsad`) gsad's version from its `/gmp` reply, unauthenticated.
  - [`posthog`](/en/configuration/products/posthog/) — self-hosted PostHog's git commit from its anonymous login page.
  - [`uptime-kuma`](/en/configuration/products/uptime-kuma/) — logs in over Uptime Kuma's socket.io API (`kind: password`) and reads the version it sends after login.
  - [`wapt`](/en/configuration/products/wapt/) — the WAPT server's anonymous `/ping`.
  - [`minio`](/en/configuration/products/minio/) — `minio --version` over SSH, optionally in a container; MinIO's `RELEASE.<timestamp>` names now compare as versions.
  - [`sentry`](/en/configuration/products/sentry/) — self-hosted Sentry's version from its anonymous login page.
  - [`zookeeper`](/en/configuration/products/zookeeper/) — the `srvr` four-letter word.
  - [`ghost`](/en/configuration/products/ghost/) — the anonymous `/ghost/api/admin/site/`, which gives major.minor.
  - [`onlyoffice`](/en/configuration/products/onlyoffice/) — and [`euro-office`](/en/configuration/products/euro-office/): ONLYOFFICE Docs and its Euro-Office fork, read anonymously from the document server's `/index.html`; a server of the other brand is refused with the product to use.
  - [`weblate`](/en/configuration/products/weblate/) — the anonymous "Powered by Weblate" footer.
  - [`memcached`](/en/configuration/products/memcached/) — the text protocol's `version` command, no credentials.
  - [`rabbitmq`](/en/configuration/products/rabbitmq/) — the management plugin's `/api/overview`, `kind: basic`.
  - [`cassandra`](/en/configuration/products/cassandra/) — `release_version` over the CQL native protocol v4, `kind: password` when the cluster has PasswordAuthenticator.
- **CVEs for [`mariadb`](/en/configuration/products/mariadb/) targets.**
  БДУ and NVD now cover MariaDB, and a new `cve.mariadb.path` reads
  MariaDB's own table of fixed CVEs (`community-server.md`), which knows
  the fixing release per series. Where MariaDB's table knows a CVE, its
  verdict replaces БДУ's and NVD's open-ended ranges, so the latest
  release of a maintained series is no longer flagged for CVEs fixed
  only in newer series — see [Vendors' own data](/en/cve/#vendors-own-data).
- **`cve.atlassian.path`**: Atlassian's own per-release CVE data for
  `jira`, `confluence`, `bitbucket` and `bamboo`, third-party dependency
  CVEs included. Judged within each branch; for a release Atlassian
  lists, its verdict wins — see [Atlassian](/en/cve/#atlassian).
- **`cve.postgresql.path` and `cve.nginx.path`**: the projects' own
  security pages, with the fix release per branch. Current PostgreSQL
  17/16/15/14 releases and nginx 1.30.5 no longer show БДУ's branchless
  ranges — see [PostgreSQL](/en/cve/#postgresql) and [nginx](/en/cve/#nginx).
- **CVEs for 24 more products**: cassandra, code-server, domainmod,
  doxygen, ghost, greenbone, home-assistant, kafka, memcached, minio,
  netbox, netdata, onlyoffice, openhab, pfsense, phpipam, qbittorrent,
  rabbitmq, sentry, splunk, uptime-kuma, wapt, weblate, zookeeper. MinIO's
  timestamp versions compare; pfSense CE and Splunk Enterprise skip
  ranges for other editions; Confluent Kafka builds get no lookup.
- **CVEs for [`hp-ilo4`](/en/configuration/products/hp-ilo4/),
  [`dell-idrac`](/en/configuration/products/dell-idrac/) and
  [`synology-dsm`](/en/configuration/products/synology-dsm/).** iDRAC is
  matched per generation, read from the Redfish model; DSM compares
  version, build and Update (`7.2.1-69057-6`), and the probe now records
  the Update in `extra.update` — see
  [Dell iDRAC and Synology DSM](/en/cve/#dell-idrac-and-synology-dsm).
  In total, 91 of the 123 products are now matched — see
  [which products are matched](/en/cve/#which-products-are-matched).
- A [Privacy](/en/privacy/) page: what enodia connects to (your
  targets, endoflife.date, the GitHub API — product and repository names
  only — and, only for `enodia cve update`, the CVE database
  publishers) and what it stores (only your own files and a local
  cache). No telemetry.

### Changed

- The `github` resolver skips releases whose tag names a pre-release
  (`5.3.0.M2`, `2026.10.0b7`, `-rc1`, `-beta.1`) even when GitHub doesn't
  flag them; reads underscore-spelled (`Release_1_18_0`) and
  `release-`-prefixed (`release-5.2.4`) tags as versions; and drops a
  leading `<repo>-`/`<repo>_` from tags, so `weblate-2026.10` reads as
  `2026.10` — see [Supported products](/en/products/).
- [`teamcity`](/en/configuration/products/teamcity/) works without
  credentials: with none configured it reads the anonymous
  `/app/rest/server/version`, open on every TeamCity checked from 2017.2
  to 2026.1 even with guest login off. A token still selects
  `/app/rest/server` as before.

### Fixed

- [`jenkins`](/en/configuration/products/jenkins/) CVEs: a fixed LTS
  release is no longer flagged by the weekly range of the same fix (LTS
  2.568.3 by "before 2.580"). Weekly and LTS ranges now apply only to
  their own release line.
- The `github` resolver no longer fails on repositories whose releases
  list is over 1 MiB (minio/minio's is 3.4 MB): it now reads up to 8 MiB.
- **A credential of a kind its product never sends is now a config
  error** instead of being dropped silently. `kind: password` on an HTTP
  product (RouterOS, Harbor, …) used to send the request with no
  `Authorization` header at all; `config validate` now names the kinds
  the product accepts — for a web login that is `kind: basic`. **Check
  your config before upgrading**: a run with such a credential now
  refuses to start. See [Configuration → Credentials](/en/configuration/#credentials).

## 2.1.1+0 — 2026-10-08

### Fixed

- MariaDB 11.0+ no longer masks its version behind `5.5.5-`
  (`11.4.9-MariaDB-…`), so [`mysql`](/en/configuration/products/mysql/)
  recorded such servers as MySQL and
  [`mariadb`](/en/configuration/products/mariadb/) refused them. Both
  probes now recognise MariaDB by either shape. A `product: mysql`
  target pointing at MariaDB 11.0+ now fails — switch it to
  `product: mariadb`.

## 2.1.0+0 — 2026-10-01

CVE correlation goes down to installed packages on ten Linux
distributions, and six new probes land. Nothing breaks: the new `cve:`
keys are optional, and inventories only gain optional fields, so 2.0
configs and inventories work unchanged.

### Added

- **[Package-level CVEs for Linux distributions](/en/cve/#package-level-cves-for-linux-distributions).**
  The OS probes now also read the installed packages and the running
  kernel in their one SSH round trip, and each distribution's own
  security data is matched per package. Each source is a file you
  download, like БДУ and NVD:
  - `cve.debian.path` — the Debian Security Tracker's JSON, for
    [`debian`](/en/configuration/products/debian/).
  - `cve.oval.path` — vendor OVAL files, one per release, for
    [`ubuntu`](/en/configuration/products/ubuntu/),
    [`linuxmint`](/en/configuration/products/linuxmint/) (via its Ubuntu
    base), [`rhel`](/en/configuration/products/rhel/),
    [`rocky-linux`](/en/configuration/products/rocky-linux/) (against Red
    Hat's file — Rocky's own is refused as unusable),
    [`almalinux`](/en/configuration/products/almalinux/),
    [`oracle-linux`](/en/configuration/products/oracle-linux/),
    [`astra-linux`](/en/configuration/products/astra-linux/) (SE 1.7/1.8)
    and [`redos`](/en/configuration/products/redos/) (7.3/8.0). Parsed
    OVAL is cached like БДУ and NVD.
  - `cve.alpine.path` — Alpine's secdb, for
    [`alpine-linux`](/en/configuration/products/alpine-linux/).
- Only CVEs that already have a fix newer than what's installed are
  reported — what an upgrade (and, for the kernel, a reboot) would close.
  One finding per package, linked to the advisory carrying the fix (USN,
  RHSA, ALSA, ELSA, Astra bulletin, ROS, Debian/Alpine tracker page),
  with every CVE folded under it in the HTML report.
- Matching follows each package manager's own rules: dpkg, rpm and apk
  version ordering, AppStream module streams, Oracle's arch, FIPS and
  Ksplice variants, and the running kernel rather than whatever kernel
  packages are installed. Every source was cross-checked against the
  reference tool (`oscap oval eval`, `dnf updateinfo`, python3-apt,
  `apk version -t`) on real containers, with identical results.
- New probes: [`mariadb`](/en/configuration/products/mariadb/),
  [`pfsense`](/en/configuration/products/pfsense/) (Community Edition,
  over SSH), [`supermicro-bmc`](/en/configuration/products/supermicro-bmc/),
  [`dell-idrac`](/en/configuration/products/dell-idrac/) and
  [`hp-ilo4`](/en/configuration/products/hp-ilo4/) (over Redfish), and
  [`freeradius`](/en/configuration/products/freeradius/) (over SSH, with
  `options.container` for a FreeRADIUS in Docker or Podman). 96 probes
  in total.
- `github-tag-branches` resolver: one lifecycle cycle per major.minor
  from GitHub tags, for projects maintaining several branches at once
  (FreeRADIUS 3.0.x and 3.2.x).
- FreeRADIUS is matched in both NVD and БДУ.

### Fixed

- VMware's "8.0 U3k" shorthand in the lifecycle calendar now compares
  equal to "8.0.3": a patched [vCenter](/en/configuration/products/vcenter/)
  or [ESXi](/en/configuration/products/esxi/) 8.0 host no longer shows as
  `ahead`.
- LATEST/CYCLE columns show cleaned versions for GitHub-resolved
  products, not the raw tag (`2026.9.1`, not `v2026.9.1`).
- `config validate` reports a missing `cve.*.path` file instead of
  passing and failing later in `check`.

### Notes

- A [Proxmox VE](/en/configuration/products/proxmox/) host gets package
  findings as a second, SSH `debian` target next to its API `proxmox`
  one; Debian's `linux` is only matched against a running Debian
  kernel, so Proxmox's own kernel isn't mistaken for one.
- With every source configured at once (БДУ, NVD, Debian, eight OVAL
  files, Alpine) `check` took ~22 s cold and ~3.4 s warm, peaking at
  ~0.5–0.6 GB — less if `cve.oval.path` holds only the releases you run.
- The repository's history was rewritten and re-signed to drop internal
  hostnames; every tag was re-created on the rewritten history. Release
  binaries up to 2.0.0+0 report commit hashes from before the rewrite.
- MariaDB, pfSense and the BMC probes have no CVE mapping yet.

## 2.0.0+0 — 2026-09-23

A major version for a major feature, not for a break: CVE correlation is
the first evaluation axis that isn't about lifecycle. Existing
`enodia.yaml`, `settings.yaml` and inventory files work unchanged — the
new `cve:` block is optional, and a config without it behaves exactly as
1.2 did.

### Added

- **[CVE correlation](/en/cve/)** against two local databases, БДУ ФСТЭК
  and NIST NVD. enodia never downloads them: you fetch БДУ's
  `vulxml.zip` and NVD's yearly `nvdcve-2.0-<year>.json.gz` files and
  point `cve.bdu.path` / `cve.nvd.path` in `enodia.yaml` at them (a
  file, or for NVD a directory of files). Either source works alone.
  Both are stream-parsed and cached: the first run after a database
  changes takes about a minute for all of NVD plus БДУ, every later run
  under a second. See [how to download them](/en/cve/#downloading-the-databases),
  including the extra CA certificate bdu.fstec.ru needs.
- **52 probes matched** (53 product names upstream — `ssh` counts as
  both OpenSSH and Dropbear), every probe with usable data in either
  source. Deliberately not matched, each for a stated reason:
  general-purpose Linux distributions (their CVEs are package-level),
  the BSDs and Solaris, ESXi/vCenter and Synology DSM (patch levels and
  build suffixes the matcher doesn't read yet) — see
  [which products are matched](/en/cve/#which-products-are-matched), and
  each product's own page.
- **Edition-aware matching** for [GitLab](/en/configuration/products/gitlab/),
  [Vault](/en/configuration/products/vault/),
  [Nextcloud](/en/configuration/products/nextcloud/) and
  [MongoDB](/en/configuration/products/mongodb/): a community instance no
  longer sees enterprise-only findings (on real data, GitLab 19.2.2 CE
  sees 4 of NVD's 9, Nextcloud 27.1.3 CE 11 of 23). The four probes now
  record their server's edition in `extra.enterprise`; an unknown
  edition keeps every finding.
- [`ssh`](/en/configuration/products/ssh/) targets are matched as
  OpenSSH or Dropbear by their banner; any other SSH stack gets no CVE
  lookup rather than OpenSSH's.
- A **`CVES` column** in `check`'s [compact and drift views](/en/views/),
  counting distinct CVEs.
- A **per-CVE list** in [`export --format html`](/en/reporting/#the-cve-list),
  pure CSS with no JavaScript, so the inline report stays a
  zero-`<script>` offline file: one line per CVE with links to NVD,
  cve.org and bdu.fstec.ru, БДУ's Russian text when БДУ has the CVE, a
  colored `CRITICAL · CVSS 3.1 9.8` rating, most severe first.
- [`export --format json`](/en/reporting/#--format-json) carries every
  per-source finding under each assessment's `cves`, including a
  structured CVSS rating parsed from both sources.
- [`fortios`](/en/configuration/products/fortios/) probe for Fortinet
  FortiGate, via its REST API with a REST API Admin token.
- CDN-mode HTML reports remember a dismissed "needs internet access"
  warning per viewer.

### Notes

- The `cve:` block is read from whichever config the run actually uses
  — `--config`, `$ENODIA_CONFIG`, or the default search paths.
- Windows paths work unquoted, in single quotes, with forward slashes or
  as UNC paths. In YAML double quotes `\t` and `\n` become a tab and a
  newline, so such a path is rejected at load with a hint.
- `cisco-ios-xe` is off the roadmap for good.

## 1.2.1+0 — 2026-09-10

### Fixed

- [`p4d`/`p4p`](/en/configuration/products/p4d/#timeout) didn't apply
  `timeout` to the `p4` CLI subprocess they shell out to — every other
  probe in this tree clamps its own transport to `timeout` before
  touching the network, and this one didn't. A `p4` process stuck
  dialing an unreachable direct server (no response, no reset — the
  exact network behavior that's the whole reason these two probes shell
  out to `p4` in the first place) hung indefinitely, stalling an entire
  collection run. Reported directly from a real hang in production.

## 1.2.0+0 — 2026-09-10

### Added

- [`p4d`](/en/configuration/products/p4d/) and
  [`p4p`](/en/configuration/products/p4p/) probes, for Perforce Helix
  Core Server and Perforce Proxy. Perforce's own RPC wire protocol was
  fully reverse-engineered and a hand-built client reproduced its
  handshake correctly against a real proxy, but that exact,
  byte-verified-correct handshake is silently dropped by real direct
  `p4d` servers for reasons not visible from the client side. Both
  probes shell out to the operator's own `p4` CLI instead — the first
  probes in enodia to run an external process rather than speak a wire
  protocol directly. The binary path is configurable per target via
  [`options.binary`](/en/configuration/#targets) (falling back to `p4`
  on `$PATH`); this works identically on Windows, pointed at `p4.exe`.
  A proxy's reply is told apart from a direct server's by the presence
  of its own `proxyVersion` field — each probe rejects the other's
  shape.

### Fixed

- The `p4 -Ztag` output parser didn't strip Windows line endings: a
  real `p4.exe` writes `\r\n`, leaving a trailing `\r` inside field
  values like `ServerID`.
- `probe.Observation.Resolver` (added in 1.1.0+0 for
  [SonarQube](/en/configuration/products/sonarqube/)) was a plain
  struct, not a pointer — `encoding/json`'s `omitempty` has no concept
  of "empty" for a struct value, so every single observation was
  serialising a spurious `"resolver":{}` in JSON exports, not just
  SonarQube's. Fixed to a pointer, the same reason `tlsVerified` is
  already nullable rather than a bare `false`.

## 1.1.1+0 — 2026-09-10

### Fixed

- [`debian`](/en/configuration/products/debian/) was reporting a bare
  major version (`13`) instead of the actual point release (`13.6`) —
  Debian's `/etc/os-release` `VERSION_ID` never carries one, even on a
  fully patched install; the point release lives only in
  `/etc/debian_version`. `debian` moved off the shared
  `osReleaseFamilyProbe` mechanism into its own dedicated probe, which
  reads both files and only trusts `debian_version` after confirming
  `ID=debian` and that its content is a plain dotted number — a real
  Ubuntu image was confirmed to ship the identical file with
  meaningless inherited content.
- [`ubuntu`](/en/configuration/products/ubuntu/) had the same gap:
  `VERSION_ID` never changes after a release ships, so a fully patched
  `22.04` host reported bare `22.04`, not `22.04.5`. `ubuntu` also moved
  off the shared mechanism into its own probe, preferring the point
  release from `os-release`'s own `VERSION` field when it's strictly
  more precise than `VERSION_ID`. Every other product in the shared
  [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
  family was audited the same way; none of the rest have this gap.

No config changes for either — same `product:` value, same credentials,
same endpoint. Only the reported `version` got more precise.

## 1.1.0+0 — 2026-09-10

### Added

- A `github-tags` lifecycle resolver, for a product that publishes no
  GitHub Releases at all, only tags in a non-dotted shape — gave
  [pgAdmin](/en/configuration/products/pgadmin/) its first working
  resolver (`pgadmin-org/pgadmin4`'s tags are `REL-9_17`, converted to
  `9.17`, picking the highest-parsing tag rather than the first one).
- The **`GITHUB_TOKEN`** environment variable — authenticates every
  GitHub-backed lifecycle lookup, raising the unauthenticated cap from
  60 requests/hour to 5000/hour. See
  [Supported products](/en/products/#applications-and-infrastructure-services).
- A probe can now override its product's lifecycle resolver per
  observation, for the rare case where the right calendar is only
  knowable after seeing the vendor's own version reply. First used to
  split [SonarQube](/en/configuration/products/sonarqube/) between
  SonarQube Server and SonarQube Community Build — two separate
  products since SonarSource's late-2024 split, tracked as two
  different endoflife.date pages with different cycle data.

### Fixed

- Resolver failures used to show only `resolver_error` in the report,
  with no way to tell a GitHub rate limit from a DNS failure from a
  reshaped API. `enodia check`/`export` now print the real underlying
  error to stderr when this happens.
- SonarQube was always compared against the Community Build lifecycle
  calendar, even for a SonarQube Server instance — collecting its
  version worked, but the report showed an unmatched cycle regardless.
  Now resolved per instance from the version string itself.

### Changed

- Container image publishing (`ghcr.io/epicmorg/enodia`, also mirrored
  to Docker Hub and Quay) moved out of this repository's own release
  pipeline entirely, into the `EpicMorg/docker` monorepo, on that
  repo's own build schedule. The published image address and tags
  (`latest`, `1`, the exact version) are unchanged, but the image
  itself is now `linux/amd64` only and runs as root — see
  [Getting started](/en/getting-started/#installation).

## 1.0.0+0 — 2026-09-09

Initial release. `collect → inventory.jsonl → evaluate → assessment →
render`, end to end, verified against real production infrastructure:

- **87 probes**, one file each, compiled in and explicitly registered —
  most speaking HTTP, some ([Redis](/en/configuration/products/redis/),
  [PostgreSQL](/en/configuration/products/postgresql/),
  [MySQL](/en/configuration/products/mysql/),
  [MongoDB](/en/configuration/products/mongodb/)) their own wire
  protocol directly, and a growing set (every mainstream Linux
  distribution, the BSDs, macOS, OPNsense, Proxmox VE, TrueNAS,
  Synology DSM, network appliances) reached over
  [SSH](/en/configuration/products/ssh-os-probes/) or a vendor HTTP API
  instead of assuming a version endpoint exists at all.
- [`product: generic`](/en/configuration/products/generic/) — a
  config-only probe for anything in-house, with a deliberately frozen
  vocabulary (no conditionals, loops, or templating).
- Lifecycle resolution against endoflife.date and GitHub Releases,
  cached on disk, evaluated on three independent axes (patch drift,
  lifecycle phase, newer branch) rather than one collapsed verdict —
  see [Concepts](/en/concepts/).
- Four [report views](/en/views/) across table, HTML, JSON, and
  Prometheus output.
- [`enodia serve`](/en/cli-reference/#enodia-serve) — a snapshot-only
  HTTP server; a background ticker collects, handlers only ever read
  the last snapshot.
- [Config schema](/en/configuration/) with `${VAR}`/`${VAR:-default}`
  interpolation, a dedicated credential store, and TLS pinning/
  insecure-opt-in per target.
- Packaging: `.deb`, `.rpm`, `.apk`, and Arch's `.pkg.tar.zst`, a
  dedicated unprivileged `enodia` system user, man pages for every
  command, raw archives for Linux/Windows/macOS/Android (Termux), and a
  container image — see [Getting started](/en/getting-started/).
  Checksums signed with cosign keyless (OIDC, no key to manage or
  leak).
