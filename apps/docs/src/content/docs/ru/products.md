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
всё равно работают; ось lifecycle остаётся `unknown`). Перейдите по
ссылке на нужный продукт, чтобы увидеть точный эндпоинт, требования к
аутентификации и записываемые поля.

Эта таблица сгенерирована из `enodia products` для текущей сборки
бинарника — перезапустите команду, чтобы проверить расхождение, если с
этого момента прошло много времени, прежде чем считать эту страницу
истиной в последней инстанции.

| Продукт | Описание | Резолвер |
|---|---|---|
| [`artifactory`](/ru/configuration/products/artifactory/) | JFrog Artifactory | `endoflife:artifactory` |
| [`bamboo`](/ru/configuration/products/bamboo/) | Atlassian Bamboo (Data Center) | — |
| [`bitbucket`](/ru/configuration/products/bitbucket/) | Atlassian Bitbucket (Data Center) | `endoflife:bitbucket` |
| [`bitwarden`](/ru/configuration/products/bitwarden/) | Bitwarden (self-hosted) | — |
| [`confluence`](/ru/configuration/products/confluence/) | Atlassian Confluence (Data Center) | `endoflife:confluence` |
| [`elasticsearch`](/ru/configuration/products/elasticsearch/) | Elasticsearch | `endoflife:elasticsearch` |
| [`generic`](/ru/configuration/products/generic/) | Самописный парсер для систем, которые enodia не знает — см. [Конфигурацию](/ru/configuration/#generic-проба) | — |
| [`gitlab`](/ru/configuration/products/gitlab/) | GitLab | `endoflife:gitlab` |
| [`grafana`](/ru/configuration/products/grafana/) | Grafana | `endoflife:grafana` |
| [`jellyfin`](/ru/configuration/products/jellyfin/) | Jellyfin | — |
| [`jenkins`](/ru/configuration/products/jenkins/) | Jenkins | `endoflife:jenkins` |
| [`jira`](/ru/configuration/products/jira/) | Atlassian Jira (Data Center) | `endoflife:jira-software` |
| [`keycloak`](/ru/configuration/products/keycloak/) | Keycloak | `endoflife:keycloak` |
| [`mattermost`](/ru/configuration/products/mattermost/) | Mattermost | `endoflife:mattermost` |
| [`mysql`](/ru/configuration/products/mysql/) | MySQL Server | `endoflife:mysql` |
| [`nextcloud`](/ru/configuration/products/nextcloud/) | Nextcloud | `endoflife:nextcloud` |
| [`owncast`](/ru/configuration/products/owncast/) | Owncast | — |
| [`perforce-swarm`](/ru/configuration/products/perforce-swarm/) | Perforce Helix Swarm | — |
| [`portainer`](/ru/configuration/products/portainer/) | Portainer | — |
| [`postgresql`](/ru/configuration/products/postgresql/) | PostgreSQL | `endoflife:postgresql` |
| [`redis`](/ru/configuration/products/redis/) | Redis | `endoflife:redis` |
| [`sonarqube`](/ru/configuration/products/sonarqube/) | SonarQube | `endoflife:sonarqube-community` |
| [`ssh`](/ru/configuration/products/ssh/) | SSH-баннер (любая реализация) | — |
| [`teamcity`](/ru/configuration/products/teamcity/) | JetBrains TeamCity | — |
| [`testrail`](/ru/configuration/products/testrail/) | TestRail | — |
| [`vault`](/ru/configuration/products/vault/) | HashiCorp Vault | `endoflife:hashicorp-vault` |
| [`vaultwarden`](/ru/configuration/products/vaultwarden/) | Vaultwarden | — |
| [`vcenter`](/ru/configuration/products/vcenter/) | VMware vCenter Server | `endoflife:vcenter` |
| [`zou`](/ru/configuration/products/zou/) | Zou (бэкенд CG-Wire / Kitsu) | — |

## Продукты Atlassian

Jira, Confluence, Bitbucket и Bamboo используют общую конвенцию
manifest-эндпоинта. `product:` объявляется явно в конфиге, а не
угадывается по ответу сервера — указать Confluence-адрес в записи с
`product: jira` — реальная опечатка, которую стоит поймать, а не тихо
записать как неверный факт. Собственный manifest Bitbucket всё ещё
сообщает о себе как `stash` (его прежнее имя) — это ответ вендора, а не
странность enodia.

## Не нашли свой продукт?

Используйте [`product: generic`](/ru/configuration/#generic-проба) как
аварийный выход для всего, у чего нет отдельной пробы, либо заведите
issue на [GitHub](https://github.com/EpicMorg/enodia/issues) — шаблон
`.github/ISSUE_TEMPLATE/new_product.yml` спрашивает ровно то, что нужно
для новой пробы.
