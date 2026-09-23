---
title: PostgreSQL
description: 配置 enodia 探测 PostgreSQL。
---

一个原始线路协议探针，而不是 HTTP——`address` 为 `host` 或 `host:port`，不带协议前缀。省略端口时默认为 `5432`。也接受 `product: postgres` 作为 `postgresql` 的别名。

版本来自每个 PostgreSQL
后端在身份验证成功后立即自动发送的 `ParameterStatus` 消息——无需显式执行 `SHOW server_version` 查询。

```yaml
targets:
  - id: pg-main
    product: postgresql
    address: db.example.com:5432
    credentials: pg-app
```

## 身份验证

仅当服务器实际要求时才需要——trust 身份验证完全不需要凭据。当服务器要求时，**trust、cleartext、MD5 和
SCRAM-SHA-256 均受支持并自动协商**——
包括 SCRAM-SHA-256，它是 PostgreSQL 14+ 的默认方式，在 10-13 上也很常见，没有它，大多数真实部署都将无法访问。

```yaml
credentials:
  pg-app:
    kind: password
    username: enodia_ro   # 可选——省略时默认为 "postgres"
    password: "${PG_PASSWORD}"
```

连接的数据库默认与用户名相同（服务端默认行为）——目前没有配置字段可以显式指定其他数据库名。

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`endoflife:postgresql`。
