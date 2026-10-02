---
title: RED OS
description: 配置 enodia 通过 SSH 探测 RED OS。
---

属于[基于 SSH 的操作系统识别](/zh-cn/configuration/products/ssh-os-probes/)
系列——共享机制、凭据和主机密钥校验请参阅该页面。匹配 `/etc/os-release` 的 `ID` 字段。

```yaml
targets:
  - id: redos-host
    product: redos
    address: host.example.com
    credentials: linux-host-ssh
```

已针对 `alrdockerhub/redos:7.3.1`（真实的 RED OS 内容——
`HOME_URL`/`BUG_REPORT_URL` 指向 red-soft.ru）实测验证：`ID="redos"`，
`VERSION_ID="7.3.1"`。

## CVE 关联

**按已安装的软件包**与 RED OS 自己针对 7.3 或 8.0 的 OVAL（来自 `redos.red-soft.ru/support/secure/<7.3|8.0>/` 的 `redos.xml`，放在 `cve.oval.path` 中）进行匹配——RHEL 的数据不适用，因为 RED OS 的软件包版本是它自己的（7.3 上为 `.el7`，8.0 上为 `.red80`）。版本按其 major.minor 匹配。探针还会在同一次 SSH 往返中列出已安装的二进制软件包（`rpm -qa`，附带每个软件包的 AppStream 模块流）并读取 `uname -r`/`-m`/`-v`——分别存储为观测结果的 `packages` 和 `modules`，以及 `extra.kernelRelease`、`extra.arch`、`extra.kernelVersion`。安装了多个内核时，比较的是正在运行的那个。发现链接到 RED OS 的 `ROS-…` 公告，并带有厂商自己给出的严重程度。参见 [CVE 关联](/zh-cn/cve/#linux-发行版的软件包级-cve)。

## 生命周期解析器

无——endoflife.date 目前没有 RED OS 的日历。仅用于清单。
