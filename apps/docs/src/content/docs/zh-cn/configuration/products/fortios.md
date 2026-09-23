---
title: Fortinet FortiOS (FortiGate)
description: 配置 enodia 探测运行 FortiOS 的 Fortinet FortiGate。
---

读取 `GET /api/v2/monitor/system/status`——FortiOS 自己的 REST API。已针对一台运行 FortiOS 7.4.12 的真实 FortiGate 601E 验证。

```yaml
targets:
  - id: fw-edge
    product: fortios
    address: https://fw.example.com
    credentials: fortigate-api
```

## 身份验证 — 必需

需要一个 **REST API Admin** 令牌：在 FortiGate GUI 中创建一个 REST API Admin
（System → Administrators），并复制它生成的 API 密钥——FortiOS
只会显示一次。它以普通 bearer 令牌的形式发送；没有会话登录，没有 CSRF 令牌，也没有 `access_token` 查询参数：

```yaml
credentials:
  fortigate-api:
    kind: bearer
    value: "${FORTIGATE_API_TOKEN}"
```

令牌缺失或错误时会返回 `401`（附带 HTML 错误页面，而不是
JSON）——与其他任何探针一样报告为身份验证错误。在 FortiOS 中可以将 REST API
Admin 限制为仅允许受信任的主机访问；如果您这样做了，请将 enodia 发起连接的地址包含在内。

## 记录的字段

- `version` — 按 FortiOS 报告的原样，例如 `v7.4.12`（开头的 `v`
  在比较时去掉，而不是在记录时去掉）
- `extra.model` — 例如 `FG6H1E`（即 601E）
- `extra.build` — FortiOS 构建号

设备的主机名也在同一响应中，但刻意不予记录。

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`endoflife:fortios`。endoflife.date 的 FortiOS 页面包含发布周期和日期，但没有任何周期的“最新版本”，因此生命周期维度可以正常工作，而 `drift` 会显示 `LATEST: -` 和 `PATCH: unknown`——这是源数据的缺口，不是探针的缺陷。
