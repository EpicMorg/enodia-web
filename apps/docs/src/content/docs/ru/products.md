---
title: Поддерживаемые продукты
description: Все 29 встроенных проб, прямо из `enodia products`.
---

29 продуктов, у каждого — вкомпилированная проба (см.
[Концепции](/ru/concepts/#пробы-вкомпилированы-а-не-yaml-dsl)). Значение
из колонки **Продукт** используется как `product:` в таргете.
**Резолвер** — идентификатор [endoflife.date](https://endoflife.date/),
используемый для получения дат жизненного цикла, где это применимо; `-`
значит, что у enodia есть определение версии для этого продукта, но пока
нет соответствия в календаре жизненного цикла (оси patch/branch у него
всё равно работают; ось lifecycle остаётся `unknown`).

Эта таблица сгенерирована из `enodia products` для текущей сборки
бинарника — перезапусти команду, чтобы проверить расхождение, если с
этого момента прошло много времени, прежде чем считать эту страницу
истиной в последней инстанции.

| Продукт | Описание | Резолвер |
|---|---|---|
| `artifactory` | JFrog Artifactory | `endoflife:artifactory` |
| `bamboo` | Atlassian Bamboo (Data Center) | — |
| `bitbucket` | Atlassian Bitbucket (Data Center) | `endoflife:bitbucket` |
| `bitwarden` | Bitwarden (self-hosted) | — |
| `confluence` | Atlassian Confluence (Data Center) | `endoflife:confluence` |
| `elasticsearch` | Elasticsearch | `endoflife:elasticsearch` |
| `generic` | Самописный парсер для систем, которые enodia не знает — см. [Конфигурацию](/ru/configuration/#generic-проба) | — |
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
| `ssh` | SSH-баннер (любая реализация) | — |
| `teamcity` | JetBrains TeamCity | — |
| `testrail` | TestRail | — |
| `vault` | HashiCorp Vault | `endoflife:hashicorp-vault` |
| `vaultwarden` | Vaultwarden | — |
| `vcenter` | VMware vCenter Server | `endoflife:vcenter` |
| `zou` | Zou (бэкенд CG-Wire / Kitsu) | — |

## Продукты Atlassian

Jira, Confluence, Bitbucket и Bamboo используют общую конвенцию
manifest-эндпоинта. `product:` объявляется явно в конфиге, а не
угадывается по ответу сервера — указать Confluence-адрес в записи с
`product: jira` — реальная опечатка, которую стоит поймать, а не тихо
записать как неверный факт. Собственный manifest Bitbucket всё ещё
сообщает о себе как `stash` (его прежнее имя) — это ответ вендора, а не
странность enodia.

## Не нашёл свой продукт?

Используй [`product: generic`](/ru/configuration/#generic-проба) как
аварийный выход для всего, у чего нет отдельной пробы, либо заведи issue
на [GitHub](https://github.com/EpicMorg/enodia/issues) — шаблон
`.github/ISSUE_TEMPLATE/new_product.yml` спрашивает ровно то, что нужно
для новой пробы.
