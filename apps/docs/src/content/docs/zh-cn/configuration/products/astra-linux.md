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

**按已安装的软件包**与 Astra Linux 自己针对 SE 1.7 或 1.8 的 OVAL（`oval-definitions-alse-<1.7|1.8>.xml`，放在 `cve.oval.path` 中）进行匹配——Debian 的数据不适用，因为 Astra 的软件包版本是它自己的重新构建。版本按其 major.minor 匹配（`1.8.6` → 1.8）。探针还会在读取 `/etc/astra_version` 的同一次 SSH 往返中列出已安装的二进制软件包（`dpkg-query`）——存储为观测结果的 `packages`，以及 `extra.kernelRelease`、`extra.arch`、`extra.kernelVersion`。发现链接到 Astra 自己的公告；厂商未引用公告时（1.7）则链接到 BDU。Astra 的数据不包含严重程度，其内核软件包按已安装的版本比较，而不是按正在运行的版本。参见 [CVE 关联](/zh-cn/cve/#linux-发行版的软件包级-cve)。

## 生命周期解析器

无——endoflife.date 没有 Astra Linux 的日历（已在
`astra`、`astralinux` 和 `astra-linux` 下确认 404）。仅用于清单。
