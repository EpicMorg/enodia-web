---
title: pfSense
description: 配置 enodia 通过 SSH 探测 pfSense Community Edition。
---

与[基于 SSH 的操作系统识别](/zh-cn/configuration/products/ssh-os-probes/)系列使用相同的 SSH 机制、凭据和主机密钥校验，但在一次往返中读取 pfSense 自己的 `/etc/version` 和 `/etc/platform`。

```yaml
targets:
  - id: pfsense-fw
    product: pfsense
    address: fw.example.com
    credentials: linux-host-ssh
```

## 身份验证 — 必需

一个 SSH 凭据，`ssh-key` 或 `password`——参见[配置 → 凭据](/zh-cn/configuration/#凭据)。

## 仅限 Community Edition

已针对三台真实的 pfSense CE 主机实测确认（`2.7.2-RELEASE`、`2.8.1-RELEASE`）：`/etc/version` 中恰好是 pfSense 自己的仪表板所显示的版本，`/etc/platform` 的内容为 `pfSense`。

Netgate 的商业版 **pfSense Plus** 是另一个产品，有自己基于日历的版本方案（`24.11`，而不是 `2.x.y-RELEASE`）。根据其文档，它在 `/etc/platform` 中报告 `pfSense-Plus`；本探针会拒绝它，而不是把一台 Plus 主机记录为 CE 的事实。由于没有可用的 Plus 主机来实测确认，这一点仅基于文档。

## 记录的字段

- `version` — `/etc/version` 的原样内容，例如 `2.8.1-RELEASE`
- `extra.hostKeyVerified`

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。自 2.2 起。探针只报告 Community Edition，因此 NVD 中 pfSense Plus 的范围（`sw_edition: plus`）永远不适用——参见[区分版本类型的匹配](/zh-cn/cve/#区分版本类型的匹配)。

## 生命周期解析器

无——endoflife.date 在 `pfsense`、`pfsense-ce` 或 `pfsense-plus` 下都没有页面（已确认 404）。目前仅用于清单。
