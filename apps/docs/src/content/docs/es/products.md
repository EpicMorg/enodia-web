---
title: Productos compatibles
description: "Las 123 sondas integradas, tal como las muestra `enodia products`."
---

123 productos, cada uno una sonda compilada (consulte
[Conceptos](/es/concepts/#las-sondas-están-compiladas-no-son-un-dsl-en-yaml)). Use el
valor de **Producto** como `product:` en un destino. **Resolvedor** es el
identificador de los datos del ciclo de vida: `endoflife:<slug>` para
[endoflife.date](https://endoflife.date/) (fechas reales de EOL/soporte),
`github:<owner/repo>` para GitHub Releases (solo la última versión, sin
eol/soporte/lts: GitHub no tiene ninguna opinión sobre la política de
ciclo de vida), o `github-tags:<owner/repo>` para un repositorio sin
ninguna Release, solo con etiquetas de git (la misma limitación de «solo
la última versión» que `github:`, que se usa cuando las propias
etiquetas de un producto ni siquiera son una versión simple con puntos;
consulte [pgAdmin](/es/configuration/products/pgadmin/)), o
`github-tag-branches:<owner/repo>` para un proyecto que mantiene varias
ramas de versiones a la vez (un ciclo de vida por cada major.minor, cada
uno con su propia etiqueta más reciente; consulte
[FreeRADIUS](/es/configuration/products/freeradius/)); un `—`
significa que enodia detecta la versión de ese producto pero aún no
tiene correspondencia de ciclo de vida (sus ejes de parche/rama siguen
funcionando; su eje de ciclo de vida queda en `unknown`). Haga clic en un
producto para ver su endpoint exacto, sus requisitos de autenticación y
los campos registrados.

Ambos tipos de resolvedor basados en GitHub funcionan por defecto sin
autenticación (con un límite de 60 peticiones/hora, compartido con
cualquier otra cosa que use la misma IP de origen): establezca la
variable de entorno **`GITHUB_TOKEN`** (la misma convención que usan
`gh`, goreleaser y el propio GitHub Actions) para elevarlo a 5000/hora;
si está vacía o no está definida, simplemente se vuelve al límite sin
autenticación, y nada se rompe en ningún caso.

Desde la 2.2, los resolvedores de GitHub también leen las etiquetas de
versión tal como las escriben realmente los proyectos: se elimina un
`<repo>-`/`<repo>_` inicial (`weblate-2026.10` se lee como `2026.10`),
las etiquetas escritas con guiones bajos (`Release_1_18_0`) y con el
prefijo `release-` (`release-5.2.4`) se interpretan como versiones, y una
etiqueta que indica una versión preliminar (`5.3.0.M2`, `2026.10.0b7`,
`-rc1`, `-beta.1`) se omite aunque GitHub no la marque como tal.

**CVE** indica con qué bases de datos se coteja el producto cuando hay
un [bloque `cve:`](/es/cve/) configurado: `NVD`, `BDU` (BDU FSTEC) o `—`
si no hay búsqueda de CVE; `datos de MariaDB`, `datos de Atlassian`,
`datos de PostgreSQL` y `datos de nginx` añaden los propios datos de
seguridad de ese fabricante (consulte
[Datos propios de los fabricantes](/es/cve/#datos-propios-de-los-fabricantes)). Diez distribuciones Linux se cotejan por
paquete instalado en lugar de por versión: `(paquetes)` indica la
fuente: el Debian Security Tracker, el OVAL del fabricante o el secdb de
Alpine (consulte
[CVE a nivel de paquete](/es/cve/#cve-a-nivel-de-paquete-para-distribuciones-linux)) (cada caso sin correspondencia tiene su motivo
en la página [Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia)).
Esta columna procede de las propias tablas de productos de enodia, no de
`enodia products`.

Esta tabla se genera a partir de `enodia products` con el binario
compilado actual; vuelva a ejecutarlo para comprobar si hay desviaciones
antes de dar esta página por definitiva si ha pasado un tiempo. La fila
de **`sonarqube`** muestra su valor estático de respaldo
(`endoflife:sonarqube-server`, lo que muestra `enodia products` cuando
aún no se ha sondeado nada): una observación real elige entre ese y
`endoflife:sonarqube-community` para cada instancia, a partir de la
propia cadena de versión; consulte
[su propia página](/es/configuration/products/sonarqube/).

## Aplicaciones y servicios de infraestructura

92 productos, sondeados por HTTP(S) o mediante un protocolo de red
propio (MySQL, Redis, MongoDB, Cassandra, ...). Cinco son excepciones:
[`p4d`](/es/configuration/products/p4d/) y
[`p4p`](/es/configuration/products/p4p/) no hablan ningún protocolo de
red que enodia implemente: ambos invocan la propia CLI `p4` del
operador, que debe estar instalada junto a enodia, y no solo ser
accesible por la red; y
[`freeradius`](/es/configuration/products/freeradius/),
[`kafka`](/es/configuration/products/kafka/) y
[`minio`](/es/configuration/products/minio/) se leen por SSH, a partir del
propio binario o jar del servidor: RADIUS no tiene forma de informar de
una versión, la de Kafka solo está en JMX y la de MinIO solo tras una
clave de administrador.

| Producto | Resumen | Resolvedor | CVE |
|---|---|---|---|
| [`apache`](/es/configuration/products/apache/) | Apache HTTP Server | `endoflife:apache-http-server` | NVD, BDU |
| [`artifactory`](/es/configuration/products/artifactory/) | JFrog Artifactory | `endoflife:artifactory` | NVD, BDU |
| [`bamboo`](/es/configuration/products/bamboo/) | Atlassian Bamboo (Data Center) | `endoflife:bamboo` | NVD, BDU, datos de Atlassian |
| [`bitbucket`](/es/configuration/products/bitbucket/) | Atlassian Bitbucket (Data Center) | `endoflife:bitbucket` | NVD, BDU, datos de Atlassian |
| [`bitwarden`](/es/configuration/products/bitwarden/) | Bitwarden (autoalojado) | `github:bitwarden/server` | NVD |
| [`cassandra`](/es/configuration/products/cassandra/) | Apache Cassandra (protocolo nativo CQL) | `endoflife:apache-cassandra` | NVD, BDU |
| [`clickhouse`](/es/configuration/products/clickhouse/) | ClickHouse | `endoflife:clickhouse` | NVD, BDU |
| [`code-server`](/es/configuration/products/code-server/) | code-server (VS Code en el navegador) | `github:coder/code-server` | NVD |
| [`confluence`](/es/configuration/products/confluence/) | Atlassian Confluence (Data Center) | `endoflife:confluence` | NVD, BDU, datos de Atlassian |
| [`dell-idrac`](/es/configuration/products/dell-idrac/) | Dell iDRAC | — | NVD, BDU |
| [`domainmod`](/es/configuration/products/domainmod/) | DomainMOD | `github:domainmod/domainmod` | NVD |
| [`doxygen`](/es/configuration/products/doxygen/) | Sitio de documentación generado con Doxygen | `github:doxygen/doxygen` | NVD |
| [`elasticsearch`](/es/configuration/products/elasticsearch/) | Elasticsearch | `endoflife:elasticsearch` | NVD, BDU |
| [`esxi`](/es/configuration/products/esxi/) | VMware ESXi | `endoflife:esxi` | — |
| [`euro-office`](/es/configuration/products/euro-office/) | Euro-Office Docs (bifurcación de ONLYOFFICE) | `github:Euro-Office/DocumentServer` | — |
| [`forgejo`](/es/configuration/products/forgejo/) | Forgejo | `endoflife:forgejo` | NVD, BDU |
| [`fortios`](/es/configuration/products/fortios/) | Fortinet FortiOS (FortiGate) | `endoflife:fortios` | NVD, BDU |
| [`freeradius`](/es/configuration/products/freeradius/) | FreeRADIUS | `github-tag-branches:FreeRADIUS/freeradius-server` | NVD, BDU |
| [`generic`](/es/configuration/products/generic/) | Analizador escrito a mano para sistemas que enodia no conoce; consulte [Configuración](/es/configuration/#la-sonda-genérica) | — | — |
| [`ghost`](/es/configuration/products/ghost/) | Ghost | `github:TryGhost/Ghost` | NVD, BDU |
| [`gitlab`](/es/configuration/products/gitlab/) | GitLab | `endoflife:gitlab` | NVD, BDU |
| [`grafana`](/es/configuration/products/grafana/) | Grafana | `endoflife:grafana` | NVD, BDU |
| [`graylog`](/es/configuration/products/graylog/) | Graylog | `endoflife:graylog` | NVD, BDU |
| [`greenbone`](/es/configuration/products/greenbone/) | Greenbone / OpenVAS (demonio web gsad) | `github:greenbone/gsad` | NVD |
| [`haproxy`](/es/configuration/products/haproxy/) | HAProxy | `endoflife:haproxy` | NVD, BDU |
| [`harbor`](/es/configuration/products/harbor/) | Harbor (registro de contenedores) | `endoflife:harbor` | NVD, BDU |
| [`home-assistant`](/es/configuration/products/home-assistant/) | Home Assistant (API REST, token de larga duración) | `github:home-assistant/core` | NVD |
| [`hp-ilo4`](/es/configuration/products/hp-ilo4/) | HP iLO 4 | — | NVD, BDU |
| [`jaeger`](/es/configuration/products/jaeger/) | Jaeger | `endoflife:jaeger` | NVD |
| [`jellyfin`](/es/configuration/products/jellyfin/) | Jellyfin | `github:jellyfin/jellyfin` | NVD |
| [`jenkins`](/es/configuration/products/jenkins/) | Jenkins | `endoflife:jenkins` | NVD, BDU |
| [`jira`](/es/configuration/products/jira/) | Atlassian Jira (Data Center) | `endoflife:jira-software` | NVD, BDU, datos de Atlassian |
| [`kafka`](/es/configuration/products/kafka/) | Broker de Apache Kafka (por SSH) | `endoflife:apache-kafka` | NVD, BDU |
| [`keycloak`](/es/configuration/products/keycloak/) | Keycloak | `endoflife:keycloak` | NVD, BDU |
| [`kibana`](/es/configuration/products/kibana/) | Kibana | `endoflife:kibana` | NVD, BDU |
| [`kitsu`](/es/configuration/products/kitsu/) | Kitsu (frontend de CG-Wire / Zou) | `github:cgwire/kitsu` | — |
| [`libretranslate`](/es/configuration/products/libretranslate/) | LibreTranslate | `github:LibreTranslate/LibreTranslate` | — |
| [`logstash`](/es/configuration/products/logstash/) | Logstash | `endoflife:logstash` | NVD, BDU |
| [`mariadb`](/es/configuration/products/mariadb/) | MariaDB Server | `endoflife:mariadb` | NVD, BDU, datos de MariaDB |
| [`mattermost`](/es/configuration/products/mattermost/) | Mattermost | `endoflife:mattermost` | NVD, BDU |
| [`memcached`](/es/configuration/products/memcached/) | memcached | `endoflife:memcached` | NVD, BDU |
| [`minio`](/es/configuration/products/minio/) | MinIO (binario del servidor, por SSH) | `github:minio/minio` | NVD, BDU |
| [`mongodb`](/es/configuration/products/mongodb/) | MongoDB | `endoflife:mongodb` | NVD, BDU |
| [`mysql`](/es/configuration/products/mysql/) | MySQL Server | `endoflife:mysql` | NVD, BDU |
| [`netbox`](/es/configuration/products/netbox/) | NetBox | `github:netbox-community/netbox` | NVD |
| [`netdata`](/es/configuration/products/netdata/) | Agente de Netdata | `github:netdata/netdata` | NVD, BDU |
| [`nextcloud`](/es/configuration/products/nextcloud/) | Nextcloud | `endoflife:nextcloud` | NVD, BDU |
| [`nexus`](/es/configuration/products/nexus/) | Sonatype Nexus Repository | `endoflife:nexus` | NVD, BDU |
| [`nginx`](/es/configuration/products/nginx/) | nginx | `endoflife:nginx` | NVD, BDU, datos de nginx |
| [`oauth2-proxy`](/es/configuration/products/oauth2-proxy/) | oauth2-proxy | `github:oauth2-proxy/oauth2-proxy` | NVD, BDU |
| [`onlyoffice`](/es/configuration/products/onlyoffice/) | ONLYOFFICE Docs (Document Server) | `github:ONLYOFFICE/DocumentServer` | NVD, BDU |
| [`openhab`](/es/configuration/products/openhab/) | openHAB | `github:openhab/openhab-distro` | NVD |
| [`opensearch`](/es/configuration/products/opensearch/) | OpenSearch | `endoflife:opensearch` | NVD, BDU |
| [`owncast`](/es/configuration/products/owncast/) | Owncast | `github:owncast/owncast` | NVD |
| [`p4d`](/es/configuration/products/p4d/) | Perforce Helix Core Server (p4d) | — | NVD, BDU |
| [`p4p`](/es/configuration/products/p4p/) | Perforce Proxy (p4p) | — | — |
| [`perforce-swarm`](/es/configuration/products/perforce-swarm/) | Perforce Helix Swarm | — | — |
| [`pgadmin`](/es/configuration/products/pgadmin/) | pgAdmin | `github-tags:pgadmin-org/pgadmin4` | NVD, BDU |
| [`phpipam`](/es/configuration/products/phpipam/) | phpIPAM | `github:phpipam/phpipam` | NVD, BDU |
| [`phpmyadmin`](/es/configuration/products/phpmyadmin/) | phpMyAdmin | `endoflife:phpmyadmin` | NVD, BDU |
| [`portainer`](/es/configuration/products/portainer/) | Portainer | `github:portainer/portainer` | NVD, BDU |
| [`postgres_exporter`](/es/configuration/products/postgres_exporter/) | prometheus-community/postgres_exporter | `github:prometheus-community/postgres_exporter` | — |
| [`postgresql`](/es/configuration/products/postgresql/) | PostgreSQL | `endoflife:postgresql` | NVD, BDU, datos de PostgreSQL |
| [`posthog`](/es/configuration/products/posthog/) | PostHog (autoalojado; la versión es el commit de git) | — | — |
| [`proftpd`](/es/configuration/products/proftpd/) | ProFTPD | `endoflife:proftpd` | NVD, BDU |
| [`proxmox`](/es/configuration/products/proxmox/) | Proxmox VE | `endoflife:proxmox-ve` | NVD, BDU |
| [`qbittorrent`](/es/configuration/products/qbittorrent/) | qBittorrent (API de la Web UI) | `github:qbittorrent/qBittorrent` | NVD, BDU |
| [`rabbitmq`](/es/configuration/products/rabbitmq/) | RabbitMQ (API del plugin de administración) | `endoflife:rabbitmq` | NVD, BDU |
| [`redis`](/es/configuration/products/redis/) | Redis | `endoflife:redis` | NVD, BDU |
| [`routeros`](/es/configuration/products/routeros/) | MikroTik RouterOS | `endoflife:routeros` | NVD, BDU |
| [`sentry`](/es/configuration/products/sentry/) | Sentry (autoalojado) | `github:getsentry/self-hosted` | NVD |
| [`sonarqube`](/es/configuration/products/sonarqube/) | SonarQube (Server o Community Build) | `endoflife:sonarqube-server`\* | NVD, BDU |
| [`splunk`](/es/configuration/products/splunk/) | Splunk Enterprise (API de administración de splunkd) | `endoflife:splunk` | NVD, BDU |
| [`ssh`](/es/configuration/products/ssh/) | Banner SSH (cualquier implementación) | — | NVD, BDU |
| [`supermicro-bmc`](/es/configuration/products/supermicro-bmc/) | BMC de Supermicro | — | — |
| [`synology-dsm`](/es/configuration/products/synology-dsm/) | Synology DSM | — | NVD, BDU |
| [`teamcity`](/es/configuration/products/teamcity/) | JetBrains TeamCity | — | NVD, BDU |
| [`testrail`](/es/configuration/products/testrail/) | TestRail | — | NVD |
| [`torrserver`](/es/configuration/products/torrserver/) | TorrServer | `github:YouROK/TorrServer` | — |
| [`traefik`](/es/configuration/products/traefik/) | Traefik | `endoflife:traefik` | NVD, BDU |
| [`truenas`](/es/configuration/products/truenas/) | TrueNAS | `endoflife:truenas` | — |
| [`uptime-kuma`](/es/configuration/products/uptime-kuma/) | Uptime Kuma (inicio de sesión por socket.io) | `github:louislam/uptime-kuma` | NVD |
| [`vault`](/es/configuration/products/vault/) | HashiCorp Vault | `endoflife:hashicorp-vault` | NVD, BDU |
| [`vaultwarden`](/es/configuration/products/vaultwarden/) | Vaultwarden | `github:dani-garcia/vaultwarden` | NVD, BDU |
| [`vcenter`](/es/configuration/products/vcenter/) | VMware vCenter Server | `endoflife:vcenter` | — |
| [`wapt`](/es/configuration/products/wapt/) | Servidor WAPT (Tranquil IT) | — | NVD |
| [`weblate`](/es/configuration/products/weblate/) | Weblate | `github:WeblateOrg/weblate` | NVD |
| [`wordpress`](/es/configuration/products/wordpress/) | WordPress | `endoflife:wordpress` | NVD, BDU |
| [`youtrack`](/es/configuration/products/youtrack/) | YouTrack | `endoflife:youtrack` | NVD, BDU |
| [`zabbix`](/es/configuration/products/zabbix/) | Zabbix | `endoflife:zabbix` | NVD, BDU |
| [`zookeeper`](/es/configuration/products/zookeeper/) | Apache ZooKeeper | `endoflife:zookeeper` | NVD, BDU |
| [`zou`](/es/configuration/products/zou/) | Zou (backend de la API de CG-Wire) | — | — |

## Sistemas operativos

31 productos, todos identificados por **SSH** en lugar de HTTP; consulte
[Identificación del SO por SSH](/es/configuration/products/ssh-os-probes/)
para ver el mecanismo común que usan todos ellos.

| Producto | Resumen | Resolvedor | CVE |
|---|---|---|---|
| [`almalinux`](/es/configuration/products/almalinux/) | AlmaLinux | `endoflife:almalinux` | OVAL (paquetes) |
| [`alpine-linux`](/es/configuration/products/alpine-linux/) | Alpine Linux | `endoflife:alpine-linux` | secdb de Alpine (paquetes) |
| [`amazon-linux`](/es/configuration/products/amazon-linux/) | Amazon Linux | `endoflife:amazon-linux` | — |
| [`astra-linux`](/es/configuration/products/astra-linux/) | Astra Linux | — | OVAL (paquetes) |
| [`centos`](/es/configuration/products/centos/) | CentOS Linux (heredado, EOL) | `endoflife:centos` | — |
| [`centos-stream`](/es/configuration/products/centos-stream/) | CentOS Stream | `endoflife:centos-stream` | — |
| [`debian`](/es/configuration/products/debian/) | Debian | `endoflife:debian` | tracker de Debian (paquetes) |
| [`eurolinux`](/es/configuration/products/eurolinux/) | EuroLinux | `endoflife:eurolinux` | — |
| [`fedora`](/es/configuration/products/fedora/) | Fedora Linux | `endoflife:fedora` | — |
| [`freebsd`](/es/configuration/products/freebsd/) | FreeBSD | `endoflife:freebsd` | — |
| [`gentoo`](/es/configuration/products/gentoo/) | Gentoo Linux | — | — |
| [`kali-linux`](/es/configuration/products/kali-linux/) | Kali Linux | — | — |
| [`linuxmint`](/es/configuration/products/linuxmint/) | Linux Mint | `endoflife:linuxmint` | OVAL (paquetes) |
| [`macos`](/es/configuration/products/macos/) | macOS | `endoflife:macos` | NVD, BDU |
| [`netbsd`](/es/configuration/products/netbsd/) | NetBSD | `endoflife:netbsd` | — |
| [`nixos`](/es/configuration/products/nixos/) | NixOS | `endoflife:nixos` | — |
| [`openbsd`](/es/configuration/products/openbsd/) | OpenBSD | `endoflife:openbsd` | — |
| [`openeuler`](/es/configuration/products/openeuler/) | openEuler | — | — |
| [`opensuse`](/es/configuration/products/opensuse/) | openSUSE | `endoflife:opensuse` | — |
| [`opnsense`](/es/configuration/products/opnsense/) | OPNsense | `endoflife:opnsense` | NVD, BDU |
| [`oracle-linux`](/es/configuration/products/oracle-linux/) | Oracle Linux | `endoflife:oracle-linux` | OVAL (paquetes) |
| [`oracle-solaris`](/es/configuration/products/oracle-solaris/) | Oracle Solaris | `endoflife:oracle-solaris` | — |
| [`pfsense`](/es/configuration/products/pfsense/) | pfSense Community Edition | — | NVD, BDU |
| [`photon`](/es/configuration/products/photon/) | VMware Photon OS | `endoflife:photon` | — |
| [`postmarketos`](/es/configuration/products/postmarketos/) | postmarketOS | `endoflife:postmarketos` | — |
| [`redos`](/es/configuration/products/redos/) | RED OS | — | OVAL (paquetes) |
| [`rhel`](/es/configuration/products/rhel/) | Red Hat Enterprise Linux | `endoflife:rhel` | OVAL (paquetes) |
| [`rocky-linux`](/es/configuration/products/rocky-linux/) | Rocky Linux | `endoflife:rocky-linux` | OVAL (paquetes) |
| [`slackware`](/es/configuration/products/slackware/) | Slackware | `endoflife:slackware` | — |
| [`steamos`](/es/configuration/products/steamos/) | SteamOS | `endoflife:steamos` | — |
| [`ubuntu`](/es/configuration/products/ubuntu/) | Ubuntu | `endoflife:ubuntu` | OVAL (paquetes) |

## Productos de Atlassian

Jira, Confluence, Bitbucket y Bamboo comparten una misma convención de
endpoint de manifiesto. `product:` se declara explícitamente en su
configuración en lugar de deducirse de la respuesta: apuntar una URL de
Confluence en una entrada de Jira es una errata real que merece
detectarse, no registrarse en silencio como un hecho erróneo. El propio
manifiesto de Bitbucket sigue identificándose como `stash` (su nombre
anterior): es la respuesta del fabricante, no una peculiaridad de enodia.

## `zou` y `kitsu`: una sonda, dos productos

Ambos apuntan al mismo backend de la API de Zou y responden a la misma
petición; se registran por separado porque necesitan resolvedores del
ciclo de vida distintos (el propio repositorio de GitHub de Zou no
publica Releases utilizables). Consulte
[Zou](/es/configuration/products/zou/) y
[Kitsu](/es/configuration/products/kitsu/) para la explicación completa.

## ¿No encuentra su producto?

Use [`product: generic`](/es/configuration/#la-sonda-genérica) como vía
de escape para cualquier cosa sin sonda dedicada, o abra una incidencia
en [GitHub](https://github.com/EpicMorg/enodia/issues): la plantilla
`.github/ISSUE_TEMPLATE/new_product.yml` pide exactamente lo que necesita
una sonda nueva.
