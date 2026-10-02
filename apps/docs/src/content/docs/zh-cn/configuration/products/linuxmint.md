---
title: Linux Mint
description: 配置 enodia 通过 SSH 探测 Linux Mint。
---

属于[基于 SSH 的操作系统识别](/zh-cn/configuration/products/ssh-os-probes/)
系列——共享机制、凭据和主机密钥校验请参阅该页面。匹配 `/etc/os-release` 的 `ID` 字段。

```yaml
targets:
  - id: mint-host
    product: linuxmint
    address: host.example.com
    credentials: linux-host-ssh
```

已针对真实的 ISO rootfs 抓取进行验证：`ID=linuxmint`，
`VERSION_ID="22.3"`——这确实是 Mint 自己的身份；而找到的唯一一个
Docker Hub 镜像（`linuxmintd/mint22-amd64`，Mint 自己的 CI 构建
chroot）报告的却是其底层的 Ubuntu 基础系统，用它来匹配是错误的。

## CVE 关联

**按已安装的软件包**与主机 Ubuntu 基础版本的 Canonical OVAL 进行匹配（os-release 的 `UBUNTU_CODENAME`，记录为 `extra.codename`；文件放在 `cve.oval.path` 中）。探针还会在同一次 SSH 往返中列出已安装的二进制软件包（`dpkg-query`）并读取 `uname -r`/`-m`/`-v`——存储为观测结果的 `packages`，以及 `extra.kernelRelease`、`extra.arch`、`extra.kernelVersion`。只报告已有比已安装版本更新的修复的 CVE，每个软件包一项发现，链接到对应的 USN。参见 [CVE 关联](/zh-cn/cve/#linux-发行版的软件包级-cve)。

## 生命周期解析器

`endoflife:linuxmint`。
