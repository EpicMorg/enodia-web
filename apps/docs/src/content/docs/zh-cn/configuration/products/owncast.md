---
title: Owncast
description: 配置 enodia 探测 Owncast。
---

读取 `GET /api/status` 获取版本。

```yaml
targets:
  - id: owncast-main
    product: owncast
    address: https://owncast.example.com
```

## 身份验证

无——在 Owncast 自己的源码中，该路由没有任何要求身份验证的中间件，已针对运行中的 `owncast/owncast:latest` 容器确认。

## 记录的字段

- `version` — 来自 `versionNumber`
- `extra.online` — `"true"`/`"false"`

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 进行匹配。

## 生命周期解析器

`github:owncast/owncast`——endoflife.date 没有 Owncast 的日历（已确认 404），因此改为根据 GitHub Releases 解析：只取最新发布的非预发布标签，不含 eol/support/lts 日期（GitHub 对生命周期策略没有立场，只知道“最新的发布版本是什么”）。
