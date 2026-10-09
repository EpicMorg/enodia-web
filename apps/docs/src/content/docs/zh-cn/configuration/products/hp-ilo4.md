---
title: HP iLO 4
description: 配置 enodia 探测 HP iLO 4。
---

读取 `GET /redfish/v1/Managers/1/`——带末尾斜杠，已实测确认这一点很重要——获取控制器的固件版本。

```yaml
targets:
  - id: vm43-ilo
    product: hp-ilo4
    address: https://ilo-vm43.example.com
    credentials: ilo-ro
```

## 身份验证 — 必需

HTTP Basic 身份验证；没有它时，端点会返回 `401`（已实测确认）。

```yaml
credentials:
  ilo-ro:
    kind: basic
    username: enodia
    password: "${ILO_PASSWORD}"
```

一个只读的 iLO 账户就足够了。iLO 通常使用自签名证书——请固定该证书，而不是关闭验证，参见[配置 → TLS](/zh-cn/configuration/#tlstls)。

## 仅限 iLO 4

iLO 4 的 API 自称“HP RESTful Root Service”——这是一个早于 Redfish 的 HP API，而不是 Redfish 实现——但这一个资源与 Redfish 足够接近，可以用同样的方式读取。身份通过其 `Oem.Hp` 键进行校验。iLO 5 完全符合 Redfish，很可能需要不同的校验方式；由于没有可用的 iLO 5 来实测确认，它目前还没有探针，而不是提供一个靠猜测写成的探针。

## 记录的字段

- `version` — 从 `FirmwareVersion` 中解析：`iLO 4 v2.82` → `2.82`
- `extra.raw` — 完整的 `FirmwareVersion` 字符串

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。自 2.2 起；探针的固件版本（`2.82`）按原样与 NVD 的 `integrated_lights-out_4` 范围以及 BDU 的“HP iLO 4”进行比较。

## 生命周期解析器

无——BMC 固件没有公开的生命周期日历（尝试过的所有 slug 下均已确认 404）。仅用于清单。
