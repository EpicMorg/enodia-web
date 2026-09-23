---
title: Oracle Solaris
description: 配置 enodia 通过 SSH 探测 Oracle Solaris。
---

与[基于 SSH 的操作系统识别](/zh-cn/configuration/products/ssh-os-probes/)
系列使用相同的 SSH 机制、凭据和主机密钥校验，但读取的是 `/etc/release`，而不是 os-release 文件或
`uname -sr`。

```yaml
targets:
  - id: solaris-host
    product: oracle-solaris
    address: host.example.com
    credentials: linux-host-ssh
```

## 为什么不用 `uname -sr`

与 OpenBSD/NetBSD 不同，`uname -sr` 在这里不起作用：在 Solaris 上它只会报告 SunOS 内核版本（所有
Solaris 11.x 版本都是 `"SunOS 5.11"`——SunOS 的版本号与产品版本号是脱钩的），因此无法区分 11.3 和 11.4。`/etc/release` 自己的
`"Oracle Solaris 11.4 X86"` 这一行才包含真实版本。

没有 Oracle 账户/OTN
许可证就无法获得可下载的镜像，因此这里通过 `vmactions/solaris-vm` 进行验证，它会构建并重新发布 Oracle 自己可免费再分发的 Solaris 11.4 CBE
（Common Build Environment，正是为这类 CI 用途而设计的）。

## 记录的字段

- `version` — 从 `/etc/release` 中解析
- `extra.hostKeyVerified`

## CVE 关联

不进行匹配——NVD 将其补丁级别记录在匹配器不读取的 CPE 字段中，因此仅凭发行版本号进行匹配，会把一台已完全打好补丁的主机标记为受该版本中曾经修复过的所有 CVE 影响。参见 [CVE 关联](/zh-cn/cve/#哪些产品会被匹配)。

## 生命周期解析器

`endoflife:oracle-solaris`。
