---
title: Bamboo
description: 配置 enodia 探测 Atlassian Bamboo（Data Center）。
---

**仅限 Data Center**——Atlassian Cloud 不提供本探针读取的端点。读取 `GET /rest/applinks/1.0/manifest`，即每个 Atlassian Data Center 产品都提供的同一个 Application
Links manifest——可匿名访问，这也是使用它而不是 `/rest/api/2/serverInfo` 的原因。

```yaml
targets:
  - id: bamboo-main
    product: bamboo
    address: https://bamboo.example.com
```

## 身份验证

可选——无需凭据即可读取该 manifest。如果您仍希望进行身份验证，`none`、`basic`
和 `bearer` 均可使用。

## 厂商身份校验

manifest 中的 `<typeId>` 会与 `product: bamboo` 所期望的值（`bamboo`）进行比较。如果某个 URL 实际上是 Jira 或 Confluence，会明确报错失败，而不是被记录为错误的事实——共享同一 manifest 约定的兄弟产品请参阅[Jira](/zh-cn/configuration/products/jira/)、[Confluence](/zh-cn/configuration/products/confluence/)、[Bitbucket](/zh-cn/configuration/products/bitbucket/)。

## 记录的字段

- `version`
- `extra.buildNumber`、`extra.typeId` — `typeId` 的值将为 `bamboo`

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`endoflife:bamboo`——现已接入。[endoflife.date/bamboo](https://endoflife.date/bamboo)
是一个真实存在、正在维护的日历；本页面的早期版本曾错误地声称根本不存在这样的日历，依据仅仅是 `registry.go` 中没有任何说明的 `resolver: ""`，而没有直接去 endoflife.date 核实。此问题已在本页面和上游同时修正。
