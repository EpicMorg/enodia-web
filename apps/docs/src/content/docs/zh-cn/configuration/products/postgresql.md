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

## 数据库

探针会请求 `postgres` 数据库，每台服务器都有该数据库，并且它向所有人授予 `CONNECT` 权限——因此只有 `LOGIN` 权限的角色无需拥有自己的数据库即可获取版本。对于没有 `postgres` 数据库的服务器，请在 `options.database` 中指定另一个数据库：

```yaml
targets:
  - id: pg-main
    product: postgresql
    address: db.example.com:5432
    credentials: pg-app
    options:
      database: inventory
```

:::caution[2.2.1 中的变更]
在 2.2.0 及更早版本中，探针请求以登录用户命名的数据库，因此仅有登录权限的角色会以 `database "<user>" does not exist` 失败。依赖这一行为的目标现在必须在 `options.database` 中指定其数据库。
:::

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。从 2.2 开始，`cve.postgresql.path` 会加入该项目自己的安全页面，其中按大版本列出修复：对于已保存页面中列出的大版本，其结论会取代 BDU 不区分分支的范围——否则这些范围会把每个较旧大版本的最新版本都标记出来。参见[厂商自己的数据 → PostgreSQL](/zh-cn/cve/#postgresql)。

## 生命周期解析器

`endoflife:postgresql`。
