---
title: WordPress
description: 配置 enodia 探测 WordPress。
---

按顺序尝试两个匿名界面，使用最先响应的那个：

1. RSS 订阅源自身的 `<generator>` 行（`/?feed=rss2`——查询字符串形式，无论是否配置了美化永久链接都可用）。
2. 首页的 `<meta name="generator" content="WordPress X.Y.Z" />`
   标签（`/`）。

```yaml
targets:
  - id: wordpress-main
    product: wordpress
    address: https://blog.example.com
```

## 身份验证

无——该端点不接受任何形式的凭据。

## 为什么先尝试订阅源

订阅源能挺过最常见的那一步加固：WordPress 在订阅源钩子上注册 generator 标签，与首页自身的 `wp_head` 动作是分开的，因此每篇“隐藏您的 WordPress 版本”教程都会给出的那行 `remove_action('wp_head',
'wp_generator')` 代码只会移除首页的标签，而不会移除订阅源中的——这是通过阅读 WordPress 自己的钩子注册代码确认的，并非假设。如果站点更进一步完全禁用了订阅源，或者把两处信号都去掉了，则会落入清晰的“不支持”错误。

## 记录的字段

仅 `version`——本探针不记录任何 `extra` 字段。

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`endoflife:wordpress`。
