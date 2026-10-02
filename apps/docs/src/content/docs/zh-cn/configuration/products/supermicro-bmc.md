---
title: Supermicro BMC
description: 配置 enodia 通过 Redfish 探测 Supermicro BMC。
---

读取 `GET /redfish/v1/Managers/1`——BMC 自己的 Redfish manager 资源——获取其固件版本。

```yaml
targets:
  - id: srv125-bmc
    product: supermicro-bmc
    address: https://bmc-srv125.example.com
    credentials: bmc-admin
```

## 身份验证 — 必需

HTTP Basic 身份验证；没有它时，端点会返回 `401`（已实测确认）。

```yaml
credentials:
  bmc-admin:
    kind: basic
    username: ADMIN
    password: "${BMC_PASSWORD}"
```

一个只读的 BMC 账户就足够了。BMC 通常使用自签名证书——请固定该证书，而不是关闭验证，参见[配置 → TLS](/zh-cn/configuration/#tlstls)。

## 厂商身份校验

已针对两代产品实测确认——一块 X12 系列主板（AST2600，固件 `01.05.25`）和一块较旧的 X9/X10 时代主板（固件 `01.73.13`）。两者都没有本探针能在一次请求中读到的制造商字段，但都在这个资源上带有 `Oem.Supermicro` 键，因此校验的就是它。其他厂商的 BMC 响应同一路径时会明确报错失败，而不是被记录为 Supermicro。

## 记录的字段

- `version` — `FirmwareVersion`，例如 `01.05.25`
- `extra.model`（如果存在）

## CVE 关联

尚未进行匹配——各 BMC 探针是 2.1 新增的，上游将它们的 CVE 映射留给之后专门的一轮工作。参见 [CVE 关联](/zh-cn/cve/#哪些产品会被匹配)。

## 生命周期解析器

无——BMC 固件没有公开的生命周期日历（尝试过的所有 slug 下均已确认 404）。仅用于清单。
