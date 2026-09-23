---
title: VMware Photon OS
description: 配置 enodia 通过 SSH 探测 VMware Photon OS。
---

属于[基于 SSH 的操作系统识别](/zh-cn/configuration/products/ssh-os-probes/)
系列——共享机制、凭据和主机密钥校验请参阅该页面。匹配 `/etc/os-release` 的 `ID` 字段。

```yaml
targets:
  - id: photon-host
    product: photon
    address: host.example.com
    credentials: linux-host-ssh
```

已针对官方顶级镜像 `photon:5.0`（Docker 的
Official Images 项目——而不是 `vmware/photon` 自己的仓库，后者止步于
2.0）实测验证：`ID=photon`，`VERSION_ID=5.0`。

## CVE 关联

不进行匹配——通用发行版的 CVE 属于软件包漏洞，而发行版版本号无法说明此后哪些软件包已打过补丁。参见 [CVE 关联](/zh-cn/cve/#哪些产品会被匹配)。

## 生命周期解析器

`endoflife:photon`。
