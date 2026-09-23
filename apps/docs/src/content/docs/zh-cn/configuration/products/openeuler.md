---
title: openEuler
description: 配置 enodia 通过 SSH 探测 openEuler。
---

属于[基于 SSH 的操作系统识别](/zh-cn/configuration/products/ssh-os-probes/)
系列——共享机制、凭据和主机密钥校验请参阅该页面。匹配 `/etc/os-release` 的 `ID` 字段。

```yaml
targets:
  - id: openeuler-host
    product: openeuler
    address: host.example.com
    credentials: linux-host-ssh
```

已通过 `vmactions/openeuler-vm`（24.03-LTS-SP4，该 action 的默认版本）实测验证：`ID="openEuler"`——**大写 E，已实测确认，不是小写**——以及 `VERSION_ID="24.03"`。

## CVE 关联

不进行匹配——通用发行版的 CVE 属于软件包漏洞，而发行版版本号无法说明此后哪些软件包已打过补丁。参见 [CVE 关联](/zh-cn/cve/#哪些产品会被匹配)。

## 生命周期解析器

无——endoflife.date 目前没有 openEuler 的日历。仅用于清单。
