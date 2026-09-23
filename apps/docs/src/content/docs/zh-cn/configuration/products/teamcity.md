---
title: TeamCity
description: 配置 enodia 探测 JetBrains TeamCity。
---

读取 `GET /app/rest/server`——TeamCity 自己的 REST API 参考文档首先指向的入口——获取版本。

```yaml
targets:
  - id: teamcity-main
    product: teamcity
    address: https://teamcity.example.com
    credentials: teamcity-pat
```

## 身份验证 — 必需，而且很容易弄反

默认没有匿名访问——全新实例会返回 `401`，并同时给出 Basic 和 Bearer 质询（访客登录默认关闭）。
TeamCity 有**两种不同的令牌，已实测确认，它们只能作为相反的凭据类型使用**：

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
- `extra.buildNumber`、`extra.internalId`

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

无——endoflife.date 没有 TeamCity 的日历（已确认 404）。目前仅用于清单。
