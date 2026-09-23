---
title: 更新日志
description: enodia 各版本的重要变更。
---

权威来源是 enodia 自己的[`CHANGELOG.md`](https://github.com/EpicMorg/enodia/blob/master/CHANGELOG.md)
——本页是它的镜像，每次发布时与本站其余内容一同保持同步，并在某项变更会影响您实际配置方式的地方，附上指向本文档其他部分的链接。标签遵循 `MAJOR.MINOR.PATCH+BUILD` 格式，不带 `v` 前缀；
`+BUILD` 是 semver 的构建元数据，仅用于没有功能变化的重新构建，而不是用来规避真正的版本号提升。

## 2.0.0+0 — 2026-09-23

这是为一项重大功能而发布的主版本，而不是因为有破坏性变更：CVE 关联是第一个与生命周期无关的评估维度。现有的 `enodia.yaml`、`settings.yaml` 和清单文件无需修改即可继续使用——新的 `cve:` 块是可选的，没有它的配置，其行为与 1.2 完全相同。

### 新增

- 针对两个本地数据库（BDU FSTEC 和 NIST NVD）的 **[CVE 关联](/zh-cn/cve/)**。enodia 从不下载它们：由您获取 BDU 的 `vulxml.zip` 和 NVD 按年份划分的 `nvdcve-2.0-<year>.json.gz` 文件，并在
  `enodia.yaml` 中将 `cve.bdu.path` / `cve.nvd.path` 指向它们（一个文件，对于 NVD 也可以是包含这些文件的目录）。两个来源都可以单独使用。两者都以流式方式解析并缓存：数据库变化后的首次运行，全部 NVD 加上 BDU
  大约需要一分钟，之后每次运行都不到一秒。请参阅[如何下载它们](/zh-cn/cve/#enodia-从不自行下载数据库)，包括 bdu.fstec.ru 所需的额外 CA 证书。
- **已匹配 52 个探针**（上游共 53 个产品名称——`ssh` 同时算作 OpenSSH 和 Dropbear），即在任一来源中有可用数据的所有探针。有意未匹配的产品，各有明确原因：通用 Linux 发行版（它们的 CVE 是软件包级别的）、各 BSD 系统和 Solaris、
  ESXi/vCenter 以及 Synology DSM（匹配器目前尚不读取的补丁级别和构建后缀）——请参阅[哪些产品会被匹配](/zh-cn/cve/#哪些产品会被匹配)以及各产品自己的页面。
- 针对 [GitLab](/zh-cn/configuration/products/gitlab/)、[Vault](/zh-cn/configuration/products/vault/)、[Nextcloud](/zh-cn/configuration/products/nextcloud/) 和[MongoDB](/zh-cn/configuration/products/mongodb/) 的**区分版本类型的匹配**：社区版实例不会再看到仅限企业版的发现（在真实数据上，GitLab 19.2.2 CE 只看到 NVD 9 项中的 4 项，Nextcloud 27.1.3 CE 看到 23 项中的 11 项）。这四个探针现在会将其服务器的版本类型记录在 `extra.enterprise` 中；版本类型未知时保留所有发现。
- [`ssh`](/zh-cn/configuration/products/ssh/) 目标会根据其横幅被匹配为 OpenSSH 或 Dropbear；其他任何 SSH 实现都不进行 CVE 查询，而不是使用 OpenSSH 的 CVE。
- `check` 的 [compact 和 drift 视图](/zh-cn/views/)中新增 **`CVES` 列**，统计不同 CVE 的数量。
- [`export --format html`](/zh-cn/reporting/#cve-列表) 中新增**按 CVE 列出的列表**，纯 CSS 实现，不含 JavaScript，因此内联报告仍然是零 `<script>` 的离线文件：每个 CVE 一行，带有指向 NVD、cve.org 和 bdu.fstec.ru 的链接，BDU 收录了该 CVE 时显示 BDU 的俄文文本，评分以彩色的 `CRITICAL · CVSS 3.1 9.8` 显示，最严重的排在最前。
- [`export --format json`](/zh-cn/reporting/#--format-json) 在每条评估结果的 `cves` 下包含每个来源的每项发现，其中包括从两个来源解析出的结构化 CVSS 评分。
- 用于 Fortinet FortiGate 的 [`fortios`](/zh-cn/configuration/products/fortios/) 探针，通过其 REST API 并使用 REST API Admin 令牌。
- CDN 模式的 HTML 报告会按查看者记住已关闭的“需要互联网访问”警告。

### 说明

- `cve:` 块从本次运行实际使用的配置中读取——`--config`、`$ENODIA_CONFIG` 或默认搜索路径。
- Windows 路径可以不加引号书写，或使用单引号、正斜杠，或写成 UNC 路径。在 YAML 双引号中，
  `\t` 和 `\n` 会变成制表符和换行符，因此这样的路径会在加载时被拒绝，并给出提示。
- `cisco-ios-xe` 已永久移出路线图。

## 1.2.1+0 — 2026-09-10

### 修复

- [`p4d`/`p4p`](/zh-cn/configuration/products/p4d/#超时) 没有将 `timeout` 应用到它们所调用的
  `p4` CLI 子进程上——本代码库中的其他每个探针在访问网络之前都会将自身的传输限制在 `timeout` 之内，唯独这个没有。一个卡在拨号连接不可达的直连服务器（没有响应、没有重置——而这恰恰正是这两个探针当初之所以要调用 `p4` 的那种网络行为）的 `p4` 进程会无限期挂起，导致整个收集运行停滞。这是直接根据生产环境中一次真实的挂起问题报告的。

## 1.2.0+0 — 2026-09-10

### 新增

- [`p4d`](/zh-cn/configuration/products/p4d/) 和[`p4p`](/zh-cn/configuration/products/p4p/) 探针，用于 Perforce Helix Core Server 和 Perforce Proxy。
  Perforce 自己的 RPC 线路协议已被完整逆向，一个手工构建的客户端也针对真实的代理正确重现了其握手过程，但这个经过逐字节验证无误的握手，会被真实的直连 `p4d` 服务器因某些从客户端一侧无法看到的原因而静默丢弃。因此这两个探针改为调用运维人员自己的 `p4` CLI——这是 enodia 中第一批运行外部进程、而不是直接使用线路协议通信的探针。二进制文件路径可以通过 [`options.binary`](/zh-cn/configuration/#targets) 按目标配置（回退到 `$PATH` 上的 `p4`）；在 Windows 上指向 `p4.exe` 时的工作方式完全相同。代理的回复与直连服务器的回复通过是否存在其自身的
  `proxyVersion` 字段来区分——每个探针都会拒绝另一方的响应结构。

### 修复

- `p4 -Ztag` 输出解析器没有去除 Windows 换行符：真实的 `p4.exe` 会写出 `\r\n`，从而在 `ServerID`
  等字段值中留下末尾的 `\r`。
- `probe.Observation.Resolver`（在 1.1.0+0 中为 [SonarQube](/zh-cn/configuration/products/sonarqube/) 添加）是一个普通结构体，而不是指针——`encoding/json` 的 `omitempty` 对结构体值没有“空”的概念，因此在 JSON 导出中，每一条观测结果都会序列化出一个多余的 `"resolver":{}`，而不仅仅是 SonarQube 的观测结果。已修复为指针，这与 `tlsVerified` 之所以已经是可为空值而不是单纯的 `false` 的原因相同。

## 1.1.1+0 — 2026-09-10

### 修复

- [`debian`](/zh-cn/configuration/products/debian/) 报告的是单纯的主版本号（`13`），而不是实际的小版本（`13.6`）——
  Debian 的 `/etc/os-release` 中的 `VERSION_ID` 从不包含小版本号，即使是完全打好补丁的安装也是如此；小版本号只存在于 `/etc/debian_version` 中。`debian` 已从共享的 `osReleaseFamilyProbe` 机制中移出，改用自己的专用探针，该探针会读取这两个文件，并且只有在确认 `ID=debian` 且其内容是普通的点分数字之后，才会信任 `debian_version`——已确认真实的 Ubuntu 镜像也带有完全相同的文件，但其中是继承而来的无意义内容。
- [`ubuntu`](/zh-cn/configuration/products/ubuntu/) 存在同样的缺口：`VERSION_ID` 在版本发布后永远不会改变，因此一台完全打好补丁的 `22.04` 主机报告的是单纯的 `22.04`，而不是 `22.04.5`。`ubuntu` 也已从共享机制中移出，改用自己的探针，当 `os-release` 自身的 `VERSION` 字段严格比 `VERSION_ID` 更精确时，优先使用其中的小版本号。共享的[基于 SSH 的操作系统识别](/zh-cn/configuration/products/ssh-os-probes/)系列中的其他所有产品都以同样方式进行了审查；其余产品都没有这个缺口。

两者都不需要修改配置——相同的 `product:` 值、相同的凭据、相同的端点。只是报告的 `version` 变得更精确了。

## 1.1.0+0 — 2026-09-10

### 新增

- 一个 `github-tags` 生命周期解析器，用于完全不发布 GitHub Releases、只有非点分格式标签的产品——
  这让 [pgAdmin](/zh-cn/configuration/products/pgadmin/) 第一次有了可用的解析器（`pgadmin-org/pgadmin4` 的标签形如 `REL-9_17`，会被转换为 `9.17`，并选取解析结果最高的标签，而不是第一个标签）。
- **`GITHUB_TOKEN`** 环境变量——为每一次基于 GitHub 的生命周期查询进行身份验证，将未验证时每小时 60 个请求的上限提高到每小时 5000 个。请参阅[支持的产品](/zh-cn/products/#应用程序与基础设施服务)。
- 探针现在可以按观测结果覆盖其产品的生命周期解析器，用于那些只有在看到厂商自己的版本响应后才能确定正确日历的少数情况。首次用于将 [SonarQube](/zh-cn/configuration/products/sonarqube/) 区分为 SonarQube Server 和
  SonarQube Community Build——自 SonarSource 在 2024 年底拆分以来，它们是两个独立的产品，在 endoflife.date 上作为两个不同的页面跟踪，周期数据也不同。

### 修复

- 解析器失败时，过去报告中只显示 `resolver_error`，无法区分是 GitHub 速率限制、DNS 故障，还是 API 结构发生了变化。现在发生这种情况时，`enodia check`/`export` 会将真实的底层错误打印到 stderr。
- SonarQube 过去总是与 Community Build 的生命周期日历进行比较，即使是 SonarQube Server 实例也是如此——
  收集其版本没有问题，但报告中无论如何都显示周期不匹配。现在会根据版本字符串本身按实例进行解析。

### 变更

- 容器镜像的发布（`ghcr.io/epicmorg/enodia`，同时镜像到 Docker Hub 和 Quay）已完全移出本仓库自身的发布流水线，转到 `EpicMorg/docker` 单体仓库中，按该仓库自己的构建计划进行。发布的镜像地址和标签（`latest`、`1`、确切版本）保持不变，但镜像本身现在仅支持 `linux/amd64`，并以 root 身份运行——请参阅[快速开始](/zh-cn/getting-started/#安装)。

## 1.0.0+0 — 2026-09-09

首次发布。`collect → inventory.jsonl → evaluate → assessment →
render` 端到端完整实现，并已在真实的生产基础设施上验证：

- **87 个探针**，每个一个文件，编译进来并显式注册——大多数使用 HTTP 通信，一些（[Redis](/zh-cn/configuration/products/redis/)、[PostgreSQL](/zh-cn/configuration/products/postgresql/)、[MySQL](/zh-cn/configuration/products/mysql/)、[MongoDB](/zh-cn/configuration/products/mongodb/)）直接使用其自身的线路协议，还有一组不断增长的产品（所有主流 Linux 发行版、各 BSD 系统、macOS、OPNsense、Proxmox VE、TrueNAS、
  Synology DSM、网络设备）通过 [SSH](/zh-cn/configuration/products/ssh-os-probes/) 或厂商的 HTTP API 访问，而不是假定一定存在版本端点。
- [`product: generic`](/zh-cn/configuration/products/generic/)——一个仅靠配置的探针，适用于任何内部系统，其表达能力被有意冻结（没有条件判断、循环或模板）。
- 基于 endoflife.date 和 GitHub Releases 的生命周期解析，缓存在磁盘上，并在三个相互独立的维度上进行评估（补丁偏离、生命周期阶段、更新的分支），而不是压缩成一个判定——请参阅[核心概念](/zh-cn/concepts/)。
- 跨表格、HTML、JSON 和 Prometheus 输出的四种[报告视图](/zh-cn/views/)。
- [`enodia serve`](/zh-cn/cli-reference/#enodia-serve)——一个仅提供快照的 HTTP 服务器；后台定时器负责收集，请求处理程序只读取最新的快照。
- [配置 schema](/zh-cn/configuration/)，支持 `${VAR}`/`${VAR:-default}` 插值、专用的凭据存储，以及按目标的 TLS 固定/选择性启用 insecure。
- 打包：`.deb`、`.rpm`、`.apk` 和 Arch 的 `.pkg.tar.zst`，一个专用的非特权 `enodia` 系统用户，每条命令的 man 手册页，适用于 Linux/Windows/macOS/Android (Termux) 的原始归档文件，以及一个容器镜像——
  请参阅[快速开始](/zh-cn/getting-started/)。校验和使用 cosign keyless 签名（OIDC，没有需要管理或可能泄露的密钥）。
