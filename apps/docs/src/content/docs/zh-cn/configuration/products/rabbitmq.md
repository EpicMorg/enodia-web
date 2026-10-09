---
title: RabbitMQ
description: 配置 enodia 探测 RabbitMQ。
---

从管理插件的 HTTP API 读取 `GET /api/overview`（默认端口为 `15672`——请在地址中写明）。AMQP 端口本身没有值得读取的认证前版本交换；管理插件是 RabbitMQ 唯一提供其版本的地方。

```yaml
targets:
  - id: rabbitmq-main
    product: rabbitmq
    address: https://rabbitmq.example.com:15672
    credentials: rabbitmq-monitor
```

## 身份验证 — 必需

管理 API 从不允许匿名访问：已针对 `rabbitmq:4-management` 实测确认，不带凭据时它返回 `401`。需要一个管理用户的 HTTP Basic 凭据：

```yaml
credentials:
  rabbitmq-monitor:
    kind: basic
    username: monitor
    password: "${RABBITMQ_PASSWORD}"
```

仅接受 `basic`；其他任何类型都是配置错误。参见[配置 → 凭据](/zh-cn/configuration/#凭据)。

除非在管理 API 上配置了 TLS，否则它使用明文 HTTP，而 enodia 拒绝通过明文 HTTP 发送凭据：`http://` 地址需要 `allow_insecure_transport`，这是有意为之——参见 [HTTPS 优先](/zh-cn/concepts/#https-优先默认绝不以明文发送凭据)。

## 记录的字段

- `version` — `rabbitmq_version`，例如 `4.3.6`
- `extra.productName` — 例如 `RabbitMQ`
- `extra.productVersion` — 例如 `4.3.6`
- `extra.erlangVersion` — 例如 `27.3.4.18`
- `extra.clusterName` — 例如 `rabbit@enodia-test`

3.8.34 的回复中也有相同的字段。

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`endoflife:rabbitmq`。
