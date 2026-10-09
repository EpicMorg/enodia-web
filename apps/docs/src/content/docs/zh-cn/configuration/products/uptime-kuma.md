---
title: Uptime Kuma
description: 配置 enodia 探测 Uptime Kuma。
---

通过 Uptime Kuma 自己的 socket.io API 登录，并从服务器在登录后发送的 `info` 事件中读取版本。

```yaml
targets:
  - id: uptime-kuma-main
    product: uptime-kuma
    address: https://uptime-kuma.example.com
    credentials: kuma-monitor
```

## 为什么需要登录

没有任何匿名内容带有版本。服务器的 `info` 事件带有版本，但新建立的连接在套接字登录之前收到的 `info` 事件中不含版本。`/metrics` 没有版本序列，而 API 密钥只能打开 `/metrics`。已在 1.23.17 和 2.5.5 上，以及一个生产实例的公开状态页面上实测确认，其 `/api/status-page/*` 和套接字同样不带版本。

因此，探针只实现了 Engine.IO v4 HTTP 长轮询传输（`/socket.io/?EIO=4&transport=polling`）中刚好够用的部分：打开会话、发出 `login`，并轮询直到收到带有 `version` 的 `info` 事件——然后断开连接。1.23.17 在登录确认之后发送带版本的 `info`，2.5.5 则在其之前；两种顺序都能处理。

## 身份验证 — 必需

用户名和密码，`kind: password`：

```yaml
credentials:
  kuma-monitor:
    kind: password
    username: monitor
    password: "${UPTIME_KUMA_PASSWORD}"
```

仅接受 `password`；其他任何类型都是配置错误。参见[配置 → 凭据](/zh-cn/configuration/#凭据)。

- 登录被拒绝时报告为身份验证失败，并带有 Uptime Kuma 自己的消息（`Incorrect username or password.`）。
- **启用了 2FA 的用户无法以这种方式登录**——登录确认会要求提供令牌。这种情况会被报告出来，而不会去绕过：请使用未启用 2FA 的监控用户。
- Uptime Kuma 会对登录进行限速：在 2.5.5 上，紧接在几次密码错误之后的一次运行曾经失败，之后的每次运行都通过了。
- 与任何凭据一样，使用明文 HTTP 的 Uptime Kuma 需要 `allow_insecure_transport`——参见 [HTTPS 优先](/zh-cn/concepts/#https-优先默认绝不以明文发送凭据)。

## 记录的字段

- `version` — 例如 `2.5.5`
- `extra.latestVersion` — Uptime Kuma 自己的更新检查结果，例如 `2.5.5`
- `extra.dbType` — 例如 `sqlite`

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 进行匹配。

## 生命周期解析器

`github:louislam/uptime-kuma`——endoflife.date 没有 Uptime Kuma 的日历（已确认 404），因此改为根据 GitHub Releases 解析：只取最新发布的非预发布标签，不含 eol/support/lts 日期（GitHub 对生命周期策略没有立场，只知道“最新的发布版本是什么”）。
