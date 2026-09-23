---
title: Ubuntu
description: 配置 enodia 通过 SSH 探测 Ubuntu。
---

与[基于 SSH 的操作系统识别](/zh-cn/configuration/products/ssh-os-probes/)
系列使用相同的 SSH 机制、凭据和主机密钥校验，但——自 1.1.1 起——不再属于该页面所述的共享
`osReleaseFamilyProbe` 机制；见下文。

```yaml
targets:
  - id: ubuntu-host
    product: ubuntu
    address: host.example.com
    credentials: linux-host-ssh
```

## 自 1.1.1 起使用自己的探针，而非共享的 os-release 探针

Ubuntu 的 `/etc/os-release` `VERSION_ID` 在版本发布后刻意不再变化——已实测确认（`14.04` 至 `24.10`）：一台已完全打好补丁的 `22.04` 主机，即使经历了多个小版本和新的安装介质，报告的仍是 `VERSION_ID="22.04"`，而不是 `22.04.5`。小版本号只存在于同一文件的 `VERSION` 字段中（`VERSION="22.04.5 LTS
(Jammy Jellyfish)"`），而且只针对已发布过不止一个小版本的 LTS 版本——非 LTS 版本的 `VERSION` 根本没有额外的段（已实测确认：`VERSION="24.10 (Oracular Oriole)"`，与
`VERSION_ID` 完全一致）。只要 `VERSION` 中的版本号严格更精确且与 `VERSION_ID` 具有相同的
major.minor 前缀，本探针就会优先采用它——与[Debian](/zh-cn/configuration/products/debian/) 针对同一根本问题的修复不同，这里无需读取第二个文件，因为精度信息本来就在同一文件中，只是位于另一个字段。共享 os-release 系列中的其他每个产品都以同样方式审查过；其余产品均不存在这一问题。

已针对 `ubuntu:24.04` 实测验证：`ID=ubuntu`，`VERSION_ID="24.04"`。

## 记录的字段

- `version` — 当 `VERSION` 中有精确小版本号时使用它，例如
  `22.04.5`；否则使用裸的 `VERSION_ID`
- `extra.hostKeyVerified`

## CVE 关联

不进行匹配——通用发行版的 CVE 属于软件包漏洞，而发行版版本号无法说明此后哪些软件包已打过补丁。参见 [CVE 关联](/zh-cn/cve/#哪些产品会被匹配)。

## 生命周期解析器

`endoflife:ubuntu`——保持不变。
