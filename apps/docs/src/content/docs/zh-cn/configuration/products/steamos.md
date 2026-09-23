---
title: SteamOS
description: 配置 enodia 通过 SSH 探测 SteamOS。
---

属于[基于 SSH 的操作系统识别](/zh-cn/configuration/products/ssh-os-probes/)
系列——共享机制、凭据和主机密钥校验请参阅该页面。匹配 `/etc/os-release` 的 `ID` 字段。

```yaml
targets:
  - id: steamos-host
    product: steamos
    address: host.example.com
    credentials: linux-host-ssh
```

已针对 SteamOS 2（基于 Debian，代号“brewmaster”）的真实 ISO rootfs 抓取进行验证：`ID=steamos`，`VERSION_ID="2"`。SteamOS 3.x
（基于 Arch，当前的 Steam Deck 操作系统，代号“holo”）预计也使用相同的 `ID=steamos`——Valve 自己的品牌命名在这次重写前后保持一致——但这一点尚未实测确认，目前只确认了 2.x；简单的 `ID=steamos` 匹配可以同时覆盖两者，无需对任何一个做特殊处理。

## CVE 关联

不进行匹配——通用发行版的 CVE 属于软件包漏洞，而发行版版本号无法说明此后哪些软件包已打过补丁。参见 [CVE 关联](/zh-cn/cve/#哪些产品会被匹配)。

## 生命周期解析器

`endoflife:steamos`。
