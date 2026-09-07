---
title: Supported products
description: All 29 built-in probes, straight from `enodia products`.
---

29 products, each a compiled-in probe (see
[Concepts](/en/concepts/#probes-are-compiled-in-not-a-yaml-dsl)). Use the
value in **Product** as `product:` in a target. **Resolver** is the
[endoflife.date](https://endoflife.date/) identifier used to look up
lifecycle dates, where one applies — a `-` means enodia has version
detection for that product but no lifecycle-calendar match yet (its
patch/branch axes still work; its lifecycle axis stays `unknown`).

This table is generated from `enodia products` against the currently
built binary — re-run it to check for drift before treating this page as
gospel if it's been a while.

| Product | Summary | Resolver |
|---|---|---|
| `artifactory` | JFrog Artifactory | `endoflife:artifactory` |
| `bamboo` | Atlassian Bamboo (Data Center) | — |
| `bitbucket` | Atlassian Bitbucket (Data Center) | `endoflife:bitbucket` |
| `bitwarden` | Bitwarden (self-hosted) | — |
| `confluence` | Atlassian Confluence (Data Center) | `endoflife:confluence` |
| `elasticsearch` | Elasticsearch | `endoflife:elasticsearch` |
| `generic` | Hand-written parser for systems enodia doesn't know — see [Configuration](/en/configuration/#the-generic-probe) | — |
| `gitlab` | GitLab | `endoflife:gitlab` |
| `grafana` | Grafana | `endoflife:grafana` |
| `jellyfin` | Jellyfin | — |
| `jenkins` | Jenkins | `endoflife:jenkins` |
| `jira` | Atlassian Jira (Data Center) | `endoflife:jira-software` |
| `keycloak` | Keycloak | `endoflife:keycloak` |
| `mattermost` | Mattermost | `endoflife:mattermost` |
| `mysql` | MySQL Server | `endoflife:mysql` |
| `nextcloud` | Nextcloud | `endoflife:nextcloud` |
| `owncast` | Owncast | — |
| `perforce-swarm` | Perforce Helix Swarm | — |
| `portainer` | Portainer | — |
| `postgresql` | PostgreSQL | `endoflife:postgresql` |
| `redis` | Redis | `endoflife:redis` |
| `sonarqube` | SonarQube | `endoflife:sonarqube-community` |
| `ssh` | SSH banner (any implementation) | — |
| `teamcity` | JetBrains TeamCity | — |
| `testrail` | TestRail | — |
| `vault` | HashiCorp Vault | `endoflife:hashicorp-vault` |
| `vaultwarden` | Vaultwarden | — |
| `vcenter` | VMware vCenter Server | `endoflife:vcenter` |
| `zou` | Zou (CG-Wire / Kitsu backend) | — |

## Atlassian products

Jira, Confluence, Bitbucket, and Bamboo share one manifest endpoint
convention. `product:` is declared explicitly in your config rather than
guessed from the response — pointing a Confluence URL at a Jira entry is
a real typo that deserves to be caught, not silently recorded as a wrong
fact. Bitbucket's own manifest still reports itself as `stash` (its
former name) — that's the vendor's response, not an enodia quirk.

## Don't see your product?

Use [`product: generic`](/en/configuration/#the-generic-probe) as an
escape hatch for anything without a dedicated probe, or open an issue on
[GitHub](https://github.com/EpicMorg/enodia/issues) — the
`.github/ISSUE_TEMPLATE/new_product.yml` template asks for exactly what
a new probe needs.
