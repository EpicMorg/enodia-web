---
title: Grafana
description: 配置 enodia 探测 Grafana。
---

读取 `GET /api/health` 获取版本。

```yaml
targets:
  - id: grafana-main
    product: grafana
    address: https://grafana.example.com
```

## 身份验证

无——已实测确认，即使使用错误的 Basic 身份验证凭据，该端点也会返回 `200` 和有效的响应体。它是为负载均衡器的存活检查而存在的，并不是受保护的 API 路由，因此这里不提供带凭据的路径。

## 记录的字段

- `version`
- `extra.commit`、`extra.database`

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`endoflife:grafana`。
