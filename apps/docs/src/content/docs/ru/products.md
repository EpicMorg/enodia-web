---
title: Поддерживаемые продукты
description: Все 89 встроенных проб, прямо из `enodia products`.
---

89 продуктов, у каждого — вкомпилированная проба (см.
[Концепции](/ru/concepts/#пробы-вкомпилированы-а-не-yaml-dsl)). Значение
из колонки **Продукт** используется как `product:` в таргете.
**Резолвер** — идентификатор данных о жизненном цикле:
`endoflife:<слаг>` для [endoflife.date](https://endoflife.date/)
(настоящие даты EOL/support), `github:<owner/repo>` для GitHub Releases
(только последняя версия, без eol/support/lts — у GitHub нет мнения о
политике жизненного цикла), либо `github-tags:<owner/repo>` для
репозитория вообще без Releases, только с git-тегами (то же
ограничение «только последняя версия», что и у `github:`, используется,
когда собственные теги продукта даже не похожи на обычную версию через
точки — см. [pgAdmin](/ru/configuration/products/pgadmin/)); `—` значит,
что у enodia есть определение версии для этого продукта, но пока нет
совпадения по жизненному циклу (оси patch/branch у него всё равно
работают; ось lifecycle остаётся `unknown`). Перейдите по ссылке на
нужный продукт, чтобы увидеть точный эндпоинт, требования к
аутентификации и записываемые поля.

Оба резолвера на базе GitHub по умолчанию работают без аутентификации
(ограничение 60 запросов в час, общее для всего, что делит с enodia один
исходящий IP) — задайте переменную окружения **`GITHUB_TOKEN`** (та же
конвенция, что уже используют `gh`, goreleaser и сам GitHub Actions),
чтобы поднять этот лимит до 5000 в час; пустое значение или отсутствие
переменной просто откатывается к неаутентифицированному лимиту, ничего
не ломается в любом случае.

Эта таблица сгенерирована из `enodia products` для текущей сборки
бинарника — перезапустите команду, чтобы проверить расхождение, если с
этого момента прошло много времени, прежде чем считать эту страницу
истиной в последней инстанции. **У `sonarqube`** в таблице показан
статический резолвер по умолчанию (`endoflife:sonarqube-server` — то,
что печатает `enodia products`, пока ничего ещё не опрошено) —
реальное наблюдение выбирает между ним и
`endoflife:sonarqube-community` для каждого инстанса отдельно, по самой
строке версии; см. [его собственную страницу](/ru/configuration/products/sonarqube/).

## Приложения и инфраструктурные сервисы

59 продуктов, опрашиваемых по HTTP(S) или сырому wire-протоколу (MySQL,
Redis, MongoDB, ...) — без участия SSH. Два из них,
[`p4d`](/ru/configuration/products/p4d/) и
[`p4p`](/ru/configuration/products/p4p/), — ещё одно исключение: ни
один не говорит ни на одном wire-протоколе, который реализует сама
enodia — оба обращаются к собственному CLI `p4` оператора, который
должен быть установлен на той же машине, что и сама enodia, а не
просто быть доступным по сети.

| Продукт | Описание | Резолвер |
|---|---|---|
| [`apache`](/ru/configuration/products/apache/) | Apache HTTP Server | `endoflife:apache-http-server` |
| [`artifactory`](/ru/configuration/products/artifactory/) | JFrog Artifactory | `endoflife:artifactory` |
| [`bamboo`](/ru/configuration/products/bamboo/) | Atlassian Bamboo (Data Center) | `endoflife:bamboo` |
| [`bitbucket`](/ru/configuration/products/bitbucket/) | Atlassian Bitbucket (Data Center) | `endoflife:bitbucket` |
| [`bitwarden`](/ru/configuration/products/bitwarden/) | Bitwarden (self-hosted) | `github:bitwarden/server` |
| [`clickhouse`](/ru/configuration/products/clickhouse/) | ClickHouse | `endoflife:clickhouse` |
| [`confluence`](/ru/configuration/products/confluence/) | Atlassian Confluence (Data Center) | `endoflife:confluence` |
| [`elasticsearch`](/ru/configuration/products/elasticsearch/) | Elasticsearch | `endoflife:elasticsearch` |
| [`esxi`](/ru/configuration/products/esxi/) | VMware ESXi | `endoflife:esxi` |
| [`forgejo`](/ru/configuration/products/forgejo/) | Forgejo | `endoflife:forgejo` |
| [`generic`](/ru/configuration/products/generic/) | Самописный парсер для систем, которые enodia не знает — см. [Конфигурацию](/ru/configuration/#generic-проба) | — |
| [`gitlab`](/ru/configuration/products/gitlab/) | GitLab | `endoflife:gitlab` |
| [`grafana`](/ru/configuration/products/grafana/) | Grafana | `endoflife:grafana` |
| [`graylog`](/ru/configuration/products/graylog/) | Graylog | `endoflife:graylog` |
| [`haproxy`](/ru/configuration/products/haproxy/) | HAProxy | `endoflife:haproxy` |
| [`harbor`](/ru/configuration/products/harbor/) | Harbor (реестр контейнеров) | `endoflife:harbor` |
| [`jaeger`](/ru/configuration/products/jaeger/) | Jaeger | `endoflife:jaeger` |
| [`jellyfin`](/ru/configuration/products/jellyfin/) | Jellyfin | `github:jellyfin/jellyfin` |
| [`jenkins`](/ru/configuration/products/jenkins/) | Jenkins | `endoflife:jenkins` |
| [`jira`](/ru/configuration/products/jira/) | Atlassian Jira (Data Center) | `endoflife:jira-software` |
| [`keycloak`](/ru/configuration/products/keycloak/) | Keycloak | `endoflife:keycloak` |
| [`kibana`](/ru/configuration/products/kibana/) | Kibana | `endoflife:kibana` |
| [`kitsu`](/ru/configuration/products/kitsu/) | Kitsu (фронтенд CG-Wire / Zou) | `github:cgwire/kitsu` |
| [`logstash`](/ru/configuration/products/logstash/) | Logstash | `endoflife:logstash` |
| [`mattermost`](/ru/configuration/products/mattermost/) | Mattermost | `endoflife:mattermost` |
| [`mongodb`](/ru/configuration/products/mongodb/) | MongoDB | `endoflife:mongodb` |
| [`mysql`](/ru/configuration/products/mysql/) | MySQL Server | `endoflife:mysql` |
| [`nextcloud`](/ru/configuration/products/nextcloud/) | Nextcloud | `endoflife:nextcloud` |
| [`nexus`](/ru/configuration/products/nexus/) | Sonatype Nexus Repository | `endoflife:nexus` |
| [`nginx`](/ru/configuration/products/nginx/) | nginx | `endoflife:nginx` |
| [`oauth2-proxy`](/ru/configuration/products/oauth2-proxy/) | oauth2-proxy | `github:oauth2-proxy/oauth2-proxy` |
| [`opensearch`](/ru/configuration/products/opensearch/) | OpenSearch | `endoflife:opensearch` |
| [`owncast`](/ru/configuration/products/owncast/) | Owncast | `github:owncast/owncast` |
| [`p4d`](/ru/configuration/products/p4d/) | Perforce Helix Core Server (p4d) | — |
| [`p4p`](/ru/configuration/products/p4p/) | Perforce Proxy (p4p) | — |
| [`perforce-swarm`](/ru/configuration/products/perforce-swarm/) | Perforce Helix Swarm | — |
| [`pgadmin`](/ru/configuration/products/pgadmin/) | pgAdmin | `github-tags:pgadmin-org/pgadmin4` |
| [`phpmyadmin`](/ru/configuration/products/phpmyadmin/) | phpMyAdmin | `endoflife:phpmyadmin` |
| [`portainer`](/ru/configuration/products/portainer/) | Portainer | `github:portainer/portainer` |
| [`postgres_exporter`](/ru/configuration/products/postgres_exporter/) | prometheus-community/postgres_exporter | `github:prometheus-community/postgres_exporter` |
| [`postgresql`](/ru/configuration/products/postgresql/) | PostgreSQL | `endoflife:postgresql` |
| [`proftpd`](/ru/configuration/products/proftpd/) | ProFTPD | `endoflife:proftpd` |
| [`proxmox`](/ru/configuration/products/proxmox/) | Proxmox VE | `endoflife:proxmox-ve` |
| [`redis`](/ru/configuration/products/redis/) | Redis | `endoflife:redis` |
| [`routeros`](/ru/configuration/products/routeros/) | MikroTik RouterOS | `endoflife:routeros` |
| [`sonarqube`](/ru/configuration/products/sonarqube/) | SonarQube (Server или Community Build) | `endoflife:sonarqube-server`\* |
| [`ssh`](/ru/configuration/products/ssh/) | SSH-баннер (любая реализация) | — |
| [`synology-dsm`](/ru/configuration/products/synology-dsm/) | Synology DSM | — |
| [`teamcity`](/ru/configuration/products/teamcity/) | JetBrains TeamCity | — |
| [`testrail`](/ru/configuration/products/testrail/) | TestRail | — |
| [`traefik`](/ru/configuration/products/traefik/) | Traefik | `endoflife:traefik` |
| [`truenas`](/ru/configuration/products/truenas/) | TrueNAS | `endoflife:truenas` |
| [`vault`](/ru/configuration/products/vault/) | HashiCorp Vault | `endoflife:hashicorp-vault` |
| [`vaultwarden`](/ru/configuration/products/vaultwarden/) | Vaultwarden | `github:dani-garcia/vaultwarden` |
| [`vcenter`](/ru/configuration/products/vcenter/) | VMware vCenter Server | `endoflife:vcenter` |
| [`wordpress`](/ru/configuration/products/wordpress/) | WordPress | `endoflife:wordpress` |
| [`youtrack`](/ru/configuration/products/youtrack/) | YouTrack | `endoflife:youtrack` |
| [`zabbix`](/ru/configuration/products/zabbix/) | Zabbix | `endoflife:zabbix` |
| [`zou`](/ru/configuration/products/zou/) | Zou (API-бэкенд CG-Wire) | — |

## Операционные системы

30 продуктов, все определяются через **SSH**, а не HTTP — общий
механизм, который использует каждый из них, описан на странице
[SSH-пробы для определения ОС](/ru/configuration/products/ssh-os-probes/).

| Продукт | Описание | Резолвер |
|---|---|---|
| [`almalinux`](/ru/configuration/products/almalinux/) | AlmaLinux | `endoflife:almalinux` |
| [`alpine-linux`](/ru/configuration/products/alpine-linux/) | Alpine Linux | `endoflife:alpine-linux` |
| [`amazon-linux`](/ru/configuration/products/amazon-linux/) | Amazon Linux | `endoflife:amazon-linux` |
| [`astra-linux`](/ru/configuration/products/astra-linux/) | Astra Linux | — |
| [`centos`](/ru/configuration/products/centos/) | CentOS Linux (устаревший, EOL) | `endoflife:centos` |
| [`centos-stream`](/ru/configuration/products/centos-stream/) | CentOS Stream | `endoflife:centos-stream` |
| [`debian`](/ru/configuration/products/debian/) | Debian | `endoflife:debian` |
| [`eurolinux`](/ru/configuration/products/eurolinux/) | EuroLinux | `endoflife:eurolinux` |
| [`fedora`](/ru/configuration/products/fedora/) | Fedora Linux | `endoflife:fedora` |
| [`freebsd`](/ru/configuration/products/freebsd/) | FreeBSD | `endoflife:freebsd` |
| [`gentoo`](/ru/configuration/products/gentoo/) | Gentoo Linux | — |
| [`kali-linux`](/ru/configuration/products/kali-linux/) | Kali Linux | — |
| [`linuxmint`](/ru/configuration/products/linuxmint/) | Linux Mint | `endoflife:linuxmint` |
| [`macos`](/ru/configuration/products/macos/) | macOS | `endoflife:macos` |
| [`netbsd`](/ru/configuration/products/netbsd/) | NetBSD | `endoflife:netbsd` |
| [`nixos`](/ru/configuration/products/nixos/) | NixOS | `endoflife:nixos` |
| [`openbsd`](/ru/configuration/products/openbsd/) | OpenBSD | `endoflife:openbsd` |
| [`openeuler`](/ru/configuration/products/openeuler/) | openEuler | — |
| [`opensuse`](/ru/configuration/products/opensuse/) | openSUSE | `endoflife:opensuse` |
| [`opnsense`](/ru/configuration/products/opnsense/) | OPNsense | `endoflife:opnsense` |
| [`oracle-linux`](/ru/configuration/products/oracle-linux/) | Oracle Linux | `endoflife:oracle-linux` |
| [`oracle-solaris`](/ru/configuration/products/oracle-solaris/) | Oracle Solaris | `endoflife:oracle-solaris` |
| [`photon`](/ru/configuration/products/photon/) | VMware Photon OS | `endoflife:photon` |
| [`postmarketos`](/ru/configuration/products/postmarketos/) | postmarketOS | `endoflife:postmarketos` |
| [`redos`](/ru/configuration/products/redos/) | RED OS | — |
| [`rhel`](/ru/configuration/products/rhel/) | Red Hat Enterprise Linux | `endoflife:rhel` |
| [`rocky-linux`](/ru/configuration/products/rocky-linux/) | Rocky Linux | `endoflife:rocky-linux` |
| [`slackware`](/ru/configuration/products/slackware/) | Slackware | `endoflife:slackware` |
| [`steamos`](/ru/configuration/products/steamos/) | SteamOS | `endoflife:steamos` |
| [`ubuntu`](/ru/configuration/products/ubuntu/) | Ubuntu | `endoflife:ubuntu` |

## Продукты Atlassian

Jira, Confluence, Bitbucket и Bamboo используют общую конвенцию
manifest-эндпоинта. `product:` объявляется явно в конфиге, а не
угадывается по ответу сервера — указать Confluence-адрес в записи с
`product: jira` — реальная опечатка, которую стоит поймать, а не тихо
записать как неверный факт. Собственный manifest Bitbucket всё ещё
сообщает о себе как `stash` (его прежнее имя) — это ответ вендора, а не
странность enodia.

## `zou` и `kitsu` — одна проба, два продукта

Оба указывают на один и тот же API-бэкенд Zou и отвечают на один и тот
же запрос — они зарегистрированы раздельно, потому что им нужны разные
резолверы жизненного цикла (у собственного репозитория Zou на GitHub
нет пригодных для использования Releases). Полное объяснение — на
страницах [Zou](/ru/configuration/products/zou/) и
[Kitsu](/ru/configuration/products/kitsu/).

## Не нашли свой продукт?

Используйте [`product: generic`](/ru/configuration/#generic-проба) как
аварийный выход для всего, у чего нет отдельной пробы, либо заведите
issue на [GitHub](https://github.com/EpicMorg/enodia/issues) — шаблон
`.github/ISSUE_TEMPLATE/new_product.yml` спрашивает ровно то, что нужно
для новой пробы.
