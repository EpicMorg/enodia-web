---
title: EuroLinux
description: 配置 enodia 通过 SSH 探测 EuroLinux。
---

属于[基于 SSH 的操作系统识别](/zh-cn/configuration/products/ssh-os-probes/)
系列——共享机制、凭据和主机密钥校验请参阅该页面。匹配 `/etc/os-release` 的 `ID` 字段。

```yaml
targets:
  - id: eurolinux-host
    product: eurolinux
    address: host.example.com
    credentials: linux-host-ssh
```

EuroLinux 没有 Docker 镜像——因此改为针对真实的
ISO rootfs 抓取（即安装介质本身，离线检查）进行验证：
`ID="eurolinux"`，`VERSION_ID="8.10"`。

## CVE 关联

不进行匹配——通用发行版的 CVE 属于软件包漏洞，而发行版版本号无法说明此后哪些软件包已打过补丁。参见 [CVE 关联](/zh-cn/cve/#哪些产品会被匹配)。

## 生命周期解析器

`endoflife:eurolinux`。
