---
title: code-server
description: 配置 enodia 探测 code-server。
---

以匿名方式读取 `GET /login`。协议默认为 `https`。登录页面中嵌入了 `<meta id="coder-options" data-settings="{...}">`——经过 HTML 转义的 JSON——其中的 `codeServerVersion` 就是服务器的版本；探针会对该属性反转义并解码。

```yaml
targets:
  - id: code-main
    product: code-server
    address: https://code.example.com
```

## 为什么用登录页面

code-server 自己的 `/version` 需要密码，而 `/healthz` 不带版本。登录页面无需登录即可访问，并带有启动编辑器时使用的同一组选项。没有 `coder-options` 元素的页面会被报告为不支持（不是 code-server）。

## 身份验证

无——探针读取的是匿名页面，不接受任何凭据类型。自 2.2.0 起，为此目标配置凭据会被视为配置错误，而不再被忽略；参见[配置 → 凭据](/zh-cn/configuration/#凭据)。

## 记录的字段

仅 `version`——例如 `4.141.0`（已在 `codercom/code-server:latest` 上实测确认，其 `code-server --version` 显示 4.141.0，Code 为 1.141.0）。本探针不记录任何 `extra` 字段。

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 进行匹配。

## 生命周期解析器

`github:coder/code-server`——endoflife.date 没有 code-server 的日历（已确认 404），因此改为根据 GitHub Releases 解析：只取最新发布的非预发布标签，不含 eol/support/lts 日期（GitHub 对生命周期策略没有立场，只知道“最新的发布版本是什么”）。
