---
title: memcached
description: 配置 enodia 探测 memcached。
---

一个基于文本协议的原始 TCP 探针，而不是 HTTP——`address` 为 `host` 或 `host:port`，不带协议前缀。省略端口时默认为 `11211`。发送 `version` 并读取单行回复 `VERSION 1.6.45`。

```yaml
targets:
  - id: memcached-01
    product: memcached
    address: cache.example.com:11211
```

## 身份验证

无——文本协议没有身份验证。以 SASL（`-S`）启动的服务器只使用二进制协议，并对文本命令返回错误；这种情况会被报告为不支持，而不是去猜测。

## 记录的字段

仅 `version`——例如 `1.6.45`。本探针不记录任何 `extra` 字段。

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`endoflife:memcached`。
