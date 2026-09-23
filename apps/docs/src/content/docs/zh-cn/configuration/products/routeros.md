---
title: MikroTik RouterOS
description: 配置 enodia 探测 MikroTik RouterOS。
---

读取 `GET /rest/system/resource`——RouterOS 的 REST API（RouterOS 7.1+；必须启用 `www` 服务，全新安装时默认开启）。

```yaml
targets:
  - id: router-main
    product: routeros
    address: https://router.example.com
    credentials: routeros-admin
```

## 身份验证 — 必需

已针对一台真实的 CHR（Cloud Hosted Router）7.24.2 虚拟机实测确认：没有凭据时该端点始终返回 `401`，而位于 `/` 的匿名 webfig 登录页面上也没有任何版本文本——这是路由器自己的管理 API，因此要求凭据是正确的默认姿态，而不是需要设法绕过的加固选项。

```yaml
credentials:
  routeros-admin:
    kind: basic
    username: enodia-ro
    password: "${ROUTEROS_PASSWORD}"
```

SSH banner（`"SSH-2.0-ROSSSH"`，已实测确认）同样不含版本，因此排除了像[SSH](/zh-cn/configuration/products/ssh/)/[MySQL](/zh-cn/configuration/products/mysql/)
那样基于 SSH banner 的方式。

## 记录的字段

- `version`
- `extra.boardName`、`extra.architecture`

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`endoflife:routeros`。
