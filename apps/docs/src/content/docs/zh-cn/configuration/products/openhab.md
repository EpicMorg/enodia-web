---
title: openHAB
description: 配置 enodia 探测 openHAB。
---

读取 REST API 的根路径 `GET /rest/`，openHAB 无需登录即可提供它。

```yaml
targets:
  - id: openhab-main
    product: openhab
    address: https://openhab.example.com
```

## 哪个版本是哪个

`/rest/` 的应答中有两个版本：顶层的 `version`（`"8"`）是 REST API 自己的版本，而 `runtimeInfo.version`（`"5.2.2"`）是 openHAB 的版本——已在 `openhab/openhab:latest` 上实测确认，其 `version.properties` 显示 openhab-distro 5.2.2。探针报告 `runtimeInfo.version`；REST API 版本写入 `extra`。

## 身份验证

可选。`/rest/` 默认以匿名方式应答；`/rest/systeminfo` 需要登录，不会使用。对于关闭了匿名访问的实例，如果配置了 `bearer` 或 `basic` 凭据，会将其传递出去：

```yaml
credentials:
  openhab-token:
    kind: bearer
    value: "${OPENHAB_TOKEN}"
```

其他任何类型都是配置错误。参见[配置 → 凭据](/zh-cn/configuration/#凭据)。

## 记录的字段

- `version` — `runtimeInfo.version`，例如 `5.2.2`
- `extra.build` — `runtimeInfo.buildString`，例如 `Release Build`
- `extra.restApiVersion` — 顶层的 `version`，例如 `8`

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 进行匹配。

## 生命周期解析器

`github:openhab/openhab-distro`——endoflife.date 没有 openHAB 的日历（已确认 404），因此改为根据 GitHub Releases 解析：只取最新发布的非预发布标签，不含 eol/support/lts 日期（GitHub 对生命周期策略没有立场，只知道“最新的发布版本是什么”）。openhab-distro 把里程碑版本（`5.3.0.M2`）作为普通发布版本发布，并不标记为预发布；解析器按标签名称跳过它们，因此里程碑版本不会让每个稳定版 openHAB 都显示为落后。
