---
title: TeamCity
description: 配置 enodia 探测 JetBrains TeamCity。
---

未配置凭据时，以匿名方式从 `GET /app/rest/server/version` 读取版本；配置了令牌时，则从 `GET /app/rest/server`——TeamCity 自己的 REST API 参考文档首先指向的入口——读取。

```yaml
targets:
  - id: teamcity-main
    product: teamcity
    address: https://teamcity.example.com
    # credentials: teamcity-pat    # 可选，见下文
```

## 身份验证 — 可选，但如果添加，很容易弄反

**无需凭据。** TeamCity 会以纯文本形式向任何人提供 `/app/rest/server/version`——`2026.1.1 (build 222577)`——即使访客登录已关闭。已在 2017.2 到 2026.1 的全新服务器（未创建管理员）上，以及在七个生产实例（2024.03 到 2026.1.3）上不带凭据确认。这并不是访客访问：在同样的服务器上，`/app/rest/server` 和仅限访客的端点都会被拒绝。TeamCity 启动期间会对每个路径返回一个 200 的 HTML 维护页面，因此回复必须完整匹配 `YYYY.N[.N] (build N)`，否则该目标会因无法解析而失败。

**配置了令牌时**，探针改为读取 `/app/rest/server`——您要求的是经过身份验证的读取，它还带有 `internalId`，而且错误的令牌仍会显示为可见的身份验证错误，而不会被匿名路径掩盖。`/app/rest/server` 从不允许匿名访问：全新实例会返回 `401`，并同时给出 Basic 和 Bearer 质询。TeamCity 有**两种不同的令牌，已实测确认，它们只能作为相反的凭据类型使用**：

- 全新服务器仅在首次启动时写入日志的一次性**超级用户引导令牌**只能作为 **Basic** 使用——用户名为空，令牌作为密码。如果作为裸的 `Authorization: Bearer` 发送，会被拒绝。
- 普通用户的**个人访问令牌**（Profile → Access Tokens——真正长期运行的自动化实际使用的身份验证方式）则正好相反：已针对七个真实的生产实例确认，它作为 **Bearer** 可用，而作为 Basic 会被直接拒绝（“Incorrect username or
  password”，即使用户名为空也一样）。

```yaml
credentials:
  # 引导令牌——Basic，用户名为空
  teamcity-bootstrap:
    kind: basic
    username: ""
    password: "${TEAMCITY_BOOTSTRAP_TOKEN}"

  # 个人访问令牌——Bearer
  teamcity-pat:
    kind: bearer
    value: "${TEAMCITY_TOKEN}"
```

在任何长期运行的配置中都请使用个人访问令牌——引导令牌本来就应在首次登录后轮换掉。

## 记录的字段

- `version` — 完整字符串，例如 `2026.2 (build 238924)`
- `extra.buildNumber`
- `extra.internalId` — 仅在配置了令牌时（`/app/rest/server`）

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

无——endoflife.date 没有 TeamCity 的日历（已确认 404）。目前仅用于清单。
