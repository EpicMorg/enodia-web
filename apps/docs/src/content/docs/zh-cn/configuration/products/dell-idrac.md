---
title: Dell iDRAC
description: 配置 enodia 通过 Redfish 探测 Dell iDRAC。
---

通过 Redfish 发出两个请求：先用 `GET /redfish/v1` 确认厂商身份，再用 `GET /redfish/v1/Managers/iDRAC.Embedded.1` 读取固件版本。

```yaml
targets:
  - id: blade-1a-idrac
    product: dell-idrac
    address: https://idrac-blade-1a.example.com
    credentials: idrac-ro
```

## 身份验证 — 必需

HTTP Basic 身份验证；没有它时，端点会返回 `401`（已实测确认）。

```yaml
credentials:
  idrac-ro:
    kind: basic
    username: enodia
    password: "${IDRAC_PASSWORD}"
```

一个只读的 iDRAC 账户就足够了。iDRAC 通常使用自签名证书——请固定该证书，而不是关闭验证，参见[配置 → TLS](/zh-cn/configuration/#tlstls)。

## 厂商身份校验

为什么要两个请求：已在一台真实的 12G iDRAC 上实测确认，Manager 资源本身完全不带任何厂商标记，而服务根 `/redfish/v1` 则带有 `Oem.Dell`（包含服务标签）以及“Integrated Dell Remote Access Controller”产品字符串。第一个请求确认这是一台 Dell 设备；第二个请求读取版本。`iDRAC.Embedded.1` 是 Dell 嵌入式控制器的标准 id，也就是被检查的那一个。

Dell **CMC**（刀片机箱的机箱级控制器）是另一个产品，根本没有 Redfish 端点，不在本探针覆盖范围内。

## 记录的字段

- `version` — `FirmwareVersion`，例如 `2.65.65.65`
- `extra.model`（如果存在）
- `extra.serviceTag`（如果存在）

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。自 2.2 起。两个数据库都把每一代 iDRAC 作为单独的产品，而且固件版本号相互重叠，因此代数从 `extra.model`（Redfish 的型号，例如 `12G Modular` → iDRAC7；11G 为 iDRAC6，13G 为 iDRAC8，14G–16G 为 iDRAC9，17G 为 iDRAC10）读取。没有型号时，只查询 3.x 及更高版本的固件（这只可能是 iDRAC9）——参见 [Dell iDRAC 和 Synology DSM](/zh-cn/cve/#dell-idrac-和-synology-dsm)。

## 生命周期解析器

无——BMC 固件没有公开的生命周期日历（尝试过的所有 slug 下均已确认 404）。仅用于清单。
