---
title: Rocky Linux
description: 配置 enodia 通过 SSH 探测 Rocky Linux。
---

属于[基于 SSH 的操作系统识别](/zh-cn/configuration/products/ssh-os-probes/)
系列——共享机制、凭据和主机密钥校验请参阅该页面。匹配 `/etc/os-release` 的 `ID` 字段。

```yaml
targets:
  - id: rocky-host
    product: rocky-linux
    address: host.example.com
    credentials: linux-host-ssh
```

已针对 `rockylinux:9` 实测验证：`ID="rocky"`——这是 Rocky 自己的
os-release `ID` 值，与 `product:` 名称不同——以及
`VERSION_ID="9.3"`。

## CVE 关联

**按已安装的软件包**与 **Red Hat 的** OVAL（`rhel-<N>.oval.xml.bz2`，放在 `cve.oval.path` 中）进行匹配——Rocky 以相同的版本号重新构建 Red Hat 的软件包，而 Rocky 自己的 OVAL 文件会被拒绝（它只包含 Rocky 公告中的一小部分，并且无法通过 OVAL 模式校验）。探针还会在同一次 SSH 往返中列出已安装的二进制软件包（`rpm -qa`，附带每个软件包的 AppStream 模块流）并读取 `uname -r`/`-m`/`-v`——分别存储为观测结果的 `packages` 和 `modules`，以及 `extra.kernelRelease`、`extra.arch`、`extra.kernelVersion`。安装了多个内核时，比较的是正在运行的那个。只报告已有比已安装版本更新的修复的 CVE，每个软件包一项发现。其中一些来自 Red Hat 以缺陷修复公告（RHBA）形式发布的修复，`dnf updateinfo --security` 不会列出它们。参见 [CVE 关联](/zh-cn/cve/#linux-发行版的软件包级-cve)。

## 生命周期解析器

`endoflife:rocky-linux`。
