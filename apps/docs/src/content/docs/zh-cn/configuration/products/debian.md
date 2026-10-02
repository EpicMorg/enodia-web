---
title: Debian
description: 配置 enodia 通过 SSH 探测 Debian。
---

与[基于 SSH 的操作系统识别](/zh-cn/configuration/products/ssh-os-probes/)
系列使用相同的 SSH 机制、凭据和主机密钥校验，但——自 1.1.1 起——不再属于该页面所述的共享
`osReleaseFamilyProbe` 机制；见下文。

```yaml
targets:
  - id: debian-host
    product: debian
    address: host.example.com
    credentials: linux-host-ssh
```

## 自 1.1.1 起使用自己的探针，而非共享的 os-release 探针

Debian 的 `/etc/os-release` `VERSION_ID` 从不包含小版本号——已实测确认，一台已完全打好补丁的 Debian 13 系统报告的仍是裸的
`VERSION_ID="13"`，与刚安装当天完全相同。真实的小版本号（`13.6`）只存在于 `/etc/debian_version` 中。不过，单独信任这个文件并不安全：已实测确认一个真实的 Ubuntu 24.04 镜像也带有该文件（继承自其构建谱系），内容为 `trixie/sid`——对 Ubuntu 自己的版本毫无意义。本探针在一次 SSH 往返中同时读取这两个文件，先确认 `ID=debian`，并且只有当 `debian_version` 的内容是简单的点分数字时才信任它——Debian testing 自己的那份（`forky/sid`）以及 Ubuntu 继承来的那份，都会正确地回退到 `VERSION_ID`。

已针对 `debian:bookworm-slim` 实测验证：`ID=debian`，
`VERSION_ID="12"`。

## 记录的字段

- `version` — 当 `/etc/debian_version` 中有小版本号时使用它，例如
  `13.6`；否则使用裸的 `VERSION_ID`
- `extra.debianVersion` — `/etc/debian_version` 的原始内容，只要该文件存在且非空就会记录，即使其内容不是简单的点分数字（例如 Debian testing 的 `forky/sid`——原样显示出来比悄无声息地丢弃更有用）
- `extra.codename` — os-release 的 `VERSION_CODENAME`，用于选择跟踪器中的发行版本
- `extra.kernel` — 正在运行的内核的 Debian 版本，来自 `uname -v`
- `packages` — 已安装的源码包及其版本（见下文）
- `extra.hostKeyVerified`

## CVE 关联

**按已安装的软件包**与 Debian Security Tracker（`cve.debian.path`）进行匹配，而不是按发行版版本。探针在读取版本本身的同一次 SSH 往返中读取已安装的*源码*包（`dpkg-query` 的 `source:Package`/`source:Version`——即跟踪器自己的键）以及正在运行的内核的 Debian 版本（来自 `uname -v`）。只报告 Debian 已在比已安装版本更新的版本中修复的 CVE，每个源码包一项发现，链接到其跟踪器页面。跟踪器只覆盖 Debian 安全团队仍在支持的版本（bookworm、trixie、testing、sid）；更旧的主机不会有任何软件包级发现。Proxmox VE 主机也由这样的 `debian` 目标覆盖——参见 [CVE 关联](/zh-cn/cve/#linux-发行版的软件包级-cve)。

## 生命周期解析器

`endoflife:debian`——保持不变。
