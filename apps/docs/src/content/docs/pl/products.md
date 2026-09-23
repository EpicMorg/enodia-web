---
title: Obsługiwane produkty
description: Wszystkie 90 wbudowanych sond, prosto z `enodia products`.
---

90 produktów, z których każdy to wkompilowana sonda (zobacz
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
[pgAdmin](/pl/configuration/products/pgadmin/)) — a `—` oznacza, że
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

**CVE** wskazuje, z którymi bazami danych produkt jest dopasowywany po
skonfigurowaniu [bloku `cve:`](/pl/cve/) — `NVD`, `BDU` (BDU FSTEC) lub
`—`, gdy wyszukiwanie CVE nie jest wykonywane (powód dla każdego
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

60 produktów sondowanych przez HTTP(S) lub surowy protokół sieciowy
(MySQL, Redis, MongoDB, ...) — bez udziału SSH. Dwa z nich,
[`p4d`](/pl/configuration/products/p4d/) i
[`p4p`](/pl/configuration/products/p4p/), stanowią dodatkowy wyjątek:
żaden z nich nie mówi protokołem, który enodia w ogóle implementuje —
oba wywołują własne CLI `p4` operatora, które musi być zainstalowane
obok samej enodia, a nie tylko osiągalne przez sieć.

| Produkt | Opis | Resolver | CVE |
|---|---|---|---|
| [`apache`](/pl/configuration/products/apache/) | Apache HTTP Server | `endoflife:apache-http-server` | NVD, BDU |
| [`artifactory`](/pl/configuration/products/artifactory/) | JFrog Artifactory | `endoflife:artifactory` | NVD, BDU |
| [`bamboo`](/pl/configuration/products/bamboo/) | Atlassian Bamboo (Data Center) | `endoflife:bamboo` | NVD, BDU |
| [`bitbucket`](/pl/configuration/products/bitbucket/) | Atlassian Bitbucket (Data Center) | `endoflife:bitbucket` | NVD, BDU |
| [`bitwarden`](/pl/configuration/products/bitwarden/) | Bitwarden (self-hosted) | `github:bitwarden/server` | NVD |
| [`clickhouse`](/pl/configuration/products/clickhouse/) | ClickHouse | `endoflife:clickhouse` | NVD, BDU |
| [`confluence`](/pl/configuration/products/confluence/) | Atlassian Confluence (Data Center) | `endoflife:confluence` | NVD, BDU |
| [`elasticsearch`](/pl/configuration/products/elasticsearch/) | Elasticsearch | `endoflife:elasticsearch` | NVD, BDU |
| [`esxi`](/pl/configuration/products/esxi/) | VMware ESXi | `endoflife:esxi` | — |
| [`forgejo`](/pl/configuration/products/forgejo/) | Forgejo | `endoflife:forgejo` | NVD, BDU |
| [`fortios`](/pl/configuration/products/fortios/) | Fortinet FortiOS (FortiGate) | `endoflife:fortios` | NVD, BDU |
| [`generic`](/pl/configuration/products/generic/) | Ręcznie napisany parser dla systemów, których enodia nie zna — zobacz [Konfiguracja](/pl/configuration/#sonda-generyczna) | — | — |
| [`gitlab`](/pl/configuration/products/gitlab/) | GitLab | `endoflife:gitlab` | NVD, BDU |
| [`grafana`](/pl/configuration/products/grafana/) | Grafana | `endoflife:grafana` | NVD, BDU |
| [`graylog`](/pl/configuration/products/graylog/) | Graylog | `endoflife:graylog` | NVD, BDU |
| [`haproxy`](/pl/configuration/products/haproxy/) | HAProxy | `endoflife:haproxy` | NVD, BDU |
| [`harbor`](/pl/configuration/products/harbor/) | Harbor (rejestr kontenerów) | `endoflife:harbor` | NVD, BDU |
| [`jaeger`](/pl/configuration/products/jaeger/) | Jaeger | `endoflife:jaeger` | NVD |
| [`jellyfin`](/pl/configuration/products/jellyfin/) | Jellyfin | `github:jellyfin/jellyfin` | NVD |
| [`jenkins`](/pl/configuration/products/jenkins/) | Jenkins | `endoflife:jenkins` | NVD, BDU |
| [`jira`](/pl/configuration/products/jira/) | Atlassian Jira (Data Center) | `endoflife:jira-software` | NVD, BDU |
| [`keycloak`](/pl/configuration/products/keycloak/) | Keycloak | `endoflife:keycloak` | NVD, BDU |
| [`kibana`](/pl/configuration/products/kibana/) | Kibana | `endoflife:kibana` | NVD, BDU |
| [`kitsu`](/pl/configuration/products/kitsu/) | Kitsu (frontend CG-Wire / Zou) | `github:cgwire/kitsu` | — |
| [`logstash`](/pl/configuration/products/logstash/) | Logstash | `endoflife:logstash` | NVD, BDU |
| [`mattermost`](/pl/configuration/products/mattermost/) | Mattermost | `endoflife:mattermost` | NVD, BDU |
| [`mongodb`](/pl/configuration/products/mongodb/) | MongoDB | `endoflife:mongodb` | NVD, BDU |
| [`mysql`](/pl/configuration/products/mysql/) | MySQL Server | `endoflife:mysql` | NVD, BDU |
| [`nextcloud`](/pl/configuration/products/nextcloud/) | Nextcloud | `endoflife:nextcloud` | NVD, BDU |
| [`nexus`](/pl/configuration/products/nexus/) | Sonatype Nexus Repository | `endoflife:nexus` | NVD, BDU |
| [`nginx`](/pl/configuration/products/nginx/) | nginx | `endoflife:nginx` | NVD, BDU |
| [`oauth2-proxy`](/pl/configuration/products/oauth2-proxy/) | oauth2-proxy | `github:oauth2-proxy/oauth2-proxy` | NVD, BDU |
| [`opensearch`](/pl/configuration/products/opensearch/) | OpenSearch | `endoflife:opensearch` | NVD, BDU |
| [`owncast`](/pl/configuration/products/owncast/) | Owncast | `github:owncast/owncast` | NVD |
| [`p4d`](/pl/configuration/products/p4d/) | Perforce Helix Core Server (p4d) | — | NVD, BDU |
| [`p4p`](/pl/configuration/products/p4p/) | Perforce Proxy (p4p) | — | — |
| [`perforce-swarm`](/pl/configuration/products/perforce-swarm/) | Perforce Helix Swarm | — | — |
| [`pgadmin`](/pl/configuration/products/pgadmin/) | pgAdmin | `github-tags:pgadmin-org/pgadmin4` | NVD, BDU |
| [`phpmyadmin`](/pl/configuration/products/phpmyadmin/) | phpMyAdmin | `endoflife:phpmyadmin` | NVD, BDU |
| [`portainer`](/pl/configuration/products/portainer/) | Portainer | `github:portainer/portainer` | NVD, BDU |
| [`postgres_exporter`](/pl/configuration/products/postgres_exporter/) | prometheus-community/postgres_exporter | `github:prometheus-community/postgres_exporter` | — |
| [`postgresql`](/pl/configuration/products/postgresql/) | PostgreSQL | `endoflife:postgresql` | NVD, BDU |
| [`proftpd`](/pl/configuration/products/proftpd/) | ProFTPD | `endoflife:proftpd` | NVD, BDU |
| [`proxmox`](/pl/configuration/products/proxmox/) | Proxmox VE | `endoflife:proxmox-ve` | NVD, BDU |
| [`redis`](/pl/configuration/products/redis/) | Redis | `endoflife:redis` | NVD, BDU |
| [`routeros`](/pl/configuration/products/routeros/) | MikroTik RouterOS | `endoflife:routeros` | NVD, BDU |
| [`sonarqube`](/pl/configuration/products/sonarqube/) | SonarQube (Server lub Community Build) | `endoflife:sonarqube-server`\* | NVD, BDU |
| [`ssh`](/pl/configuration/products/ssh/) | Baner SSH (dowolna implementacja) | — | NVD, BDU |
| [`synology-dsm`](/pl/configuration/products/synology-dsm/) | Synology DSM | — | — |
| [`teamcity`](/pl/configuration/products/teamcity/) | JetBrains TeamCity | — | NVD, BDU |
| [`testrail`](/pl/configuration/products/testrail/) | TestRail | — | NVD |
| [`traefik`](/pl/configuration/products/traefik/) | Traefik | `endoflife:traefik` | NVD, BDU |
| [`truenas`](/pl/configuration/products/truenas/) | TrueNAS | `endoflife:truenas` | — |
| [`vault`](/pl/configuration/products/vault/) | HashiCorp Vault | `endoflife:hashicorp-vault` | NVD, BDU |
| [`vaultwarden`](/pl/configuration/products/vaultwarden/) | Vaultwarden | `github:dani-garcia/vaultwarden` | NVD, BDU |
| [`vcenter`](/pl/configuration/products/vcenter/) | VMware vCenter Server | `endoflife:vcenter` | — |
| [`wordpress`](/pl/configuration/products/wordpress/) | WordPress | `endoflife:wordpress` | NVD, BDU |
| [`youtrack`](/pl/configuration/products/youtrack/) | YouTrack | `endoflife:youtrack` | NVD, BDU |
| [`zabbix`](/pl/configuration/products/zabbix/) | Zabbix | `endoflife:zabbix` | NVD, BDU |
| [`zou`](/pl/configuration/products/zou/) | Zou (backend API CG-Wire) | — | — |

## Systemy operacyjne

30 produktów, wszystkie identyfikowane przez **SSH**, a nie HTTP —
wspólny mechanizm, którego używa każdy z nich, opisuje strona
[Identyfikacja systemu operacyjnego przez SSH](/pl/configuration/products/ssh-os-probes/).

| Produkt | Opis | Resolver | CVE |
|---|---|---|---|
| [`almalinux`](/pl/configuration/products/almalinux/) | AlmaLinux | `endoflife:almalinux` | — |
| [`alpine-linux`](/pl/configuration/products/alpine-linux/) | Alpine Linux | `endoflife:alpine-linux` | — |
| [`amazon-linux`](/pl/configuration/products/amazon-linux/) | Amazon Linux | `endoflife:amazon-linux` | — |
| [`astra-linux`](/pl/configuration/products/astra-linux/) | Astra Linux | — | — |
| [`centos`](/pl/configuration/products/centos/) | CentOS Linux (przestarzały, EOL) | `endoflife:centos` | — |
| [`centos-stream`](/pl/configuration/products/centos-stream/) | CentOS Stream | `endoflife:centos-stream` | — |
| [`debian`](/pl/configuration/products/debian/) | Debian | `endoflife:debian` | — |
| [`eurolinux`](/pl/configuration/products/eurolinux/) | EuroLinux | `endoflife:eurolinux` | — |
| [`fedora`](/pl/configuration/products/fedora/) | Fedora Linux | `endoflife:fedora` | — |
| [`freebsd`](/pl/configuration/products/freebsd/) | FreeBSD | `endoflife:freebsd` | — |
| [`gentoo`](/pl/configuration/products/gentoo/) | Gentoo Linux | — | — |
| [`kali-linux`](/pl/configuration/products/kali-linux/) | Kali Linux | — | — |
| [`linuxmint`](/pl/configuration/products/linuxmint/) | Linux Mint | `endoflife:linuxmint` | — |
| [`macos`](/pl/configuration/products/macos/) | macOS | `endoflife:macos` | NVD, BDU |
| [`netbsd`](/pl/configuration/products/netbsd/) | NetBSD | `endoflife:netbsd` | — |
| [`nixos`](/pl/configuration/products/nixos/) | NixOS | `endoflife:nixos` | — |
| [`openbsd`](/pl/configuration/products/openbsd/) | OpenBSD | `endoflife:openbsd` | — |
| [`openeuler`](/pl/configuration/products/openeuler/) | openEuler | — | — |
| [`opensuse`](/pl/configuration/products/opensuse/) | openSUSE | `endoflife:opensuse` | — |
| [`opnsense`](/pl/configuration/products/opnsense/) | OPNsense | `endoflife:opnsense` | NVD, BDU |
| [`oracle-linux`](/pl/configuration/products/oracle-linux/) | Oracle Linux | `endoflife:oracle-linux` | — |
| [`oracle-solaris`](/pl/configuration/products/oracle-solaris/) | Oracle Solaris | `endoflife:oracle-solaris` | — |
| [`photon`](/pl/configuration/products/photon/) | VMware Photon OS | `endoflife:photon` | — |
| [`postmarketos`](/pl/configuration/products/postmarketos/) | postmarketOS | `endoflife:postmarketos` | — |
| [`redos`](/pl/configuration/products/redos/) | RED OS | — | — |
| [`rhel`](/pl/configuration/products/rhel/) | Red Hat Enterprise Linux | `endoflife:rhel` | — |
| [`rocky-linux`](/pl/configuration/products/rocky-linux/) | Rocky Linux | `endoflife:rocky-linux` | — |
| [`slackware`](/pl/configuration/products/slackware/) | Slackware | `endoflife:slackware` | — |
| [`steamos`](/pl/configuration/products/steamos/) | SteamOS | `endoflife:steamos` | — |
| [`ubuntu`](/pl/configuration/products/ubuntu/) | Ubuntu | `endoflife:ubuntu` | — |

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
