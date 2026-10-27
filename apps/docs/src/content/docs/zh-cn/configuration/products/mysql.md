---
title: MySQL
description: 配置 enodia 探测 MySQL Server。
---

一个原始 TCP 协议，而不是 HTTP——`address` 为 `host` 或 `host:port`，不带
`https://`/`http://` 协议前缀（因此也不存在缺少协议前缀的警告；参见[配置](/zh-cn/configuration/#targets)）。省略端口时默认为 `3306`。

MySQL 会在身份验证步骤之前的初始握手包中主动公布其版本——因此本探针观测版本时从不需要凭据。

```yaml
targets:
  - id: mysql-main
    product: mysql
    address: db.example.com:3306
```

## 身份验证

无——版本直接从握手中读取，此时还远未到凭据起作用的阶段。

## 主机封锁（ERR 1129）

自 2.2.1 起，探针会用一次性登录（用户名 `enodia`，无密码）回应问候包，并读取服务器的拒绝响应。在 2.2.0 及更早版本中，它在问候包之后立即挂断，服务器会将其计为身份验证前中止的连接；来自同一主机的此类连接足够多时就会触发 `max_connect_errors`，此后服务器会以 `ERR 1129 Host '…' is blocked` 拒绝该主机——该主机上的所有客户端都会被拒绝，而不仅仅是 enodia。被拒绝的登录则会被计为一次身份验证失败，不会累加到封锁计数中。如果服务器记录失败的登录，每次运行都会留下一行 `Access denied for user 'enodia'`。如果 2.2.0 已经导致某个主机被封锁，请使用 `FLUSH HOSTS` 解除（MySQL 8.0 也支持 `TRUNCATE TABLE performance_schema.host_cache`）。

## MariaDB 是另一个产品

MariaDB 握手中的版本会暴露其身份：MariaDB 10.x 会为旧版 MySQL 客户端用 `5.5.5-` 前缀掩盖版本（`5.5.5-10.11.19-MariaDB-ubu2204`），而 MariaDB 11.0+ 发送的版本不带掩码，但带有标记（`11.4.13-MariaDB-ubu2404`）。把 `product: mysql` 指向 MariaDB 服务器时，探针能识别这两种形式并**有意失败**，在错误信息中给出真实的 MariaDB 版本，而不是悄悄地将其记录为 MySQL 的事实。自 2.1 起，MariaDB 有了自己的探针——请对它使用 [`product: mariadb`](/zh-cn/configuration/products/mariadb/)。

:::caution[2.1.1 之前的 MariaDB 11.0+]
在 2.1.0 及更早版本中只识别 `5.5.5-` 掩码，因此 `product: mysql` 目标背后的 MariaDB 11.0+ 服务器会被记录**为 MySQL**，并按 MySQL 的生命周期进行检查。自 2.1.1 起，这样的目标会改为失败——请将其改为 `product: mariadb`。
:::

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`endoflife:mysql`。
