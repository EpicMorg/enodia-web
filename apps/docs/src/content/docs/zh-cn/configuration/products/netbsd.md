---
title: NetBSD
description: 配置 enodia 通过 SSH 探测 NetBSD。
---

属于[基于 SSH 的操作系统识别](/zh-cn/configuration/products/ssh-os-probes/)
系列，但不属于 os-release 组——NetBSD 根本没有与 os-release 等价的文件，因此身份来源改为 `uname -sr`。共享机制、凭据和主机密钥校验请参阅该系列页面。

```yaml
targets:
  - id: netbsd-host
    product: netbsd
    address: host.example.com
    credentials: linux-host-ssh
```

已通过 `vmactions/netbsd-vm` 实测验证（除此之外没有可下载的预装镜像）：`uname -sr` → `"NetBSD 11.0"`，其中完全不含主机名——这一点不同于 `uname -a`，本探针刻意不使用后者。

## CVE 关联

不进行匹配——NVD 将其补丁级别记录在匹配器不读取的 CPE 字段中，因此仅凭发行版本号进行匹配，会把一台已完全打好补丁的主机标记为受该版本中曾经修复过的所有 CVE 影响。参见 [CVE 关联](/zh-cn/cve/#哪些产品会被匹配)。

## 生命周期解析器

`endoflife:netbsd`。
