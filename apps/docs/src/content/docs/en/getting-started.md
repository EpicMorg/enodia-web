---
title: Getting started
description: Install enodia and run your first check.
---

## Installation

The easiest path — one command, picks the right binary for your OS/arch:

```bash
curl -fsSL https://get.enodia.sh/unix | sh   # Linux/macOS/Android (Termux)
```

```powershell
irm https://get.enodia.sh/windows | iex      # Windows
```

`enodia` is runnable immediately afterward in that same PowerShell
window — the installer patches the current session's `PATH` directly,
not just the persisted registry value a fresh terminal would pick up.

:::tip[Also works in Termux (Android)]
The same Unix one-liner works unmodified — confirmed on a real device —
but it installs a different binary under the hood than it would on real
Linux. Android's Bionic linker refuses to execute anything but a PIE
(`ET_DYN`) binary (a kernel/linker policy since Android Lollipop), and
enodia's regular `linux/arm64` build is a plain `ET_EXEC` — that failed
to exec at all on first try. `install.sh` detects Termux via
`$TERMUX_VERSION` and downloads a dedicated `android/arm64` build
instead (`GOOS=android`, PIE, interpreter `/system/bin/linker64` — a
path guaranteed to exist on any Android device, not something Termux
itself has to provide). It also falls back to `$PREFIX/bin` for the
install directory when the usual one isn't writable and `sudo` isn't a
real option (Termux's own optional `sudo` package exists but just
refuses on an unrooted device) — so no environment variable override is
needed for any of this; arm64 is the only Android architecture built for
today.
:::

:::caution[Rooted Android devices may need `su`]
Confirmed live: on a **rooted** device (Magisk/KernelSU), the correct
`android_arm64` binary can still fail to exec as the ordinary Termux
user — Cobra reports something like `unknown command "<path-to-enodia>"
for "enodia"`, which is actually the OS never handing the binary its own
arguments in the first place. Running the exact same binary via `su`
with a full path works. This is a known, open, upstream bug —
[termux-exec#40](https://github.com/termux/termux-exec/issues/40):
`termux-exec`'s own linker-exemption logic doesn't recognize Magisk/
KernelSU/`run-as`/ADB process contexts, which a rooted device commonly
puts even an ordinary Termux session into. Not something enodia's build
or `install.sh` can route around — a non-rooted device shouldn't hit
this at all.
:::

Or a package, if you'd rather your package manager track updates:

```bash
sudo dpkg -i enodia_linux_amd64.deb                # Debian/Ubuntu
sudo rpm -i enodia_linux_amd64.rpm                 # Fedora/RHEL
apk add --allow-untrusted enodia_linux_amd64.apk   # Alpine
sudo pacman -U enodia_linux_amd64.pkg.tar.zst      # Arch
```

Every package installs the binary at `/usr/bin/enodia`, man pages under
`/usr/share/man/man1/`, and creates a dedicated, unprivileged `enodia`
system user — nothing here needs root to run. Grab the right one from
the [latest release](https://github.com/EpicMorg/enodia/releases/latest).

Or a container:

```bash
docker run --rm \
  -v /etc/enodia:/config:ro \
  ghcr.io/epicmorg/enodia:latest check --config /config/config.yaml
```

**Since 1.1.0, this image is built and published by a companion repo**,
[EpicMorg/docker](https://github.com/EpicMorg/docker/tree/master/linux/ecosystem/apps/enodia),
on its own schedule — not by this project's own release pipeline
anymore, though the published address and tags stay the same. Also
published to `docker.io/epicmorg/enodia` and Quay, same tags — `latest`,
a bare major (`1`), and the exact version with no build suffix (e.g.
`1.1.0` — confirmed live; an earlier pipeline's own tags looked like
`1.0.0-1` instead, still pullable, just not how new releases tag from
here on). Two real changes worth knowing about: the image is
**`linux/amd64` only** now (arm64 was dropped when publishing moved),
and it runs as **root** rather than a dedicated user, on the project's
own `debian:trixie-light` house base instead of `scratch`.

### Build from source

Requires Go — check `go.mod` for the exact version enodia currently
targets.

```bash
git clone https://github.com/EpicMorg/enodia.git
cd enodia
go build -o enodia ./cmd/enodia
./enodia version
```

### Supported platforms

| OS | Arch | Minimum version |
|---|---|---|
| Linux | amd64, arm64 | Kernel 3.2 or later — Debian 8+, Ubuntu 14.04+, RHEL/CentOS 7+ all comfortably qualify |
| Windows | amd64, arm64, 386 | Windows 10 / Windows Server 2016 or later |
| macOS | amd64, arm64 | macOS 12 Monterey or later |
| Android (Termux) | arm64 only | Android 7 or later — [Termux's own floor](https://github.com/termux/termux-app), stricter than the Android 5.0 Lollipop PIE-support minimum that actually drove the separate build (see the Termux note above). Rooted devices may need `su` — see the caution above |

These are the Go toolchain's own floor, not something enodia adds on
top. Building from source with a newer Go raises the macOS floor
further — that's a toolchain decision, not a project one.

## Your first config

Create `enodia.yaml` next to the binary (or in any of the locations
listed in [Configuration](/en/configuration/#file-locations)):

```yaml title="enodia.yaml"
schemaVersion: 1
targets:
  - id: gitlab-main
    product: gitlab
    address: https://gitlab.example.com
```

Then run:

```bash
enodia check
```

```console
ID           PRODUCT  PATCH  LIFECYCLE  BRANCH  SEVERITY  REASON
gitlab-main  gitlab   ...
```

`check` with no `--from` collects and evaluates in one process — enodia
reaches your target, then reaches the internet to check its lifecycle
data. If your target only has network access to your infrastructure (a
closed environment) and not the internet, split the two phases instead:

```bash
# inside the closed network - no internet needed
enodia collect --config enodia.yaml -o inventory.jsonl

# anywhere else - no access to your services needed
enodia check --from inventory.jsonl
```

## Adding credentials

A target with a private API needs a named credential, resolved from
`enodia.yaml`'s own `credentials:` map (or a separate
`credentials.yaml` — see [Configuration](/en/configuration/)):

```yaml title="enodia.yaml"
schemaVersion: 1
targets:
  - id: gitlab-main
    product: gitlab
    address: https://gitlab.example.com
    credentials: gitlab-token

credentials:
  gitlab-token:
    kind: token-header
    header: PRIVATE-TOKEN
    value: "${GITLAB_TOKEN}"
```

`${GITLAB_TOKEN}` is interpolated from the environment at load time —
see [Configuration](/en/configuration/#environment-variable-interpolation).
Secrets never need to live in the same file as your service inventory.

## Next

- [Concepts](/en/concepts/) for the design decisions behind all of this.
- [CLI reference](/en/cli-reference/) for every command and flag.
- [Views](/en/views/) for `lifecycle`, `drift`, and `fleet` — not just
  the default table.
