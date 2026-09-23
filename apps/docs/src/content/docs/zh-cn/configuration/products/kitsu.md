---
title: Kitsu
description: 配置 enodia 探测 Kitsu（CG-Wire 的制作跟踪前端）。
---

“Kitsu”是 CG-Wire 制作跟踪技术栈广为人知的品牌名，但 Kitsu 本身是一个 Vue.js 前端，**自己没有版本端点**。实际响应 `GET /api/status` 的——已实测确认，包括在一台 DNS 中名字就叫“kitsu”的主机上——是[Zou](/zh-cn/configuration/products/zou/)，即 Kitsu 所对接的 API 后端。请把 `address` 指向同一个后端，与配置 `product:
zou` 时完全一样——没有单独的“Kitsu” URL 需要配置。

```yaml
targets:
  - id: kitsu-main
    product: kitsu
    address: https://kitsu.example.com
```

## 身份验证

无——该端点不接受任何形式的凭据。

## 为什么 `kitsu` 是独立于 `zou` 的产品，而不是别名

两者指向完全相同的 Zou 后端和端点，但需要**不同的生命周期解析器**：`cgwire/zou` 自己的 GitHub 仓库只发布裸的 git 标签（已实测确认——其 Releases API 返回空列表），enodia 的 GitHub Releases 解析器根本无法读取。`cgwire/kitsu` 则有真正的 GitHub Releases，而且这也正是一个自认为“运行的是 Kitsu”的部署真正希望跟踪的对象。两个仓库的版本号确实不同步（Zou 后端领先于 Kitsu），因此如果在“技术上更精确”的 `zou` 名称下进行比较，就会悄悄地拿错误组件的版本号去比较——所以是两个注册产品共享同一个探针实现，而不是一个产品加一个别名。

## 记录的字段

- `version`
- `extra.databaseUp`、`extra.keyValueStoreUp`、`extra.eventStreamUp`、
  `extra.jobQueueUp`、`extra.indexerUp` — 组件健康标志，
  `"true"`/`"false"`

## CVE 关联

不进行匹配——两个数据库都没有可用的数据。参见 [CVE 关联](/zh-cn/cve/#哪些产品会被匹配)。

## 生命周期解析器

`github:cgwire/kitsu`——只取最新的 GitHub 发布版本；没有 eol/support/lts
数据（GitHub 对生命周期策略没有立场，只知道“最新的标签是什么”）。
