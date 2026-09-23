---
title: Supported products
description: All 90 built-in probes, straight from `enodia products`.
---

90 products, each a compiled-in probe (see
[Concepts](/en/concepts/#probes-are-compiled-in-not-a-yaml-dsl)). Use the
value in **Product** as `product:` in a target. **Resolver** is the
lifecycle-data identifier — `endoflife:<slug>` for
[endoflife.date](https://endoflife.date/) (real EOL/support dates),
`github:<owner/repo>` for GitHub Releases (latest version only, no
eol/support/lts — GitHub has no opinion on lifecycle policy), or
`github-tags:<owner/repo>` for a repo with no Releases at all, only git
tags (same "latest version only" limitation as `github:`, used when a
product's own tags aren't even a plain dotted version — see
[pgAdmin](/en/configuration/products/pgadmin/)) — and a `—` means enodia
has version detection for that product but no lifecycle match yet (its
patch/branch axes still work; its lifecycle axis stays `unknown`). Click
a product for its exact endpoint, auth requirements, and recorded
fields.

Both GitHub-backed resolver types are unauthenticated by default (capped
at 60 requests/hour, shared with anything else on the same source IP) —
set the **`GITHUB_TOKEN`** environment variable (the same convention
`gh`, goreleaser, and GitHub Actions itself use) to raise that to
5000/hour; empty or unset just falls back to the unauthenticated cap,
nothing breaks either way.

**CVE** lists which databases the product is matched against when a
[`cve:` block](/en/cve/) is configured — `NVD`, `BDU` (БДУ ФСТЭК), or
`—` for no CVE lookup (each unmatched case has its reason on the
[CVE correlation](/en/cve/#which-products-are-matched) page). This
column comes from enodia's own product tables, not from `enodia
products`.

This table is generated from `enodia products` against the currently
built binary — re-run it to check for drift before treating this page as
gospel if it's been a while. **`sonarqube`**'s row shows its static
fallback (`endoflife:sonarqube-server`, what `enodia products` prints
with nothing yet probed) — a real observation picks between that and
`endoflife:sonarqube-community` per instance, from the version string
itself; see [its own page](/en/configuration/products/sonarqube/).

## Applications and infrastructure services

60 products, probed over HTTP(S) or a raw wire protocol (MySQL, Redis,
MongoDB, ...) — no SSH involved. Two of them,
[`p4d`](/en/configuration/products/p4d/) and
[`p4p`](/en/configuration/products/p4p/), are a further exception:
neither speaks a wire protocol enodia implements at all — both shell
out to the operator's own `p4` CLI, which needs to be installed
alongside enodia itself, not just reachable over the network.

| Product | Summary | Resolver | CVE |
|---|---|---|---|
| [`apache`](/en/configuration/products/apache/) | Apache HTTP Server | `endoflife:apache-http-server` | NVD, BDU |
| [`artifactory`](/en/configuration/products/artifactory/) | JFrog Artifactory | `endoflife:artifactory` | NVD, BDU |
| [`bamboo`](/en/configuration/products/bamboo/) | Atlassian Bamboo (Data Center) | `endoflife:bamboo` | NVD, BDU |
| [`bitbucket`](/en/configuration/products/bitbucket/) | Atlassian Bitbucket (Data Center) | `endoflife:bitbucket` | NVD, BDU |
| [`bitwarden`](/en/configuration/products/bitwarden/) | Bitwarden (self-hosted) | `github:bitwarden/server` | NVD |
| [`clickhouse`](/en/configuration/products/clickhouse/) | ClickHouse | `endoflife:clickhouse` | NVD, BDU |
| [`confluence`](/en/configuration/products/confluence/) | Atlassian Confluence (Data Center) | `endoflife:confluence` | NVD, BDU |
| [`elasticsearch`](/en/configuration/products/elasticsearch/) | Elasticsearch | `endoflife:elasticsearch` | NVD, BDU |
| [`esxi`](/en/configuration/products/esxi/) | VMware ESXi | `endoflife:esxi` | — |
| [`forgejo`](/en/configuration/products/forgejo/) | Forgejo | `endoflife:forgejo` | NVD, BDU |
| [`fortios`](/en/configuration/products/fortios/) | Fortinet FortiOS (FortiGate) | `endoflife:fortios` | NVD, BDU |
| [`generic`](/en/configuration/products/generic/) | Hand-written parser for systems enodia doesn't know — see [Configuration](/en/configuration/#the-generic-probe) | — | — |
| [`gitlab`](/en/configuration/products/gitlab/) | GitLab | `endoflife:gitlab` | NVD, BDU |
| [`grafana`](/en/configuration/products/grafana/) | Grafana | `endoflife:grafana` | NVD, BDU |
| [`graylog`](/en/configuration/products/graylog/) | Graylog | `endoflife:graylog` | NVD, BDU |
| [`haproxy`](/en/configuration/products/haproxy/) | HAProxy | `endoflife:haproxy` | NVD, BDU |
| [`harbor`](/en/configuration/products/harbor/) | Harbor (container registry) | `endoflife:harbor` | NVD, BDU |
| [`jaeger`](/en/configuration/products/jaeger/) | Jaeger | `endoflife:jaeger` | NVD |
| [`jellyfin`](/en/configuration/products/jellyfin/) | Jellyfin | `github:jellyfin/jellyfin` | NVD |
| [`jenkins`](/en/configuration/products/jenkins/) | Jenkins | `endoflife:jenkins` | NVD, BDU |
| [`jira`](/en/configuration/products/jira/) | Atlassian Jira (Data Center) | `endoflife:jira-software` | NVD, BDU |
| [`keycloak`](/en/configuration/products/keycloak/) | Keycloak | `endoflife:keycloak` | NVD, BDU |
| [`kibana`](/en/configuration/products/kibana/) | Kibana | `endoflife:kibana` | NVD, BDU |
| [`kitsu`](/en/configuration/products/kitsu/) | Kitsu (CG-Wire / Zou frontend) | `github:cgwire/kitsu` | — |
| [`logstash`](/en/configuration/products/logstash/) | Logstash | `endoflife:logstash` | NVD, BDU |
| [`mattermost`](/en/configuration/products/mattermost/) | Mattermost | `endoflife:mattermost` | NVD, BDU |
| [`mongodb`](/en/configuration/products/mongodb/) | MongoDB | `endoflife:mongodb` | NVD, BDU |
| [`mysql`](/en/configuration/products/mysql/) | MySQL Server | `endoflife:mysql` | NVD, BDU |
| [`nextcloud`](/en/configuration/products/nextcloud/) | Nextcloud | `endoflife:nextcloud` | NVD, BDU |
| [`nexus`](/en/configuration/products/nexus/) | Sonatype Nexus Repository | `endoflife:nexus` | NVD, BDU |
| [`nginx`](/en/configuration/products/nginx/) | nginx | `endoflife:nginx` | NVD, BDU |
| [`oauth2-proxy`](/en/configuration/products/oauth2-proxy/) | oauth2-proxy | `github:oauth2-proxy/oauth2-proxy` | NVD, BDU |
| [`opensearch`](/en/configuration/products/opensearch/) | OpenSearch | `endoflife:opensearch` | NVD, BDU |
| [`owncast`](/en/configuration/products/owncast/) | Owncast | `github:owncast/owncast` | NVD |
| [`p4d`](/en/configuration/products/p4d/) | Perforce Helix Core Server (p4d) | — | NVD, BDU |
| [`p4p`](/en/configuration/products/p4p/) | Perforce Proxy (p4p) | — | — |
| [`perforce-swarm`](/en/configuration/products/perforce-swarm/) | Perforce Helix Swarm | — | — |
| [`pgadmin`](/en/configuration/products/pgadmin/) | pgAdmin | `github-tags:pgadmin-org/pgadmin4` | NVD, BDU |
| [`phpmyadmin`](/en/configuration/products/phpmyadmin/) | phpMyAdmin | `endoflife:phpmyadmin` | NVD, BDU |
| [`portainer`](/en/configuration/products/portainer/) | Portainer | `github:portainer/portainer` | NVD, BDU |
| [`postgres_exporter`](/en/configuration/products/postgres_exporter/) | prometheus-community/postgres_exporter | `github:prometheus-community/postgres_exporter` | — |
| [`postgresql`](/en/configuration/products/postgresql/) | PostgreSQL | `endoflife:postgresql` | NVD, BDU |
| [`proftpd`](/en/configuration/products/proftpd/) | ProFTPD | `endoflife:proftpd` | NVD, BDU |
| [`proxmox`](/en/configuration/products/proxmox/) | Proxmox VE | `endoflife:proxmox-ve` | NVD, BDU |
| [`redis`](/en/configuration/products/redis/) | Redis | `endoflife:redis` | NVD, BDU |
| [`routeros`](/en/configuration/products/routeros/) | MikroTik RouterOS | `endoflife:routeros` | NVD, BDU |
| [`sonarqube`](/en/configuration/products/sonarqube/) | SonarQube (Server or Community Build) | `endoflife:sonarqube-server`\* | NVD, BDU |
| [`ssh`](/en/configuration/products/ssh/) | SSH banner (any implementation) | — | NVD, BDU |
| [`synology-dsm`](/en/configuration/products/synology-dsm/) | Synology DSM | — | — |
| [`teamcity`](/en/configuration/products/teamcity/) | JetBrains TeamCity | — | NVD, BDU |
| [`testrail`](/en/configuration/products/testrail/) | TestRail | — | NVD |
| [`traefik`](/en/configuration/products/traefik/) | Traefik | `endoflife:traefik` | NVD, BDU |
| [`truenas`](/en/configuration/products/truenas/) | TrueNAS | `endoflife:truenas` | — |
| [`vault`](/en/configuration/products/vault/) | HashiCorp Vault | `endoflife:hashicorp-vault` | NVD, BDU |
| [`vaultwarden`](/en/configuration/products/vaultwarden/) | Vaultwarden | `github:dani-garcia/vaultwarden` | NVD, BDU |
| [`vcenter`](/en/configuration/products/vcenter/) | VMware vCenter Server | `endoflife:vcenter` | — |
| [`wordpress`](/en/configuration/products/wordpress/) | WordPress | `endoflife:wordpress` | NVD, BDU |
| [`youtrack`](/en/configuration/products/youtrack/) | YouTrack | `endoflife:youtrack` | NVD, BDU |
| [`zabbix`](/en/configuration/products/zabbix/) | Zabbix | `endoflife:zabbix` | NVD, BDU |
| [`zou`](/en/configuration/products/zou/) | Zou (CG-Wire API backend) | — | — |

## Operating systems

30 products, all identified over **SSH** rather than HTTP — see
[SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
for the shared mechanism every one of these uses.

| Product | Summary | Resolver | CVE |
|---|---|---|---|
| [`almalinux`](/en/configuration/products/almalinux/) | AlmaLinux | `endoflife:almalinux` | — |
| [`alpine-linux`](/en/configuration/products/alpine-linux/) | Alpine Linux | `endoflife:alpine-linux` | — |
| [`amazon-linux`](/en/configuration/products/amazon-linux/) | Amazon Linux | `endoflife:amazon-linux` | — |
| [`astra-linux`](/en/configuration/products/astra-linux/) | Astra Linux | — | — |
| [`centos`](/en/configuration/products/centos/) | CentOS Linux (legacy, EOL) | `endoflife:centos` | — |
| [`centos-stream`](/en/configuration/products/centos-stream/) | CentOS Stream | `endoflife:centos-stream` | — |
| [`debian`](/en/configuration/products/debian/) | Debian | `endoflife:debian` | — |
| [`eurolinux`](/en/configuration/products/eurolinux/) | EuroLinux | `endoflife:eurolinux` | — |
| [`fedora`](/en/configuration/products/fedora/) | Fedora Linux | `endoflife:fedora` | — |
| [`freebsd`](/en/configuration/products/freebsd/) | FreeBSD | `endoflife:freebsd` | — |
| [`gentoo`](/en/configuration/products/gentoo/) | Gentoo Linux | — | — |
| [`kali-linux`](/en/configuration/products/kali-linux/) | Kali Linux | — | — |
| [`linuxmint`](/en/configuration/products/linuxmint/) | Linux Mint | `endoflife:linuxmint` | — |
| [`macos`](/en/configuration/products/macos/) | macOS | `endoflife:macos` | NVD, BDU |
| [`netbsd`](/en/configuration/products/netbsd/) | NetBSD | `endoflife:netbsd` | — |
| [`nixos`](/en/configuration/products/nixos/) | NixOS | `endoflife:nixos` | — |
| [`openbsd`](/en/configuration/products/openbsd/) | OpenBSD | `endoflife:openbsd` | — |
| [`openeuler`](/en/configuration/products/openeuler/) | openEuler | — | — |
| [`opensuse`](/en/configuration/products/opensuse/) | openSUSE | `endoflife:opensuse` | — |
| [`opnsense`](/en/configuration/products/opnsense/) | OPNsense | `endoflife:opnsense` | NVD, BDU |
| [`oracle-linux`](/en/configuration/products/oracle-linux/) | Oracle Linux | `endoflife:oracle-linux` | — |
| [`oracle-solaris`](/en/configuration/products/oracle-solaris/) | Oracle Solaris | `endoflife:oracle-solaris` | — |
| [`photon`](/en/configuration/products/photon/) | VMware Photon OS | `endoflife:photon` | — |
| [`postmarketos`](/en/configuration/products/postmarketos/) | postmarketOS | `endoflife:postmarketos` | — |
| [`redos`](/en/configuration/products/redos/) | RED OS | — | — |
| [`rhel`](/en/configuration/products/rhel/) | Red Hat Enterprise Linux | `endoflife:rhel` | — |
| [`rocky-linux`](/en/configuration/products/rocky-linux/) | Rocky Linux | `endoflife:rocky-linux` | — |
| [`slackware`](/en/configuration/products/slackware/) | Slackware | `endoflife:slackware` | — |
| [`steamos`](/en/configuration/products/steamos/) | SteamOS | `endoflife:steamos` | — |
| [`ubuntu`](/en/configuration/products/ubuntu/) | Ubuntu | `endoflife:ubuntu` | — |

## Atlassian products

Jira, Confluence, Bitbucket, and Bamboo share one manifest endpoint
convention. `product:` is declared explicitly in your config rather than
guessed from the response — pointing a Confluence URL at a Jira entry is
a real typo that deserves to be caught, not silently recorded as a wrong
fact. Bitbucket's own manifest still reports itself as `stash` (its
former name) — that's the vendor's response, not an enodia quirk.

## `zou` and `kitsu` — one probe, two products

Both point at the same Zou API backend and answer the same request —
they're registered separately because they need different lifecycle
resolvers (Zou's own GitHub repo publishes no usable Releases). See
[Zou](/en/configuration/products/zou/) and
[Kitsu](/en/configuration/products/kitsu/) for the full explanation.

## Don't see your product?

Use [`product: generic`](/en/configuration/#the-generic-probe) as an
escape hatch for anything without a dedicated probe, or open an issue on
[GitHub](https://github.com/EpicMorg/enodia/issues) — the
`.github/ISSUE_TEMPLATE/new_product.yml` template asks for exactly what
a new probe needs.
