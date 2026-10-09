---
title: WAPT
description: 配置 enodia 探测 WAPT。
---

读取 WAPT 服务器（Tranquil IT）的 `GET /ping`，它无需会话即可提供。

```yaml
targets:
  - id: wapt-main
    product: wapt
    address: https://wapt.example.com
```

## 报告哪个版本

`/ping` 同时带有 `version`（`1.8.2`）和 `git_hash`（`1.8.2.7334-2d15afd9-debian-10-amd64`），后者以完整的构建号开头。当该构建号是对 `version` 的扩展时，会改为报告它——`1.8.2.7334`，而不是 `1.8.2`。已在一台生产环境的 WAPT 1.8.2 服务器上实测确认。

## 身份验证

无——该端点不接受任何形式的凭据。

## 记录的字段

- `version` — 例如 `1.8.2.7334`
- `extra.edition` — 例如 `community`
- `extra.apiVersion` — 例如 `v3`
- `extra.gitHash` — 例如 `1.8.2.7334-2d15afd9-debian-10-amd64`

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 进行匹配。

区分版本类型：WAPT 自己的版本类型（`community`/`enterprise`）本身就是 NVD 中的用词，会按原样传递。其他任何值都视为未知版本类型，保留所有发现项。

## 生命周期解析器

无——WAPT 没有 endoflife.date 页面（已确认 404），而 Tranquil IT 的 GitHub 标签停留在 1.5；发布版本发布在他们自己的网站上，这里没有任何解析器读取它。仅用于清单。
