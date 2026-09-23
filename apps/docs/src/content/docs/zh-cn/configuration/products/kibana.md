---
title: Kibana
description: 配置 enodia 探测 Kibana。
---

读取 `GET /api/status`——按设计刻意无需身份验证（编排器将其用作存活/就绪探测；Elastic 官方 Helm chart 自己的就绪探测就是在不带凭据的情况下 curl 这个路径）。

```yaml
targets:
  - id: kibana-main
    product: kibana
    address: https://kibana.example.com
```

## 身份验证

无。已针对真实的 `docker.elastic.co/kibana/kibana`
容器（后端为真实的 Elasticsearch）实测确认：即使 Kibana 仍在启动中、以 `503` 表示“尚未就绪”，响应中也已包含完整版本——无论状态码如何，响应体中都已有该信息。

## 记录的字段

仅 `version`——本探针不记录任何 `extra` 字段。

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`endoflife:kibana`。
