---
title: Graylog
description: 配置 enodia 探测 Graylog。
---

读取 `GET /api/`——REST API 自身的根资源，一个公开的发现文档，每个 Graylog 节点都会在无需凭据的情况下响应。

```yaml
targets:
  - id: graylog-main
    product: graylog
    address: https://graylog.example.com
```

## 身份验证

无——已针对真实的 `graylog/graylog` 容器（以及它所依赖的 MongoDB 和 Elasticsearch）实测确认：根资源可匿名响应。

## 记录的字段

仅 `version`——本探针不记录任何 `extra` 字段。

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`endoflife:graylog`。
