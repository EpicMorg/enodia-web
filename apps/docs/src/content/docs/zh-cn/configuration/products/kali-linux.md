---
title: Kali Linux
description: 配置 enodia 通过 SSH 探测 Kali Linux。
---

属于[基于 SSH 的操作系统识别](/zh-cn/configuration/products/ssh-os-probes/)
系列——共享机制、凭据和主机密钥校验请参阅该页面。匹配 `/etc/os-release` 的 `ID` 字段。

```yaml
targets:
  - id: kali-host
    product: kali-linux
    address: host.example.com
    credentials: linux-host-ssh
```

已针对 `kalilinux/kali-rolling` 实测验证：`ID=kali`，
`VERSION_ID="2026.3"`——这是一个带日期的滚动发行快照，而不是独立的版本号。

## CVE 关联

不进行匹配——通用发行版的 CVE 属于软件包漏洞，而发行版版本号无法说明此后哪些软件包已打过补丁。参见 [CVE 关联](/zh-cn/cve/#哪些产品会被匹配)。

## 生命周期解析器

无——Kali 是滚动发行版，endoflife.date 出于与 Gentoo 相同的原因没有它的日历（已确认 404）。仅用于清单。
