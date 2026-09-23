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
  under a second. See [how to download them](/en/cve/#enodia-never-downloads-the-databases-itself),
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
