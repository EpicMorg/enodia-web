---
title: PostHog
description: 配置 enodia 探测 PostHog。
---

读取自托管 PostHog 的匿名登录页面 `GET /login`。该页面嵌入了 `window.POSTHOG_APP_CONTEXT = JSON.parse("{...}")`——一个位于 JavaScript 字符串字面量中的 JSON 文档——其中的 `commit_sha` 被报告为版本。默认协议为 `https`。

```yaml
targets:
  - id: posthog-main
    product: posthog
    address: https://posthog.example.com
```

## git 提交就是版本

PostHog 已不再发布带编号的版本：自托管（hobby）安装跟踪主分支，它唯一暴露的标识是构建所用的提交（已在一台生产环境的自托管实例上以匿名方式实测确认）。因此这里的 `version` 是形如 `55babe9554` 的提交哈希，而不是发布版本号。`/_preflight/` 同样是匿名的，但只带有服务健康状况和 realm；`/api/instance_status` 需要登录。

## 身份验证

无——登录页面是公开的，探针不接受任何凭据类型。自 2.2.0 起，附加到 `posthog` 目标上的凭据会被视为配置错误，而不会被悄悄忽略——参见[配置 → 凭据](/zh-cn/configuration/#凭据)。

## 记录的字段

- `version` — git 提交，例如 `55babe9554`
- `extra.commit` — 同一个提交
- `extra.realm` — 例如 `hosted-clickhouse`，当页面带有该值时

## CVE 关联

不进行匹配——两个数据库都没有可用的数据。参见 [CVE 关联](/zh-cn/cve/#哪些产品会被匹配)。NVD 中 PostHog 的版本界限是提交哈希，无法比较。

## 生命周期解析器

无——没有可以与提交进行比较的发布版本。判断某个提交落后主分支多少需要 GitHub 的 compare API，这是一种与 enodia 现有任何解析器都不同的解析器；未实现。仅用于清单。
