---
title: Jira
description: 配置 enodia 探测 Atlassian Jira（Data Center）。
---

**仅限 Data Center**——Atlassian Cloud 不提供本探针读取的端点。读取 `GET /rest/applinks/1.0/manifest`，即每个 Atlassian Data Center 产品都提供的同一个 Application
Links manifest——可匿名访问，这也是使用它而不是 `/rest/api/2/serverInfo` 的原因。

```yaml
targets:
  - id: jira-main
    product: jira
    address: https://jira.example.com
```

## 身份验证

可选——无需凭据即可读取该 manifest。如果您仍希望进行身份验证，`none`、`basic`
和 `bearer` 均可使用。

## 厂商身份校验

manifest 中的 `<typeId>` 会与 `product: jira` 所期望的值（`jira`）进行比较。如果某个 URL 实际上是 Confluence 或 Bitbucket，会明确报错失败，而不是被记录为错误的事实——共享同一 manifest 约定的兄弟产品请参阅[Confluence](/zh-cn/configuration/products/confluence/)、[Bitbucket](/zh-cn/configuration/products/bitbucket/)、[Bamboo](/zh-cn/configuration/products/bamboo/)。

## 记录的字段

- `version`
- `extra.buildNumber`、`extra.typeId` — `typeId` 的值将为 `jira`

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`endoflife:jira-software`——注意 slug 是 `jira-software`，而不是 `jira`。
