---
title: Home Assistant
description: 配置 enodia 探测 Home Assistant。
---

使用长期访问令牌，从 Home Assistant 的 REST API 读取 `GET /api/config`。别名 `homeassistant` 同样可以用作 `product:`。

```yaml
targets:
  - id: home-assistant-main
    product: home-assistant
    address: https://home-assistant.example.com
    credentials: ha-token
```

## 身份验证 — 必需

没有任何匿名内容带有 Home Assistant 的版本：`/api/` 和 `/api/config` 返回 `401`，而 `/manifest.json`、`/auth/providers` 和初始设置（onboarding）端点都不含版本（已在 `ghcr.io/home-assistant/home-assistant:stable` 2026.10.0 上实测确认）。REST API 文档中规定的身份验证方式是长期访问令牌（Profile → Security → Long-lived access tokens），以 `Authorization: Bearer` 发送：

```yaml
credentials:
  ha-token:
    kind: bearer
    value: "${HOME_ASSISTANT_TOKEN}"
```

仅接受 `bearer`；其他任何类型都是配置错误。参见[配置 → 凭据](/zh-cn/configuration/#凭据)。

## 读取哪些内容

`/api/config` 还会返回住宅的坐标、路径和 URL。这些都不会被读取——只读取 `version`、`state` 以及安全/恢复模式标志。

## 记录的字段

- `version` — 例如 `2026.10.0`
- `extra.state` — 例如 `RUNNING`
- `extra.recoveryMode` — 当 Home Assistant 报告处于安全模式或恢复模式时为 `true`；否则不存在

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 进行匹配。

## 生命周期解析器

`github:home-assistant/core`——endoflife.date 没有 Home Assistant 的日历（已确认 404），因此改为根据 GitHub Releases 解析：只取最新发布的非预发布标签，不含 eol/support/lts 日期（GitHub 对生命周期策略没有立场，只知道“最新的发布版本是什么”）。标签表明为预发布版本（`2026.10.0b7`）的发布版本会被跳过，即使 GitHub 没有将其标记为预发布。
