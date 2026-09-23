---
title: Perforce Helix Swarm
description: 配置 enodia 探测 Perforce Helix Swarm。
---

读取 `GET /api/version` 获取版本——刻意使用不带版本号的路径，而不是特定的 `/api/v11/version`。多年来 Perforce 不断调整该 API 的最低版本（Swarm 2017.3 只支持 v7；2018.2
支持 v9），而在一个原本完全匿名的端点上请求超出范围的 `vN` 会得到 `401`。不带版本号的形式避免了去猜测某个安装仍接受哪个 `vN`。

```yaml
targets:
  - id: swarm-main
    product: perforce-swarm
    address: https://swarm.example.com
```

## 身份验证

无——该端点不接受任何形式的凭据。

## 版本解析

原始字段形如 `SWARM/2024.6/2710109 (2025/01/28)`——会被解析为普通版本（`2024.6`）、一个 changelist 和一个发布日期。无法识别的格式会回退为将原始字符串保留为 `version`，而不是直接失败，因为这仍然是服务器报告的事实。

## 记录的字段

- `version` — 例如 `2024.6`
- `extra.raw` — 未经解析的完整字符串
- `extra.changelist`、`extra.releaseDate` — 仅当格式解析成功时记录

## CVE 关联

不进行匹配——两个数据库都没有可用的数据。参见 [CVE 关联](/zh-cn/cve/#哪些产品会被匹配)。

## 生命周期解析器

无——endoflife.date 在 `perforce-swarm`、
`helix-swarm`、`swarm` 或 `perforce` 下都没有日历（均已确认 404）。目前仅用于清单。
