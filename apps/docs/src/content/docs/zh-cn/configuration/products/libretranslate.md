---
title: LibreTranslate
description: 配置 enodia 探测 LibreTranslate。
---

读取 `GET /spec`——API 自己的 OpenAPI（Swagger 2.0）文档，即使翻译需要 API 密钥，它也是公开的。协议默认为 `https`。

```yaml
targets:
  - id: translate-main
    product: libretranslate
    address: https://translate.example.com
```

## 厂商身份校验

`info.version` 就是服务器的版本。探针还要求 `info.title` 为 `"LibreTranslate"`，以免把其他服务的 Swagger 文档当作 LibreTranslate 的来读取。

## 身份验证

无——`/spec` 是公开的，探针不接受任何凭据类型（API 密钥只在翻译时才需要，而探针从不进行翻译）。自 2.2.0 起，为此目标配置凭据会被视为配置错误，而不再被忽略；参见[配置 → 凭据](/zh-cn/configuration/#凭据)。

## 记录的字段

仅 `version`——例如 `1.9.6`，来自 `info.version`（已在 `libretranslate/libretranslate:latest` 上实测确认，发布版本 v1.9.6）。本探针不记录任何 `extra` 字段。

## CVE 关联

不进行匹配——两个数据库都没有可用的数据。参见 [CVE 关联](/zh-cn/cve/#哪些产品会被匹配)。

## 生命周期解析器

`github:LibreTranslate/LibreTranslate`——endoflife.date 没有 LibreTranslate 的日历（已确认 404），因此改为根据 GitHub Releases 解析：只取最新发布的非预发布标签，不含 eol/support/lts 日期（GitHub 对生命周期策略没有立场，只知道“最新的发布版本是什么”）。
