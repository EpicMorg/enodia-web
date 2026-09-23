---
title: Redis
description: 配置 enodia 探测 Redis。
---

一个原始 RESP 协议探针，而不是 HTTP——`address` 为 `host` 或 `host:port`，不带协议前缀。省略端口时默认为 `6379`。从 `INFO server` 中读取 `redis_version`。

```yaml
targets:
  - id: redis-main
    product: redis
    address: cache.example.com:6379
```

## 身份验证

可选——大多数 Redis 部署都没有设置 `requirepass`，而 enodia
无法预先知道某个部署是否设置了。未配置凭据的目标会直接先尝试 `INFO`，只有当服务器以 `NOAUTH` 实际拒绝这个普通请求时才发送 `AUTH`。

```yaml
credentials:
  redis-auth:
    kind: password
    password: "${REDIS_PASSWORD}"

  # Redis 6+ ACL 用户——同时设置 username
  redis-acl-user:
    kind: password
    username: enodia_ro
    password: "${REDIS_PASSWORD}"
```

需要密码时，密码错误或缺失会表现为身份验证错误（`NOAUTH`/`WRONGPASS`），与这里其他任何带凭据的探针相同。

## 记录的字段

仅 `version`——本探针不记录任何 `extra` 字段。

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`endoflife:redis`。
