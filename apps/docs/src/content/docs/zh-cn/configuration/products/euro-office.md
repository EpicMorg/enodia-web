---
title: Euro-Office Docs
description: 配置 enodia 探测 Euro-Office Docs。
---

Euro-Office Docs 是 Nextcloud 随附的 ONLYOFFICE Docs 分支（`nextcloud/aio-eurooffice`）。与 [ONLYOFFICE Docs](/zh-cn/configuration/products/onlyoffice/) 一样，它以匿名方式从文档服务器的根路径 `GET /index.html` 读取——“Version: 9.3.1. Build: 37. Release date: 2016-06-29…”——然后读取 `GET /welcome/` 以检查品牌。默认协议为 `https`。

```yaml
targets:
  - id: eurooffice-main
    product: euro-office
    address: https://office.example.com
```

## 一个探针，两个产品

Euro-Office 与 [`onlyoffice`](/zh-cn/configuration/products/onlyoffice/) 共用一个探针，但它有独立于 ONLYOFFICE（v9.3.1、v9.4.0）的自己的发布线（Euro-Office/DocumentServer：v9.3.3、v9.3.4、v9.3.4-hotfix.1），因此它是一个拥有自己解析器的独立产品——如果拿 ONLYOFFICE 的发布版本来比较，一个最新的 Euro-Office 会始终显示为落后。其 `/index.html` 上的发布日期是占位符；版本是真实的（镜像自身的软件包为 `euro-office-documentserver 9.3.1-dev.1`）。

`/index.html` 在两者上的内容完全相同，因此品牌取自 `/welcome/` 的标题：“Euro-Office Docs Community Edition”与“ONLYOFFICE Docs Community Edition”。**另一品牌的服务器会被拒绝，并给出应使用的产品**：把 `product: euro-office` 指向 ONLYOFFICE 服务器时，会以 `this document server is ONLYOFFICE, not Euro-Office — use product: onlyoffice` 失败。如果欢迎页面被关闭（404），则认为服务器就是配置中所写的产品。

## 身份验证

无——两个页面都是公开的，探针不接受任何凭据类型。自 2.2.0 起，附加到 `euro-office` 目标上的凭据会被视为配置错误，而不会被悄悄忽略——参见[配置 → 凭据](/zh-cn/configuration/#凭据)。

## 记录的字段

- `version` — 例如 `9.3.1`
- `extra.build` — 构建号，例如 `37`
- `extra.edition` — 来自软件包类型：`community`（0）、`enterprise`（1）或 `developer`（2）
- `extra.brand` — 来自 `/welcome/` 标题的品牌（`Euro-Office`），在欢迎页面开启时

## CVE 关联

不进行匹配——两个数据库都没有可用的数据。参见 [CVE 关联](/zh-cn/cve/#哪些产品会被匹配)。它是一个没有自己条目的分支；ONLYOFFICE 的条目不会应用到它身上。

## 生命周期解析器

`github:Euro-Office/DocumentServer`——endoflife.date 没有 Euro-Office 的日历（已确认 404），因此改为根据 GitHub Releases 解析：只取最新发布的非预发布标签，不含 eol/support/lts 日期（GitHub 对生命周期策略没有立场，只知道“最新的发布版本是什么”）。
