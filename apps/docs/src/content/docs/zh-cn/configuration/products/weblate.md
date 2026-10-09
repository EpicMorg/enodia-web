---
title: Weblate
description: 配置 enodia 探测 Weblate。
---

以匿名方式读取 `GET /about/`。协议默认为 `https`。

```yaml
targets:
  - id: weblate-main
    product: weblate
    address: https://weblate.example.com
```

## 版本从何而来

每个 Weblate 页面的页脚都写着 `Powered by <a href="https://weblate.org/">Weblate 2026.10</a>`，其 Documentation 链接指向 `docs.weblate.org/en/weblate-2026.10/`。探针先读取页脚；如果页脚被定制删除，则读取文档链接；两者都没有的页面会被报告为不支持。之所以读取 `/about/`，是因为每个 Weblate 上都有它；启用了 `REQUIRE_LOGIN` 的站点会把它重定向到登录页面，而登录页面带有相同的页脚。REST API 根路径（`/api/`）同样是匿名的，但不带版本，而 `/api/metrics/` 需要令牌。

Weblate 在 5.x 之后改用日历版本（`2026.9`、`2026.9.1`、`2026.10`）；两种格式都能解析。

## 身份验证

无——探针读取的是匿名页面，不接受任何凭据类型。自 2.2.0 起，为此目标配置凭据会被视为配置错误，而不再被忽略；参见[配置 → 凭据](/zh-cn/configuration/#凭据)。

## 记录的字段

仅 `version`——例如 `2026.10`（已在 `weblate/weblate:latest` 上实测确认）。本探针不记录任何 `extra` 字段。

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 进行匹配。

## 生命周期解析器

`github:WeblateOrg/weblate`——endoflife.date 没有 Weblate 的日历（已确认 404），因此改为根据 GitHub Releases 解析：只取最新发布的非预发布标签，不含 eol/support/lts 日期（GitHub 对生命周期策略没有立场，只知道“最新的发布版本是什么”）。Weblate 的发布标签形如 `weblate-2026.10`；自 2.2.0 起，解析器会去掉发布标签开头的 `<repo>-` 或 `<repo>_`，因此 LATEST 和 CYCLE 显示为 `2026.10`。
