---
title: FreeRADIUS
description: Configuring enodia to probe FreeRADIUS via SSH.
---

An SSH probe: it logs in and runs the server's own `-v`. Port defaults
to `22`, no scheme — the same SSH mechanism, credentials and host key
verification as the
[SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family.

```yaml
targets:
  - id: radius-01
    product: freeradius
    address: radius-01.example.com
    credentials: linux-host-ssh
```

## Why SSH

RADIUS has no version exchange, and neither does FreeRADIUS's
Status-Server reply — its dictionaries define statistics counters, no
version attribute. So the version can only come from the server binary
itself. The probe tries `freeradius` (Debian/Ubuntu) and `radiusd`
(RHEL family, source builds), by name and then by their `/usr/sbin`
path, since a non-login SSH session's `PATH` often lacks `/usr/sbin`.

## Authentication — required

An SSH credential, `ssh-key` or `password` — see
[Configuration → Credentials](/en/configuration/#credentials).

## FreeRADIUS in a container

When FreeRADIUS runs in Docker or Podman and the host itself has no
binary, name the container in `options` — the command then runs through
`docker exec` (or `podman exec`):

```yaml
targets:
  - id: radius-01
    product: freeradius
    address: radius-01.example.com
    credentials: linux-host-ssh
    options:
      container: freeradius          # the container's name
      container_runtime: podman      # optional: docker (default) or podman
```

The SSH user has to be allowed to use that runtime. The container name
is checked against Docker's own name pattern before it goes into the
remote command.

## Recorded fields

- `version` — e.g. `3.2.10`, from `FreeRADIUS Version 3.2.10 (git #9071ea041)`
- `extra.git` — the build's git hash, when present
- `extra.container` — the container name, when `options.container` is set
- `extra.hostKeyVerified`

## CVE correlation

Matched against NVD and БДУ ФСТЭК when a [`cve:` block](/en/cve/) is
configured. Both are followed as published: NVD's range for BlastRADIUS
(CVE-2024-3596) only covers versions before 3.0.27, with nothing for the
3.2 branch (fixed in 3.2.5), so a 3.2.3 host gets no finding for it.

## Lifecycle resolver

`github-tag-branches:FreeRADIUS/freeradius-server`. endoflife.date has
no FreeRADIUS page (confirmed 404), and FreeRADIUS maintains 3.0.x and
3.2.x side by side, tagging releases like `release_3_2_10`. This
resolver type reads the tags as **one lifecycle cycle per major.minor
branch**, each with its own latest tag, so a fully patched 3.0.28 reads
as `current` in its branch with a newer branch available — not "behind
3.2.10". Only GitHub's maximum page of 100 tags is read; like the other
GitHub resolvers it carries no EOL dates, and `GITHUB_TOKEN` raises its
rate limit (see [Supported products](/en/products/)).
