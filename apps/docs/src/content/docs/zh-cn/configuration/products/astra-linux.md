---
title: Astra Linux
description: 配置 enodia 通过 SSH 探测 Astra Linux。
---

与[基于 SSH 的操作系统识别](/zh-cn/configuration/products/ssh-os-probes/)
系列使用相同的 SSH 机制、凭据和主机密钥校验，但读取的是另一个文件：`/etc/astra_version`，即 Astra 自己的身份文件，而不是 `/etc/os-release`。

```yaml
targets:
  - id: astra-host
    product: astra-linux
    address: host.example.com
    credentials: linux-host-ssh
```

## 为什么不用 `/etc/os-release`

Astra Linux 基于 Debian，也确实带有 `/etc/os-release`
（`ID_LIKE=debian`），但它的 `VERSION_ID` 无法使用：已实测确认（`epicmorg/astralinux:1.7-main` 和 `:1.8-main`）其值为
`"1.8_x86-64"`——架构后缀直接写进了版本字符串。`/etc/astra_version` 则完全没有这些：就是简单的 `"1.8.6"`/`"1.7.9"`，即 Astra 自己跟踪的真实小版本号。

## 记录的字段

- `version` — 来自 `/etc/astra_version`
- `extra.hostKeyVerified`

## CVE 关联

不进行匹配——通用发行版的 CVE 属于软件包漏洞，而发行版版本号无法说明此后哪些软件包已打过补丁。参见 [CVE 关联](/zh-cn/cve/#哪些产品会被匹配)。

## 生命周期解析器

无——endoflife.date 没有 Astra Linux 的日历（已在
`astra`、`astralinux` 和 `astra-linux` 下确认 404）。仅用于清单。
