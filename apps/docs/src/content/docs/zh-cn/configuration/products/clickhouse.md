---
title: ClickHouse
description: 配置 enodia 探测 ClickHouse。
---

通过 ClickHouse 的 HTTP 接口（默认端口 8123）运行 `SELECT version()`，并读取纯文本应答。

```yaml
targets:
  - id: clickhouse-main
    product: clickhouse
    address: https://clickhouse.example.com:8123
```

## 身份验证

可选。较新的镜像要求必须设置 `CLICKHOUSE_PASSWORD`——与较旧的安装不同，不存在可回退的默认用户空密码——因此针对已加固实例的未认证请求会收到普通的 `401`，其处理方式与其他任何探针相同：

```yaml
credentials:
  clickhouse-default:
    kind: basic
    username: default
    password: "${CLICKHOUSE_PASSWORD}"
```

某个部署是否需要凭据，完全取决于它的搭建方式。

## 记录的字段

仅 `version`——本探针不记录任何 `extra` 字段。

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`endoflife:clickhouse`。
