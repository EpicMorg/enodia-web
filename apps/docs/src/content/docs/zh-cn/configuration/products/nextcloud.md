---
title: Nextcloud
description: 配置 enodia 探测 Nextcloud。
---

读取 `GET /status.php` 获取版本——一个供负载均衡器使用的健康检查端点，即使在安装配置尚未运行、以及维护模式开启时也可访问。

```yaml
targets:
  - id: nextcloud-main
    product: nextcloud
    address: https://nextcloud.example.com
```

## 身份验证

无——该端点不接受任何形式的凭据。

## 使用哪个版本字段

报告的是 `versionstring`（例如 `34.0.3`），而不是 `version`（例如
`34.0.3.2`）——已实测确认：`versionstring` 正是[endoflife.date](https://endoflife.date/nextcloud) 的周期用作
`latest` 的值，而 `version` 内部的第四个构建段根本不会出现在生命周期日历中。

## 记录的字段

- `version` — 来自 `versionstring`
- `extra.installed`、`extra.maintenance` — `"true"`/`"false"`
- `extra.buildVersion` — 原始的 `version` 字段，保留作为参考
- `extra.enterprise` — 来自 `status.php` 的 `edition`：为空（社区版服务器，已实测确认）→ `"false"`，`enterprise` → `"true"`；其他任何值都不报告，而不是去猜测

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。区分版本类型：探针会在 `extra.enterprise` 中记录服务器自身的版本类型，社区版实例不会看到仅适用于企业版的发现项。版本类型未知时保留所有发现项。

## 生命周期解析器

`endoflife:nextcloud`。
