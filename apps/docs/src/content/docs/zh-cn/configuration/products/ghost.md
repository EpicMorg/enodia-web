---
title: Ghost
description: 配置 enodia 探测 Ghost。
---

读取 `GET /ghost/api/admin/site/`——Ghost 唯一一个无需会话或密钥即可访问的 Admin API 端点（管理应用在登录前就会读取它）——并取其中的 `site.version`。默认协议为 `https`。

```yaml
targets:
  - id: ghost-main
    product: ghost
    address: https://blog.example.com
```

## 公开的只有 major.minor

已在 `ghost:6` 上实测确认：该端点给出的是 `6.69`，与 `<meta name="generator">` 和 `Content-Version` 响应头相同，而实际安装的软件包是 6.69.0。完整版本位于 Admin API 的密钥（一个签名的 JWT）之后——为了一位数字引入一种新的凭据类型并不值得：Ghost 的发布版本几乎无一例外都是 `x.y.0`，而 `6.69` 与 `v6.69.0` 标签比较时视为相等。

## 身份验证

无——该端点是公开的，探针不接受任何凭据类型。自 2.2.0 起，附加到 `ghost` 目标上的凭据会被视为配置错误，而不会被悄悄忽略——参见[配置 → 凭据](/zh-cn/configuration/#凭据)。

## 记录的字段

仅 `version`——major.minor，例如 `6.69`；本探针不记录任何 `extra` 字段。

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`github:TryGhost/Ghost`——endoflife.date 没有 Ghost 的日历（已确认 404），因此改为根据 GitHub Releases 解析：只取最新发布的非预发布标签，不含 eol/support/lts 日期（GitHub 对生命周期策略没有立场，只知道“最新的发布版本是什么”）。
