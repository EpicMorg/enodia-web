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

**按已安装的软件包**与主机所在分支的 Alpine secdb（`main.json` 和 `community.json`，放在 `cve.alpine.path` 中）进行匹配，而不是按发行版版本。分支取 `VERSION_ID` 的 major.minor（3.20.3 → v3.20）；edge 没有编号分支，因此不会有任何发现。探针还会在同一次 SSH 往返中读取 `/lib/apk/db/installed`，并按 **origin** 为软件包建立索引（secdb 自己的键：`libcrypto3` 和 `libssl3` 都属于 `openssl`）——存储为观测结果的 `packages`，以及 `extra.kernelRelease`、`extra.arch`、`extra.kernelVersion`。只报告已有比已安装版本更新的修复的 CVE，每个 origin 一项发现，链接到其在 security.alpinelinux.org 上的页面；secdb 不包含严重程度。参见 [CVE 关联](/zh-cn/cve/#linux-发行版的软件包级-cve)。

## 生命周期解析器

`endoflife:alpine-linux`。
