---
title: Elasticsearch
description: 配置 enodia 探测 Elasticsearch。
---

读取 `GET /` 获取版本。

```yaml
targets:
  - id: es-main
    product: elasticsearch
    address: https://es.example.com:9200
```

## 身份验证

可选。自 Elasticsearch 8.0 起，安全功能（HTTPS 以及 Basic/Bearer/
ApiKey 身份验证）默认开启——匿名请求会收到一个声明了全部三种方案的 `401`。这里实际测试并提供的唯一方案是使用 `elastic` 超级用户的 Basic 身份验证：

```yaml
credentials:
  es-elastic:
    kind: basic
    username: elastic
    password: "${ES_PASSWORD}"
```

以 `xpack.security.enabled=false`（一个真实的、有文档说明的设置）启动的集群，会通过普通
HTTP 匿名响应同样的请求，响应体完全相同；这种情况下无需凭据。

## 记录的字段

- `version` — 来自 `version.number`
- `extra.clusterName`、`extra.luceneVersion`、`extra.buildHash`

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`endoflife:elasticsearch`。
