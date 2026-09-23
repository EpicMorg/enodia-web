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

不进行匹配——通用发行版的 CVE 属于软件包漏洞，而发行版版本号无法说明此后哪些软件包已打过补丁。参见 [CVE 关联](/zh-cn/cve/#哪些产品会被匹配)。

## 生命周期解析器

`endoflife:linuxmint`。
