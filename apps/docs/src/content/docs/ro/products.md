---
title: Produse acceptate
description: Toate cele 123 de sonde integrate, direct din `enodia products`.
---

123 de produse, fiecare cu o sondă compilată (consultați
[Concepte](/ro/concepts/#sondele-sunt-compilate-nu-un-dsl-yaml)). Folosiți
valoarea din coloana **Produs** ca `product:` într-o țintă.
**Rezolvator** este identificatorul datelor ciclului de viață —
`endoflife:<slug>` pentru [endoflife.date](https://endoflife.date/)
(date reale de EOL/suport), `github:<owner/repo>` pentru GitHub Releases
(doar cea mai recentă versiune, fără eol/support/lts — GitHub nu are o
opinie despre politica ciclului de viață) sau `github-tags:<owner/repo>`
pentru un repository fără niciun Release, doar cu tag-uri git (aceeași
limitare „doar cea mai recentă versiune” ca la `github:`, folosit atunci
când tag-urile proprii ale unui produs nu sunt nici măcar o versiune
simplă cu puncte — consultați
[pgAdmin](/ro/configuration/products/pgadmin/)) sau
`github-tag-branches:<owner/repo>` pentru un proiect care întreține mai
multe ramuri de lansare simultan (câte un ciclu de viață per
major.minor, fiecare cu propriul tag cel mai recent — consultați
[FreeRADIUS](/ro/configuration/products/freeradius/)) — iar un `—` înseamnă că
enodia are detectare a versiunii pentru acel produs, dar încă nicio
potrivire a ciclului de viață (axele patch/ramură funcționează în
continuare; axa ciclului de viață rămâne `unknown`). Faceți clic pe un
produs pentru endpoint-ul exact, cerințele de autentificare și câmpurile
înregistrate.

Ambele tipuri de rezolvatoare bazate pe GitHub sunt implicit
neautentificate (limitate la 60 de cereri/oră, partajate cu orice
altceva de pe aceeași adresă IP sursă) — setați variabila de mediu
**`GITHUB_TOKEN`** (aceeași convenție pe care o folosesc `gh`,
goreleaser și GitHub Actions însuși) pentru a ridica limita la
5000/oră; o valoare goală sau nesetată revine pur și simplu la limita
neautentificată, nimic nu se strică în niciun caz.

Începând cu 2.2, rezolvatoarele GitHub citesc și tag-urile de versiune
așa cum le scriu efectiv proiectele: un `<repo>-`/`<repo>_` inițial este
eliminat (`weblate-2026.10` este citit ca `2026.10`), tag-urile scrise cu
underscore (`Release_1_18_0`) și cele cu prefixul `release-`
(`release-5.2.4`) sunt parsate ca versiuni, iar un tag care denumește o
pre-versiune (`5.3.0.M2`, `2026.10.0b7`, `-rc1`, `-beta.1`) este omis
chiar și atunci când GitHub nu îl marchează ca atare.

**CVE** indică bazele de date cu care este potrivit produsul atunci când
este configurat un [bloc `cve:`](/ro/cve/) — `NVD`, `BDU` (BDU FSTEC)
sau `—` pentru nicio căutare CVE; `datele MariaDB`, `datele Atlassian`,
`datele PostgreSQL` și `datele nginx` adaugă datele de securitate proprii
ale producătorului respectiv (vedeți
[Datele proprii ale producătorilor](/ro/cve/#datele-proprii-ale-producătorilor)). Zece distribuții Linux sunt potrivite
per pachet instalat în loc de după versiune — `(pachete)` numește sursa:
Debian Security Tracker, OVAL-ul producătorului sau secdb-ul Alpine
(vedeți
[CVE-uri la nivel de pachet](/ro/cve/#cve-uri-la-nivel-de-pachet-pentru-distribuțiile-linux)) (fiecare caz nepotrivit are motivul
său pe pagina [Corelare CVE](/ro/cve/#ce-produse-sunt-potrivite)).
Această coloană provine din tabelele de produse proprii ale enodia, nu
din `enodia products`.

Acest tabel este generat din `enodia products` rulat pe binarul compilat
curent — dacă a trecut ceva timp, rulați-l din nou pentru a verifica
eventualele diferențe înainte de a considera această pagină literă de
lege. Rândul **`sonarqube`** afișează valoarea statică de rezervă
(`endoflife:sonarqube-server`, ceea ce afișează `enodia products` când
încă nu a fost sondat nimic) — o observație reală alege între aceasta și
`endoflife:sonarqube-community` pentru fiecare instanță, pe baza șirului
de versiune în sine; consultați [pagina sa](/ro/configuration/products/sonarqube/).

## Aplicații și servicii de infrastructură

92 de produse, sondate prin HTTP(S) sau printr-un protocol de rețea
direct (MySQL, Redis, MongoDB, Cassandra, ...). Cinci sunt excepții:
[`p4d`](/ro/configuration/products/p4d/) și
[`p4p`](/ro/configuration/products/p4p/) nu vorbesc niciun protocol de
rețea implementat de enodia — ambele apelează CLI-ul `p4` al
operatorului, care trebuie să fie instalat alături de enodia, nu doar
accesibil prin rețea — iar
[`freeradius`](/ro/configuration/products/freeradius/),
[`kafka`](/ro/configuration/products/kafka/) și
[`minio`](/ro/configuration/products/minio/) sunt citite prin SSH, din
binarul sau jar-ul propriu al serverului — RADIUS nu are nicio
modalitate de a raporta o versiune, versiunea Kafka există doar în JMX,
iar cea a MinIO doar în spatele unei chei de administrator.

| Produs | Descriere | Rezolvator | CVE |
|---|---|---|---|
| [`apache`](/ro/configuration/products/apache/) | Apache HTTP Server | `endoflife:apache-http-server` | NVD, BDU |
| [`artifactory`](/ro/configuration/products/artifactory/) | JFrog Artifactory | `endoflife:artifactory` | NVD, BDU |
| [`bamboo`](/ro/configuration/products/bamboo/) | Atlassian Bamboo (Data Center) | `endoflife:bamboo` | NVD, BDU, datele Atlassian |
| [`bitbucket`](/ro/configuration/products/bitbucket/) | Atlassian Bitbucket (Data Center) | `endoflife:bitbucket` | NVD, BDU, datele Atlassian |
| [`bitwarden`](/ro/configuration/products/bitwarden/) | Bitwarden (găzduit local) | `github:bitwarden/server` | NVD |
| [`cassandra`](/ro/configuration/products/cassandra/) | Apache Cassandra (protocol nativ CQL) | `endoflife:apache-cassandra` | NVD, BDU |
| [`clickhouse`](/ro/configuration/products/clickhouse/) | ClickHouse | `endoflife:clickhouse` | NVD, BDU |
| [`code-server`](/ro/configuration/products/code-server/) | code-server (VS Code în browser) | `github:coder/code-server` | NVD |
| [`confluence`](/ro/configuration/products/confluence/) | Atlassian Confluence (Data Center) | `endoflife:confluence` | NVD, BDU, datele Atlassian |
| [`dell-idrac`](/ro/configuration/products/dell-idrac/) | Dell iDRAC | — | NVD, BDU |
| [`domainmod`](/ro/configuration/products/domainmod/) | DomainMOD | `github:domainmod/domainmod` | NVD |
| [`doxygen`](/ro/configuration/products/doxygen/) | Site de documentație generat cu Doxygen | `github:doxygen/doxygen` | NVD |
| [`elasticsearch`](/ro/configuration/products/elasticsearch/) | Elasticsearch | `endoflife:elasticsearch` | NVD, BDU |
| [`esxi`](/ro/configuration/products/esxi/) | VMware ESXi | `endoflife:esxi` | — |
| [`euro-office`](/ro/configuration/products/euro-office/) | Euro-Office Docs (fork al ONLYOFFICE) | `github:Euro-Office/DocumentServer` | — |
| [`forgejo`](/ro/configuration/products/forgejo/) | Forgejo | `endoflife:forgejo` | NVD, BDU |
| [`fortios`](/ro/configuration/products/fortios/) | Fortinet FortiOS (FortiGate) | `endoflife:fortios` | NVD, BDU |
| [`freeradius`](/ro/configuration/products/freeradius/) | FreeRADIUS | `github-tag-branches:FreeRADIUS/freeradius-server` | NVD, BDU |
| [`generic`](/ro/configuration/products/generic/) | Parser scris manual pentru sisteme pe care enodia nu le cunoaște — consultați [Configurare](/ro/configuration/#sonda-generică) | — | — |
| [`ghost`](/ro/configuration/products/ghost/) | Ghost | `github:TryGhost/Ghost` | NVD, BDU |
| [`gitlab`](/ro/configuration/products/gitlab/) | GitLab | `endoflife:gitlab` | NVD, BDU |
| [`grafana`](/ro/configuration/products/grafana/) | Grafana | `endoflife:grafana` | NVD, BDU |
| [`graylog`](/ro/configuration/products/graylog/) | Graylog | `endoflife:graylog` | NVD, BDU |
| [`greenbone`](/ro/configuration/products/greenbone/) | Greenbone / OpenVAS (daemonul web gsad) | `github:greenbone/gsad` | NVD |
| [`haproxy`](/ro/configuration/products/haproxy/) | HAProxy | `endoflife:haproxy` | NVD, BDU |
| [`harbor`](/ro/configuration/products/harbor/) | Harbor (registru de containere) | `endoflife:harbor` | NVD, BDU |
| [`home-assistant`](/ro/configuration/products/home-assistant/) | Home Assistant (API REST, token de lungă durată) | `github:home-assistant/core` | NVD |
| [`hp-ilo4`](/ro/configuration/products/hp-ilo4/) | HP iLO 4 | — | NVD, BDU |
| [`jaeger`](/ro/configuration/products/jaeger/) | Jaeger | `endoflife:jaeger` | NVD |
| [`jellyfin`](/ro/configuration/products/jellyfin/) | Jellyfin | `github:jellyfin/jellyfin` | NVD |
| [`jenkins`](/ro/configuration/products/jenkins/) | Jenkins | `endoflife:jenkins` | NVD, BDU |
| [`jira`](/ro/configuration/products/jira/) | Atlassian Jira (Data Center) | `endoflife:jira-software` | NVD, BDU, datele Atlassian |
| [`kafka`](/ro/configuration/products/kafka/) | Broker Apache Kafka (prin SSH) | `endoflife:apache-kafka` | NVD, BDU |
| [`keycloak`](/ro/configuration/products/keycloak/) | Keycloak | `endoflife:keycloak` | NVD, BDU |
| [`kibana`](/ro/configuration/products/kibana/) | Kibana | `endoflife:kibana` | NVD, BDU |
| [`kitsu`](/ro/configuration/products/kitsu/) | Kitsu (frontend CG-Wire / Zou) | `github:cgwire/kitsu` | — |
| [`libretranslate`](/ro/configuration/products/libretranslate/) | LibreTranslate | `github:LibreTranslate/LibreTranslate` | — |
| [`logstash`](/ro/configuration/products/logstash/) | Logstash | `endoflife:logstash` | NVD, BDU |
| [`mariadb`](/ro/configuration/products/mariadb/) | MariaDB Server | `endoflife:mariadb` | NVD, BDU, datele MariaDB |
| [`mattermost`](/ro/configuration/products/mattermost/) | Mattermost | `endoflife:mattermost` | NVD, BDU |
| [`memcached`](/ro/configuration/products/memcached/) | memcached | `endoflife:memcached` | NVD, BDU |
| [`minio`](/ro/configuration/products/minio/) | MinIO (binarul serverului, prin SSH) | `github:minio/minio` | NVD, BDU |
| [`mongodb`](/ro/configuration/products/mongodb/) | MongoDB | `endoflife:mongodb` | NVD, BDU |
| [`mysql`](/ro/configuration/products/mysql/) | MySQL Server | `endoflife:mysql` | NVD, BDU |
| [`netbox`](/ro/configuration/products/netbox/) | NetBox | `github:netbox-community/netbox` | NVD |
| [`netdata`](/ro/configuration/products/netdata/) | Agentul Netdata | `github:netdata/netdata` | NVD, BDU |
| [`nextcloud`](/ro/configuration/products/nextcloud/) | Nextcloud | `endoflife:nextcloud` | NVD, BDU |
| [`nexus`](/ro/configuration/products/nexus/) | Sonatype Nexus Repository | `endoflife:nexus` | NVD, BDU |
| [`nginx`](/ro/configuration/products/nginx/) | nginx | `endoflife:nginx` | NVD, BDU, datele nginx |
| [`oauth2-proxy`](/ro/configuration/products/oauth2-proxy/) | oauth2-proxy | `github:oauth2-proxy/oauth2-proxy` | NVD, BDU |
| [`onlyoffice`](/ro/configuration/products/onlyoffice/) | ONLYOFFICE Docs (Document Server) | `github:ONLYOFFICE/DocumentServer` | NVD, BDU |
| [`openhab`](/ro/configuration/products/openhab/) | openHAB | `github:openhab/openhab-distro` | NVD |
| [`opensearch`](/ro/configuration/products/opensearch/) | OpenSearch | `endoflife:opensearch` | NVD, BDU |
| [`owncast`](/ro/configuration/products/owncast/) | Owncast | `github:owncast/owncast` | NVD |
| [`p4d`](/ro/configuration/products/p4d/) | Perforce Helix Core Server (p4d) | — | NVD, BDU |
| [`p4p`](/ro/configuration/products/p4p/) | Perforce Proxy (p4p) | — | — |
| [`perforce-swarm`](/ro/configuration/products/perforce-swarm/) | Perforce Helix Swarm | — | — |
| [`pgadmin`](/ro/configuration/products/pgadmin/) | pgAdmin | `github-tags:pgadmin-org/pgadmin4` | NVD, BDU |
| [`phpipam`](/ro/configuration/products/phpipam/) | phpIPAM | `github:phpipam/phpipam` | NVD, BDU |
| [`phpmyadmin`](/ro/configuration/products/phpmyadmin/) | phpMyAdmin | `endoflife:phpmyadmin` | NVD, BDU |
| [`portainer`](/ro/configuration/products/portainer/) | Portainer | `github:portainer/portainer` | NVD, BDU |
| [`postgres_exporter`](/ro/configuration/products/postgres_exporter/) | prometheus-community/postgres_exporter | `github:prometheus-community/postgres_exporter` | — |
| [`postgresql`](/ro/configuration/products/postgresql/) | PostgreSQL | `endoflife:postgresql` | NVD, BDU, datele PostgreSQL |
| [`posthog`](/ro/configuration/products/posthog/) | PostHog (găzduit local; versiunea este commitul git) | — | — |
| [`proftpd`](/ro/configuration/products/proftpd/) | ProFTPD | `endoflife:proftpd` | NVD, BDU |
| [`proxmox`](/ro/configuration/products/proxmox/) | Proxmox VE | `endoflife:proxmox-ve` | NVD, BDU |
| [`qbittorrent`](/ro/configuration/products/qbittorrent/) | qBittorrent (API Web UI) | `github:qbittorrent/qBittorrent` | NVD, BDU |
| [`rabbitmq`](/ro/configuration/products/rabbitmq/) | RabbitMQ (API-ul pluginului de management) | `endoflife:rabbitmq` | NVD, BDU |
| [`redis`](/ro/configuration/products/redis/) | Redis | `endoflife:redis` | NVD, BDU |
| [`routeros`](/ro/configuration/products/routeros/) | MikroTik RouterOS | `endoflife:routeros` | NVD, BDU |
| [`sentry`](/ro/configuration/products/sentry/) | Sentry (găzduit local) | `github:getsentry/self-hosted` | NVD |
| [`sonarqube`](/ro/configuration/products/sonarqube/) | SonarQube (Server sau Community Build) | `endoflife:sonarqube-server`\* | NVD, BDU |
| [`splunk`](/ro/configuration/products/splunk/) | Splunk Enterprise (API-ul de management splunkd) | `endoflife:splunk` | NVD, BDU |
| [`ssh`](/ro/configuration/products/ssh/) | Banner SSH (orice implementare) | — | NVD, BDU |
| [`supermicro-bmc`](/ro/configuration/products/supermicro-bmc/) | Supermicro BMC | — | — |
| [`synology-dsm`](/ro/configuration/products/synology-dsm/) | Synology DSM | — | NVD, BDU |
| [`teamcity`](/ro/configuration/products/teamcity/) | JetBrains TeamCity | — | NVD, BDU |
| [`testrail`](/ro/configuration/products/testrail/) | TestRail | — | NVD |
| [`torrserver`](/ro/configuration/products/torrserver/) | TorrServer | `github:YouROK/TorrServer` | — |
| [`traefik`](/ro/configuration/products/traefik/) | Traefik | `endoflife:traefik` | NVD, BDU |
| [`truenas`](/ro/configuration/products/truenas/) | TrueNAS | `endoflife:truenas` | — |
| [`uptime-kuma`](/ro/configuration/products/uptime-kuma/) | Uptime Kuma (autentificare socket.io) | `github:louislam/uptime-kuma` | NVD |
| [`vault`](/ro/configuration/products/vault/) | HashiCorp Vault | `endoflife:hashicorp-vault` | NVD, BDU |
| [`vaultwarden`](/ro/configuration/products/vaultwarden/) | Vaultwarden | `github:dani-garcia/vaultwarden` | NVD, BDU |
| [`vcenter`](/ro/configuration/products/vcenter/) | VMware vCenter Server | `endoflife:vcenter` | — |
| [`wapt`](/ro/configuration/products/wapt/) | Serverul WAPT (Tranquil IT) | — | NVD |
| [`weblate`](/ro/configuration/products/weblate/) | Weblate | `github:WeblateOrg/weblate` | NVD |
| [`wordpress`](/ro/configuration/products/wordpress/) | WordPress | `endoflife:wordpress` | NVD, BDU |
| [`youtrack`](/ro/configuration/products/youtrack/) | YouTrack | `endoflife:youtrack` | NVD, BDU |
| [`zabbix`](/ro/configuration/products/zabbix/) | Zabbix | `endoflife:zabbix` | NVD, BDU |
| [`zookeeper`](/ro/configuration/products/zookeeper/) | Apache ZooKeeper | `endoflife:zookeeper` | NVD, BDU |
| [`zou`](/ro/configuration/products/zou/) | Zou (backend API CG-Wire) | — | — |

## Sisteme de operare

31 de produse, toate identificate prin **SSH** în loc de HTTP —
consultați [Identificarea sistemului de operare prin SSH](/ro/configuration/products/ssh-os-probes/)
pentru mecanismul comun pe care îl folosește fiecare dintre acestea.

| Produs | Descriere | Rezolvator | CVE |
|---|---|---|---|
| [`almalinux`](/ro/configuration/products/almalinux/) | AlmaLinux | `endoflife:almalinux` | OVAL (pachete) |
| [`alpine-linux`](/ro/configuration/products/alpine-linux/) | Alpine Linux | `endoflife:alpine-linux` | Alpine secdb (pachete) |
| [`amazon-linux`](/ro/configuration/products/amazon-linux/) | Amazon Linux | `endoflife:amazon-linux` | — |
| [`astra-linux`](/ro/configuration/products/astra-linux/) | Astra Linux | — | OVAL (pachete) |
| [`centos`](/ro/configuration/products/centos/) | CentOS Linux (vechi, EOL) | `endoflife:centos` | — |
| [`centos-stream`](/ro/configuration/products/centos-stream/) | CentOS Stream | `endoflife:centos-stream` | — |
| [`debian`](/ro/configuration/products/debian/) | Debian | `endoflife:debian` | Debian tracker (pachete) |
| [`eurolinux`](/ro/configuration/products/eurolinux/) | EuroLinux | `endoflife:eurolinux` | — |
| [`fedora`](/ro/configuration/products/fedora/) | Fedora Linux | `endoflife:fedora` | — |
| [`freebsd`](/ro/configuration/products/freebsd/) | FreeBSD | `endoflife:freebsd` | — |
| [`gentoo`](/ro/configuration/products/gentoo/) | Gentoo Linux | — | — |
| [`kali-linux`](/ro/configuration/products/kali-linux/) | Kali Linux | — | — |
| [`linuxmint`](/ro/configuration/products/linuxmint/) | Linux Mint | `endoflife:linuxmint` | OVAL (pachete) |
| [`macos`](/ro/configuration/products/macos/) | macOS | `endoflife:macos` | NVD, BDU |
| [`netbsd`](/ro/configuration/products/netbsd/) | NetBSD | `endoflife:netbsd` | — |
| [`nixos`](/ro/configuration/products/nixos/) | NixOS | `endoflife:nixos` | — |
| [`openbsd`](/ro/configuration/products/openbsd/) | OpenBSD | `endoflife:openbsd` | — |
| [`openeuler`](/ro/configuration/products/openeuler/) | openEuler | — | — |
| [`opensuse`](/ro/configuration/products/opensuse/) | openSUSE | `endoflife:opensuse` | — |
| [`opnsense`](/ro/configuration/products/opnsense/) | OPNsense | `endoflife:opnsense` | NVD, BDU |
| [`oracle-linux`](/ro/configuration/products/oracle-linux/) | Oracle Linux | `endoflife:oracle-linux` | OVAL (pachete) |
| [`oracle-solaris`](/ro/configuration/products/oracle-solaris/) | Oracle Solaris | `endoflife:oracle-solaris` | — |
| [`pfsense`](/ro/configuration/products/pfsense/) | pfSense Community Edition | — | NVD, BDU |
| [`photon`](/ro/configuration/products/photon/) | VMware Photon OS | `endoflife:photon` | — |
| [`postmarketos`](/ro/configuration/products/postmarketos/) | postmarketOS | `endoflife:postmarketos` | — |
| [`redos`](/ro/configuration/products/redos/) | RED OS | — | OVAL (pachete) |
| [`rhel`](/ro/configuration/products/rhel/) | Red Hat Enterprise Linux | `endoflife:rhel` | OVAL (pachete) |
| [`rocky-linux`](/ro/configuration/products/rocky-linux/) | Rocky Linux | `endoflife:rocky-linux` | OVAL (pachete) |
| [`slackware`](/ro/configuration/products/slackware/) | Slackware | `endoflife:slackware` | — |
| [`steamos`](/ro/configuration/products/steamos/) | SteamOS | `endoflife:steamos` | — |
| [`ubuntu`](/ro/configuration/products/ubuntu/) | Ubuntu | `endoflife:ubuntu` | OVAL (pachete) |

## Produse Atlassian

Jira, Confluence, Bitbucket și Bamboo folosesc aceeași convenție pentru
endpoint-ul de manifest. `product:` este declarat explicit în
configurația dumneavoastră, nu ghicit din răspuns — a indica un URL
Confluence într-o intrare Jira este o greșeală de tipar reală, care
merită detectată, nu înregistrată tacit ca un fapt greșit. Manifestul
Bitbucket se raportează în continuare ca `stash` (numele său anterior) —
acesta este răspunsul producătorului, nu o ciudățenie a enodia.

## `zou` și `kitsu` — o sondă, două produse

Ambele indică același backend API Zou și răspund la aceeași cerere —
sunt înregistrate separat deoarece au nevoie de rezolvatoare diferite
ale ciclului de viață (repository-ul GitHub al Zou nu publică niciun
Release utilizabil). Consultați [Zou](/ro/configuration/products/zou/)
și [Kitsu](/ro/configuration/products/kitsu/) pentru explicația
completă.

## Nu găsiți produsul dumneavoastră?

Folosiți [`product: generic`](/ro/configuration/#sonda-generică) ca
soluție de rezervă pentru orice nu are o sondă dedicată sau deschideți
un issue pe [GitHub](https://github.com/EpicMorg/enodia/issues) —
șablonul `.github/ISSUE_TEMPLATE/new_product.yml` solicită exact ceea
ce are nevoie o sondă nouă.
