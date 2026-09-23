---
title: TrueNAS
description: 配置 enodia 探测 TrueNAS。
---

读取 `GET /api/v2.0/system/info`。

```yaml
targets:
  - id: truenas-main
    product: truenas
    address: https://truenas.example.com
    credentials: truenas-key
```

## 身份验证 — 必需

已针对一台真实的 TrueNAS 25.10.7 主机实测确认：没有凭据时该端点返回 `401`。API 密钥可以作为普通的 bearer
令牌使用：

```yaml
credentials:
  truenas-key:
    kind: bearer
    value: "${TRUENAS_API_KEY}"
```

## 虽然是设备型操作系统，但不是 SSH 探针

本探针的早期版本改为通过 SSH 读取 `/etc/version`
（TrueNAS 自己的 `/etc/os-release` 报告的是其底层的 Debian 基础系统，而不是 TrueNAS 本身——与[Astra Linux](/zh-cn/configuration/products/astra-linux/) 存在的身份文件缺口相同）。一旦有了可供验证的真实 API 目标，HTTP 版本就直接取代了 SSH 版本——enodia 没有按产品的双传输回退机制，因此胜出的是更简单、更合适的方式，而不是让两者并存。

## 记录的字段

仅 `version`——本探针不记录任何 `extra` 字段。

## CVE 关联

不进行匹配——条目太少，且其版本编号方式与探针报告的不同。参见 [CVE 关联](/zh-cn/cve/#哪些产品会被匹配)。

## 生命周期解析器

`endoflife:truenas`。
