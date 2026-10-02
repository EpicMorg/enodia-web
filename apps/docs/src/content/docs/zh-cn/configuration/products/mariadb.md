---
title: MariaDB
description: 配置 enodia 探测 MariaDB Server。
---

一个原始 TCP 协议，而不是 HTTP——`address` 为 `host` 或 `host:port`，不带协议前缀。省略端口时默认为 `3306`。与 [MySQL](/zh-cn/configuration/products/mysql/) 使用相同的握手：MariaDB 会在任何身份验证步骤之前的初始握手包中主动公布其版本，因此本探针从不需要凭据。

```yaml
targets:
  - id: mariadb-main
    product: mariadb
    address: db.example.com:3306
```

## 身份验证

无——版本直接从握手中读取。

## 厂商身份校验

MariaDB 和 MySQL 使用完全相同的握手，只在一个细节上不同：MariaDB 会在版本前加上 `5.5.5-` 兼容性掩码，供旧版 MySQL 客户端使用（已实测确认，在 MariaDB 10.11 上依然如此）。本探针要求存在该掩码并将其去除——指向真实的 MySQL 服务器时会明确报错失败，而不是记录错误的事实，这与 [`mysql`](/zh-cn/configuration/products/mysql/#mariadb-是另一个产品) 拒绝 MariaDB 服务器正好互为镜像。

## 记录的字段

- `version` — 数字版本，例如 `10.11.19`
- `extra.tag` — 版本之后的厂商标签，例如 `MariaDB-ubu2204`（如果存在）

## CVE 关联

尚未进行匹配——MariaDB 是 2.1 新增的，上游将它的 CVE 映射留给之后专门的一轮工作。参见 [CVE 关联](/zh-cn/cve/#哪些产品会被匹配)。

## 生命周期解析器

`endoflife:mariadb`。
