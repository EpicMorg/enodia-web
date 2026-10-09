---
title: Підтримувані продукти
description: Усі 123 вбудовані проби, прямо з `enodia products`.
---

123 продукти, кожен — вкомпільована проба (див.
[Концепції](/uk/concepts/#проби-вкомпільовано-а-не-описано-yaml-dsl)).
Значення зі стовпця **Продукт** вказуйте як `product:` у цілі.
**Резолвер** — це ідентифікатор даних життєвого циклу: `endoflife:<slug>`
для [endoflife.date](https://endoflife.date/) (реальні дати EOL/підтримки),
`github:<owner/repo>` для GitHub Releases (лише остання версія, без
eol/support/lts — GitHub не має жодної думки щодо політики життєвого
циклу) або `github-tags:<owner/repo>` для репозиторію взагалі без
Releases, лише з git-тегами (те саме обмеження «лише остання версія», що
й у `github:`; використовується, коли власні теги продукту навіть не є
звичайною версією з крапками, — див.
[pgAdmin](/uk/configuration/products/pgadmin/)), або
`github-tag-branches:<owner/repo>` для проєкту, що підтримує кілька
гілок релізів одночасно (один цикл підтримки на кожну гілку
major.minor, кожна зі своїм останнім тегом, — див.
[FreeRADIUS](/uk/configuration/products/freeradius/)), а `—` означає, що enodia
вміє визначати версію цього продукту, але відповідності для життєвого
циклу поки немає (осі патча та гілки все одно працюють; вісь життєвого
циклу залишається `unknown`). Натисніть на продукт, щоб побачити його
точний endpoint, вимоги до автентифікації та записувані поля.

Обидва типи резолверів на основі GitHub за замовчуванням працюють без
автентифікації (обмеження — 60 запитів на годину, спільне з усім іншим,
що йде з тієї самої IP-адреси джерела), — задайте змінну середовища
**`GITHUB_TOKEN`** (та сама домовленість, що й у `gh`, goreleaser і самих
GitHub Actions), щоб підняти ліміт до 5000 на годину; порожнє або
незадане значення просто повертає до ліміту без автентифікації, нічого не
ламається в жодному разі.

Починаючи з 2.2, резолвери GitHub також читають теги релізів так, як їх
насправді пишуть проєкти: початкові `<repo>-`/`<repo>_` відкидаються
(`weblate-2026.10` читається як `2026.10`), теги з підкресленнями
(`Release_1_18_0`) і з префіксом `release-` (`release-5.2.4`)
розбираються як версії, а тег, що позначає передреліз (`5.3.0.M2`,
`2026.10.0b7`, `-rc1`, `-beta.1`), пропускається, навіть якщо GitHub не
позначає його так.

**CVE** показує, з якими базами даних зіставляється продукт, коли
налаштовано [блок `cve:`](/uk/cve/): `NVD`, `BDU` (БДУ ФСТЕК) або `—`,
якщо пошук CVE не виконується; `дані MariaDB`, `дані Atlassian`, `дані
PostgreSQL` і `дані nginx` додають власні дані безпеки відповідного
вендора (див. [Власні дані вендорів](/uk/cve/#власні-дані-вендорів)). Десять дистрибутивів Linux натомість
зіставляються за кожним встановленим пакетом, а не за релізом, —
`(пакети)` називає джерело: Debian Security Tracker, OVAL вендора або
secdb Alpine (див.
[CVE на рівні пакетів](/uk/cve/#cve-на-рівні-пакетів-для-дистрибутивів-linux)) (причину для кожного незіставленого випадку
наведено на сторінці [Зіставлення з CVE](/uk/cve/#які-продукти-зіставляються)).
Цей стовпець береться з власних таблиць продуктів enodia, а не з `enodia
products`.

Цю таблицю згенеровано з `enodia products` на поточному зібраному
бінарнику — якщо минуло чимало часу, запустіть команду ще раз і перевірте
розбіжності, перш ніж вважати цю сторінку істиною в останній інстанції.
У рядку **`sonarqube`** показано його статичний резолвер за замовчуванням
(`endoflife:sonarqube-server` — те, що виводить `enodia products`, поки
нічого ще не опитано), — реальне спостереження обирає між ним і
`endoflife:sonarqube-community` для кожного екземпляра окремо, за самим
рядком версії; див. [його власну сторінку](/uk/configuration/products/sonarqube/).

## Застосунки та інфраструктурні сервіси

92 продукти, що опитуються через HTTP(S) або «сирий» мережевий протокол
(MySQL, Redis, MongoDB, Cassandra, ...). Пʼять із них — винятки:
[`p4d`](/uk/configuration/products/p4d/) і
[`p4p`](/uk/configuration/products/p4p/) не говорять жодним мережевим
протоколом, який реалізує enodia, — обидва викликають власний CLI `p4`
оператора, який має бути встановлено поряд із самою enodia, а не просто
зробити досяжним по мережі, — а
[`freeradius`](/uk/configuration/products/freeradius/),
[`kafka`](/uk/configuration/products/kafka/) і
[`minio`](/uk/configuration/products/minio/) читаються через SSH, з
власного бінарника чи jar-файлу сервера — RADIUS не має способу
повідомити версію, Kafka повідомляє її лише в JMX, а MinIO — лише за
ключем адміністратора.

| Продукт | Опис | Резолвер | CVE |
|---|---|---|---|
| [`apache`](/uk/configuration/products/apache/) | Apache HTTP Server | `endoflife:apache-http-server` | NVD, BDU |
| [`artifactory`](/uk/configuration/products/artifactory/) | JFrog Artifactory | `endoflife:artifactory` | NVD, BDU |
| [`bamboo`](/uk/configuration/products/bamboo/) | Atlassian Bamboo (Data Center) | `endoflife:bamboo` | NVD, BDU, дані Atlassian |
| [`bitbucket`](/uk/configuration/products/bitbucket/) | Atlassian Bitbucket (Data Center) | `endoflife:bitbucket` | NVD, BDU, дані Atlassian |
| [`bitwarden`](/uk/configuration/products/bitwarden/) | Bitwarden (self-hosted) | `github:bitwarden/server` | NVD |
| [`cassandra`](/uk/configuration/products/cassandra/) | Apache Cassandra (нативний протокол CQL) | `endoflife:apache-cassandra` | NVD, BDU |
| [`clickhouse`](/uk/configuration/products/clickhouse/) | ClickHouse | `endoflife:clickhouse` | NVD, BDU |
| [`code-server`](/uk/configuration/products/code-server/) | code-server (VS Code у браузері) | `github:coder/code-server` | NVD |
| [`confluence`](/uk/configuration/products/confluence/) | Atlassian Confluence (Data Center) | `endoflife:confluence` | NVD, BDU, дані Atlassian |
| [`dell-idrac`](/uk/configuration/products/dell-idrac/) | Dell iDRAC | — | NVD, BDU |
| [`domainmod`](/uk/configuration/products/domainmod/) | DomainMOD | `github:domainmod/domainmod` | NVD |
| [`doxygen`](/uk/configuration/products/doxygen/) | Сайт документації, згенерований Doxygen | `github:doxygen/doxygen` | NVD |
| [`elasticsearch`](/uk/configuration/products/elasticsearch/) | Elasticsearch | `endoflife:elasticsearch` | NVD, BDU |
| [`esxi`](/uk/configuration/products/esxi/) | VMware ESXi | `endoflife:esxi` | — |
| [`euro-office`](/uk/configuration/products/euro-office/) | Euro-Office Docs (форк ONLYOFFICE) | `github:Euro-Office/DocumentServer` | — |
| [`forgejo`](/uk/configuration/products/forgejo/) | Forgejo | `endoflife:forgejo` | NVD, BDU |
| [`fortios`](/uk/configuration/products/fortios/) | Fortinet FortiOS (FortiGate) | `endoflife:fortios` | NVD, BDU |
| [`freeradius`](/uk/configuration/products/freeradius/) | FreeRADIUS | `github-tag-branches:FreeRADIUS/freeradius-server` | NVD, BDU |
| [`generic`](/uk/configuration/products/generic/) | Власноруч написаний парсер для систем, яких enodia не знає, — див. [Конфігурація](/uk/configuration/#проба-generic) | — | — |
| [`ghost`](/uk/configuration/products/ghost/) | Ghost | `github:TryGhost/Ghost` | NVD, BDU |
| [`gitlab`](/uk/configuration/products/gitlab/) | GitLab | `endoflife:gitlab` | NVD, BDU |
| [`grafana`](/uk/configuration/products/grafana/) | Grafana | `endoflife:grafana` | NVD, BDU |
| [`graylog`](/uk/configuration/products/graylog/) | Graylog | `endoflife:graylog` | NVD, BDU |
| [`greenbone`](/uk/configuration/products/greenbone/) | Greenbone / OpenVAS (вебдемон gsad) | `github:greenbone/gsad` | NVD |
| [`haproxy`](/uk/configuration/products/haproxy/) | HAProxy | `endoflife:haproxy` | NVD, BDU |
| [`harbor`](/uk/configuration/products/harbor/) | Harbor (реєстр контейнерів) | `endoflife:harbor` | NVD, BDU |
| [`home-assistant`](/uk/configuration/products/home-assistant/) | Home Assistant (REST API, довгостроковий токен) | `github:home-assistant/core` | NVD |
| [`hp-ilo4`](/uk/configuration/products/hp-ilo4/) | HP iLO 4 | — | NVD, BDU |
| [`jaeger`](/uk/configuration/products/jaeger/) | Jaeger | `endoflife:jaeger` | NVD |
| [`jellyfin`](/uk/configuration/products/jellyfin/) | Jellyfin | `github:jellyfin/jellyfin` | NVD |
| [`jenkins`](/uk/configuration/products/jenkins/) | Jenkins | `endoflife:jenkins` | NVD, BDU |
| [`jira`](/uk/configuration/products/jira/) | Atlassian Jira (Data Center) | `endoflife:jira-software` | NVD, BDU, дані Atlassian |
| [`kafka`](/uk/configuration/products/kafka/) | Брокер Apache Kafka (через SSH) | `endoflife:apache-kafka` | NVD, BDU |
| [`keycloak`](/uk/configuration/products/keycloak/) | Keycloak | `endoflife:keycloak` | NVD, BDU |
| [`kibana`](/uk/configuration/products/kibana/) | Kibana | `endoflife:kibana` | NVD, BDU |
| [`kitsu`](/uk/configuration/products/kitsu/) | Kitsu (фронтенд CG-Wire / Zou) | `github:cgwire/kitsu` | — |
| [`libretranslate`](/uk/configuration/products/libretranslate/) | LibreTranslate | `github:LibreTranslate/LibreTranslate` | — |
| [`logstash`](/uk/configuration/products/logstash/) | Logstash | `endoflife:logstash` | NVD, BDU |
| [`mariadb`](/uk/configuration/products/mariadb/) | MariaDB Server | `endoflife:mariadb` | NVD, BDU, дані MariaDB |
| [`mattermost`](/uk/configuration/products/mattermost/) | Mattermost | `endoflife:mattermost` | NVD, BDU |
| [`memcached`](/uk/configuration/products/memcached/) | memcached | `endoflife:memcached` | NVD, BDU |
| [`minio`](/uk/configuration/products/minio/) | MinIO (бінарник сервера, через SSH) | `github:minio/minio` | NVD, BDU |
| [`mongodb`](/uk/configuration/products/mongodb/) | MongoDB | `endoflife:mongodb` | NVD, BDU |
| [`mysql`](/uk/configuration/products/mysql/) | MySQL Server | `endoflife:mysql` | NVD, BDU |
| [`netbox`](/uk/configuration/products/netbox/) | NetBox | `github:netbox-community/netbox` | NVD |
| [`netdata`](/uk/configuration/products/netdata/) | Агент Netdata | `github:netdata/netdata` | NVD, BDU |
| [`nextcloud`](/uk/configuration/products/nextcloud/) | Nextcloud | `endoflife:nextcloud` | NVD, BDU |
| [`nexus`](/uk/configuration/products/nexus/) | Sonatype Nexus Repository | `endoflife:nexus` | NVD, BDU |
| [`nginx`](/uk/configuration/products/nginx/) | nginx | `endoflife:nginx` | NVD, BDU, дані nginx |
| [`oauth2-proxy`](/uk/configuration/products/oauth2-proxy/) | oauth2-proxy | `github:oauth2-proxy/oauth2-proxy` | NVD, BDU |
| [`onlyoffice`](/uk/configuration/products/onlyoffice/) | ONLYOFFICE Docs (Document Server) | `github:ONLYOFFICE/DocumentServer` | NVD, BDU |
| [`openhab`](/uk/configuration/products/openhab/) | openHAB | `github:openhab/openhab-distro` | NVD |
| [`opensearch`](/uk/configuration/products/opensearch/) | OpenSearch | `endoflife:opensearch` | NVD, BDU |
| [`owncast`](/uk/configuration/products/owncast/) | Owncast | `github:owncast/owncast` | NVD |
| [`p4d`](/uk/configuration/products/p4d/) | Perforce Helix Core Server (p4d) | — | NVD, BDU |
| [`p4p`](/uk/configuration/products/p4p/) | Perforce Proxy (p4p) | — | — |
| [`perforce-swarm`](/uk/configuration/products/perforce-swarm/) | Perforce Helix Swarm | — | — |
| [`pgadmin`](/uk/configuration/products/pgadmin/) | pgAdmin | `github-tags:pgadmin-org/pgadmin4` | NVD, BDU |
| [`phpipam`](/uk/configuration/products/phpipam/) | phpIPAM | `github:phpipam/phpipam` | NVD, BDU |
| [`phpmyadmin`](/uk/configuration/products/phpmyadmin/) | phpMyAdmin | `endoflife:phpmyadmin` | NVD, BDU |
| [`portainer`](/uk/configuration/products/portainer/) | Portainer | `github:portainer/portainer` | NVD, BDU |
| [`postgres_exporter`](/uk/configuration/products/postgres_exporter/) | prometheus-community/postgres_exporter | `github:prometheus-community/postgres_exporter` | — |
| [`postgresql`](/uk/configuration/products/postgresql/) | PostgreSQL | `endoflife:postgresql` | NVD, BDU, дані PostgreSQL |
| [`posthog`](/uk/configuration/products/posthog/) | PostHog (self-hosted; версія — це git-коміт) | — | — |
| [`proftpd`](/uk/configuration/products/proftpd/) | ProFTPD | `endoflife:proftpd` | NVD, BDU |
| [`proxmox`](/uk/configuration/products/proxmox/) | Proxmox VE | `endoflife:proxmox-ve` | NVD, BDU |
| [`qbittorrent`](/uk/configuration/products/qbittorrent/) | qBittorrent (Web UI API) | `github:qbittorrent/qBittorrent` | NVD, BDU |
| [`rabbitmq`](/uk/configuration/products/rabbitmq/) | RabbitMQ (API плагіна management) | `endoflife:rabbitmq` | NVD, BDU |
| [`redis`](/uk/configuration/products/redis/) | Redis | `endoflife:redis` | NVD, BDU |
| [`routeros`](/uk/configuration/products/routeros/) | MikroTik RouterOS | `endoflife:routeros` | NVD, BDU |
| [`sentry`](/uk/configuration/products/sentry/) | Sentry (self-hosted) | `github:getsentry/self-hosted` | NVD |
| [`sonarqube`](/uk/configuration/products/sonarqube/) | SonarQube (Server або Community Build) | `endoflife:sonarqube-server`\* | NVD, BDU |
| [`splunk`](/uk/configuration/products/splunk/) | Splunk Enterprise (management API splunkd) | `endoflife:splunk` | NVD, BDU |
| [`ssh`](/uk/configuration/products/ssh/) | SSH-банер (будь-яка реалізація) | — | NVD, BDU |
| [`supermicro-bmc`](/uk/configuration/products/supermicro-bmc/) | Supermicro BMC | — | — |
| [`synology-dsm`](/uk/configuration/products/synology-dsm/) | Synology DSM | — | NVD, BDU |
| [`teamcity`](/uk/configuration/products/teamcity/) | JetBrains TeamCity | — | NVD, BDU |
| [`testrail`](/uk/configuration/products/testrail/) | TestRail | — | NVD |
| [`torrserver`](/uk/configuration/products/torrserver/) | TorrServer | `github:YouROK/TorrServer` | — |
| [`traefik`](/uk/configuration/products/traefik/) | Traefik | `endoflife:traefik` | NVD, BDU |
| [`truenas`](/uk/configuration/products/truenas/) | TrueNAS | `endoflife:truenas` | — |
| [`uptime-kuma`](/uk/configuration/products/uptime-kuma/) | Uptime Kuma (вхід через socket.io) | `github:louislam/uptime-kuma` | NVD |
| [`vault`](/uk/configuration/products/vault/) | HashiCorp Vault | `endoflife:hashicorp-vault` | NVD, BDU |
| [`vaultwarden`](/uk/configuration/products/vaultwarden/) | Vaultwarden | `github:dani-garcia/vaultwarden` | NVD, BDU |
| [`vcenter`](/uk/configuration/products/vcenter/) | VMware vCenter Server | `endoflife:vcenter` | — |
| [`wapt`](/uk/configuration/products/wapt/) | Сервер WAPT (Tranquil IT) | — | NVD |
| [`weblate`](/uk/configuration/products/weblate/) | Weblate | `github:WeblateOrg/weblate` | NVD |
| [`wordpress`](/uk/configuration/products/wordpress/) | WordPress | `endoflife:wordpress` | NVD, BDU |
| [`youtrack`](/uk/configuration/products/youtrack/) | YouTrack | `endoflife:youtrack` | NVD, BDU |
| [`zabbix`](/uk/configuration/products/zabbix/) | Zabbix | `endoflife:zabbix` | NVD, BDU |
| [`zookeeper`](/uk/configuration/products/zookeeper/) | Apache ZooKeeper | `endoflife:zookeeper` | NVD, BDU |
| [`zou`](/uk/configuration/products/zou/) | Zou (API-бекенд CG-Wire) | — | — |

## Операційні системи

31 продукт, усі ідентифікуються через **SSH**, а не HTTP, — спільний
механізм, який використовує кожен із них, описано на сторінці
[Ідентифікація ОС через SSH](/uk/configuration/products/ssh-os-probes/).

| Продукт | Опис | Резолвер | CVE |
|---|---|---|---|
| [`almalinux`](/uk/configuration/products/almalinux/) | AlmaLinux | `endoflife:almalinux` | OVAL (пакети) |
| [`alpine-linux`](/uk/configuration/products/alpine-linux/) | Alpine Linux | `endoflife:alpine-linux` | secdb Alpine (пакети) |
| [`amazon-linux`](/uk/configuration/products/amazon-linux/) | Amazon Linux | `endoflife:amazon-linux` | — |
| [`astra-linux`](/uk/configuration/products/astra-linux/) | Astra Linux | — | OVAL (пакети) |
| [`centos`](/uk/configuration/products/centos/) | CentOS Linux (застаріла, EOL) | `endoflife:centos` | — |
| [`centos-stream`](/uk/configuration/products/centos-stream/) | CentOS Stream | `endoflife:centos-stream` | — |
| [`debian`](/uk/configuration/products/debian/) | Debian | `endoflife:debian` | трекер Debian (пакети) |
| [`eurolinux`](/uk/configuration/products/eurolinux/) | EuroLinux | `endoflife:eurolinux` | — |
| [`fedora`](/uk/configuration/products/fedora/) | Fedora Linux | `endoflife:fedora` | — |
| [`freebsd`](/uk/configuration/products/freebsd/) | FreeBSD | `endoflife:freebsd` | — |
| [`gentoo`](/uk/configuration/products/gentoo/) | Gentoo Linux | — | — |
| [`kali-linux`](/uk/configuration/products/kali-linux/) | Kali Linux | — | — |
| [`linuxmint`](/uk/configuration/products/linuxmint/) | Linux Mint | `endoflife:linuxmint` | OVAL (пакети) |
| [`macos`](/uk/configuration/products/macos/) | macOS | `endoflife:macos` | NVD, BDU |
| [`netbsd`](/uk/configuration/products/netbsd/) | NetBSD | `endoflife:netbsd` | — |
| [`nixos`](/uk/configuration/products/nixos/) | NixOS | `endoflife:nixos` | — |
| [`openbsd`](/uk/configuration/products/openbsd/) | OpenBSD | `endoflife:openbsd` | — |
| [`openeuler`](/uk/configuration/products/openeuler/) | openEuler | — | — |
| [`opensuse`](/uk/configuration/products/opensuse/) | openSUSE | `endoflife:opensuse` | — |
| [`opnsense`](/uk/configuration/products/opnsense/) | OPNsense | `endoflife:opnsense` | NVD, BDU |
| [`oracle-linux`](/uk/configuration/products/oracle-linux/) | Oracle Linux | `endoflife:oracle-linux` | OVAL (пакети) |
| [`oracle-solaris`](/uk/configuration/products/oracle-solaris/) | Oracle Solaris | `endoflife:oracle-solaris` | — |
| [`pfsense`](/uk/configuration/products/pfsense/) | pfSense Community Edition | — | NVD, BDU |
| [`photon`](/uk/configuration/products/photon/) | VMware Photon OS | `endoflife:photon` | — |
| [`postmarketos`](/uk/configuration/products/postmarketos/) | postmarketOS | `endoflife:postmarketos` | — |
| [`redos`](/uk/configuration/products/redos/) | RED OS | — | OVAL (пакети) |
| [`rhel`](/uk/configuration/products/rhel/) | Red Hat Enterprise Linux | `endoflife:rhel` | OVAL (пакети) |
| [`rocky-linux`](/uk/configuration/products/rocky-linux/) | Rocky Linux | `endoflife:rocky-linux` | OVAL (пакети) |
| [`slackware`](/uk/configuration/products/slackware/) | Slackware | `endoflife:slackware` | — |
| [`steamos`](/uk/configuration/products/steamos/) | SteamOS | `endoflife:steamos` | — |
| [`ubuntu`](/uk/configuration/products/ubuntu/) | Ubuntu | `endoflife:ubuntu` | OVAL (пакети) |

## Продукти Atlassian

Jira, Confluence, Bitbucket і Bamboo використовують одну спільну
домовленість щодо endpoint-а маніфесту. `product:` оголошується у Вашій
конфігурації явно, а не вгадується з відповіді: URL Confluence у записі
для Jira — це реальна помилка, яку варто перехопити, а не мовчки записати
як хибний факт. Власний маніфест Bitbucket досі називає себе `stash` (його
колишня назва) — це відповідь вендора, а не особливість enodia.

## `zou` і `kitsu` — одна проба, два продукти

Обидва вказують на той самий API-бекенд Zou і відповідають на той самий
запит — їх зареєстровано окремо, тому що їм потрібні різні резолвери
життєвого циклу (власний GitHub-репозиторій Zou не публікує придатних
Releases). Повне пояснення див. на сторінках
[Zou](/uk/configuration/products/zou/) і
[Kitsu](/uk/configuration/products/kitsu/).

## Не знайшли свій продукт?

Використовуйте [`product: generic`](/uk/configuration/#проба-generic)
як запасний вихід для всього, що не має окремої проби, або створіть issue
на [GitHub](https://github.com/EpicMorg/enodia/issues) — шаблон
`.github/ISSUE_TEMPLATE/new_product.yml` запитує саме те, що потрібно для
нової проби.
