---
title: postgres_exporter
description: 配置 enodia 探测 prometheus-community/postgres_exporter。
---

从 `/metrics` 读取 `postgres_exporter_build_info` 这个 gauge——即
`prometheus/common` 的“version collector”，该生态中的每个 Prometheus exporter 都以相同方式暴露它（值恒为 `1`，版本在标签中，而不在值中）。也接受 `product: postgres-exporter` 作为别名。

```yaml
targets:
  - id: postgres-exporter-main
    product: postgres_exporter
    address: https://exporter.example.com:9187
```

## 身份验证

可选——`/metrics` 默认无需凭据，即使目标 PostgreSQL 本身不可达也会响应（`build_info` 描述的是 exporter 二进制程序，而不是它所抓取的数据库）。`exporter-toolkit`
（`--web.config.file` 背后的库）可以为该端点添加 HTTP Basic：

```yaml
credentials:
  postgres-exporter-basic:
    kind: basic
    username: metrics
    password: "${EXPORTER_PASSWORD}"
```

## 记录的字段

仅 `version`——本探针不记录任何 `extra` 字段。

## CVE 关联

不进行匹配——两个数据库都没有可用的数据。参见 [CVE 关联](/zh-cn/cve/#哪些产品会被匹配)。

## 生命周期解析器

`github:prometheus-community/postgres_exporter`——这是一个 Prometheus
exporter，而不是有自己生命周期/EOL 策略的产品，因此根据 GitHub Releases 解析：只取最新发布的非预发布标签，不含 eol/support/lts 日期。
