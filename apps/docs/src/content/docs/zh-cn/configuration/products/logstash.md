---
title: Logstash
description: 配置 enodia 探测 Logstash。
---

读取 Logstash 自身 HTTP 监控 API 上的 `GET /`——**默认端口为 9600，而不是 Elasticsearch 或 Kibana 的端口**。

```yaml
targets:
  - id: logstash-main
    product: logstash
    address: https://logstash.example.com:9600
```

## 身份验证

无。Logstash 的监控 API 完全没有内置身份验证——它的设计是通过防火墙隔离，而不是用凭据保护。已针对真实的 `docker.elastic.co/logstash/logstash`
容器实测确认。

## 记录的字段

仅 `version`——本探针不记录任何 `extra` 字段。

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`endoflife:logstash`。
