---
title: Obsługiwane produkty
description: Wszystkie 123 wbudowane sondy, prosto z `enodia products`.
---

123 produkty, z których każdy to wkompilowana sonda (zobacz
[Koncepcje](/pl/concepts/#sondy-są-wkompilowane-a-nie-opisane-w-dsl-u-yaml)).
Wartość z kolumny **Produkt** należy podać jako `product:` w celu.
**Resolver** to identyfikator danych cyklu życia — `endoflife:<slug>`
dla [endoflife.date](https://endoflife.date/) (prawdziwe daty EOL
i końca wsparcia), `github:<owner/repo>` dla GitHub Releases (tylko
najnowsza wersja, bez eol/support/lts — GitHub nie ma zdania na temat
polityki cyklu życia) lub `github-tags:<owner/repo>` dla repozytorium
bez żadnych Releases, a jedynie z tagami git (to samo ograniczenie
„tylko najnowsza wersja” co w `github:`, stosowane, gdy własne tagi
produktu nie są nawet zwykłą wersją z kropkami — zobacz
[pgAdmin](/pl/configuration/products/pgadmin/)) lub
`github-tag-branches:<owner/repo>` dla projektu, który utrzymuje
jednocześnie kilka gałęzi wydań (jeden cykl życia na każde major.minor,
każdy z własnym najnowszym tagiem — zobacz
[FreeRADIUS](/pl/configuration/products/freeradius/)) — a `—` oznacza, że
enodia potrafi wykryć wersję tego produktu, ale nie ma jeszcze
dopasowania cyklu życia (osie poprawki i gałęzi nadal działają; oś
cyklu życia pozostaje `unknown`). Po kliknięciu produktu wyświetla się
jego dokładny endpoint, wymagania dotyczące uwierzytelniania
i rejestrowane pola.

Oba typy resolverów opartych na GitHubie domyślnie działają bez
uwierzytelniania (limit 60 żądań na godzinę, współdzielony ze wszystkim
innym z tego samego źródłowego adresu IP) — ustawienie zmiennej
środowiskowej **`GITHUB_TOKEN`** (ta sama konwencja, której używają
`gh`, goreleaser i same GitHub Actions) podnosi limit do 5000 na
godzinę; pusta lub nieustawiona zmienna oznacza po prostu powrót do
limitu bez uwierzytelniania — w żadnym wypadku nic się nie psuje.

Od wersji 2.2 resolvery GitHub odczytują też tagi wydań w taki sposób,
w jaki projekty faktycznie je zapisują: początkowe `<repo>-`/`<repo>_`
jest usuwane (`weblate-2026.10` jest odczytywane jako `2026.10`), tagi
zapisane z podkreśleniami (`Release_1_18_0`) i z prefiksem `release-`
(`release-5.2.4`) są parsowane jako wersje, a tag wskazujący na wersję
przedpremierową (`5.3.0.M2`, `2026.10.0b7`, `-rc1`, `-beta.1`) jest
pomijany, nawet gdy GitHub go tak nie oznacza.

**CVE** wskazuje, z którymi bazami danych produkt jest dopasowywany po
skonfigurowaniu [bloku `cve:`](/pl/cve/) — `NVD`, `BDU` (BDU FSTEC) lub
`—`, gdy wyszukiwanie CVE nie jest wykonywane; `dane MariaDB`, `dane
Atlassian`, `dane PostgreSQL` i `dane nginx` dodają własne dane
bezpieczeństwa danego dostawcy (zobacz
[Własne dane dostawców](/pl/cve/#własne-dane-dostawców)). Dziesięć dystrybucji
Linuksa jest zamiast tego dopasowywanych według zainstalowanych
pakietów, a nie według wydania — `(pakiety)` wskazuje źródło: Debian
Security Tracker, OVAL dostawcy lub secdb Alpine (zobacz
[CVE na poziomie pakietów](/pl/cve/#cve-na-poziomie-pakietów-dla-dystrybucji-linuksa)) (powód dla każdego
niedopasowanego przypadku podaje strona
[Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane)). Ta kolumna
pochodzi z własnych tabel produktów enodia, a nie z `enodia products`.

Ta tabela jest generowana z `enodia products` dla aktualnie zbudowanego
pliku binarnego — jeśli minęło trochę czasu, należy uruchomić polecenie
ponownie i sprawdzić rozbieżności, zanim uzna się tę stronę za
ostateczne źródło. Wiersz **`sonarqube`** pokazuje statyczną wartość
awaryjną (`endoflife:sonarqube-server`, czyli to, co wypisuje `enodia
products`, gdy nic nie zostało jeszcze wykryte) — prawdziwa obserwacja
wybiera między nią a `endoflife:sonarqube-community` dla każdej
instancji na podstawie samego ciągu wersji; zobacz
[jego własną stronę](/pl/configuration/products/sonarqube/).

## Aplikacje i usługi infrastrukturalne

92 produkty sondowane przez HTTP(S) lub surowy protokół sieciowy
(MySQL, Redis, MongoDB, Cassandra, ...). Pięć stanowi wyjątek:
[`p4d`](/pl/configuration/products/p4d/) i
[`p4p`](/pl/configuration/products/p4p/) nie mówią żadnym protokołem,
który enodia w ogóle implementuje — oba wywołują własne CLI `p4`
operatora, które musi być zainstalowane obok samej enodia, a nie tylko
osiągalne przez sieć — a
[`freeradius`](/pl/configuration/products/freeradius/),
[`kafka`](/pl/configuration/products/kafka/) i
[`minio`](/pl/configuration/products/minio/) są odczytywane przez SSH,
z własnego pliku binarnego lub jar serwera — RADIUS nie ma sposobu na
zgłoszenie wersji, Kafka podaje ją tylko w JMX, a MinIO tylko za kluczem
administratora.

| Produkt | Opis | Resolver | CVE |
|---|---|---|---|
| [`apache`](/pl/configuration/products/apache/) | Apache HTTP Server | `endoflife:apache-http-server` | NVD, BDU |
| [`artifactory`](/pl/configuration/products/artifactory/) | JFrog Artifactory | `endoflife:artifactory` | NVD, BDU |
| [`bamboo`](/pl/configuration/products/bamboo/) | Atlassian Bamboo (Data Center) | `endoflife:bamboo` | NVD, BDU, dane Atlassian |
| [`bitbucket`](/pl/configuration/products/bitbucket/) | Atlassian Bitbucket (Data Center) | `endoflife:bitbucket` | NVD, BDU, dane Atlassian |
| [`bitwarden`](/pl/configuration/products/bitwarden/) | Bitwarden (self-hosted) | `github:bitwarden/server` | NVD |
| [`cassandra`](/pl/configuration/products/cassandra/) | Apache Cassandra (natywny protokół CQL) | `endoflife:apache-cassandra` | NVD, BDU |
| [`clickhouse`](/pl/configuration/products/clickhouse/) | ClickHouse | `endoflife:clickhouse` | NVD, BDU |
| [`code-server`](/pl/configuration/products/code-server/) | code-server (VS Code w przeglądarce) | `github:coder/code-server` | NVD |
| [`confluence`](/pl/configuration/products/confluence/) | Atlassian Confluence (Data Center) | `endoflife:confluence` | NVD, BDU, dane Atlassian |
| [`dell-idrac`](/pl/configuration/products/dell-idrac/) | Dell iDRAC | — | NVD, BDU |
| [`domainmod`](/pl/configuration/products/domainmod/) | DomainMOD | `github:domainmod/domainmod` | NVD |
| [`doxygen`](/pl/configuration/products/doxygen/) | Witryna dokumentacji wygenerowana przez Doxygen | `github:doxygen/doxygen` | NVD |
| [`elasticsearch`](/pl/configuration/products/elasticsearch/) | Elasticsearch | `endoflife:elasticsearch` | NVD, BDU |
| [`esxi`](/pl/configuration/products/esxi/) | VMware ESXi | `endoflife:esxi` | — |
| [`euro-office`](/pl/configuration/products/euro-office/) | Euro-Office Docs (fork ONLYOFFICE) | `github:Euro-Office/DocumentServer` | — |
| [`forgejo`](/pl/configuration/products/forgejo/) | Forgejo | `endoflife:forgejo` | NVD, BDU |
| [`fortios`](/pl/configuration/products/fortios/) | Fortinet FortiOS (FortiGate) | `endoflife:fortios` | NVD, BDU |
| [`freeradius`](/pl/configuration/products/freeradius/) | FreeRADIUS | `github-tag-branches:FreeRADIUS/freeradius-server` | NVD, BDU |
| [`generic`](/pl/configuration/products/generic/) | Ręcznie napisany parser dla systemów, których enodia nie zna — zobacz [Konfiguracja](/pl/configuration/#sonda-generyczna) | — | — |
| [`ghost`](/pl/configuration/products/ghost/) | Ghost | `github:TryGhost/Ghost` | NVD, BDU |
| [`gitlab`](/pl/configuration/products/gitlab/) | GitLab | `endoflife:gitlab` | NVD, BDU |
| [`grafana`](/pl/configuration/products/grafana/) | Grafana | `endoflife:grafana` | NVD, BDU |
| [`graylog`](/pl/configuration/products/graylog/) | Graylog | `endoflife:graylog` | NVD, BDU |
| [`greenbone`](/pl/configuration/products/greenbone/) | Greenbone / OpenVAS (demon webowy gsad) | `github:greenbone/gsad` | NVD |
| [`haproxy`](/pl/configuration/products/haproxy/) | HAProxy | `endoflife:haproxy` | NVD, BDU |
| [`harbor`](/pl/configuration/products/harbor/) | Harbor (rejestr kontenerów) | `endoflife:harbor` | NVD, BDU |
| [`home-assistant`](/pl/configuration/products/home-assistant/) | Home Assistant (REST API, długoterminowy token) | `github:home-assistant/core` | NVD |
| [`hp-ilo4`](/pl/configuration/products/hp-ilo4/) | HP iLO 4 | — | NVD, BDU |
| [`jaeger`](/pl/configuration/products/jaeger/) | Jaeger | `endoflife:jaeger` | NVD |
| [`jellyfin`](/pl/configuration/products/jellyfin/) | Jellyfin | `github:jellyfin/jellyfin` | NVD |
| [`jenkins`](/pl/configuration/products/jenkins/) | Jenkins | `endoflife:jenkins` | NVD, BDU |
| [`jira`](/pl/configuration/products/jira/) | Atlassian Jira (Data Center) | `endoflife:jira-software` | NVD, BDU, dane Atlassian |
| [`kafka`](/pl/configuration/products/kafka/) | Broker Apache Kafka (przez SSH) | `endoflife:apache-kafka` | NVD, BDU |
| [`keycloak`](/pl/configuration/products/keycloak/) | Keycloak | `endoflife:keycloak` | NVD, BDU |
| [`kibana`](/pl/configuration/products/kibana/) | Kibana | `endoflife:kibana` | NVD, BDU |
| [`kitsu`](/pl/configuration/products/kitsu/) | Kitsu (frontend CG-Wire / Zou) | `github:cgwire/kitsu` | — |
| [`libretranslate`](/pl/configuration/products/libretranslate/) | LibreTranslate | `github:LibreTranslate/LibreTranslate` | — |
| [`logstash`](/pl/configuration/products/logstash/) | Logstash | `endoflife:logstash` | NVD, BDU |
| [`mariadb`](/pl/configuration/products/mariadb/) | MariaDB Server | `endoflife:mariadb` | NVD, BDU, dane MariaDB |
| [`mattermost`](/pl/configuration/products/mattermost/) | Mattermost | `endoflife:mattermost` | NVD, BDU |
| [`memcached`](/pl/configuration/products/memcached/) | memcached | `endoflife:memcached` | NVD, BDU |
| [`minio`](/pl/configuration/products/minio/) | MinIO (plik binarny serwera, przez SSH) | `github:minio/minio` | NVD, BDU |
| [`mongodb`](/pl/configuration/products/mongodb/) | MongoDB | `endoflife:mongodb` | NVD, BDU |
| [`mysql`](/pl/configuration/products/mysql/) | MySQL Server | `endoflife:mysql` | NVD, BDU |
| [`netbox`](/pl/configuration/products/netbox/) | NetBox | `github:netbox-community/netbox` | NVD |
| [`netdata`](/pl/configuration/products/netdata/) | Agent Netdata | `github:netdata/netdata` | NVD, BDU |
| [`nextcloud`](/pl/configuration/products/nextcloud/) | Nextcloud | `endoflife:nextcloud` | NVD, BDU |
| [`nexus`](/pl/configuration/products/nexus/) | Sonatype Nexus Repository | `endoflife:nexus` | NVD, BDU |
| [`nginx`](/pl/configuration/products/nginx/) | nginx | `endoflife:nginx` | NVD, BDU, dane nginx |
| [`oauth2-proxy`](/pl/configuration/products/oauth2-proxy/) | oauth2-proxy | `github:oauth2-proxy/oauth2-proxy` | NVD, BDU |
| [`onlyoffice`](/pl/configuration/products/onlyoffice/) | ONLYOFFICE Docs (Document Server) | `github:ONLYOFFICE/DocumentServer` | NVD, BDU |
| [`openhab`](/pl/configuration/products/openhab/) | openHAB | `github:openhab/openhab-distro` | NVD |
| [`opensearch`](/pl/configuration/products/opensearch/) | OpenSearch | `endoflife:opensearch` | NVD, BDU |
| [`owncast`](/pl/configuration/products/owncast/) | Owncast | `github:owncast/owncast` | NVD |
| [`p4d`](/pl/configuration/products/p4d/) | Perforce Helix Core Server (p4d) | — | NVD, BDU |
| [`p4p`](/pl/configuration/products/p4p/) | Perforce Proxy (p4p) | — | — |
| [`perforce-swarm`](/pl/configuration/products/perforce-swarm/) | Perforce Helix Swarm | — | — |
| [`pgadmin`](/pl/configuration/products/pgadmin/) | pgAdmin | `github-tags:pgadmin-org/pgadmin4` | NVD, BDU |
| [`phpipam`](/pl/configuration/products/phpipam/) | phpIPAM | `github:phpipam/phpipam` | NVD, BDU |
| [`phpmyadmin`](/pl/configuration/products/phpmyadmin/) | phpMyAdmin | `endoflife:phpmyadmin` | NVD, BDU |
| [`portainer`](/pl/configuration/products/portainer/) | Portainer | `github:portainer/portainer` | NVD, BDU |
| [`postgres_exporter`](/pl/configuration/products/postgres_exporter/) | prometheus-community/postgres_exporter | `github:prometheus-community/postgres_exporter` | — |
| [`postgresql`](/pl/configuration/products/postgresql/) | PostgreSQL | `endoflife:postgresql` | NVD, BDU, dane PostgreSQL |
| [`posthog`](/pl/configuration/products/posthog/) | PostHog (self-hosted; wersja to commit git) | — | — |
| [`proftpd`](/pl/configuration/products/proftpd/) | ProFTPD | `endoflife:proftpd` | NVD, BDU |
| [`proxmox`](/pl/configuration/products/proxmox/) | Proxmox VE | `endoflife:proxmox-ve` | NVD, BDU |
| [`qbittorrent`](/pl/configuration/products/qbittorrent/) | qBittorrent (API Web UI) | `github:qbittorrent/qBittorrent` | NVD, BDU |
| [`rabbitmq`](/pl/configuration/products/rabbitmq/) | RabbitMQ (API wtyczki zarządzania) | `endoflife:rabbitmq` | NVD, BDU |
| [`redis`](/pl/configuration/products/redis/) | Redis | `endoflife:redis` | NVD, BDU |
| [`routeros`](/pl/configuration/products/routeros/) | MikroTik RouterOS | `endoflife:routeros` | NVD, BDU |
| [`sentry`](/pl/configuration/products/sentry/) | Sentry (self-hosted) | `github:getsentry/self-hosted` | NVD |
| [`sonarqube`](/pl/configuration/products/sonarqube/) | SonarQube (Server lub Community Build) | `endoflife:sonarqube-server`\* | NVD, BDU |
| [`splunk`](/pl/configuration/products/splunk/) | Splunk Enterprise (API zarządzania splunkd) | `endoflife:splunk` | NVD, BDU |
| [`ssh`](/pl/configuration/products/ssh/) | Baner SSH (dowolna implementacja) | — | NVD, BDU |
| [`supermicro-bmc`](/pl/configuration/products/supermicro-bmc/) | Supermicro BMC | — | — |
| [`synology-dsm`](/pl/configuration/products/synology-dsm/) | Synology DSM | — | NVD, BDU |
| [`teamcity`](/pl/configuration/products/teamcity/) | JetBrains TeamCity | — | NVD, BDU |
| [`testrail`](/pl/configuration/products/testrail/) | TestRail | — | NVD |
| [`torrserver`](/pl/configuration/products/torrserver/) | TorrServer | `github:YouROK/TorrServer` | — |
| [`traefik`](/pl/configuration/products/traefik/) | Traefik | `endoflife:traefik` | NVD, BDU |
| [`truenas`](/pl/configuration/products/truenas/) | TrueNAS | `endoflife:truenas` | — |
| [`uptime-kuma`](/pl/configuration/products/uptime-kuma/) | Uptime Kuma (logowanie przez socket.io) | `github:louislam/uptime-kuma` | NVD |
| [`vault`](/pl/configuration/products/vault/) | HashiCorp Vault | `endoflife:hashicorp-vault` | NVD, BDU |
| [`vaultwarden`](/pl/configuration/products/vaultwarden/) | Vaultwarden | `github:dani-garcia/vaultwarden` | NVD, BDU |
| [`vcenter`](/pl/configuration/products/vcenter/) | VMware vCenter Server | `endoflife:vcenter` | — |
| [`wapt`](/pl/configuration/products/wapt/) | Serwer WAPT (Tranquil IT) | — | NVD |
| [`weblate`](/pl/configuration/products/weblate/) | Weblate | `github:WeblateOrg/weblate` | NVD |
| [`wordpress`](/pl/configuration/products/wordpress/) | WordPress | `endoflife:wordpress` | NVD, BDU |
| [`youtrack`](/pl/configuration/products/youtrack/) | YouTrack | `endoflife:youtrack` | NVD, BDU |
| [`zabbix`](/pl/configuration/products/zabbix/) | Zabbix | `endoflife:zabbix` | NVD, BDU |
| [`zookeeper`](/pl/configuration/products/zookeeper/) | Apache ZooKeeper | `endoflife:zookeeper` | NVD, BDU |
| [`zou`](/pl/configuration/products/zou/) | Zou (backend API CG-Wire) | — | — |

## Systemy operacyjne

31 produktów, wszystkie identyfikowane przez **SSH**, a nie HTTP —
wspólny mechanizm, którego używa każdy z nich, opisuje strona
[Identyfikacja systemu operacyjnego przez SSH](/pl/configuration/products/ssh-os-probes/).

| Produkt | Opis | Resolver | CVE |
|---|---|---|---|
| [`almalinux`](/pl/configuration/products/almalinux/) | AlmaLinux | `endoflife:almalinux` | OVAL (pakiety) |
| [`alpine-linux`](/pl/configuration/products/alpine-linux/) | Alpine Linux | `endoflife:alpine-linux` | secdb Alpine (pakiety) |
| [`amazon-linux`](/pl/configuration/products/amazon-linux/) | Amazon Linux | `endoflife:amazon-linux` | — |
| [`astra-linux`](/pl/configuration/products/astra-linux/) | Astra Linux | — | OVAL (pakiety) |
| [`centos`](/pl/configuration/products/centos/) | CentOS Linux (przestarzały, EOL) | `endoflife:centos` | — |
| [`centos-stream`](/pl/configuration/products/centos-stream/) | CentOS Stream | `endoflife:centos-stream` | — |
| [`debian`](/pl/configuration/products/debian/) | Debian | `endoflife:debian` | tracker Debiana (pakiety) |
| [`eurolinux`](/pl/configuration/products/eurolinux/) | EuroLinux | `endoflife:eurolinux` | — |
| [`fedora`](/pl/configuration/products/fedora/) | Fedora Linux | `endoflife:fedora` | — |
| [`freebsd`](/pl/configuration/products/freebsd/) | FreeBSD | `endoflife:freebsd` | — |
| [`gentoo`](/pl/configuration/products/gentoo/) | Gentoo Linux | — | — |
| [`kali-linux`](/pl/configuration/products/kali-linux/) | Kali Linux | — | — |
| [`linuxmint`](/pl/configuration/products/linuxmint/) | Linux Mint | `endoflife:linuxmint` | OVAL (pakiety) |
| [`macos`](/pl/configuration/products/macos/) | macOS | `endoflife:macos` | NVD, BDU |
| [`netbsd`](/pl/configuration/products/netbsd/) | NetBSD | `endoflife:netbsd` | — |
| [`nixos`](/pl/configuration/products/nixos/) | NixOS | `endoflife:nixos` | — |
| [`openbsd`](/pl/configuration/products/openbsd/) | OpenBSD | `endoflife:openbsd` | — |
| [`openeuler`](/pl/configuration/products/openeuler/) | openEuler | — | — |
| [`opensuse`](/pl/configuration/products/opensuse/) | openSUSE | `endoflife:opensuse` | — |
| [`opnsense`](/pl/configuration/products/opnsense/) | OPNsense | `endoflife:opnsense` | NVD, BDU |
| [`oracle-linux`](/pl/configuration/products/oracle-linux/) | Oracle Linux | `endoflife:oracle-linux` | OVAL (pakiety) |
| [`oracle-solaris`](/pl/configuration/products/oracle-solaris/) | Oracle Solaris | `endoflife:oracle-solaris` | — |
| [`pfsense`](/pl/configuration/products/pfsense/) | pfSense Community Edition | — | NVD, BDU |
| [`photon`](/pl/configuration/products/photon/) | VMware Photon OS | `endoflife:photon` | — |
| [`postmarketos`](/pl/configuration/products/postmarketos/) | postmarketOS | `endoflife:postmarketos` | — |
| [`redos`](/pl/configuration/products/redos/) | RED OS | — | OVAL (pakiety) |
| [`rhel`](/pl/configuration/products/rhel/) | Red Hat Enterprise Linux | `endoflife:rhel` | OVAL (pakiety) |
| [`rocky-linux`](/pl/configuration/products/rocky-linux/) | Rocky Linux | `endoflife:rocky-linux` | OVAL (pakiety) |
| [`slackware`](/pl/configuration/products/slackware/) | Slackware | `endoflife:slackware` | — |
| [`steamos`](/pl/configuration/products/steamos/) | SteamOS | `endoflife:steamos` | — |
| [`ubuntu`](/pl/configuration/products/ubuntu/) | Ubuntu | `endoflife:ubuntu` | OVAL (pakiety) |

## Produkty Atlassian

Jira, Confluence, Bitbucket i Bamboo korzystają z tej samej konwencji
endpointu manifestu. `product:` deklaruje się jawnie w konfiguracji,
zamiast zgadywać go z odpowiedzi — wskazanie adresu Confluence we wpisie
dla Jiry to realna literówka, która zasługuje na wychwycenie, a nie na
ciche zapisanie jako błędny fakt. Manifest Bitbucketa nadal przedstawia
się jako `stash` (jego dawna nazwa) — to odpowiedź producenta, a nie
dziwactwo enodia.

## `zou` i `kitsu` — jedna sonda, dwa produkty

Oba wskazują ten sam backend API Zou i odpowiadają na to samo żądanie —
są zarejestrowane osobno, ponieważ potrzebują różnych resolverów cyklu
życia (repozytorium Zou na GitHubie nie publikuje użytecznych
Releases). Pełne wyjaśnienie zawierają strony
[Zou](/pl/configuration/products/zou/) i
[Kitsu](/pl/configuration/products/kitsu/).

## Nie ma tu potrzebnego produktu?

Dla wszystkiego, co nie ma dedykowanej sondy, można użyć furtki
awaryjnej [`product: generic`](/pl/configuration/#sonda-generyczna)
albo zgłosić problem na
[GitHubie](https://github.com/EpicMorg/enodia/issues) — szablon
`.github/ISSUE_TEMPLATE/new_product.yml` pyta dokładnie o to, czego
potrzebuje nowa sonda.
