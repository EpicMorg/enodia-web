---
title: Alpine Linux
description: 配置 enodia 通过 SSH 探测 Alpine Linux。
---

属于[基于 SSH 的操作系统识别](/zh-cn/configuration/products/ssh-os-probes/)
系列——共享机制、凭据和主机密钥校验请参阅该页面。匹配 `/etc/os-release` 的 `ID` 字段。

```yaml
targets:
  - id: alpine-host
    product: alpine-linux
    address: host.example.com
    credentials: linux-host-ssh
```

已针对 `alpine:latest` 实测验证：`ID=alpine`（注意：是裸的 `ID`
字段，而不是 `alpine-linux`——`product:` 值为清晰起见加上了 `-linux`，匹配本身则针对较短的厂商字符串），
`VERSION_ID=3.24.1`。

## CVE 关联

不进行匹配——通用发行版的 CVE 属于软件包漏洞，而发行版版本号无法说明此后哪些软件包已打过补丁。参见 [CVE 关联](/zh-cn/cve/#哪些产品会被匹配)。

## 生命周期解析器

`endoflife:alpine-linux`。
