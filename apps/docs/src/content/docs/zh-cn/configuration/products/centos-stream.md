---
title: CentOS Stream
description: 配置 enodia 通过 SSH 探测 CentOS Stream。
---

属于[基于 SSH 的操作系统识别](/zh-cn/configuration/products/ssh-os-probes/)
系列——共享机制、凭据和主机密钥校验请参阅该页面。

```yaml
targets:
  - id: centos-stream-host
    product: centos-stream
    address: host.example.com
    credentials: linux-host-ssh
```

## 厂商身份校验 — 不止于简单的 `ID` 匹配

已针对 `quay.io/centos/centos:stream9` 实测验证：`/etc/os-release`
报告 `ID="centos"`——**与已 EOL 的旧版[CentOS Linux](/zh-cn/configuration/products/centos/) 使用的 `ID` 相同**——因此该产品还会检查 `NAME="CentOS Stream"`，这个字段才真正能区分两者。把 `product: centos-stream` 指向一台旧版 CentOS
7 主机（或者反过来）会导致身份校验失败，而不会被记录到错误的产品下。

## 记录的字段

与本系列其他产品相同：`version` 来自 `VERSION_ID`，外加
`extra.hostKeyVerified`。

## CVE 关联

不进行匹配——通用发行版的 CVE 属于软件包漏洞，而发行版版本号无法说明此后哪些软件包已打过补丁。参见 [CVE 关联](/zh-cn/cve/#哪些产品会被匹配)。

## 生命周期解析器

`endoflife:centos-stream`。
