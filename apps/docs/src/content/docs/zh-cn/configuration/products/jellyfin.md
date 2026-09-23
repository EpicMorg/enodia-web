---
title: Jellyfin
description: 配置 enodia 探测 Jellyfin。
---

读取 `GET /System/Info/Public` 获取版本——这是 Jellyfin 系统信息端点的“Public”变体，有意设计为在登录之前即可访问。

```yaml
targets:
  - id: jellyfin-main
    product: jellyfin
    address: https://jellyfin.example.com
```

## 身份验证

无——该端点不接受任何形式的凭据。

## 厂商身份校验

响应中的 `ProductName` 会与 `"Jellyfin Server"` 进行比较。同一响应还包含该部署自己的 `ServerName`、一个持久的安装 `Id` 以及它的 `LocalAddress`——这些都不描述软件本身，因此只读取 `Version` 和 `ProductName`。

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 进行匹配。

## 生命周期解析器

`github:jellyfin/jellyfin`——endoflife.date 没有 Jellyfin 的日历（已确认 404），因此改为根据 GitHub Releases 解析：只取最新发布的非预发布标签，不含 eol/support/lts 日期（GitHub 对生命周期策略没有立场，只知道“最新的发布版本是什么”）。
