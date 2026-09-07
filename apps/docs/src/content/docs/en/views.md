---
title: Views
description: compact, lifecycle, drift, and fleet - four slices of the same data.
---

`check` and `export` both render one of four focuses, picked with
`--view` (or `settings.yaml`'s `render.default_view` when the flag isn't
passed). Each view is a different slice of the same inventory +
assessment data, not a different data source.

## `compact` (the default)

One row per target: the three axes, overall severity, and why, if
anything needs attention.

```console
$ enodia check
ID           PRODUCT  PATCH   LIFECYCLE  BRANCH     SEVERITY  REASON
jira-main    jira     behind  active     newer_lts  warn      -
gitlab-main  gitlab   behind  eol        newer      fail      -
```

## `lifecycle`

When each target's lifecycle actually ends:

```console
$ enodia check --from inventory.jsonl --view lifecycle
ID           PRODUCT  LIFECYCLE  EOL         SUPPORT-ENDS  DAYS-TO-EOL
jira-main    jira     active     2026-12-05  -             338
gitlab-main  gitlab   eol        2025-01-16  2024-11-21    -350
```

## `drift`

Installed version against the latest release in the same cycle:

```console
$ enodia check --from inventory.jsonl --view drift
ID           PRODUCT  CURRENT  LATEST   CYCLE  PATCH
jira-main    jira     10.3.1   10.3.25  10.3   behind
gitlab-main  gitlab   17.5.0   17.5.5   17.5   behind
```

## `fleet`

Version spread and reachability across every instance of a product,
grouped instead of listed one row per target. This is the
**offline-only** view — it needs nothing but the inventory itself, no
lifecycle resolver, no internet access at all. Two failed instances of
the same product with different failure kinds (auth vs. unreachable) get
their own rows, not a shared `(unknown)` bucket:

```console
$ enodia check --from inventory.jsonl --view fleet
PRODUCT  VERSION    STATUS       COUNT  INSTANCES
gitlab   (unknown)  auth         1      gitlab-2
gitlab   18.2.1     ok           1      gitlab-1
jira     (unknown)  unreachable  1      jira-staging
jira     10.3.1     ok           1      jira-3
jira     10.3.2     ok           2      jira-1, jira-2
```

## What ignores `--view`

`export --format json` and `export --format prometheus` ignore `--view`
entirely — they always carry every observation and assessment. Views
only shape the table output and the HTML report (`export --format
html`) — see [Reporting](/en/reporting/).
