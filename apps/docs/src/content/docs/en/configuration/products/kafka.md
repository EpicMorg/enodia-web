---
title: Apache Kafka
description: Configuring enodia to probe Apache Kafka.
---

An SSH probe: it logs in to the broker's host and reads the version from
the broker's own `kafka_<scala>-<version>.jar`. Port defaults to `22`, no
scheme — the same SSH mechanism, credentials and host key verification as
the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family. `product: apache-kafka` is accepted as an alias.

```yaml
targets:
  - id: kafka-01
    product: kafka
    address: kafka-01.example.com
    credentials: linux-host-ssh
```

## Why SSH

The Kafka protocol's only anonymous exchange, ApiVersions, lists API
version ranges and no software version. JMX does carry it
(`kafka.server:type=app-info`), but JMX is Java RMI over Java
serialization — a JVM protocol stack, not something enodia reimplements for
one string — and the port is off unless the operator turns it on. Over SSH
the broker's jar names the version.

## How the version is found

Every distribution ships `kafka_<scala>-<version>.jar` in its libs
directory — Apache's image `/opt/kafka/libs/kafka_2.13-4.3.1.jar`,
Confluent's cp-kafka `/usr/share/java/kafka/kafka_2.13-8.3.2-ccs.jar`. The
probe looks for it under `$KAFKA_HOME`, `/opt/kafka`, `/opt/bitnami/kafka`,
`/usr/local/kafka` and `/usr/share/java/kafka`, and the jar's name is what
it records. `kafka-topics.sh --version` (or `kafka-topics --version`) from
`PATH` — a JVM start, a few seconds — is the fallback for an install
elsewhere.

## Kafka in a container

When Kafka runs in Docker or Podman and the host itself has no install,
name the container in `options` — the command then runs through
`docker exec` (or `podman exec`):

```yaml
targets:
  - id: kafka-01
    product: kafka
    address: kafka-01.example.com
    credentials: linux-host-ssh
    options:
      container: kafka               # the container's name
      container_runtime: podman      # optional: docker (default) or podman
```

The SSH user has to be allowed to use that runtime. The container name
is checked against Docker's own name pattern before it goes into the
remote command.

## Confluent Platform

Confluent Platform builds (`8.3.2-ccs`, `-ce`) are numbered on
Confluent's own line: since 7.0, CP x.y ships Apache Kafka (x-4).y
(7.6 → 3.6, 8.3 → 4.3; before 7.0 that didn't hold — 6.0 was 2.6), but
the patch numbers are Confluent's own. Such a build is reported as is,
with edition `confluent`, and for 7.0 and later the Apache Kafka line it
carries goes into `extra.apacheKafka`. The patch is not mapped — that
would invent a version.

## Authentication — required

An SSH credential, `ssh-key` or `password` — see
[Configuration → Credentials](/en/configuration/#credentials).

## Recorded fields

- `version` — e.g. `4.3.1`, from `/opt/kafka/libs/kafka_2.13-4.3.1.jar`;
  `8.3.2-ccs` for a Confluent build
- `edition` — `confluent` for a `-ccs`/`-ce` build, otherwise absent
- `extra.apacheKafka` — the Apache Kafka major.minor a Confluent 7.0+
  build carries, e.g. `4.3`
- `extra.container` — the container name, when `options.container` is set
- `extra.hostKeyVerified`

## CVE correlation

Matched against NVD and БДУ ФСТЭК when a [`cve:` block](/en/cve/) is
configured. A Confluent Platform build gets no lookup: its own numbering
would compare as newer than every Apache Kafka bound, and the Apache
release it carries is known only to major.minor — not enough for a
patch-level fix.

## Lifecycle resolver

`endoflife:apache-kafka`. endoflife.date has no Confluent Platform
calendar.
