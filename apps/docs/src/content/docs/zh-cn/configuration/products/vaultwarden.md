---
title: Vaultwarden
description: 配置 enodia 探测 Vaultwarden。
---

读取 `GET /api/version`，它返回一个裸的 JSON 字符串（而不是对象）——端点和响应格式与[Bitwarden](/zh-cn/configuration/products/bitwarden/) 本身完全相同。无需凭据：客户端应用会在登录之前使用该端点检查服务器兼容性。

```yaml
targets:
  - id: vaultwarden-main
    product: vaultwarden
    address: https://vault.example.com
```

## 身份验证

无——该端点不接受任何形式的凭据。

## 与 Bitwarden 不是同一个产品

Vaultwarden 是用 Rust 从零重新实现的 Bitwarden 服务器 API，并不是分支——它有自己独立的版本编号，并不跟随 Bitwarden 的发布。正因如此，它被注册为一个独立的
`product:`：拿 Vaultwarden 实例的版本去和标记为 `bitwarden` 的生命周期日历比较，就等于在比较两套毫不相关的编号体系。

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`github:dani-garcia/vaultwarden`——endoflife.date 没有 `vaultwarden` 的日历（已确认 404），因此改为根据 GitHub Releases 解析：只取最新发布的非预发布标签，不含 eol/support/lts 日期（GitHub 对生命周期策略没有立场，只知道“最新的发布版本是什么”）。
