---
title: Gentoo Linux
description: 配置 enodia 通过 SSH 探测 Gentoo Linux。
---

属于[基于 SSH 的操作系统识别](/zh-cn/configuration/products/ssh-os-probes/)
系列——共享机制、凭据和主机密钥校验请参阅该页面。匹配 `/etc/os-release` 的 `ID` 字段。

```yaml
targets:
  - id: gentoo-host
    product: gentoo
    address: host.example.com
    credentials: linux-host-ssh
```

已针对 `gentoo/stage3`（gentoo.org 官方镜像）实测验证：
`ID=gentoo`，`VERSION_ID=2.18`——这是 Gentoo Base System 自己的发布编号，而不是传统意义上的发行版版本。

## CVE 关联

不进行匹配——通用发行版的 CVE 属于软件包漏洞，而发行版版本号无法说明此后哪些软件包已打过补丁。参见 [CVE 关联](/zh-cn/cve/#哪些产品会被匹配)。

## 生命周期解析器

无——Gentoo 是滚动发行版，endoflife.date 也正因如此没有它的日历（已确认 404）：没有可以用来跟踪 EOL 的独立版本。仅用于清单。
