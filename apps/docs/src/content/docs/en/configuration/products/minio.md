---
title: MinIO
description: Configuring enodia to probe MinIO via SSH.
---

An SSH probe: it logs in and runs the server binary's own `--version` —
`minio` by name, then `/usr/local/bin/minio`. Port defaults to `22`, no
scheme — the same SSH mechanism, credentials and host key verification as
the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family.

```yaml
targets:
  - id: minio-01
    product: minio
    address: minio-01.example.com
    credentials: linux-host-ssh
```

## Why SSH

MinIO gives no version anonymously on any network surface: the S3 API's
`Server` header is a bare `MinIO`, the Console's anonymous
`/api/v1/login` returns only the login strategy, and the admin API and
Prometheus metrics need an admin key or a bearer token generated with
`mc`.

## MinIO in a container

When MinIO runs in Docker or Podman and the host itself has no binary,
name the container in `options` — the command then runs through
`docker exec` (or `podman exec`):

```yaml
targets:
  - id: minio-01
    product: minio
    address: minio-01.example.com
    credentials: linux-host-ssh
    options:
      container: minio               # the container's name
      container_runtime: podman      # optional: docker (default) or podman
```

The SSH user has to be allowed to use that runtime. The container name
is checked against Docker's own name pattern before it goes into the
remote command.

## Release names as versions

MinIO names releases by UTC timestamp — `RELEASE.2025-10-15T17-29-55Z` —
both in `--version` and in its GitHub tags. enodia folds that name, with
or without a `_<MARKER>` after `RELEASE` (in-house builds say
`RELEASE_INHOUSE.…`), into a comparable `2025.10.15.17.29.55`, on the
observed version and on the resolver's tag alike.

## Authentication — required

An SSH credential, `ssh-key` or `password` — see
[Configuration → Credentials](/en/configuration/#credentials).

## Recorded fields

- `version` — e.g. `RELEASE_INHOUSE.2025-03-12T18-04-18Z`, from
  `minio version RELEASE_INHOUSE.2025-03-12T18-04-18Z (commit-id=…)`
- `extra.build` — the marker after `RELEASE_` on a non-upstream build,
  e.g. `INHOUSE`
- `extra.commit` — the `commit-id`, when present
- `extra.runtime` — the Go runtime from the `Runtime:` line, e.g.
  `go1.24.4`
- `extra.container` — the container name, when `options.container` is set
- `extra.hostKeyVerified`

## CVE correlation

Matched against NVD and БДУ ФСТЭК when a [`cve:` block](/en/cve/) is
configured. Both sources write their bounds as release timestamps
(`2025-10-15t17-29-55z`, either case), folded into the same dotted form
as the probed version so the two compare; a bound given as a plain date
still doesn't parse.

## Lifecycle resolver

`github:minio/minio` — endoflife.date has no MinIO page (confirmed 404),
so this resolves against GitHub Releases instead: the latest published,
non-prerelease tag only, with no eol/support/lts dates. The repository is
archived: the community edition's last release is
`RELEASE.2025-10-15T17-29-55Z`, which is what a MinIO is compared against
from now on.
