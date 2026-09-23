---
title: oauth2-proxy
description: 配置 enodia 探测 oauth2-proxy。
---

读取印在 `/oauth2/sign_in` 页脚中的版本。oauth2-proxy
根本没有 JSON 版本端点——登录页面是唯一的匿名界面（它必须在任何会话存在之前渲染），而其默认模板会把版本直接写入页脚文本。

```yaml
targets:
  - id: oauth2-proxy-main
    product: oauth2-proxy
    address: https://auth.example.com
```

## 身份验证

无——已针对真实的 `oauth2-proxy/oauth2-proxy`
容器的默认页面实测确认。

## `--footer` 标志可能隐藏版本

部署自身的 `--footer` 标志可以替换或隐藏（`-`）整行内容——此时不存在任何匿名的回退途径。这是一个已确认的产品，只是版本被部署自身的配置隐去了，并不是探针的缺陷。

## 记录的字段

仅 `version`——本探针不记录任何 `extra` 字段。

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`github:oauth2-proxy/oauth2-proxy`——目前没有 endoflife.date 日历，因此改为根据 GitHub Releases 解析：只取最新发布的非预发布标签，不含 eol/support/lts 日期。
