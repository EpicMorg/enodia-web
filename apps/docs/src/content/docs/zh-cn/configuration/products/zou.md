---
title: Zou
description: 配置 enodia 探测 Zou（CG-Wire API 后端）。
---

读取 `GET /api/status` 获取版本——这是 CG-Wire 制作跟踪技术栈背后真正的 API 后端，该技术栈通常以其 Vue.js 前端的品牌名[Kitsu](/zh-cn/configuration/products/kitsu/) 为人所知，而 Kitsu 自己没有版本端点。

```yaml
targets:
  - id: zou-main
    product: zou
    address: https://kitsu.example.com
```

## 身份验证

无——该端点不接受任何形式的凭据。

## 厂商身份校验

响应中的 `name` 字段会与 `"Zou"` 进行比较——与 Atlassian 和 Jellyfin 探针的理由相同：在配置中显式指定产品，就是为了发现指向了错误服务的 URL。

## `zou` 与 `kitsu` — 同一个探针，不同的解析器，不是别名

`product: kitsu` 访问的是完全相同的端点和探针实现——
为什么两者注册为独立的产品而不是一个产品加一个别名，请参阅[它自己的页面](/zh-cn/configuration/products/kitsu/)：`zou` 自己的 GitHub 仓库没有发布可用的 Releases（只有裸的 git 标签，已实测确认），因此 `product: zou` 保持没有解析器，而不是冒险拿错误组件的版本号去比较。

## 记录的字段

- `version`
- `extra.databaseUp`、`extra.keyValueStoreUp`、`extra.eventStreamUp`、
  `extra.jobQueueUp`、`extra.indexerUp` — 组件健康标志，
  `"true"`/`"false"`

## CVE 关联

不进行匹配——两个数据库都没有可用的数据。参见 [CVE 关联](/zh-cn/cve/#哪些产品会被匹配)。

## 生命周期解析器

无——`cgwire/zou` 的 GitHub 仓库没有可用于解析的 Releases
（已实测确认：其 Releases API 返回空列表——只有裸的 git 标签）。如果您认为自己的部署“运行的是 Kitsu”而不是“运行的是 Zou”，那么 `product: kitsu` 可以为您提供一个针对 `cgwire/kitsu` 的真正解析器，并且指向的是完全相同的后端。
