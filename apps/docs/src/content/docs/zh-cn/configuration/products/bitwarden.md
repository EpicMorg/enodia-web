---
title: Bitwarden
description: 配置 enodia 探测自托管的 Bitwarden 服务器。
---

仅适用于自托管——没有理由把它指向 Bitwarden 自己的云服务。读取 `GET /api/version`，它返回一个裸的 JSON 字符串（而不是对象）。无需凭据：客户端应用会在登录之前使用该端点检查服务器兼容性。

```yaml
targets:
  - id: bitwarden-main
    product: bitwarden
    address: https://vault.example.com
```

## 身份验证

无——该端点不接受任何形式的凭据。

## 与 Vaultwarden 不是同一个产品

[Vaultwarden](/zh-cn/configuration/products/vaultwarden/) 是用 Rust 从零重新实现的 Bitwarden 服务器 API，并不是分支，有自己独立的版本编号。它暴露完全相同的端点和响应格式，但注册为单独的 `product:`——把一个 Vaultwarden 实例配置为 `product: bitwarden`，会拿一个项目的版本去和另一个项目的发布历史做比较。

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 进行匹配。

## 生命周期解析器

`github:bitwarden/server`——endoflife.date 没有 `bitwarden` 的日历（已确认 404），因此改为根据 GitHub Releases 解析：只取最新发布的非预发布标签，不含 eol/support/lts 日期（GitHub 对生命周期策略没有立场，只知道“最新的发布版本是什么”）。
