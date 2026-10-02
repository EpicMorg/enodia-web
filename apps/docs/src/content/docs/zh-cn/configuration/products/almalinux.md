---
title: AlmaLinux
description: 配置 enodia 通过 SSH 探测 AlmaLinux。
---

属于[基于 SSH 的操作系统识别](/zh-cn/configuration/products/ssh-os-probes/)
系列——共享机制、凭据和主机密钥校验请参阅该页面。匹配 `/etc/os-release` 的 `ID` 字段。

```yaml
targets:
  - id: almalinux-host
    product: almalinux
    address: host.example.com
    credentials: linux-host-ssh
```

已针对 `docker.io/almalinux:9` 实测验证：`ID=almalinux`，
`VERSION_ID="9.8"`。

## CVE 关联

**按已安装的软件包**与 AlmaLinux 自己的 OVAL（`org.almalinux.alsa-<N>.xml.bz2`，放在 `cve.oval.path` 中）进行匹配，而不是按发行版版本。探针还会在同一次 SSH 往返中列出已安装的二进制软件包（`rpm -qa`，附带每个软件包的 AppStream 模块流）并读取 `uname -r`/`-m`/`-v`——分别存储为观测结果的 `packages` 和 `modules`，以及 `extra.kernelRelease`、`extra.arch`、`extra.kernelVersion`。安装了多个内核时，比较的是正在运行的那个。只报告已有比已安装版本更新的修复的 CVE，每个软件包一项发现，链接到对应的 ALSA。参见 [CVE 关联](/zh-cn/cve/#linux-发行版的软件包级-cve)。

## 生命周期解析器

`endoflife:almalinux`。
