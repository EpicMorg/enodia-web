---
title: Produtos suportados
description: Todas as 123 sondas embutidas, direto do `enodia products`.
---

123 produtos, cada um uma sonda compilada no binário (consulte
[Conceitos](/pt-br/concepts/#as-sondas-são-compiladas-não-uma-dsl-em-yaml)). Use o
valor da coluna **Produto** como `product:` em um alvo. **Resolvedor** é o
identificador dos dados de ciclo de vida — `endoflife:<slug>` para o
[endoflife.date](https://endoflife.date/) (datas reais de EOL/suporte),
`github:<owner/repo>` para GitHub Releases (apenas a versão mais recente,
sem eol/support/lts — o GitHub não tem opinião sobre política de ciclo de
vida), `github-tags:<owner/repo>` para um repositório sem nenhuma
Release, apenas tags do git (a mesma limitação de "apenas a versão mais
recente" do `github:`, usada quando as próprias tags de um produto nem
sequer são uma versão simples separada por pontos — consulte
[pgAdmin](/pt-br/configuration/products/pgadmin/)) ou
`github-tag-branches:<owner/repo>` para um projeto que mantém vários
branches de release ao mesmo tempo (um ciclo de vida por major.minor, cada
um com a sua tag mais recente — consulte
[FreeRADIUS](/pt-br/configuration/products/freeradius/)) — e um `—` significa que
o enodia detecta a versão desse produto, mas ainda não tem correspondência
de ciclo de vida (os eixos de patch/ramo continuam funcionando; o eixo de
ciclo de vida fica `unknown`). Clique em um produto para ver o endpoint
exato, os requisitos de autenticação e os campos registrados.

Os dois tipos de resolvedor baseados no GitHub são não autenticados por
padrão (limitados a 60 requisições/hora, compartilhadas com qualquer outra
coisa no mesmo IP de origem) — defina a variável de ambiente
**`GITHUB_TOKEN`** (a mesma convenção que `gh`, goreleaser e o próprio
GitHub Actions usam) para elevar esse limite a 5000/hora; vazia ou não
definida, ela simplesmente volta ao limite não autenticado, e nada quebra
em nenhum dos casos.

Desde a 2.2, os resolvedores do GitHub também leem as tags de release do
jeito que os projetos de fato as escrevem: um `<repo>-`/`<repo>_` inicial
é removido (`weblate-2026.10` é lida como `2026.10`), tags escritas com
sublinhados (`Release_1_18_0`) e com o prefixo `release-` (`release-5.2.4`)
são interpretadas como versões, e uma tag que indica uma pré-versão
(`5.3.0.M2`, `2026.10.0b7`, `-rc1`, `-beta.1`) é ignorada mesmo quando o
GitHub não a marca como tal.

**CVE** lista com quais bancos de dados o produto é comparado quando um
[bloco `cve:`](/pt-br/cve/) está configurado — `NVD`, `BDU` (BDU FSTEC) ou
`—` para nenhuma consulta de CVEs; `dados do MariaDB`, `dados da
Atlassian`, `dados do PostgreSQL` e `dados do nginx` acrescentam os dados
de segurança desse próprio fornecedor (consulte
[Dados dos próprios fornecedores](/pt-br/cve/#dados-dos-próprios-fornecedores)). Dez distribuições Linux têm
correspondência por pacote instalado em vez de pela versão — `(pacotes)`
indica a fonte: o Debian Security Tracker, o OVAL do fornecedor ou o secdb
do Alpine (consulte
[CVEs por pacote](/pt-br/cve/#cves-por-pacote-para-distribuições-linux)) (cada caso sem correspondência tem o seu
motivo explicado na página
[Correlação de CVEs](/pt-br/cve/#quais-produtos-têm-correspondência)). Esta coluna
vem das tabelas de produtos do próprio enodia, e não do `enodia
products`.

Esta tabela é gerada a partir do `enodia products` com o binário
atualmente compilado — execute-o novamente para verificar divergências
antes de tomar esta página como verdade absoluta, se já faz algum tempo. A
linha do **`sonarqube`** mostra o seu fallback estático
(`endoflife:sonarqube-server`, o que o `enodia products` exibe quando nada
foi sondado ainda) — uma observação real escolhe entre esse e
`endoflife:sonarqube-community` por instância, a partir da própria string
de versão; consulte [a página dele](/pt-br/configuration/products/sonarqube/).

## Aplicações e serviços de infraestrutura

92 produtos, sondados via HTTP(S) ou por um protocolo de rede próprio
(MySQL, Redis, MongoDB, Cassandra, ...). Cinco são exceções:
[`p4d`](/pt-br/configuration/products/p4d/) e
[`p4p`](/pt-br/configuration/products/p4p/) não falam nenhum protocolo de
rede que o enodia implemente — ambos chamam a CLI `p4` do próprio
operador, que precisa estar instalada junto com o enodia, e não apenas
acessível pela rede — e
[`freeradius`](/pt-br/configuration/products/freeradius/),
[`kafka`](/pt-br/configuration/products/kafka/) e
[`minio`](/pt-br/configuration/products/minio/) são lidos via SSH, a partir
do próprio binário ou jar do servidor — o RADIUS não tem como informar uma
versão, a do Kafka está só no JMX e a do MinIO só atrás de uma chave de
administrador.

| Produto | Resumo | Resolvedor | CVE |
|---|---|---|---|
| [`apache`](/pt-br/configuration/products/apache/) | Apache HTTP Server | `endoflife:apache-http-server` | NVD, BDU |
| [`artifactory`](/pt-br/configuration/products/artifactory/) | JFrog Artifactory | `endoflife:artifactory` | NVD, BDU |
| [`bamboo`](/pt-br/configuration/products/bamboo/) | Atlassian Bamboo (Data Center) | `endoflife:bamboo` | NVD, BDU, dados da Atlassian |
| [`bitbucket`](/pt-br/configuration/products/bitbucket/) | Atlassian Bitbucket (Data Center) | `endoflife:bitbucket` | NVD, BDU, dados da Atlassian |
| [`bitwarden`](/pt-br/configuration/products/bitwarden/) | Bitwarden (auto-hospedado) | `github:bitwarden/server` | NVD |
| [`cassandra`](/pt-br/configuration/products/cassandra/) | Apache Cassandra (protocolo nativo CQL) | `endoflife:apache-cassandra` | NVD, BDU |
| [`clickhouse`](/pt-br/configuration/products/clickhouse/) | ClickHouse | `endoflife:clickhouse` | NVD, BDU |
| [`code-server`](/pt-br/configuration/products/code-server/) | code-server (VS Code no navegador) | `github:coder/code-server` | NVD |
| [`confluence`](/pt-br/configuration/products/confluence/) | Atlassian Confluence (Data Center) | `endoflife:confluence` | NVD, BDU, dados da Atlassian |
| [`dell-idrac`](/pt-br/configuration/products/dell-idrac/) | Dell iDRAC | — | NVD, BDU |
| [`domainmod`](/pt-br/configuration/products/domainmod/) | DomainMOD | `github:domainmod/domainmod` | NVD |
| [`doxygen`](/pt-br/configuration/products/doxygen/) | Site de documentação gerado pelo Doxygen | `github:doxygen/doxygen` | NVD |
| [`elasticsearch`](/pt-br/configuration/products/elasticsearch/) | Elasticsearch | `endoflife:elasticsearch` | NVD, BDU |
| [`esxi`](/pt-br/configuration/products/esxi/) | VMware ESXi | `endoflife:esxi` | — |
| [`euro-office`](/pt-br/configuration/products/euro-office/) | Euro-Office Docs (fork do ONLYOFFICE) | `github:Euro-Office/DocumentServer` | — |
| [`forgejo`](/pt-br/configuration/products/forgejo/) | Forgejo | `endoflife:forgejo` | NVD, BDU |
| [`fortios`](/pt-br/configuration/products/fortios/) | Fortinet FortiOS (FortiGate) | `endoflife:fortios` | NVD, BDU |
| [`freeradius`](/pt-br/configuration/products/freeradius/) | FreeRADIUS | `github-tag-branches:FreeRADIUS/freeradius-server` | NVD, BDU |
| [`generic`](/pt-br/configuration/products/generic/) | Parser escrito à mão para sistemas que o enodia não conhece — consulte [Configuração](/pt-br/configuration/#a-sonda-genérica) | — | — |
| [`ghost`](/pt-br/configuration/products/ghost/) | Ghost | `github:TryGhost/Ghost` | NVD, BDU |
| [`gitlab`](/pt-br/configuration/products/gitlab/) | GitLab | `endoflife:gitlab` | NVD, BDU |
| [`grafana`](/pt-br/configuration/products/grafana/) | Grafana | `endoflife:grafana` | NVD, BDU |
| [`graylog`](/pt-br/configuration/products/graylog/) | Graylog | `endoflife:graylog` | NVD, BDU |
| [`greenbone`](/pt-br/configuration/products/greenbone/) | Greenbone / OpenVAS (daemon web gsad) | `github:greenbone/gsad` | NVD |
| [`haproxy`](/pt-br/configuration/products/haproxy/) | HAProxy | `endoflife:haproxy` | NVD, BDU |
| [`harbor`](/pt-br/configuration/products/harbor/) | Harbor (registry de contêineres) | `endoflife:harbor` | NVD, BDU |
| [`home-assistant`](/pt-br/configuration/products/home-assistant/) | Home Assistant (API REST, token de longa duração) | `github:home-assistant/core` | NVD |
| [`hp-ilo4`](/pt-br/configuration/products/hp-ilo4/) | HP iLO 4 | — | NVD, BDU |
| [`jaeger`](/pt-br/configuration/products/jaeger/) | Jaeger | `endoflife:jaeger` | NVD |
| [`jellyfin`](/pt-br/configuration/products/jellyfin/) | Jellyfin | `github:jellyfin/jellyfin` | NVD |
| [`jenkins`](/pt-br/configuration/products/jenkins/) | Jenkins | `endoflife:jenkins` | NVD, BDU |
| [`jira`](/pt-br/configuration/products/jira/) | Atlassian Jira (Data Center) | `endoflife:jira-software` | NVD, BDU, dados da Atlassian |
| [`kafka`](/pt-br/configuration/products/kafka/) | Broker Apache Kafka (via SSH) | `endoflife:apache-kafka` | NVD, BDU |
| [`keycloak`](/pt-br/configuration/products/keycloak/) | Keycloak | `endoflife:keycloak` | NVD, BDU |
| [`kibana`](/pt-br/configuration/products/kibana/) | Kibana | `endoflife:kibana` | NVD, BDU |
| [`kitsu`](/pt-br/configuration/products/kitsu/) | Kitsu (frontend do CG-Wire / Zou) | `github:cgwire/kitsu` | — |
| [`libretranslate`](/pt-br/configuration/products/libretranslate/) | LibreTranslate | `github:LibreTranslate/LibreTranslate` | — |
| [`logstash`](/pt-br/configuration/products/logstash/) | Logstash | `endoflife:logstash` | NVD, BDU |
| [`mariadb`](/pt-br/configuration/products/mariadb/) | MariaDB Server | `endoflife:mariadb` | NVD, BDU, dados do MariaDB |
| [`mattermost`](/pt-br/configuration/products/mattermost/) | Mattermost | `endoflife:mattermost` | NVD, BDU |
| [`memcached`](/pt-br/configuration/products/memcached/) | memcached | `endoflife:memcached` | NVD, BDU |
| [`minio`](/pt-br/configuration/products/minio/) | MinIO (binário do servidor, via SSH) | `github:minio/minio` | NVD, BDU |
| [`mongodb`](/pt-br/configuration/products/mongodb/) | MongoDB | `endoflife:mongodb` | NVD, BDU |
| [`mysql`](/pt-br/configuration/products/mysql/) | MySQL Server | `endoflife:mysql` | NVD, BDU |
| [`netbox`](/pt-br/configuration/products/netbox/) | NetBox | `github:netbox-community/netbox` | NVD |
| [`netdata`](/pt-br/configuration/products/netdata/) | Agente Netdata | `github:netdata/netdata` | NVD, BDU |
| [`nextcloud`](/pt-br/configuration/products/nextcloud/) | Nextcloud | `endoflife:nextcloud` | NVD, BDU |
| [`nexus`](/pt-br/configuration/products/nexus/) | Sonatype Nexus Repository | `endoflife:nexus` | NVD, BDU |
| [`nginx`](/pt-br/configuration/products/nginx/) | nginx | `endoflife:nginx` | NVD, BDU, dados do nginx |
| [`oauth2-proxy`](/pt-br/configuration/products/oauth2-proxy/) | oauth2-proxy | `github:oauth2-proxy/oauth2-proxy` | NVD, BDU |
| [`onlyoffice`](/pt-br/configuration/products/onlyoffice/) | ONLYOFFICE Docs (Document Server) | `github:ONLYOFFICE/DocumentServer` | NVD, BDU |
| [`openhab`](/pt-br/configuration/products/openhab/) | openHAB | `github:openhab/openhab-distro` | NVD |
| [`opensearch`](/pt-br/configuration/products/opensearch/) | OpenSearch | `endoflife:opensearch` | NVD, BDU |
| [`owncast`](/pt-br/configuration/products/owncast/) | Owncast | `github:owncast/owncast` | NVD |
| [`p4d`](/pt-br/configuration/products/p4d/) | Perforce Helix Core Server (p4d) | — | NVD, BDU |
| [`p4p`](/pt-br/configuration/products/p4p/) | Perforce Proxy (p4p) | — | — |
| [`perforce-swarm`](/pt-br/configuration/products/perforce-swarm/) | Perforce Helix Swarm | — | — |
| [`pgadmin`](/pt-br/configuration/products/pgadmin/) | pgAdmin | `github-tags:pgadmin-org/pgadmin4` | NVD, BDU |
| [`phpipam`](/pt-br/configuration/products/phpipam/) | phpIPAM | `github:phpipam/phpipam` | NVD, BDU |
| [`phpmyadmin`](/pt-br/configuration/products/phpmyadmin/) | phpMyAdmin | `endoflife:phpmyadmin` | NVD, BDU |
| [`portainer`](/pt-br/configuration/products/portainer/) | Portainer | `github:portainer/portainer` | NVD, BDU |
| [`postgres_exporter`](/pt-br/configuration/products/postgres_exporter/) | prometheus-community/postgres_exporter | `github:prometheus-community/postgres_exporter` | — |
| [`postgresql`](/pt-br/configuration/products/postgresql/) | PostgreSQL | `endoflife:postgresql` | NVD, BDU, dados do PostgreSQL |
| [`posthog`](/pt-br/configuration/products/posthog/) | PostHog (auto-hospedado; a versão é o commit do git) | — | — |
| [`proftpd`](/pt-br/configuration/products/proftpd/) | ProFTPD | `endoflife:proftpd` | NVD, BDU |
| [`proxmox`](/pt-br/configuration/products/proxmox/) | Proxmox VE | `endoflife:proxmox-ve` | NVD, BDU |
| [`qbittorrent`](/pt-br/configuration/products/qbittorrent/) | qBittorrent (API da Web UI) | `github:qbittorrent/qBittorrent` | NVD, BDU |
| [`rabbitmq`](/pt-br/configuration/products/rabbitmq/) | RabbitMQ (API do plugin de gerenciamento) | `endoflife:rabbitmq` | NVD, BDU |
| [`redis`](/pt-br/configuration/products/redis/) | Redis | `endoflife:redis` | NVD, BDU |
| [`routeros`](/pt-br/configuration/products/routeros/) | MikroTik RouterOS | `endoflife:routeros` | NVD, BDU |
| [`sentry`](/pt-br/configuration/products/sentry/) | Sentry (auto-hospedado) | `github:getsentry/self-hosted` | NVD |
| [`sonarqube`](/pt-br/configuration/products/sonarqube/) | SonarQube (Server ou Community Build) | `endoflife:sonarqube-server`\* | NVD, BDU |
| [`splunk`](/pt-br/configuration/products/splunk/) | Splunk Enterprise (API de gerenciamento do splunkd) | `endoflife:splunk` | NVD, BDU |
| [`ssh`](/pt-br/configuration/products/ssh/) | Banner SSH (qualquer implementação) | — | NVD, BDU |
| [`supermicro-bmc`](/pt-br/configuration/products/supermicro-bmc/) | Supermicro BMC | — | — |
| [`synology-dsm`](/pt-br/configuration/products/synology-dsm/) | Synology DSM | — | NVD, BDU |
| [`teamcity`](/pt-br/configuration/products/teamcity/) | JetBrains TeamCity | — | NVD, BDU |
| [`testrail`](/pt-br/configuration/products/testrail/) | TestRail | — | NVD |
| [`torrserver`](/pt-br/configuration/products/torrserver/) | TorrServer | `github:YouROK/TorrServer` | — |
| [`traefik`](/pt-br/configuration/products/traefik/) | Traefik | `endoflife:traefik` | NVD, BDU |
| [`truenas`](/pt-br/configuration/products/truenas/) | TrueNAS | `endoflife:truenas` | — |
| [`uptime-kuma`](/pt-br/configuration/products/uptime-kuma/) | Uptime Kuma (login via socket.io) | `github:louislam/uptime-kuma` | NVD |
| [`vault`](/pt-br/configuration/products/vault/) | HashiCorp Vault | `endoflife:hashicorp-vault` | NVD, BDU |
| [`vaultwarden`](/pt-br/configuration/products/vaultwarden/) | Vaultwarden | `github:dani-garcia/vaultwarden` | NVD, BDU |
| [`vcenter`](/pt-br/configuration/products/vcenter/) | VMware vCenter Server | `endoflife:vcenter` | — |
| [`wapt`](/pt-br/configuration/products/wapt/) | Servidor WAPT (Tranquil IT) | — | NVD |
| [`weblate`](/pt-br/configuration/products/weblate/) | Weblate | `github:WeblateOrg/weblate` | NVD |
| [`wordpress`](/pt-br/configuration/products/wordpress/) | WordPress | `endoflife:wordpress` | NVD, BDU |
| [`youtrack`](/pt-br/configuration/products/youtrack/) | YouTrack | `endoflife:youtrack` | NVD, BDU |
| [`zabbix`](/pt-br/configuration/products/zabbix/) | Zabbix | `endoflife:zabbix` | NVD, BDU |
| [`zookeeper`](/pt-br/configuration/products/zookeeper/) | Apache ZooKeeper | `endoflife:zookeeper` | NVD, BDU |
| [`zou`](/pt-br/configuration/products/zou/) | Zou (backend de API do CG-Wire) | — | — |

## Sistemas operacionais

31 produtos, todos identificados via **SSH** em vez de HTTP — consulte
[Identificação de SO via SSH](/pt-br/configuration/products/ssh-os-probes/)
para o mecanismo compartilhado que todos eles usam.

| Produto | Resumo | Resolvedor | CVE |
|---|---|---|---|
| [`almalinux`](/pt-br/configuration/products/almalinux/) | AlmaLinux | `endoflife:almalinux` | OVAL (pacotes) |
| [`alpine-linux`](/pt-br/configuration/products/alpine-linux/) | Alpine Linux | `endoflife:alpine-linux` | secdb do Alpine (pacotes) |
| [`amazon-linux`](/pt-br/configuration/products/amazon-linux/) | Amazon Linux | `endoflife:amazon-linux` | — |
| [`astra-linux`](/pt-br/configuration/products/astra-linux/) | Astra Linux | — | OVAL (pacotes) |
| [`centos`](/pt-br/configuration/products/centos/) | CentOS Linux (legado, EOL) | `endoflife:centos` | — |
| [`centos-stream`](/pt-br/configuration/products/centos-stream/) | CentOS Stream | `endoflife:centos-stream` | — |
| [`debian`](/pt-br/configuration/products/debian/) | Debian | `endoflife:debian` | tracker do Debian (pacotes) |
| [`eurolinux`](/pt-br/configuration/products/eurolinux/) | EuroLinux | `endoflife:eurolinux` | — |
| [`fedora`](/pt-br/configuration/products/fedora/) | Fedora Linux | `endoflife:fedora` | — |
| [`freebsd`](/pt-br/configuration/products/freebsd/) | FreeBSD | `endoflife:freebsd` | — |
| [`gentoo`](/pt-br/configuration/products/gentoo/) | Gentoo Linux | — | — |
| [`kali-linux`](/pt-br/configuration/products/kali-linux/) | Kali Linux | — | — |
| [`linuxmint`](/pt-br/configuration/products/linuxmint/) | Linux Mint | `endoflife:linuxmint` | OVAL (pacotes) |
| [`macos`](/pt-br/configuration/products/macos/) | macOS | `endoflife:macos` | NVD, BDU |
| [`netbsd`](/pt-br/configuration/products/netbsd/) | NetBSD | `endoflife:netbsd` | — |
| [`nixos`](/pt-br/configuration/products/nixos/) | NixOS | `endoflife:nixos` | — |
| [`openbsd`](/pt-br/configuration/products/openbsd/) | OpenBSD | `endoflife:openbsd` | — |
| [`openeuler`](/pt-br/configuration/products/openeuler/) | openEuler | — | — |
| [`opensuse`](/pt-br/configuration/products/opensuse/) | openSUSE | `endoflife:opensuse` | — |
| [`opnsense`](/pt-br/configuration/products/opnsense/) | OPNsense | `endoflife:opnsense` | NVD, BDU |
| [`oracle-linux`](/pt-br/configuration/products/oracle-linux/) | Oracle Linux | `endoflife:oracle-linux` | OVAL (pacotes) |
| [`oracle-solaris`](/pt-br/configuration/products/oracle-solaris/) | Oracle Solaris | `endoflife:oracle-solaris` | — |
| [`pfsense`](/pt-br/configuration/products/pfsense/) | pfSense Community Edition | — | NVD, BDU |
| [`photon`](/pt-br/configuration/products/photon/) | VMware Photon OS | `endoflife:photon` | — |
| [`postmarketos`](/pt-br/configuration/products/postmarketos/) | postmarketOS | `endoflife:postmarketos` | — |
| [`redos`](/pt-br/configuration/products/redos/) | RED OS | — | OVAL (pacotes) |
| [`rhel`](/pt-br/configuration/products/rhel/) | Red Hat Enterprise Linux | `endoflife:rhel` | OVAL (pacotes) |
| [`rocky-linux`](/pt-br/configuration/products/rocky-linux/) | Rocky Linux | `endoflife:rocky-linux` | OVAL (pacotes) |
| [`slackware`](/pt-br/configuration/products/slackware/) | Slackware | `endoflife:slackware` | — |
| [`steamos`](/pt-br/configuration/products/steamos/) | SteamOS | `endoflife:steamos` | — |
| [`ubuntu`](/pt-br/configuration/products/ubuntu/) | Ubuntu | `endoflife:ubuntu` | OVAL (pacotes) |

## Produtos Atlassian

Jira, Confluence, Bitbucket e Bamboo compartilham a mesma convenção de
endpoint de manifesto. O `product:` é declarado explicitamente na sua
configuração em vez de ser deduzido da resposta — apontar uma URL do
Confluence para uma entrada do Jira é um erro de digitação real que merece
ser detectado, e não registrado silenciosamente como um fato errado. O
próprio manifesto do Bitbucket ainda se identifica como `stash` (o seu
nome antigo) — isso é a resposta do fornecedor, e não uma peculiaridade do
enodia.

## `zou` e `kitsu` — uma sonda, dois produtos

Ambos apontam para o mesmo backend de API Zou e respondem à mesma
requisição — eles são registrados separadamente porque precisam de
resolvedores de ciclo de vida diferentes (o próprio repositório do Zou no
GitHub não publica Releases utilizáveis). Consulte
[Zou](/pt-br/configuration/products/zou/) e
[Kitsu](/pt-br/configuration/products/kitsu/) para a explicação completa.

## Não encontrou o seu produto?

Use [`product: generic`](/pt-br/configuration/#a-sonda-genérica) como
válvula de escape para qualquer coisa sem uma sonda dedicada, ou abra uma
issue no [GitHub](https://github.com/EpicMorg/enodia/issues) — o template
`.github/ISSUE_TEMPLATE/new_product.yml` pede exatamente o que uma nova
sonda precisa.
