---
title: Concepts
description: The design decisions behind enodia - why it's shaped the way it is.
---

These are the load-bearing decisions behind enodia's design. Understanding
them explains a lot of behavior that would otherwise look arbitrary.

## Two phases, deliberately separable

Collection talks to your services. Evaluation talks to the internet
(vendor lifecycle calendars). In a lot of real infrastructure, nothing
has network access to both at once.

```
collect  →  inventory.jsonl  →  evaluate  →  assessment  →  render
```

```bash
# inside the closed network - no internet needed
enodia collect --config config.yaml -o inventory.jsonl

# anywhere else - no access to your services needed
enodia check --from inventory.jsonl
```

`enodia check` with no `--from` is these two phases composed in one
process, not a second code path — the inventory produced along the way
is a real, first-class artifact (with its own schema and version), not
just an in-memory intermediate value.

## Three orthogonal axes, not one status

A branch can be perfectly healthy while a newer major exists —
Confluence 10 LTS is current within its branch, actively supported, and
a newer major has shipped, all at once. Collapsing that into a single
status throws away the information you actually wanted.

| Axis | Values |
|---|---|
| Patch | `current` · `behind` · `ahead` · `unknown` |
| Lifecycle | `active` · `security` · `eol` · `unknown` |
| Newer branch | `latest` · `newer` · `newer_lts` · `unknown` |

`ahead` isn't exotic — release candidates and calendar lag between a
vendor's announcement and their download page produce it routinely.

## Facts and judgement are separate

An `Observation` holds what was actually seen: a version string, whether
the target was reachable, what error (if any) occurred. An `Assessment`
holds what enodia's policy thinks about those facts — severity, computed
on top, from policy you control.

Exporting `--format json` emits facts. A consumer with different
priorities can apply their own policy on top instead of enodia's. Baking
severity into the observation itself would make that impossible.

## Time is a parameter

Evaluation takes an explicit `asOf` timestamp — nothing in the
evaluation path calls the system clock directly. `check --from` takes
`asOf` from the inventory's own header (`collectedAt`), so a month-old
inventory is evaluated as of *when it was collected*, not silently
re-judged against today. Re-running the same evaluation later produces
the same result.

## Probes are compiled in, not a YAML DSL

Every vendor's API differs enough that a declarative probe language only
looks general right up until the first vendor outside the set it was
built for. Each probe is one Go file with one explicit entry in a
registry — encoding vendor knowledge in code means an `if` is just an
`if`, readable and debuggable, instead of a conditional re-expressed in
YAML.

This means adding a new product needs a release, not just an edit to
your own config. The escape hatch: `product: generic` accepts a parser
spec (`json` / `xml` / `header` / `plaintext` / `regex`) directly from
your config, for the in-house systems that will never get a dedicated
probe — see [Configuration](/en/configuration/#the-generic-probe). The
generic probe's vocabulary is deliberately frozen: no conditionals, no
loops, no chained requests. A target that needs any of that needs a real
probe, written in Go.

## HTTPS first, credentials never sent in the clear by default

Scheme resolution for a target with no explicit `https://`/`http://` in
its address: try `https` first, fall back to `http`, and warn either
way. enodia never tries `http` first — the first request would already
carry a credential in the clear, and a later redirect to `https`
wouldn't un-send it. An `http://` target with credentials attached is a
hard error unless `allow_insecure_transport: true` is set on that
specific service.

## No built-in web server that polls on request

`enodia serve` and `export --format html` both show the latest finished
snapshot — neither one ever triggers a fresh collection in response to
a request. A refresh button that polls your entire fleet on every click
is a self-inflicted denial-of-service against your own production.
Collection runs on a schedule (`serve --interval`, or cron/a systemd
timer regenerating an HTML export); HTTP only ever reads whatever the
last successful cycle produced.
