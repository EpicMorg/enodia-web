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
patch/branch axes still work; its lifecycle axis stays `unknown`). Click
a product for its exact endpoint, auth requirements, and recorded fields.

This table is generated from `enodia products` against the currently
built binary — re-run it to check for drift before treating this page as
gospel if it's been a while.

| Product | Summary | Resolver |
|---|---|---|
| [`artifactory`](/en/configuration/products/artifactory/) | JFrog Artifactory | `endoflife:artifactory` |
| [`bamboo`](/en/configuration/products/bamboo/) | Atlassian Bamboo (Data Center) | — |
| [`bitbucket`](/en/configuration/products/bitbucket/) | Atlassian Bitbucket (Data Center) | `endoflife:bitbucket` |
| [`bitwarden`](/en/configuration/products/bitwarden/) | Bitwarden (self-hosted) | — |
| [`confluence`](/en/configuration/products/confluence/) | Atlassian Confluence (Data Center) | `endoflife:confluence` |
| [`elasticsearch`](/en/configuration/products/elasticsearch/) | Elasticsearch | `endoflife:elasticsearch` |
| [`generic`](/en/configuration/products/generic/) | Hand-written parser for systems enodia doesn't know — see [Configuration](/en/configuration/#the-generic-probe) | — |
| [`gitlab`](/en/configuration/products/gitlab/) | GitLab | `endoflife:gitlab` |
| [`grafana`](/en/configuration/products/grafana/) | Grafana | `endoflife:grafana` |
| [`jellyfin`](/en/configuration/products/jellyfin/) | Jellyfin | — |
| [`jenkins`](/en/configuration/products/jenkins/) | Jenkins | `endoflife:jenkins` |
| [`jira`](/en/configuration/products/jira/) | Atlassian Jira (Data Center) | `endoflife:jira-software` |
| [`keycloak`](/en/configuration/products/keycloak/) | Keycloak | `endoflife:keycloak` |
| [`mattermost`](/en/configuration/products/mattermost/) | Mattermost | `endoflife:mattermost` |
| [`mysql`](/en/configuration/products/mysql/) | MySQL Server | `endoflife:mysql` |
| [`nextcloud`](/en/configuration/products/nextcloud/) | Nextcloud | `endoflife:nextcloud` |
| [`owncast`](/en/configuration/products/owncast/) | Owncast | — |
| [`perforce-swarm`](/en/configuration/products/perforce-swarm/) | Perforce Helix Swarm | — |
| [`portainer`](/en/configuration/products/portainer/) | Portainer | — |
| [`postgresql`](/en/configuration/products/postgresql/) | PostgreSQL | `endoflife:postgresql` |
| [`redis`](/en/configuration/products/redis/) | Redis | `endoflife:redis` |
| [`sonarqube`](/en/configuration/products/sonarqube/) | SonarQube | `endoflife:sonarqube-community` |
| [`ssh`](/en/configuration/products/ssh/) | SSH banner (any implementation) | — |
| [`teamcity`](/en/configuration/products/teamcity/) | JetBrains TeamCity | — |
| [`testrail`](/en/configuration/products/testrail/) | TestRail | — |
| [`vault`](/en/configuration/products/vault/) | HashiCorp Vault | `endoflife:hashicorp-vault` |
| [`vaultwarden`](/en/configuration/products/vaultwarden/) | Vaultwarden | — |
| [`vcenter`](/en/configuration/products/vcenter/) | VMware vCenter Server | `endoflife:vcenter` |
| [`zou`](/en/configuration/products/zou/) | Zou (CG-Wire / Kitsu backend) | — |

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
