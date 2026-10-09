---
title: Greenbone / OpenVAS
description: 配置 enodia 探测 Greenbone / OpenVAS。
---

从 `GET /gmp` 读取 gsad——位于 OpenVAS 前面的 Greenbone Security Assistant Web 守护进程——的版本。协议默认为 `https`。`product: openvas` 和 `product: gsad` 作为别名同样接受。

```yaml
targets:
  - id: greenbone-main
    product: greenbone
    address: https://greenbone.example.com
```

## 为什么用 `/gmp` 的 401

gsad 会把每个 `/gmp` 回复都包装在一个带有其版本的信封中，包括对无会话请求返回的 401：`<envelope><version>24.12.0</version><vendor_version></vendor_version>…`（“Authentication required … (GSA 24.12.0)”）。探针接受这个 401 并读取信封。Web UI 本身是一个静态 React 包，其中不含版本。

该版本是 gsad 的。其后的扫描器（openvas-scanner）和 gvmd 各自独立编号版本，不登录就看不到。

## 身份验证

无——该端点不接受任何形式的凭据。

## 记录的字段

- `version` — 例如 `24.12.0`，来自 `<envelope><version>`
- `extra.vendorVersion` — `<vendor_version>`，非空时

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 进行匹配——按 gsad（`greenbone_security_assistant`）匹配，而不是 `openvas_manager` 守护进程。

## 生命周期解析器

`github:greenbone/gsad`——endoflife.date 没有 Greenbone 的日历（已确认 404），因此改为根据 GitHub Releases 解析：只取最新发布的非预发布标签，不含 eol/support/lts 日期（GitHub 对生命周期策略没有立场，只知道“最新的发布版本是什么”）。
