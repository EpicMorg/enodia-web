---
title: macOS
description: 配置 enodia 通过 SSH 探测 macOS。
---

与[基于 SSH 的操作系统识别](/zh-cn/configuration/products/ssh-os-probes/)
系列使用相同的 SSH 机制、凭据和主机密钥校验，但运行的是 `sw_vers`——读取 Mac 操作系统身份的标准、有文档说明的方式——而不是读取文件。

```yaml
targets:
  - id: mac-host
    product: macos
    address: host.example.com
    credentials: linux-host-ssh
```

## 为什么用 `sw_vers` 而不是 `uname -a`

Darwin 的 `uname -a` 会在输出中包含机器自己的主机名——本探针没有任何理由查看或存储它。`sw_vers` 的三行 `ProductName`/`ProductVersion`/`BuildVersion` 输出则不包含这些内容。已针对一台真实的 Mac 实测验证（macOS 15.4，
`BuildVersion 24E248`，通过 SSH）——Apple 的 EULA 将 macOS
虚拟化限制在正版 Apple 硬件上，因此这是整个 SSH 系列中唯一需要真实物理 Mac、而无法使用容器或可下载虚拟机镜像的产品。

只识别 `ProductName: macOS`（10.12 Sierra 及以后）——更早的版本报告的是 `"Mac OS X"`，这种格式从未在真实系统上实测确认过，因此将其视为不支持，而不是去猜测。

## 记录的字段

- `version` — 来自 `ProductVersion`
- `extra.buildVersion` — 来自 `BuildVersion`（如果存在）
- `extra.hostKeyVerified`

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`endoflife:macos`。
