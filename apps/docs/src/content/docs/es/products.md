---
title: Productos compatibles
description: "Las 90 sondas integradas, tal como las muestra `enodia products`."
---

90 productos, cada uno una sonda compilada (consulte
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
consulte [pgAdmin](/es/configuration/products/pgadmin/)); un `—`
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

**CVE** indica con qué bases de datos se coteja el producto cuando hay
un [bloque `cve:`](/es/cve/) configurado: `NVD`, `BDU` (BDU FSTEC) o `—`
si no hay búsqueda de CVE (cada caso sin correspondencia tiene su motivo
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

60 productos, sondeados por HTTP(S) o mediante un protocolo de red
propio (MySQL, Redis, MongoDB, ...), sin intervención de SSH. Dos de
ellos, [`p4d`](/es/configuration/products/p4d/) y
[`p4p`](/es/configuration/products/p4p/), son una excepción adicional:
ninguno habla un protocolo de red que enodia implemente; ambos invocan la
propia CLI `p4` del operador, que debe estar instalada junto a enodia, y
no solo ser accesible por la red.

| Producto | Resumen | Resolvedor | CVE |
|---|---|---|---|
| [`apache`](/es/configuration/products/apache/) | Apache HTTP Server | `endoflife:apache-http-server` | NVD, BDU |
| [`artifactory`](/es/configuration/products/artifactory/) | JFrog Artifactory | `endoflife:artifactory` | NVD, BDU |
| [`bamboo`](/es/configuration/products/bamboo/) | Atlassian Bamboo (Data Center) | `endoflife:bamboo` | NVD, BDU |
| [`bitbucket`](/es/configuration/products/bitbucket/) | Atlassian Bitbucket (Data Center) | `endoflife:bitbucket` | NVD, BDU |
| [`bitwarden`](/es/configuration/products/bitwarden/) | Bitwarden (autoalojado) | `github:bitwarden/server` | NVD |
| [`clickhouse`](/es/configuration/products/clickhouse/) | ClickHouse | `endoflife:clickhouse` | NVD, BDU |
| [`confluence`](/es/configuration/products/confluence/) | Atlassian Confluence (Data Center) | `endoflife:confluence` | NVD, BDU |
| [`elasticsearch`](/es/configuration/products/elasticsearch/) | Elasticsearch | `endoflife:elasticsearch` | NVD, BDU |
| [`esxi`](/es/configuration/products/esxi/) | VMware ESXi | `endoflife:esxi` | — |
| [`forgejo`](/es/configuration/products/forgejo/) | Forgejo | `endoflife:forgejo` | NVD, BDU |
| [`fortios`](/es/configuration/products/fortios/) | Fortinet FortiOS (FortiGate) | `endoflife:fortios` | NVD, BDU |
| [`generic`](/es/configuration/products/generic/) | Analizador escrito a mano para sistemas que enodia no conoce; consulte [Configuración](/es/configuration/#la-sonda-genérica) | — | — |
| [`gitlab`](/es/configuration/products/gitlab/) | GitLab | `endoflife:gitlab` | NVD, BDU |
| [`grafana`](/es/configuration/products/grafana/) | Grafana | `endoflife:grafana` | NVD, BDU |
| [`graylog`](/es/configuration/products/graylog/) | Graylog | `endoflife:graylog` | NVD, BDU |
| [`haproxy`](/es/configuration/products/haproxy/) | HAProxy | `endoflife:haproxy` | NVD, BDU |
| [`harbor`](/es/configuration/products/harbor/) | Harbor (registro de contenedores) | `endoflife:harbor` | NVD, BDU |
| [`jaeger`](/es/configuration/products/jaeger/) | Jaeger | `endoflife:jaeger` | NVD |
| [`jellyfin`](/es/configuration/products/jellyfin/) | Jellyfin | `github:jellyfin/jellyfin` | NVD |
| [`jenkins`](/es/configuration/products/jenkins/) | Jenkins | `endoflife:jenkins` | NVD, BDU |
| [`jira`](/es/configuration/products/jira/) | Atlassian Jira (Data Center) | `endoflife:jira-software` | NVD, BDU |
| [`keycloak`](/es/configuration/products/keycloak/) | Keycloak | `endoflife:keycloak` | NVD, BDU |
| [`kibana`](/es/configuration/products/kibana/) | Kibana | `endoflife:kibana` | NVD, BDU |
| [`kitsu`](/es/configuration/products/kitsu/) | Kitsu (frontend de CG-Wire / Zou) | `github:cgwire/kitsu` | — |
| [`logstash`](/es/configuration/products/logstash/) | Logstash | `endoflife:logstash` | NVD, BDU |
| [`mattermost`](/es/configuration/products/mattermost/) | Mattermost | `endoflife:mattermost` | NVD, BDU |
| [`mongodb`](/es/configuration/products/mongodb/) | MongoDB | `endoflife:mongodb` | NVD, BDU |
| [`mysql`](/es/configuration/products/mysql/) | MySQL Server | `endoflife:mysql` | NVD, BDU |
| [`nextcloud`](/es/configuration/products/nextcloud/) | Nextcloud | `endoflife:nextcloud` | NVD, BDU |
| [`nexus`](/es/configuration/products/nexus/) | Sonatype Nexus Repository | `endoflife:nexus` | NVD, BDU |
| [`nginx`](/es/configuration/products/nginx/) | nginx | `endoflife:nginx` | NVD, BDU |
| [`oauth2-proxy`](/es/configuration/products/oauth2-proxy/) | oauth2-proxy | `github:oauth2-proxy/oauth2-proxy` | NVD, BDU |
| [`opensearch`](/es/configuration/products/opensearch/) | OpenSearch | `endoflife:opensearch` | NVD, BDU |
| [`owncast`](/es/configuration/products/owncast/) | Owncast | `github:owncast/owncast` | NVD |
| [`p4d`](/es/configuration/products/p4d/) | Perforce Helix Core Server (p4d) | — | NVD, BDU |
| [`p4p`](/es/configuration/products/p4p/) | Perforce Proxy (p4p) | — | — |
| [`perforce-swarm`](/es/configuration/products/perforce-swarm/) | Perforce Helix Swarm | — | — |
| [`pgadmin`](/es/configuration/products/pgadmin/) | pgAdmin | `github-tags:pgadmin-org/pgadmin4` | NVD, BDU |
| [`phpmyadmin`](/es/configuration/products/phpmyadmin/) | phpMyAdmin | `endoflife:phpmyadmin` | NVD, BDU |
| [`portainer`](/es/configuration/products/portainer/) | Portainer | `github:portainer/portainer` | NVD, BDU |
| [`postgres_exporter`](/es/configuration/products/postgres_exporter/) | prometheus-community/postgres_exporter | `github:prometheus-community/postgres_exporter` | — |
| [`postgresql`](/es/configuration/products/postgresql/) | PostgreSQL | `endoflife:postgresql` | NVD, BDU |
| [`proftpd`](/es/configuration/products/proftpd/) | ProFTPD | `endoflife:proftpd` | NVD, BDU |
| [`proxmox`](/es/configuration/products/proxmox/) | Proxmox VE | `endoflife:proxmox-ve` | NVD, BDU |
| [`redis`](/es/configuration/products/redis/) | Redis | `endoflife:redis` | NVD, BDU |
| [`routeros`](/es/configuration/products/routeros/) | MikroTik RouterOS | `endoflife:routeros` | NVD, BDU |
| [`sonarqube`](/es/configuration/products/sonarqube/) | SonarQube (Server o Community Build) | `endoflife:sonarqube-server`\* | NVD, BDU |
| [`ssh`](/es/configuration/products/ssh/) | Banner SSH (cualquier implementación) | — | NVD, BDU |
| [`synology-dsm`](/es/configuration/products/synology-dsm/) | Synology DSM | — | — |
| [`teamcity`](/es/configuration/products/teamcity/) | JetBrains TeamCity | — | NVD, BDU |
| [`testrail`](/es/configuration/products/testrail/) | TestRail | — | NVD |
| [`traefik`](/es/configuration/products/traefik/) | Traefik | `endoflife:traefik` | NVD, BDU |
| [`truenas`](/es/configuration/products/truenas/) | TrueNAS | `endoflife:truenas` | — |
| [`vault`](/es/configuration/products/vault/) | HashiCorp Vault | `endoflife:hashicorp-vault` | NVD, BDU |
| [`vaultwarden`](/es/configuration/products/vaultwarden/) | Vaultwarden | `github:dani-garcia/vaultwarden` | NVD, BDU |
| [`vcenter`](/es/configuration/products/vcenter/) | VMware vCenter Server | `endoflife:vcenter` | — |
| [`wordpress`](/es/configuration/products/wordpress/) | WordPress | `endoflife:wordpress` | NVD, BDU |
| [`youtrack`](/es/configuration/products/youtrack/) | YouTrack | `endoflife:youtrack` | NVD, BDU |
| [`zabbix`](/es/configuration/products/zabbix/) | Zabbix | `endoflife:zabbix` | NVD, BDU |
| [`zou`](/es/configuration/products/zou/) | Zou (backend de la API de CG-Wire) | — | — |

## Sistemas operativos

30 productos, todos identificados por **SSH** en lugar de HTTP; consulte
[Identificación del SO por SSH](/es/configuration/products/ssh-os-probes/)
para ver el mecanismo común que usan todos ellos.

| Producto | Resumen | Resolvedor | CVE |
|---|---|---|---|
| [`almalinux`](/es/configuration/products/almalinux/) | AlmaLinux | `endoflife:almalinux` | — |
| [`alpine-linux`](/es/configuration/products/alpine-linux/) | Alpine Linux | `endoflife:alpine-linux` | — |
| [`amazon-linux`](/es/configuration/products/amazon-linux/) | Amazon Linux | `endoflife:amazon-linux` | — |
| [`astra-linux`](/es/configuration/products/astra-linux/) | Astra Linux | — | — |
| [`centos`](/es/configuration/products/centos/) | CentOS Linux (heredado, EOL) | `endoflife:centos` | — |
| [`centos-stream`](/es/configuration/products/centos-stream/) | CentOS Stream | `endoflife:centos-stream` | — |
| [`debian`](/es/configuration/products/debian/) | Debian | `endoflife:debian` | — |
| [`eurolinux`](/es/configuration/products/eurolinux/) | EuroLinux | `endoflife:eurolinux` | — |
| [`fedora`](/es/configuration/products/fedora/) | Fedora Linux | `endoflife:fedora` | — |
| [`freebsd`](/es/configuration/products/freebsd/) | FreeBSD | `endoflife:freebsd` | — |
| [`gentoo`](/es/configuration/products/gentoo/) | Gentoo Linux | — | — |
| [`kali-linux`](/es/configuration/products/kali-linux/) | Kali Linux | — | — |
| [`linuxmint`](/es/configuration/products/linuxmint/) | Linux Mint | `endoflife:linuxmint` | — |
| [`macos`](/es/configuration/products/macos/) | macOS | `endoflife:macos` | NVD, BDU |
| [`netbsd`](/es/configuration/products/netbsd/) | NetBSD | `endoflife:netbsd` | — |
| [`nixos`](/es/configuration/products/nixos/) | NixOS | `endoflife:nixos` | — |
| [`openbsd`](/es/configuration/products/openbsd/) | OpenBSD | `endoflife:openbsd` | — |
| [`openeuler`](/es/configuration/products/openeuler/) | openEuler | — | — |
| [`opensuse`](/es/configuration/products/opensuse/) | openSUSE | `endoflife:opensuse` | — |
| [`opnsense`](/es/configuration/products/opnsense/) | OPNsense | `endoflife:opnsense` | NVD, BDU |
| [`oracle-linux`](/es/configuration/products/oracle-linux/) | Oracle Linux | `endoflife:oracle-linux` | — |
| [`oracle-solaris`](/es/configuration/products/oracle-solaris/) | Oracle Solaris | `endoflife:oracle-solaris` | — |
| [`photon`](/es/configuration/products/photon/) | VMware Photon OS | `endoflife:photon` | — |
| [`postmarketos`](/es/configuration/products/postmarketos/) | postmarketOS | `endoflife:postmarketos` | — |
| [`redos`](/es/configuration/products/redos/) | RED OS | — | — |
| [`rhel`](/es/configuration/products/rhel/) | Red Hat Enterprise Linux | `endoflife:rhel` | — |
| [`rocky-linux`](/es/configuration/products/rocky-linux/) | Rocky Linux | `endoflife:rocky-linux` | — |
| [`slackware`](/es/configuration/products/slackware/) | Slackware | `endoflife:slackware` | — |
| [`steamos`](/es/configuration/products/steamos/) | SteamOS | `endoflife:steamos` | — |
| [`ubuntu`](/es/configuration/products/ubuntu/) | Ubuntu | `endoflife:ubuntu` | — |

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
