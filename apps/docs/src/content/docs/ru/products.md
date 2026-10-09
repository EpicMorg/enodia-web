---
title: Поддерживаемые продукты
description: Все 123 встроенные пробы, прямо из `enodia products`.
---

123 продукта, у каждого — вкомпилированная проба (см.
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
точки — см. [pgAdmin](/ru/configuration/products/pgadmin/)), либо
`github-tag-branches:<owner/repo>` для проекта, который поддерживает
несколько веток релизов одновременно (по одному циклу на каждую
major.minor, у каждого свой последний тег — см.
[FreeRADIUS](/ru/configuration/products/freeradius/)); `—` значит,
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

Начиная с 2.2, резолверы на базе GitHub ещё и читают теги релизов так,
как их на самом деле пишут проекты: ведущий `<repo>-`/`<repo>_`
отбрасывается (`weblate-2026.10` читается как `2026.10`), теги с
подчёркиваниями (`Release_1_18_0`) и с префиксом `release-`
(`release-5.2.4`) разбираются как версии, а тег, который называет
пре-релиз (`5.3.0.M2`, `2026.10.0b7`, `-rc1`, `-beta.1`), пропускается,
даже если GitHub его так не помечает.

**CVE** — по каким базам продукт сверяется, если настроен
[блок `cve:`](/ru/cve/): `NVD`, `BDU` (БДУ ФСТЭК) или `—`, если сверки
нет; `данные MariaDB`, `данные Atlassian`, `данные PostgreSQL` и
`данные nginx` добавляют собственные данные безопасности этого вендора
(см. [Собственные данные вендоров](/ru/cve/#собственные-данные-вендоров)).
Десять дистрибутивов Linux сверяются не по релизу, а по каждому
установленному пакету — `(пакеты)` называет источник: Debian Security
Tracker, OVAL вендора или secdb Alpine (см.
[CVE на уровне пакетов](/ru/cve/#cve-на-уровне-пакетов-для-дистрибутивов-linux));
причина для каждого такого случая — на странице
[Сопоставление с CVE](/ru/cve/#какие-продукты-сопоставляются)). Эта
колонка взята из собственных таблиц продуктов enodia, а не из `enodia
products`.

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

92 продукта, опрашиваемых по HTTP(S) или сырому wire-протоколу (MySQL,
Redis, MongoDB, Cassandra, ...). Пять из них — исключения:
[`p4d`](/ru/configuration/products/p4d/) и
[`p4p`](/ru/configuration/products/p4p/) не говорят ни на одном
wire-протоколе, который реализует сама enodia, — оба обращаются к
собственному CLI `p4` оператора, который должен быть установлен на той
же машине, что и сама enodia, а не просто быть доступным по сети, — а
[`freeradius`](/ru/configuration/products/freeradius/),
[`kafka`](/ru/configuration/products/kafka/) и
[`minio`](/ru/configuration/products/minio/) читаются через SSH, из
собственного бинарника или jar сервера: RADIUS не умеет сообщать версию,
у Kafka она есть только в JMX, а у MinIO — только за ключом
администратора.

| Продукт | Описание | Резолвер | CVE |
|---|---|---|---|
| [`apache`](/ru/configuration/products/apache/) | Apache HTTP Server | `endoflife:apache-http-server` | NVD, BDU |
| [`artifactory`](/ru/configuration/products/artifactory/) | JFrog Artifactory | `endoflife:artifactory` | NVD, BDU |
| [`bamboo`](/ru/configuration/products/bamboo/) | Atlassian Bamboo (Data Center) | `endoflife:bamboo` | NVD, BDU, данные Atlassian |
| [`bitbucket`](/ru/configuration/products/bitbucket/) | Atlassian Bitbucket (Data Center) | `endoflife:bitbucket` | NVD, BDU, данные Atlassian |
| [`bitwarden`](/ru/configuration/products/bitwarden/) | Bitwarden (self-hosted) | `github:bitwarden/server` | NVD |
| [`cassandra`](/ru/configuration/products/cassandra/) | Apache Cassandra (нативный протокол CQL) | `endoflife:apache-cassandra` | NVD, BDU |
| [`clickhouse`](/ru/configuration/products/clickhouse/) | ClickHouse | `endoflife:clickhouse` | NVD, BDU |
| [`code-server`](/ru/configuration/products/code-server/) | code-server (VS Code в браузере) | `github:coder/code-server` | NVD |
| [`confluence`](/ru/configuration/products/confluence/) | Atlassian Confluence (Data Center) | `endoflife:confluence` | NVD, BDU, данные Atlassian |
| [`dell-idrac`](/ru/configuration/products/dell-idrac/) | Dell iDRAC | — | NVD, BDU |
| [`domainmod`](/ru/configuration/products/domainmod/) | DomainMOD | `github:domainmod/domainmod` | NVD |
| [`doxygen`](/ru/configuration/products/doxygen/) | Сайт документации, сгенерированный Doxygen | `github:doxygen/doxygen` | NVD |
| [`elasticsearch`](/ru/configuration/products/elasticsearch/) | Elasticsearch | `endoflife:elasticsearch` | NVD, BDU |
| [`esxi`](/ru/configuration/products/esxi/) | VMware ESXi | `endoflife:esxi` | — |
| [`euro-office`](/ru/configuration/products/euro-office/) | Euro-Office Docs (форк ONLYOFFICE) | `github:Euro-Office/DocumentServer` | — |
| [`forgejo`](/ru/configuration/products/forgejo/) | Forgejo | `endoflife:forgejo` | NVD, BDU |
| [`fortios`](/ru/configuration/products/fortios/) | Fortinet FortiOS (FortiGate) | `endoflife:fortios` | NVD, BDU |
| [`freeradius`](/ru/configuration/products/freeradius/) | FreeRADIUS | `github-tag-branches:FreeRADIUS/freeradius-server` | NVD, BDU |
| [`generic`](/ru/configuration/products/generic/) | Самописный парсер для систем, которые enodia не знает — см. [Конфигурацию](/ru/configuration/#generic-проба) | — | — |
| [`ghost`](/ru/configuration/products/ghost/) | Ghost | `github:TryGhost/Ghost` | NVD, BDU |
| [`gitlab`](/ru/configuration/products/gitlab/) | GitLab | `endoflife:gitlab` | NVD, BDU |
| [`grafana`](/ru/configuration/products/grafana/) | Grafana | `endoflife:grafana` | NVD, BDU |
| [`graylog`](/ru/configuration/products/graylog/) | Graylog | `endoflife:graylog` | NVD, BDU |
| [`greenbone`](/ru/configuration/products/greenbone/) | Greenbone / OpenVAS (веб-демон gsad) | `github:greenbone/gsad` | NVD |
| [`haproxy`](/ru/configuration/products/haproxy/) | HAProxy | `endoflife:haproxy` | NVD, BDU |
| [`harbor`](/ru/configuration/products/harbor/) | Harbor (реестр контейнеров) | `endoflife:harbor` | NVD, BDU |
| [`home-assistant`](/ru/configuration/products/home-assistant/) | Home Assistant (REST API, долгоживущий токен) | `github:home-assistant/core` | NVD |
| [`hp-ilo4`](/ru/configuration/products/hp-ilo4/) | HP iLO 4 | — | NVD, BDU |
| [`jaeger`](/ru/configuration/products/jaeger/) | Jaeger | `endoflife:jaeger` | NVD |
| [`jellyfin`](/ru/configuration/products/jellyfin/) | Jellyfin | `github:jellyfin/jellyfin` | NVD |
| [`jenkins`](/ru/configuration/products/jenkins/) | Jenkins | `endoflife:jenkins` | NVD, BDU |
| [`jira`](/ru/configuration/products/jira/) | Atlassian Jira (Data Center) | `endoflife:jira-software` | NVD, BDU, данные Atlassian |
| [`kafka`](/ru/configuration/products/kafka/) | Брокер Apache Kafka (по SSH) | `endoflife:apache-kafka` | NVD, BDU |
| [`keycloak`](/ru/configuration/products/keycloak/) | Keycloak | `endoflife:keycloak` | NVD, BDU |
| [`kibana`](/ru/configuration/products/kibana/) | Kibana | `endoflife:kibana` | NVD, BDU |
| [`kitsu`](/ru/configuration/products/kitsu/) | Kitsu (фронтенд CG-Wire / Zou) | `github:cgwire/kitsu` | — |
| [`libretranslate`](/ru/configuration/products/libretranslate/) | LibreTranslate | `github:LibreTranslate/LibreTranslate` | — |
| [`logstash`](/ru/configuration/products/logstash/) | Logstash | `endoflife:logstash` | NVD, BDU |
| [`mariadb`](/ru/configuration/products/mariadb/) | MariaDB Server | `endoflife:mariadb` | NVD, BDU, данные MariaDB |
| [`mattermost`](/ru/configuration/products/mattermost/) | Mattermost | `endoflife:mattermost` | NVD, BDU |
| [`memcached`](/ru/configuration/products/memcached/) | memcached | `endoflife:memcached` | NVD, BDU |
| [`minio`](/ru/configuration/products/minio/) | MinIO (бинарник сервера, по SSH) | `github:minio/minio` | NVD, BDU |
| [`mongodb`](/ru/configuration/products/mongodb/) | MongoDB | `endoflife:mongodb` | NVD, BDU |
| [`mysql`](/ru/configuration/products/mysql/) | MySQL Server | `endoflife:mysql` | NVD, BDU |
| [`netbox`](/ru/configuration/products/netbox/) | NetBox | `github:netbox-community/netbox` | NVD |
| [`netdata`](/ru/configuration/products/netdata/) | Агент Netdata | `github:netdata/netdata` | NVD, BDU |
| [`nextcloud`](/ru/configuration/products/nextcloud/) | Nextcloud | `endoflife:nextcloud` | NVD, BDU |
| [`nexus`](/ru/configuration/products/nexus/) | Sonatype Nexus Repository | `endoflife:nexus` | NVD, BDU |
| [`nginx`](/ru/configuration/products/nginx/) | nginx | `endoflife:nginx` | NVD, BDU, данные nginx |
| [`oauth2-proxy`](/ru/configuration/products/oauth2-proxy/) | oauth2-proxy | `github:oauth2-proxy/oauth2-proxy` | NVD, BDU |
| [`onlyoffice`](/ru/configuration/products/onlyoffice/) | ONLYOFFICE Docs (Document Server) | `github:ONLYOFFICE/DocumentServer` | NVD, BDU |
| [`openhab`](/ru/configuration/products/openhab/) | openHAB | `github:openhab/openhab-distro` | NVD |
| [`opensearch`](/ru/configuration/products/opensearch/) | OpenSearch | `endoflife:opensearch` | NVD, BDU |
| [`owncast`](/ru/configuration/products/owncast/) | Owncast | `github:owncast/owncast` | NVD |
| [`p4d`](/ru/configuration/products/p4d/) | Perforce Helix Core Server (p4d) | — | NVD, BDU |
| [`p4p`](/ru/configuration/products/p4p/) | Perforce Proxy (p4p) | — | — |
| [`perforce-swarm`](/ru/configuration/products/perforce-swarm/) | Perforce Helix Swarm | — | — |
| [`pgadmin`](/ru/configuration/products/pgadmin/) | pgAdmin | `github-tags:pgadmin-org/pgadmin4` | NVD, BDU |
| [`phpipam`](/ru/configuration/products/phpipam/) | phpIPAM | `github:phpipam/phpipam` | NVD, BDU |
| [`phpmyadmin`](/ru/configuration/products/phpmyadmin/) | phpMyAdmin | `endoflife:phpmyadmin` | NVD, BDU |
| [`portainer`](/ru/configuration/products/portainer/) | Portainer | `github:portainer/portainer` | NVD, BDU |
| [`postgres_exporter`](/ru/configuration/products/postgres_exporter/) | prometheus-community/postgres_exporter | `github:prometheus-community/postgres_exporter` | — |
| [`postgresql`](/ru/configuration/products/postgresql/) | PostgreSQL | `endoflife:postgresql` | NVD, BDU, данные PostgreSQL |
| [`posthog`](/ru/configuration/products/posthog/) | PostHog (self-hosted; версия — это git-коммит) | — | — |
| [`proftpd`](/ru/configuration/products/proftpd/) | ProFTPD | `endoflife:proftpd` | NVD, BDU |
| [`proxmox`](/ru/configuration/products/proxmox/) | Proxmox VE | `endoflife:proxmox-ve` | NVD, BDU |
| [`qbittorrent`](/ru/configuration/products/qbittorrent/) | qBittorrent (API Web UI) | `github:qbittorrent/qBittorrent` | NVD, BDU |
| [`rabbitmq`](/ru/configuration/products/rabbitmq/) | RabbitMQ (API плагина management) | `endoflife:rabbitmq` | NVD, BDU |
| [`redis`](/ru/configuration/products/redis/) | Redis | `endoflife:redis` | NVD, BDU |
| [`routeros`](/ru/configuration/products/routeros/) | MikroTik RouterOS | `endoflife:routeros` | NVD, BDU |
| [`sentry`](/ru/configuration/products/sentry/) | Sentry (self-hosted) | `github:getsentry/self-hosted` | NVD |
| [`sonarqube`](/ru/configuration/products/sonarqube/) | SonarQube (Server или Community Build) | `endoflife:sonarqube-server`\* | NVD, BDU |
| [`splunk`](/ru/configuration/products/splunk/) | Splunk Enterprise (management API splunkd) | `endoflife:splunk` | NVD, BDU |
| [`ssh`](/ru/configuration/products/ssh/) | SSH-баннер (любая реализация) | — | NVD, BDU |
| [`supermicro-bmc`](/ru/configuration/products/supermicro-bmc/) | Supermicro BMC | — | — |
| [`synology-dsm`](/ru/configuration/products/synology-dsm/) | Synology DSM | — | NVD, BDU |
| [`teamcity`](/ru/configuration/products/teamcity/) | JetBrains TeamCity | — | NVD, BDU |
| [`testrail`](/ru/configuration/products/testrail/) | TestRail | — | NVD |
| [`torrserver`](/ru/configuration/products/torrserver/) | TorrServer | `github:YouROK/TorrServer` | — |
| [`traefik`](/ru/configuration/products/traefik/) | Traefik | `endoflife:traefik` | NVD, BDU |
| [`truenas`](/ru/configuration/products/truenas/) | TrueNAS | `endoflife:truenas` | — |
| [`uptime-kuma`](/ru/configuration/products/uptime-kuma/) | Uptime Kuma (вход через socket.io) | `github:louislam/uptime-kuma` | NVD |
| [`vault`](/ru/configuration/products/vault/) | HashiCorp Vault | `endoflife:hashicorp-vault` | NVD, BDU |
| [`vaultwarden`](/ru/configuration/products/vaultwarden/) | Vaultwarden | `github:dani-garcia/vaultwarden` | NVD, BDU |
| [`vcenter`](/ru/configuration/products/vcenter/) | VMware vCenter Server | `endoflife:vcenter` | — |
| [`wapt`](/ru/configuration/products/wapt/) | Сервер WAPT (Tranquil IT) | — | NVD |
| [`weblate`](/ru/configuration/products/weblate/) | Weblate | `github:WeblateOrg/weblate` | NVD |
| [`wordpress`](/ru/configuration/products/wordpress/) | WordPress | `endoflife:wordpress` | NVD, BDU |
| [`youtrack`](/ru/configuration/products/youtrack/) | YouTrack | `endoflife:youtrack` | NVD, BDU |
| [`zabbix`](/ru/configuration/products/zabbix/) | Zabbix | `endoflife:zabbix` | NVD, BDU |
| [`zookeeper`](/ru/configuration/products/zookeeper/) | Apache ZooKeeper | `endoflife:zookeeper` | NVD, BDU |
| [`zou`](/ru/configuration/products/zou/) | Zou (API-бэкенд CG-Wire) | — | — |

## Операционные системы

31 продукт, все определяются через **SSH**, а не HTTP — общий
механизм, который использует каждый из них, описан на странице
[SSH-пробы для определения ОС](/ru/configuration/products/ssh-os-probes/).

| Продукт | Описание | Резолвер | CVE |
|---|---|---|---|
| [`almalinux`](/ru/configuration/products/almalinux/) | AlmaLinux | `endoflife:almalinux` | OVAL (пакеты) |
| [`alpine-linux`](/ru/configuration/products/alpine-linux/) | Alpine Linux | `endoflife:alpine-linux` | secdb Alpine (пакеты) |
| [`amazon-linux`](/ru/configuration/products/amazon-linux/) | Amazon Linux | `endoflife:amazon-linux` | — |
| [`astra-linux`](/ru/configuration/products/astra-linux/) | Astra Linux | — | OVAL (пакеты) |
| [`centos`](/ru/configuration/products/centos/) | CentOS Linux (устаревший, EOL) | `endoflife:centos` | — |
| [`centos-stream`](/ru/configuration/products/centos-stream/) | CentOS Stream | `endoflife:centos-stream` | — |
| [`debian`](/ru/configuration/products/debian/) | Debian | `endoflife:debian` | трекер Debian (пакеты) |
| [`eurolinux`](/ru/configuration/products/eurolinux/) | EuroLinux | `endoflife:eurolinux` | — |
| [`fedora`](/ru/configuration/products/fedora/) | Fedora Linux | `endoflife:fedora` | — |
| [`freebsd`](/ru/configuration/products/freebsd/) | FreeBSD | `endoflife:freebsd` | — |
| [`gentoo`](/ru/configuration/products/gentoo/) | Gentoo Linux | — | — |
| [`kali-linux`](/ru/configuration/products/kali-linux/) | Kali Linux | — | — |
| [`linuxmint`](/ru/configuration/products/linuxmint/) | Linux Mint | `endoflife:linuxmint` | OVAL (пакеты) |
| [`macos`](/ru/configuration/products/macos/) | macOS | `endoflife:macos` | NVD, BDU |
| [`netbsd`](/ru/configuration/products/netbsd/) | NetBSD | `endoflife:netbsd` | — |
| [`nixos`](/ru/configuration/products/nixos/) | NixOS | `endoflife:nixos` | — |
| [`openbsd`](/ru/configuration/products/openbsd/) | OpenBSD | `endoflife:openbsd` | — |
| [`openeuler`](/ru/configuration/products/openeuler/) | openEuler | — | — |
| [`opensuse`](/ru/configuration/products/opensuse/) | openSUSE | `endoflife:opensuse` | — |
| [`opnsense`](/ru/configuration/products/opnsense/) | OPNsense | `endoflife:opnsense` | NVD, BDU |
| [`oracle-linux`](/ru/configuration/products/oracle-linux/) | Oracle Linux | `endoflife:oracle-linux` | OVAL (пакеты) |
| [`oracle-solaris`](/ru/configuration/products/oracle-solaris/) | Oracle Solaris | `endoflife:oracle-solaris` | — |
| [`pfsense`](/ru/configuration/products/pfsense/) | pfSense Community Edition | — | NVD, BDU |
| [`photon`](/ru/configuration/products/photon/) | VMware Photon OS | `endoflife:photon` | — |
| [`postmarketos`](/ru/configuration/products/postmarketos/) | postmarketOS | `endoflife:postmarketos` | — |
| [`redos`](/ru/configuration/products/redos/) | RED OS | — | OVAL (пакеты) |
| [`rhel`](/ru/configuration/products/rhel/) | Red Hat Enterprise Linux | `endoflife:rhel` | OVAL (пакеты) |
| [`rocky-linux`](/ru/configuration/products/rocky-linux/) | Rocky Linux | `endoflife:rocky-linux` | OVAL (пакеты) |
| [`slackware`](/ru/configuration/products/slackware/) | Slackware | `endoflife:slackware` | — |
| [`steamos`](/ru/configuration/products/steamos/) | SteamOS | `endoflife:steamos` | — |
| [`ubuntu`](/ru/configuration/products/ubuntu/) | Ubuntu | `endoflife:ubuntu` | OVAL (пакеты) |

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
