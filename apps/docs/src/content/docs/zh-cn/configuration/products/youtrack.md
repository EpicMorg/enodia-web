---
title: YouTrack
description: 配置 enodia 探测 YouTrack。
---

读取 `GET /api/config?fields=version`。

```yaml
targets:
  - id: youtrack-main
    product: youtrack
    address: https://youtrack.example.com
```

## 身份验证

无需身份验证——已针对一个真实的、面向互联网的 YouTrack
实例实测确认：该端点无需凭据，而对于匿名调用者，请求 `version` 之外的任何字段（`buildDate`、`edition` 等）都会被静默忽略，不会返回。如果您仍希望进行身份验证，也可以使用 `bearer`。

## 记录的字段

仅 `version`——本探针不记录任何 `extra` 字段。

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`endoflife:youtrack`。
