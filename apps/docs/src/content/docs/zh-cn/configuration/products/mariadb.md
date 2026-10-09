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

MariaDB 和 MySQL 使用完全相同的握手，只在版本字符串上不同。版本字符串有两种形式，均已实测确认：

- **MariaDB 10.x** 会用 `5.5.5-` 兼容性前缀掩盖其版本，供旧版 MySQL 客户端使用：`5.5.5-10.11.19-MariaDB-ubu2204`。该掩码会被去除。
- **MariaDB 11.0+** 不再使用掩码：`11.4.13-MariaDB-ubu2404`、`12.3.3-MariaDB-ubu2404`。此时版本中的 `-MariaDB` 是唯一的标志。自 2.1.1 起可识别——2.1.0 会拒绝这类服务器。

两种形式都会被接受。指向真实的 MySQL 服务器时（其版本两种特征都没有），探针会明确报错失败，而不是记录错误的事实，这与 [`mysql`](/zh-cn/configuration/products/mysql/#mariadb-是另一个产品) 拒绝 MariaDB 服务器正好互为镜像。

## 记录的字段

- `version` — 数字版本，例如 `10.11.19`
- `extra.tag` — 版本之后的厂商标签，例如 `MariaDB-ubu2204`（如果存在）

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配——如果设置了 `cve.mariadb.path`，还会与 MariaDB 自己的已修复 CVE 表进行匹配，其按系列给出的结论优先于 BDU 和 NVD 的开放式范围。参见[厂商自己的数据 → MariaDB](/zh-cn/cve/#mariadb)。

## 生命周期解析器

`endoflife:mariadb`。
