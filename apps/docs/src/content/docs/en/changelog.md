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
