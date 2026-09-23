---
title: OpenSearch
description: 配置 enodia 探测 OpenSearch。
---

读取 `GET /`——端点和响应格式与[Elasticsearch](/zh-cn/configuration/products/elasticsearch/) 相同，因为
OpenSearch 是 Elasticsearch 7.10.2 的分支，几乎原样保留了其根响应格式。

```yaml
targets:
  - id: opensearch-main
    product: opensearch
    address: https://opensearch.example.com:9200
```

## 厂商身份校验

`version.distribution` 会与 `"opensearch"` 进行比较——已针对两者的真实容器实测确认，真实的 Elasticsearch 既没有这个字段，也没有 OpenSearch 的“The OpenSearch Project”标语。把
`product: opensearch` 指向普通的 Elasticsearch 会明确报错失败，而不是悄悄地把 Elasticsearch 的版本报告为 OpenSearch 的版本。

## 身份验证

可选。安全配置与 Elasticsearch 完全一致：全新容器必须设置 `OPENSEARCH_INITIAL_ADMIN_PASSWORD`，默认以 HTTPS 响应且要求 Basic 身份验证；`DISABLE_SECURITY_PLUGIN=true`
（一个真实的、有文档说明的设置）则会通过普通 HTTP 匿名响应同样的请求。

```yaml
credentials:
  opensearch-admin:
    kind: basic
    username: admin
    password: "${OPENSEARCH_PASSWORD}"
```

## 记录的字段

- `version` — 来自 `version.number`
- `extra.clusterName`、`extra.luceneVersion`

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`endoflife:opensearch`。
