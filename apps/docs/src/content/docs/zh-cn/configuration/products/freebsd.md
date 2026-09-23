---
title: FreeBSD
description: 配置 enodia 通过 SSH 探测 FreeBSD。
---

属于[基于 SSH 的操作系统识别](/zh-cn/configuration/products/ssh-os-probes/)
系列——共享机制、凭据和主机密钥校验请参阅该页面。

```yaml
targets:
  - id: freebsd-host
    product: freebsd
    address: host.example.com
    credentials: linux-host-ssh
```

## 本系列中唯一读取不同路径的产品

本系列中的其他所有产品都读取 `/etc/os-release`；FreeBSD 是例外。FreeBSD 会在启动时自行动态生成 `/var/run/os-release`（`/etc/rc.d/os-release`）——其
`KEY=VALUE` 格式与 Linux 发行版静态放在 `/etc/os-release` 中的完全相同。已通过 QEMU 实测验证（使用 FreeBSD 自己的官方云端 qcow2——FreeBSD 没有 Docker
镜像）：`ID=freebsd`，`VERSION_ID="15.1"`。

## CVE 关联

不进行匹配——NVD 将其补丁级别记录在匹配器不读取的 CPE 字段中，因此仅凭发行版本号进行匹配，会把一台已完全打好补丁的主机标记为受该版本中曾经修复过的所有 CVE 影响。参见 [CVE 关联](/zh-cn/cve/#哪些产品会被匹配)。

## 生命周期解析器

`endoflife:freebsd`。
