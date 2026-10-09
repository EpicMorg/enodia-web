---
title: ONLYOFFICE Docs
description: 配置 enodia 探测 ONLYOFFICE Docs。
---

以匿名方式读取文档服务器的根路径 `GET /index.html`——即使启用了 JWT 它也会应答：“Server is functioning normally. Version: 9.4.0. Build: 129. Release date: … Package type: 0. …”。然后读取 `GET /welcome/` 以检查品牌。默认协议为 `https`。

```yaml
targets:
  - id: onlyoffice-main
    product: onlyoffice
    address: https://office.example.com
```

## 一个探针，两个产品

ONLYOFFICE Docs 与其 [Euro-Office](/zh-cn/configuration/products/euro-office/) 分支（随 Nextcloud 提供）是同一个服务器，共用一个探针，但各自有自己的发布线，因此各自是拥有自己解析器的独立产品——如果拿 ONLYOFFICE 的发布版本来比较，一个最新的 Euro-Office 会始终显示为落后。

`/index.html` 在两者上的内容完全相同，因此品牌取自 `/welcome/` 的标题：“ONLYOFFICE Docs Community Edition”与“Euro-Office Docs Community Edition”。**另一品牌的服务器会被拒绝，并给出应使用的产品**：把 `product: onlyoffice` 指向 Euro-Office 服务器时，会以 `this document server is Euro-Office, not ONLYOFFICE — use product: euro-office` 失败，而不是将其记录为 ONLYOFFICE 的事实（与 [`mysql`](/zh-cn/configuration/products/mysql/) 拒绝 MariaDB 的方式相同）。如果欢迎页面被关闭（404），则认为服务器就是配置中所写的产品。

协同编辑服务的 `version` 命令需要 JWT 密钥，而 `api.js` 不带版本——因此使用 `/index.html`。

## 身份验证

无——两个页面都是公开的，探针不接受任何凭据类型。自 2.2.0 起，附加到 `onlyoffice` 目标上的凭据会被视为配置错误，而不会被悄悄忽略——参见[配置 → 凭据](/zh-cn/configuration/#凭据)。

## 记录的字段

- `version` — 例如 `9.4.0`
- `extra.build` — 构建号，例如 `129`
- `extra.edition` — 来自软件包类型：`community`（0）、`enterprise`（1）或 `developer`（2）
- `extra.brand` — 来自 `/welcome/` 标题的品牌（`ONLYOFFICE`），在欢迎页面开启时

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。使用的是 NVD 的 `onlyoffice:document_server`——`onlyoffice:server` 是另一个产品 Community Server。

## 生命周期解析器

`github:ONLYOFFICE/DocumentServer`——endoflife.date 没有 ONLYOFFICE 的日历（已确认 404），因此改为根据 GitHub Releases 解析：只取最新发布的非预发布标签，不含 eol/support/lts 日期（GitHub 对生命周期策略没有立场，只知道“最新的发布版本是什么”）。
