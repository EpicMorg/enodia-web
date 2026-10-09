---
title: Sentry
description: 配置 enodia 探测 Sentry。
---

读取自托管 Sentry 的匿名登录页面 `GET /auth/login/`（它会重定向到唯一组织的登录页面）。每个页面都嵌入了 `window.__initialData = {...}`，其中的 `version.current` 就是版本。默认协议为 `https`。

```yaml
targets:
  - id: sentry-main
    product: sentry
    address: https://sentry.example.com
```

## 为什么用登录页面

已在一台生产环境的自托管 26.2.1 上以匿名方式实测确认。同一个 `version` 对象中还有一个 `latest` 字段——Sentry 自己的升级检查——它**不会**被使用：关闭该检查后它是过时的（`21.7.0`）。API 根路径 `/api/0/` 同样是匿名的，但其 `"version": "0"` 是 API 的版本，不是服务器的；`/api/0/internal/health/` 需要身份验证。

## 身份验证

无——登录页面是公开的，探针不接受任何凭据类型。自 2.2.0 起，附加到 `sentry` 目标上的凭据会被视为配置错误，而不会被悄悄忽略——参见[配置 → 凭据](/zh-cn/configuration/#凭据)。

## 记录的字段

- `version` — 来自 `version.current`，例如 `26.2.1`
- `extra.build` — 来自 `version.build` 的 git 提交
- `extra.mode` — `sentryMode`，例如 `SELF_HOSTED`

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 进行匹配。BDU 中的“Sentry”条目针对的是 SDK，而不是服务器，不会使用。

## 生命周期解析器

`github:getsentry/self-hosted`——endoflife.date 没有 Sentry 的日历（已确认 404），因此改为根据 GitHub Releases 解析：只取最新发布的非预发布标签，不含 eol/support/lts 日期（GitHub 对生命周期策略没有立场，只知道“最新的发布版本是什么”）。getsentry/self-hosted 的发布标签（`26.8.0`、`26.9.0`……）就是它所安装的服务器版本。
