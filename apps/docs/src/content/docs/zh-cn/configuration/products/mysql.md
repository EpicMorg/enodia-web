---
title: MySQL
description: 配置 enodia 探测 MySQL Server。
---

一个原始 TCP 协议，而不是 HTTP——`address` 为 `host` 或 `host:port`，不带
`https://`/`http://` 协议前缀（因此也不存在缺少协议前缀的警告；参见[配置](/zh-cn/configuration/#targets)）。省略端口时默认为 `3306`。

从不发送任何请求：MySQL 会在身份验证步骤之前的初始握手包中主动公布其版本——因此本探针观测版本时从不需要凭据。

```yaml
targets:
  - id: mysql-main
    product: mysql
    address: db.example.com:3306
```

## 身份验证

无——版本直接从握手中读取，此时还远未到凭据起作用的阶段。

## MariaDB 是另一个产品

对于早于 MariaDB 自身版本方案的 MySQL 客户端，MariaDB 会用 `5.5.5-` 前缀掩盖其真实版本——在当前的
MariaDB 10.11 镜像上依然如此。把 `product: mysql` 指向 MariaDB 服务器时，探针会检测到这一点并**有意失败**，在错误信息中给出真实的 MariaDB 版本，而不是悄悄地将其记录为 MySQL 的事实。目前还没有专用的 `mariadb` 探针——这是一个硬性终止，目前也不应该用[通用探针](/zh-cn/configuration/products/generic/)去绕过它。

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`endoflife:mysql`。
