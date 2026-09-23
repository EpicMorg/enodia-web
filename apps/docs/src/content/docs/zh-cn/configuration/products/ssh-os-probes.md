---
title: 基于 SSH 的操作系统识别
description: enodia 基于 SSH/os-release/uname 的探针系列如何工作——由 30 个操作系统产品共享。
---

enodia 的 30 个产品——所有 Linux 发行版、FreeBSD、OpenBSD、
NetBSD、macOS、Oracle Solaris、OPNsense 以及旧版 CentOS——都通过**SSH** 而非 HTTP 进行识别。本页统一说明这一共享机制；每个操作系统自己的页面（从[支持的产品](/zh-cn/products/)链接）只说明其特定的 `product:`
值、所匹配的具体身份字段以及其生命周期解析器。

## 工作原理

一次 SSH 连接、一条命令、一次断开——这并不是一个通用的远程执行客户端，只足以读取一条身份信息：

- **21 个产品**读取 `/etc/os-release`（由 systemd 标准化、所有现代 Linux 发行版都附带的身份文件，外加 FreeBSD 自己在启动时动态生成、同样采用
  `KEY=VALUE` 格式的 `/var/run/os-release`），并检查其 `ID` 字段——这是一个共享的通用机制（`osReleaseFamilyProbe`）。
- **另外 2 个**（[Debian](/zh-cn/configuration/products/debian/)、[Ubuntu](/zh-cn/configuration/products/ubuntu/)）同样读取
  `/etc/os-release`，但使用各自专用的探针，而不是上面的通用机制——这两个发行版的 `VERSION_ID` 都不够精确（Debian 的根本不包含小版本号；Ubuntu 的在首次发布时即冻结，从不反映之后的小版本），因此各自会进一步读取真实版本：Debian 会交叉核对
  `/etc/debian_version`，Ubuntu 则在同一文件的 `VERSION`
  字段更精确时优先采用它。具体原因请参阅它们各自的页面。
- **2 个产品**（OpenBSD、NetBSD）根本没有与 os-release 等价的文件——身份来源改为 `uname -sr`（`"<kernel name>
  <release>"`，例如 `"OpenBSD 7.9"`）。
- **另外 5 个**（Astra Linux、旧版 CentOS、macOS、OPNsense、Oracle
  Solaris）各自读取一个独特的、产品专属的身份文件或命令——请参阅它们各自的页面。

`product:` 始终需要显式声明，并根据真实的身份字段进行校验，绝不会根据响应去猜测（与[Atlassian 探针](/zh-cn/configuration/products/jira/)对其 manifest 中 `<typeId>` 的处理原则相同）——把一台 Debian 主机配置为 `product: ubuntu` 是真实的配置错误，会明确报错失败，而不是被记录为错误的事实。

## 配置

```yaml
targets:
  - id: web-01
    product: debian          # 或任何其他操作系统产品——请参阅其自己的页面
    address: web-01.example.com
    credentials: linux-host-ssh
    tls:
      pin_sha256:
        - "AB:CD:...:EF"      # 主机 SSH 密钥的 sha256
```

```yaml
credentials:
  linux-host-ssh:
    kind: ssh-key
    username: enodia-ro
    private_key_file: /etc/enodia/ssh/id_ed25519
```

当 `address` 不带端口时，端口默认为 `22`——不带协议前缀，与
MySQL/Redis 相同（一个裸的 `host:port`，而不是 URL）。

## 身份验证 — 必需

该系列中的每个探针都设置了 `Required: true`——与大多数基于 HTTP 的产品不同，获取操作系统身份不存在匿名途径。支持两种凭据形式，与任何 SSH 客户端完全一样：

- `kind: password` — `username` + `password`
- `kind: ssh-key` — `username` + `private_key_file`（如果密钥已加密，再加上 `passphrase`）

完整的字段参考请参阅[配置 → 凭据](/zh-cn/configuration/#凭据)。

## 主机密钥校验

复用 HTTPS 探针用于证书固定的同一个 `tls:` 块——
`tls.pin_sha256` 存放 SSH 主机密钥自身线路编码（而非 TLS 证书）的十六进制 SHA-256，`tls.insecure: true` 则是同样的最后手段式退出选项，并以同样的方式发出警告。**两者都未设置时，连接会在发送任何凭据之前就被拒绝**。完整说明请参阅[配置 → SSH 主机密钥验证](/zh-cn/configuration/#ssh-主机密钥验证)。

## 记录的字段

该系列中的每个探针都会记录：

- `version` — 来自 `VERSION_ID`（os-release 系列）或内核版本号（uname 系列）；Debian 和 Ubuntu 会进一步读取仅凭 `VERSION_ID` 无法提供的精确小版本号——请参阅它们各自的页面
- `extra.hostKeyVerified` — `"true"`/`"false"`，表示 `tls.pin_sha256`
  是否实际匹配（与 HTTPS 目标的 `TLSVerified` 以相同方式呈现——可用于在整个服务器群范围内审计哪些 SSH 目标已做固定）

## 没有匹配文件或命令的目标会明确报错失败

无论是在没有该文件的主机上执行 `cat /etc/os-release`，还是 `uname
-sr` 报告了错误的内核名称，都会返回清晰的“不是该产品”错误，而不是笼统的连接失败——SSH 会话本身是成功的，失败的是身份校验。
