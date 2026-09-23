---
title: 支持的产品
description: 全部 90 个内置探针，直接取自 `enodia products`。
---

共 90 个产品，每个都是编译进来的探针（请参阅[核心概念](/zh-cn/concepts/#探针是编译进来的而不是-yaml-dsl)）。请将**产品**列中的值用作目标的
`product:`。**解析器**是生命周期数据的标识符——`endoflife:<slug>` 表示[endoflife.date](https://endoflife.date/)（真实的 EOL/支持日期），`github:<owner/repo>` 表示
GitHub Releases（仅最新版本，没有 eol/support/lts——GitHub 对生命周期策略没有任何主张），
`github-tags:<owner/repo>` 表示完全没有 Releases、只有 git 标签的仓库（与 `github:` 一样只有“仅最新版本”，用于产品自身的标签甚至不是普通点分版本号的情况——请参阅[pgAdmin](/zh-cn/configuration/products/pgadmin/)）——而 `—` 表示 enodia 能检测该产品的版本，但尚无生命周期匹配（其补丁/分支维度仍然有效；其生命周期维度保持为 `unknown`）。点击某个产品，可查看其确切的端点、身份验证要求和记录的字段。

两种基于 GitHub 的解析器类型默认都不进行身份验证（上限为每小时 60 个请求，与同一源 IP 上的其他任何请求共享）——
设置 **`GITHUB_TOKEN`** 环境变量（与 `gh`、goreleaser 以及 GitHub Actions 本身所用的约定相同）可将上限提高到每小时 5000 个；为空或未设置时只是回退到未验证的上限，无论哪种情况都不会出错。

**CVE** 列出配置了 [`cve:` 块](/zh-cn/cve/)时该产品所匹配的数据库——`NVD`、`BDU`（BDU FSTEC），或 `—` 表示不进行 CVE 查询（每种未匹配情况的原因请参阅[CVE 关联](/zh-cn/cve/#哪些产品会被匹配)页面）。该列来自 enodia 自己的产品表，而不是来自
`enodia products`。

本表由针对当前构建的二进制文件运行 `enodia products` 生成——如果已经过了一段时间，在将本页视为金科玉律之前，请重新运行该命令检查是否有出入。**`sonarqube`** 这一行显示的是其静态回退值（`endoflife:sonarqube-server`，即在尚未探测任何内容时 `enodia products` 打印的值）——真实的观测结果会根据版本字符串本身，为每个实例在该值与 `endoflife:sonarqube-community` 之间进行选择；请参阅[它自己的页面](/zh-cn/configuration/products/sonarqube/)。

## 应用程序与基础设施服务

60 个产品，通过 HTTP(S) 或原始线路协议（MySQL、Redis、MongoDB 等）进行探测——不涉及 SSH。其中两个，[`p4d`](/zh-cn/configuration/products/p4d/) 和[`p4p`](/zh-cn/configuration/products/p4p/)，是进一步的例外：两者使用的都不是 enodia 实现的任何线路协议——
它们都会调用运维人员自己的 `p4` CLI，该 CLI 需要与 enodia 本身安装在一起，而不仅仅是可通过网络访问。

| 产品 | 简介 | 解析器 | CVE |
|---|---|---|---|
| [`apache`](/zh-cn/configuration/products/apache/) | Apache HTTP Server | `endoflife:apache-http-server` | NVD, BDU |
| [`artifactory`](/zh-cn/configuration/products/artifactory/) | JFrog Artifactory | `endoflife:artifactory` | NVD, BDU |
| [`bamboo`](/zh-cn/configuration/products/bamboo/) | Atlassian Bamboo（Data Center） | `endoflife:bamboo` | NVD, BDU |
| [`bitbucket`](/zh-cn/configuration/products/bitbucket/) | Atlassian Bitbucket（Data Center） | `endoflife:bitbucket` | NVD, BDU |
| [`bitwarden`](/zh-cn/configuration/products/bitwarden/) | Bitwarden（自托管） | `github:bitwarden/server` | NVD |
| [`clickhouse`](/zh-cn/configuration/products/clickhouse/) | ClickHouse | `endoflife:clickhouse` | NVD, BDU |
| [`confluence`](/zh-cn/configuration/products/confluence/) | Atlassian Confluence（Data Center） | `endoflife:confluence` | NVD, BDU |
| [`elasticsearch`](/zh-cn/configuration/products/elasticsearch/) | Elasticsearch | `endoflife:elasticsearch` | NVD, BDU |
| [`esxi`](/zh-cn/configuration/products/esxi/) | VMware ESXi | `endoflife:esxi` | — |
| [`forgejo`](/zh-cn/configuration/products/forgejo/) | Forgejo | `endoflife:forgejo` | NVD, BDU |
| [`fortios`](/zh-cn/configuration/products/fortios/) | Fortinet FortiOS（FortiGate） | `endoflife:fortios` | NVD, BDU |
| [`generic`](/zh-cn/configuration/products/generic/) | 用于 enodia 不认识的系统的手写解析器——请参阅[配置](/zh-cn/configuration/#通用探针) | — | — |
| [`gitlab`](/zh-cn/configuration/products/gitlab/) | GitLab | `endoflife:gitlab` | NVD, BDU |
| [`grafana`](/zh-cn/configuration/products/grafana/) | Grafana | `endoflife:grafana` | NVD, BDU |
| [`graylog`](/zh-cn/configuration/products/graylog/) | Graylog | `endoflife:graylog` | NVD, BDU |
| [`haproxy`](/zh-cn/configuration/products/haproxy/) | HAProxy | `endoflife:haproxy` | NVD, BDU |
| [`harbor`](/zh-cn/configuration/products/harbor/) | Harbor（容器镜像仓库） | `endoflife:harbor` | NVD, BDU |
| [`jaeger`](/zh-cn/configuration/products/jaeger/) | Jaeger | `endoflife:jaeger` | NVD |
| [`jellyfin`](/zh-cn/configuration/products/jellyfin/) | Jellyfin | `github:jellyfin/jellyfin` | NVD |
| [`jenkins`](/zh-cn/configuration/products/jenkins/) | Jenkins | `endoflife:jenkins` | NVD, BDU |
| [`jira`](/zh-cn/configuration/products/jira/) | Atlassian Jira（Data Center） | `endoflife:jira-software` | NVD, BDU |
| [`keycloak`](/zh-cn/configuration/products/keycloak/) | Keycloak | `endoflife:keycloak` | NVD, BDU |
| [`kibana`](/zh-cn/configuration/products/kibana/) | Kibana | `endoflife:kibana` | NVD, BDU |
| [`kitsu`](/zh-cn/configuration/products/kitsu/) | Kitsu（CG-Wire / Zou 前端） | `github:cgwire/kitsu` | — |
| [`logstash`](/zh-cn/configuration/products/logstash/) | Logstash | `endoflife:logstash` | NVD, BDU |
| [`mattermost`](/zh-cn/configuration/products/mattermost/) | Mattermost | `endoflife:mattermost` | NVD, BDU |
| [`mongodb`](/zh-cn/configuration/products/mongodb/) | MongoDB | `endoflife:mongodb` | NVD, BDU |
| [`mysql`](/zh-cn/configuration/products/mysql/) | MySQL Server | `endoflife:mysql` | NVD, BDU |
| [`nextcloud`](/zh-cn/configuration/products/nextcloud/) | Nextcloud | `endoflife:nextcloud` | NVD, BDU |
| [`nexus`](/zh-cn/configuration/products/nexus/) | Sonatype Nexus Repository | `endoflife:nexus` | NVD, BDU |
| [`nginx`](/zh-cn/configuration/products/nginx/) | nginx | `endoflife:nginx` | NVD, BDU |
| [`oauth2-proxy`](/zh-cn/configuration/products/oauth2-proxy/) | oauth2-proxy | `github:oauth2-proxy/oauth2-proxy` | NVD, BDU |
| [`opensearch`](/zh-cn/configuration/products/opensearch/) | OpenSearch | `endoflife:opensearch` | NVD, BDU |
| [`owncast`](/zh-cn/configuration/products/owncast/) | Owncast | `github:owncast/owncast` | NVD |
| [`p4d`](/zh-cn/configuration/products/p4d/) | Perforce Helix Core Server（p4d） | — | NVD, BDU |
| [`p4p`](/zh-cn/configuration/products/p4p/) | Perforce Proxy（p4p） | — | — |
| [`perforce-swarm`](/zh-cn/configuration/products/perforce-swarm/) | Perforce Helix Swarm | — | — |
| [`pgadmin`](/zh-cn/configuration/products/pgadmin/) | pgAdmin | `github-tags:pgadmin-org/pgadmin4` | NVD, BDU |
| [`phpmyadmin`](/zh-cn/configuration/products/phpmyadmin/) | phpMyAdmin | `endoflife:phpmyadmin` | NVD, BDU |
| [`portainer`](/zh-cn/configuration/products/portainer/) | Portainer | `github:portainer/portainer` | NVD, BDU |
| [`postgres_exporter`](/zh-cn/configuration/products/postgres_exporter/) | prometheus-community/postgres_exporter | `github:prometheus-community/postgres_exporter` | — |
| [`postgresql`](/zh-cn/configuration/products/postgresql/) | PostgreSQL | `endoflife:postgresql` | NVD, BDU |
| [`proftpd`](/zh-cn/configuration/products/proftpd/) | ProFTPD | `endoflife:proftpd` | NVD, BDU |
| [`proxmox`](/zh-cn/configuration/products/proxmox/) | Proxmox VE | `endoflife:proxmox-ve` | NVD, BDU |
| [`redis`](/zh-cn/configuration/products/redis/) | Redis | `endoflife:redis` | NVD, BDU |
| [`routeros`](/zh-cn/configuration/products/routeros/) | MikroTik RouterOS | `endoflife:routeros` | NVD, BDU |
| [`sonarqube`](/zh-cn/configuration/products/sonarqube/) | SonarQube（Server 或 Community Build） | `endoflife:sonarqube-server`\* | NVD, BDU |
| [`ssh`](/zh-cn/configuration/products/ssh/) | SSH 横幅（任意实现） | — | NVD, BDU |
| [`synology-dsm`](/zh-cn/configuration/products/synology-dsm/) | Synology DSM | — | — |
| [`teamcity`](/zh-cn/configuration/products/teamcity/) | JetBrains TeamCity | — | NVD, BDU |
| [`testrail`](/zh-cn/configuration/products/testrail/) | TestRail | — | NVD |
| [`traefik`](/zh-cn/configuration/products/traefik/) | Traefik | `endoflife:traefik` | NVD, BDU |
| [`truenas`](/zh-cn/configuration/products/truenas/) | TrueNAS | `endoflife:truenas` | — |
| [`vault`](/zh-cn/configuration/products/vault/) | HashiCorp Vault | `endoflife:hashicorp-vault` | NVD, BDU |
| [`vaultwarden`](/zh-cn/configuration/products/vaultwarden/) | Vaultwarden | `github:dani-garcia/vaultwarden` | NVD, BDU |
| [`vcenter`](/zh-cn/configuration/products/vcenter/) | VMware vCenter Server | `endoflife:vcenter` | — |
| [`wordpress`](/zh-cn/configuration/products/wordpress/) | WordPress | `endoflife:wordpress` | NVD, BDU |
| [`youtrack`](/zh-cn/configuration/products/youtrack/) | YouTrack | `endoflife:youtrack` | NVD, BDU |
| [`zabbix`](/zh-cn/configuration/products/zabbix/) | Zabbix | `endoflife:zabbix` | NVD, BDU |
| [`zou`](/zh-cn/configuration/products/zou/) | Zou（CG-Wire API 后端） | — | — |
## 操作系统

30 个产品，全部通过 **SSH** 而不是 HTTP 进行识别——它们共同使用的机制请参阅[基于 SSH 的操作系统识别](/zh-cn/configuration/products/ssh-os-probes/)。

| 产品 | 简介 | 解析器 | CVE |
|---|---|---|---|
| [`almalinux`](/zh-cn/configuration/products/almalinux/) | AlmaLinux | `endoflife:almalinux` | — |
| [`alpine-linux`](/zh-cn/configuration/products/alpine-linux/) | Alpine Linux | `endoflife:alpine-linux` | — |
| [`amazon-linux`](/zh-cn/configuration/products/amazon-linux/) | Amazon Linux | `endoflife:amazon-linux` | — |
| [`astra-linux`](/zh-cn/configuration/products/astra-linux/) | Astra Linux | — | — |
| [`centos`](/zh-cn/configuration/products/centos/) | CentOS Linux（旧版，已 EOL） | `endoflife:centos` | — |
| [`centos-stream`](/zh-cn/configuration/products/centos-stream/) | CentOS Stream | `endoflife:centos-stream` | — |
| [`debian`](/zh-cn/configuration/products/debian/) | Debian | `endoflife:debian` | — |
| [`eurolinux`](/zh-cn/configuration/products/eurolinux/) | EuroLinux | `endoflife:eurolinux` | — |
| [`fedora`](/zh-cn/configuration/products/fedora/) | Fedora Linux | `endoflife:fedora` | — |
| [`freebsd`](/zh-cn/configuration/products/freebsd/) | FreeBSD | `endoflife:freebsd` | — |
| [`gentoo`](/zh-cn/configuration/products/gentoo/) | Gentoo Linux | — | — |
| [`kali-linux`](/zh-cn/configuration/products/kali-linux/) | Kali Linux | — | — |
| [`linuxmint`](/zh-cn/configuration/products/linuxmint/) | Linux Mint | `endoflife:linuxmint` | — |
| [`macos`](/zh-cn/configuration/products/macos/) | macOS | `endoflife:macos` | NVD, BDU |
| [`netbsd`](/zh-cn/configuration/products/netbsd/) | NetBSD | `endoflife:netbsd` | — |
| [`nixos`](/zh-cn/configuration/products/nixos/) | NixOS | `endoflife:nixos` | — |
| [`openbsd`](/zh-cn/configuration/products/openbsd/) | OpenBSD | `endoflife:openbsd` | — |
| [`openeuler`](/zh-cn/configuration/products/openeuler/) | openEuler | — | — |
| [`opensuse`](/zh-cn/configuration/products/opensuse/) | openSUSE | `endoflife:opensuse` | — |
| [`opnsense`](/zh-cn/configuration/products/opnsense/) | OPNsense | `endoflife:opnsense` | NVD, BDU |
| [`oracle-linux`](/zh-cn/configuration/products/oracle-linux/) | Oracle Linux | `endoflife:oracle-linux` | — |
| [`oracle-solaris`](/zh-cn/configuration/products/oracle-solaris/) | Oracle Solaris | `endoflife:oracle-solaris` | — |
| [`photon`](/zh-cn/configuration/products/photon/) | VMware Photon OS | `endoflife:photon` | — |
| [`postmarketos`](/zh-cn/configuration/products/postmarketos/) | postmarketOS | `endoflife:postmarketos` | — |
| [`redos`](/zh-cn/configuration/products/redos/) | RED OS | — | — |
| [`rhel`](/zh-cn/configuration/products/rhel/) | Red Hat Enterprise Linux | `endoflife:rhel` | — |
| [`rocky-linux`](/zh-cn/configuration/products/rocky-linux/) | Rocky Linux | `endoflife:rocky-linux` | — |
| [`slackware`](/zh-cn/configuration/products/slackware/) | Slackware | `endoflife:slackware` | — |
| [`steamos`](/zh-cn/configuration/products/steamos/) | SteamOS | `endoflife:steamos` | — |
| [`ubuntu`](/zh-cn/configuration/products/ubuntu/) | Ubuntu | `endoflife:ubuntu` | — |
## Atlassian 产品

Jira、Confluence、Bitbucket 和 Bamboo 共用同一种清单端点约定。`product:` 在您的配置中显式声明，而不是根据响应猜测——把 Confluence 的 URL 填到 Jira 条目上是真实会发生的笔误，应该被发现，而不是被悄无声息地记录为错误的事实。Bitbucket 自己的清单仍然将自己报告为 `stash`（它以前的名称）——
这是厂商的响应，而不是 enodia 的怪癖。

## `zou` 和 `kitsu`——一个探针，两个产品

两者都指向同一个 Zou API 后端，并响应同一个请求——之所以分别注册，是因为它们需要不同的生命周期解析器（Zou 自己的 GitHub 仓库没有发布可用的 Releases）。完整说明请参阅[Zou](/zh-cn/configuration/products/zou/) 和[Kitsu](/zh-cn/configuration/products/kitsu/)。

## 没有找到您的产品？

对于没有专用探针的任何产品，可以使用 [`product: generic`](/zh-cn/configuration/#通用探针)
作为应急出口，或者在 [GitHub](https://github.com/EpicMorg/enodia/issues) 上提交 issue——
`.github/ISSUE_TEMPLATE/new_product.yml` 模板所询问的正是新探针所需的信息。
