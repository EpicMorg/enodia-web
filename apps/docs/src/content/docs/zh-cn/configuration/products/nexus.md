---
title: Sonatype Nexus Repository
description: 配置 enodia 探测 Sonatype Nexus Repository。
---

读取 Nexus 在每个响应中设置的 `Server` 响应头——与[nginx](/zh-cn/configuration/products/nginx/)/
[Apache](/zh-cn/configuration/products/apache/) 的方式相同——但访问的是专门用于匿名访问的状态端点，而不是 `/`，因为前者是快速、响应体为空的健康检查，而不是完整的门户页面。

```yaml
targets:
  - id: nexus-main
    product: nexus
    address: https://nexus.example.com
```

## 身份验证

无——已针对真实的 `sonatype/nexus3` 容器实测确认：状态端点、门户页面，以及另一个真正受保护端点返回的 `401` 质询中，都带有 `"Nexus/3.96.0-09 (COMMUNITY)"`。与 nginx/Apache 不同，没有文档记载（也没有找到）能将其精简为裸 `"Nexus"` 的配置开关——但如果未来某个版本或某种反向代理配置真的这样做，本探针会降级为清晰的错误，而不会崩溃。

## 记录的字段

仅 `version`——本探针不记录任何 `extra` 字段（版本类型，例如 `COMMUNITY`/`PRO`，会被丢弃，因为 `product: nexus` 已经隐含了它，无需按目标单独记录）。

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`endoflife:nexus`。
