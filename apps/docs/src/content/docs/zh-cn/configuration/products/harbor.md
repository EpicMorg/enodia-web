---
title: Harbor
description: 配置 enodia 探测 Harbor（容器镜像仓库）。
---

读取 `GET /api/v2.0/systeminfo`。

```yaml
targets:
  - id: harbor-main
    product: harbor
    address: https://harbor.example.com
```

## 身份验证

可选。已针对真实的 `goharbor/harbor` v2.12.2 堆栈实测确认：在当前所有已发布的版本上，完全不带凭据也能返回 `harbor_version`——错误或伪造的凭据会被静默当作匿名处理，而不是返回 `401`，该端点从不直接拒绝请求。

:::note[留意上游的这一变化]
Harbor 自己的源码（以本探针验证时的版本为准）在其主分支上已经把 `harbor_version` 放在了已认证会话检查之后，撰写本文时尚未发布——未来的某个版本将需要凭据才能获取该字段。这里已经提供了 `basic`，以备那一天到来：

```yaml
credentials:
  harbor-admin:
    kind: basic
    username: admin
    password: "${HARBOR_PASSWORD}"
```
:::

## 记录的字段

仅 `version`——本探针不记录任何 `extra` 字段。

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`endoflife:harbor`。
