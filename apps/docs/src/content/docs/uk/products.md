---
title: Підтримувані продукти
description: Усі 90 вбудованих проб, прямо з `enodia products`.
---

90 продуктів, кожен — вкомпільована проба (див.
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
[pgAdmin](/uk/configuration/products/pgadmin/)), а `—` означає, що enodia
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

**CVE** показує, з якими базами даних зіставляється продукт, коли
налаштовано [блок `cve:`](/uk/cve/): `NVD`, `BDU` (БДУ ФСТЕК) або `—`,
якщо пошук CVE не виконується (причину для кожного незіставленого випадку
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

60 продуктів, що опитуються через HTTP(S) або «сирий» мережевий протокол
(MySQL, Redis, MongoDB, ...) — без участі SSH. Два з них,
[`p4d`](/uk/configuration/products/p4d/) і
[`p4p`](/uk/configuration/products/p4p/), є ще одним винятком: жоден не
говорить мережевим протоколом, який реалізує enodia, — обидва викликають
власний CLI `p4` оператора, який має бути встановлено поряд із самою
enodia, а не просто зробити досяжним по мережі.

| Продукт | Опис | Резолвер | CVE |
|---|---|---|---|
| [`apache`](/uk/configuration/products/apache/) | Apache HTTP Server | `endoflife:apache-http-server` | NVD, BDU |
| [`artifactory`](/uk/configuration/products/artifactory/) | JFrog Artifactory | `endoflife:artifactory` | NVD, BDU |
| [`bamboo`](/uk/configuration/products/bamboo/) | Atlassian Bamboo (Data Center) | `endoflife:bamboo` | NVD, BDU |
| [`bitbucket`](/uk/configuration/products/bitbucket/) | Atlassian Bitbucket (Data Center) | `endoflife:bitbucket` | NVD, BDU |
| [`bitwarden`](/uk/configuration/products/bitwarden/) | Bitwarden (self-hosted) | `github:bitwarden/server` | NVD |
| [`clickhouse`](/uk/configuration/products/clickhouse/) | ClickHouse | `endoflife:clickhouse` | NVD, BDU |
| [`confluence`](/uk/configuration/products/confluence/) | Atlassian Confluence (Data Center) | `endoflife:confluence` | NVD, BDU |
| [`elasticsearch`](/uk/configuration/products/elasticsearch/) | Elasticsearch | `endoflife:elasticsearch` | NVD, BDU |
| [`esxi`](/uk/configuration/products/esxi/) | VMware ESXi | `endoflife:esxi` | — |
| [`forgejo`](/uk/configuration/products/forgejo/) | Forgejo | `endoflife:forgejo` | NVD, BDU |
| [`fortios`](/uk/configuration/products/fortios/) | Fortinet FortiOS (FortiGate) | `endoflife:fortios` | NVD, BDU |
| [`generic`](/uk/configuration/products/generic/) | Власноруч написаний парсер для систем, яких enodia не знає, — див. [Конфігурація](/uk/configuration/#проба-generic) | — | — |
| [`gitlab`](/uk/configuration/products/gitlab/) | GitLab | `endoflife:gitlab` | NVD, BDU |
| [`grafana`](/uk/configuration/products/grafana/) | Grafana | `endoflife:grafana` | NVD, BDU |
| [`graylog`](/uk/configuration/products/graylog/) | Graylog | `endoflife:graylog` | NVD, BDU |
| [`haproxy`](/uk/configuration/products/haproxy/) | HAProxy | `endoflife:haproxy` | NVD, BDU |
| [`harbor`](/uk/configuration/products/harbor/) | Harbor (реєстр контейнерів) | `endoflife:harbor` | NVD, BDU |
| [`jaeger`](/uk/configuration/products/jaeger/) | Jaeger | `endoflife:jaeger` | NVD |
| [`jellyfin`](/uk/configuration/products/jellyfin/) | Jellyfin | `github:jellyfin/jellyfin` | NVD |
| [`jenkins`](/uk/configuration/products/jenkins/) | Jenkins | `endoflife:jenkins` | NVD, BDU |
| [`jira`](/uk/configuration/products/jira/) | Atlassian Jira (Data Center) | `endoflife:jira-software` | NVD, BDU |
| [`keycloak`](/uk/configuration/products/keycloak/) | Keycloak | `endoflife:keycloak` | NVD, BDU |
| [`kibana`](/uk/configuration/products/kibana/) | Kibana | `endoflife:kibana` | NVD, BDU |
| [`kitsu`](/uk/configuration/products/kitsu/) | Kitsu (фронтенд CG-Wire / Zou) | `github:cgwire/kitsu` | — |
| [`logstash`](/uk/configuration/products/logstash/) | Logstash | `endoflife:logstash` | NVD, BDU |
| [`mattermost`](/uk/configuration/products/mattermost/) | Mattermost | `endoflife:mattermost` | NVD, BDU |
| [`mongodb`](/uk/configuration/products/mongodb/) | MongoDB | `endoflife:mongodb` | NVD, BDU |
| [`mysql`](/uk/configuration/products/mysql/) | MySQL Server | `endoflife:mysql` | NVD, BDU |
| [`nextcloud`](/uk/configuration/products/nextcloud/) | Nextcloud | `endoflife:nextcloud` | NVD, BDU |
| [`nexus`](/uk/configuration/products/nexus/) | Sonatype Nexus Repository | `endoflife:nexus` | NVD, BDU |
| [`nginx`](/uk/configuration/products/nginx/) | nginx | `endoflife:nginx` | NVD, BDU |
| [`oauth2-proxy`](/uk/configuration/products/oauth2-proxy/) | oauth2-proxy | `github:oauth2-proxy/oauth2-proxy` | NVD, BDU |
| [`opensearch`](/uk/configuration/products/opensearch/) | OpenSearch | `endoflife:opensearch` | NVD, BDU |
| [`owncast`](/uk/configuration/products/owncast/) | Owncast | `github:owncast/owncast` | NVD |
| [`p4d`](/uk/configuration/products/p4d/) | Perforce Helix Core Server (p4d) | — | NVD, BDU |
| [`p4p`](/uk/configuration/products/p4p/) | Perforce Proxy (p4p) | — | — |
| [`perforce-swarm`](/uk/configuration/products/perforce-swarm/) | Perforce Helix Swarm | — | — |
| [`pgadmin`](/uk/configuration/products/pgadmin/) | pgAdmin | `github-tags:pgadmin-org/pgadmin4` | NVD, BDU |
| [`phpmyadmin`](/uk/configuration/products/phpmyadmin/) | phpMyAdmin | `endoflife:phpmyadmin` | NVD, BDU |
| [`portainer`](/uk/configuration/products/portainer/) | Portainer | `github:portainer/portainer` | NVD, BDU |
| [`postgres_exporter`](/uk/configuration/products/postgres_exporter/) | prometheus-community/postgres_exporter | `github:prometheus-community/postgres_exporter` | — |
| [`postgresql`](/uk/configuration/products/postgresql/) | PostgreSQL | `endoflife:postgresql` | NVD, BDU |
| [`proftpd`](/uk/configuration/products/proftpd/) | ProFTPD | `endoflife:proftpd` | NVD, BDU |
| [`proxmox`](/uk/configuration/products/proxmox/) | Proxmox VE | `endoflife:proxmox-ve` | NVD, BDU |
| [`redis`](/uk/configuration/products/redis/) | Redis | `endoflife:redis` | NVD, BDU |
| [`routeros`](/uk/configuration/products/routeros/) | MikroTik RouterOS | `endoflife:routeros` | NVD, BDU |
| [`sonarqube`](/uk/configuration/products/sonarqube/) | SonarQube (Server або Community Build) | `endoflife:sonarqube-server`\* | NVD, BDU |
| [`ssh`](/uk/configuration/products/ssh/) | SSH-банер (будь-яка реалізація) | — | NVD, BDU |
| [`synology-dsm`](/uk/configuration/products/synology-dsm/) | Synology DSM | — | — |
| [`teamcity`](/uk/configuration/products/teamcity/) | JetBrains TeamCity | — | NVD, BDU |
| [`testrail`](/uk/configuration/products/testrail/) | TestRail | — | NVD |
| [`traefik`](/uk/configuration/products/traefik/) | Traefik | `endoflife:traefik` | NVD, BDU |
| [`truenas`](/uk/configuration/products/truenas/) | TrueNAS | `endoflife:truenas` | — |
| [`vault`](/uk/configuration/products/vault/) | HashiCorp Vault | `endoflife:hashicorp-vault` | NVD, BDU |
| [`vaultwarden`](/uk/configuration/products/vaultwarden/) | Vaultwarden | `github:dani-garcia/vaultwarden` | NVD, BDU |
| [`vcenter`](/uk/configuration/products/vcenter/) | VMware vCenter Server | `endoflife:vcenter` | — |
| [`wordpress`](/uk/configuration/products/wordpress/) | WordPress | `endoflife:wordpress` | NVD, BDU |
| [`youtrack`](/uk/configuration/products/youtrack/) | YouTrack | `endoflife:youtrack` | NVD, BDU |
| [`zabbix`](/uk/configuration/products/zabbix/) | Zabbix | `endoflife:zabbix` | NVD, BDU |
| [`zou`](/uk/configuration/products/zou/) | Zou (API-бекенд CG-Wire) | — | — |

## Операційні системи

30 продуктів, усі ідентифікуються через **SSH**, а не HTTP, — спільний
механізм, який використовує кожен із них, описано на сторінці
[Ідентифікація ОС через SSH](/uk/configuration/products/ssh-os-probes/).

| Продукт | Опис | Резолвер | CVE |
|---|---|---|---|
| [`almalinux`](/uk/configuration/products/almalinux/) | AlmaLinux | `endoflife:almalinux` | — |
| [`alpine-linux`](/uk/configuration/products/alpine-linux/) | Alpine Linux | `endoflife:alpine-linux` | — |
| [`amazon-linux`](/uk/configuration/products/amazon-linux/) | Amazon Linux | `endoflife:amazon-linux` | — |
| [`astra-linux`](/uk/configuration/products/astra-linux/) | Astra Linux | — | — |
| [`centos`](/uk/configuration/products/centos/) | CentOS Linux (застаріла, EOL) | `endoflife:centos` | — |
| [`centos-stream`](/uk/configuration/products/centos-stream/) | CentOS Stream | `endoflife:centos-stream` | — |
| [`debian`](/uk/configuration/products/debian/) | Debian | `endoflife:debian` | — |
| [`eurolinux`](/uk/configuration/products/eurolinux/) | EuroLinux | `endoflife:eurolinux` | — |
| [`fedora`](/uk/configuration/products/fedora/) | Fedora Linux | `endoflife:fedora` | — |
| [`freebsd`](/uk/configuration/products/freebsd/) | FreeBSD | `endoflife:freebsd` | — |
| [`gentoo`](/uk/configuration/products/gentoo/) | Gentoo Linux | — | — |
| [`kali-linux`](/uk/configuration/products/kali-linux/) | Kali Linux | — | — |
| [`linuxmint`](/uk/configuration/products/linuxmint/) | Linux Mint | `endoflife:linuxmint` | — |
| [`macos`](/uk/configuration/products/macos/) | macOS | `endoflife:macos` | NVD, BDU |
| [`netbsd`](/uk/configuration/products/netbsd/) | NetBSD | `endoflife:netbsd` | — |
| [`nixos`](/uk/configuration/products/nixos/) | NixOS | `endoflife:nixos` | — |
| [`openbsd`](/uk/configuration/products/openbsd/) | OpenBSD | `endoflife:openbsd` | — |
| [`openeuler`](/uk/configuration/products/openeuler/) | openEuler | — | — |
| [`opensuse`](/uk/configuration/products/opensuse/) | openSUSE | `endoflife:opensuse` | — |
| [`opnsense`](/uk/configuration/products/opnsense/) | OPNsense | `endoflife:opnsense` | NVD, BDU |
| [`oracle-linux`](/uk/configuration/products/oracle-linux/) | Oracle Linux | `endoflife:oracle-linux` | — |
| [`oracle-solaris`](/uk/configuration/products/oracle-solaris/) | Oracle Solaris | `endoflife:oracle-solaris` | — |
| [`photon`](/uk/configuration/products/photon/) | VMware Photon OS | `endoflife:photon` | — |
| [`postmarketos`](/uk/configuration/products/postmarketos/) | postmarketOS | `endoflife:postmarketos` | — |
| [`redos`](/uk/configuration/products/redos/) | RED OS | — | — |
| [`rhel`](/uk/configuration/products/rhel/) | Red Hat Enterprise Linux | `endoflife:rhel` | — |
| [`rocky-linux`](/uk/configuration/products/rocky-linux/) | Rocky Linux | `endoflife:rocky-linux` | — |
| [`slackware`](/uk/configuration/products/slackware/) | Slackware | `endoflife:slackware` | — |
| [`steamos`](/uk/configuration/products/steamos/) | SteamOS | `endoflife:steamos` | — |
| [`ubuntu`](/uk/configuration/products/ubuntu/) | Ubuntu | `endoflife:ubuntu` | — |

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
