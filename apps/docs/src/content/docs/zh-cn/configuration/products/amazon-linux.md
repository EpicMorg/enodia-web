---
title: Amazon Linux
description: 配置 enodia 通过 SSH 探测 Amazon Linux。
---

属于[基于 SSH 的操作系统识别](/zh-cn/configuration/products/ssh-os-probes/)
系列——共享机制、凭据和主机密钥校验请参阅该页面。匹配 `/etc/os-release` 的 `ID` 字段。

```yaml
targets:
  - id: amazon-linux-host
    product: amazon-linux
    address: host.example.com
    credentials: linux-host-ssh
```

已针对 `amazonlinux:2023` 实测验证：`ID="amzn"`——这是 Amazon 自己的
os-release `ID` 值，与 `product:` 名称不同——以及
`VERSION_ID="2023"`。

## CVE 关联

不进行匹配——通用发行版的 CVE 属于软件包漏洞，而发行版版本号无法说明此后哪些软件包已打过补丁。参见 [CVE 关联](/zh-cn/cve/#哪些产品会被匹配)。

## 生命周期解析器

`endoflife:amazon-linux`。
