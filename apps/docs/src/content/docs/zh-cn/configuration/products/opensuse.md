---
title: openSUSE
description: 配置 enodia 通过 SSH 探测 openSUSE。
---

属于[基于 SSH 的操作系统识别](/zh-cn/configuration/products/ssh-os-probes/)
系列——共享机制、凭据和主机密钥校验请参阅该页面。

```yaml
targets:
  - id: opensuse-host
    product: opensuse
    address: host.example.com
    credentials: linux-host-ssh
```

## 同时匹配 Leap 和 Tumbleweed

与本系列大多数简单的 `ID` 相等性检查不同，这里会匹配任何以 `opensuse-` 开头的 `ID`。已针对
`opensuse/leap:latest` 实测验证：`ID="opensuse-leap"`，`VERSION_ID="16.0"`。这里没有 Tumbleweed（`ID="opensuse-tumbleweed"`）的真实测试样本，但它共享相同的 `opensuse-` 前缀，因此会被同一产品接受，而不会落得无法匹配。

## CVE 关联

不进行匹配——通用发行版的 CVE 属于软件包漏洞，而发行版版本号无法说明此后哪些软件包已打过补丁。参见 [CVE 关联](/zh-cn/cve/#哪些产品会被匹配)。

## 生命周期解析器

`endoflife:opensuse`。
