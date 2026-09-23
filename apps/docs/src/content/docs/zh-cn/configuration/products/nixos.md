---
title: NixOS
description: 配置 enodia 通过 SSH 探测 NixOS。
---

属于[基于 SSH 的操作系统识别](/zh-cn/configuration/products/ssh-os-probes/)
系列——共享机制、凭据和主机密钥校验请参阅该页面。匹配 `/etc/os-release` 的 `ID` 字段。

```yaml
targets:
  - id: nixos-host
    product: nixos
    address: host.example.com
    credentials: linux-host-ssh
```

已针对真实的 ISO rootfs 抓取进行验证：`ID=nixos`，
`VERSION_ID="26.05"`。唯一的 Docker Hub 镜像 `nixos/nix` 只是运行在非 NixOS 基础系统上的
Nix 包管理器，根本没有
`/etc/os-release`——无法作为验证目标，因此改用了 ISO rootfs 抓取。

## CVE 关联

不进行匹配——通用发行版的 CVE 属于软件包漏洞，而发行版版本号无法说明此后哪些软件包已打过补丁。参见 [CVE 关联](/zh-cn/cve/#哪些产品会被匹配)。

## 生命周期解析器

`endoflife:nixos`。
