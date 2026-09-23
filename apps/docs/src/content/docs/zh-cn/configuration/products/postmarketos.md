---
title: postmarketOS
description: 配置 enodia 通过 SSH 探测 postmarketOS。
---

属于[基于 SSH 的操作系统识别](/zh-cn/configuration/products/ssh-os-probes/)
系列——共享机制、凭据和主机密钥校验请参阅该页面。匹配 `/etc/os-release` 的 `ID` 字段。

```yaml
targets:
  - id: postmarketos-host
    product: postmarketos
    address: host.example.com
    credentials: linux-host-ssh
```

已针对真实的 ISO rootfs 抓取进行验证：`ID="postmarketos"`，
`VERSION_ID="v26.06"`——开头的 `v` 是厂商自己的格式，原样透传；`enodia` 的版本比较在比较之前就会去掉开头的 `v`/`V`，与该工具其他地方对 GitHub `v1.2.3`
发布标签的处理方式相同。

## CVE 关联

不进行匹配——通用发行版的 CVE 属于软件包漏洞，而发行版版本号无法说明此后哪些软件包已打过补丁。参见 [CVE 关联](/zh-cn/cve/#哪些产品会被匹配)。

## 生命周期解析器

`endoflife:postmarketos`。
