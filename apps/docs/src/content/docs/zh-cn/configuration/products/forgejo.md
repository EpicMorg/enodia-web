---
title: Forgejo
description: 配置 enodia 探测 Forgejo。
---

读取 `GET /api/v1/version`——一个与 Gitea API 兼容的端点，Forgejo（Gitea 的分支）仍在同一路径下提供它。

```yaml
targets:
  - id: forgejo-main
    product: forgejo
    address: https://forgejo.example.com
```

## 身份验证

可选——默认匿名。设置了
`REQUIRE_SIGNIN_VIEW = true`（一个真实的加固选项）的实例会改为返回 `403`，其处理方式与其他任何探针的身份验证质询相同。`basic` 和 `token-header` 均可使用——各自的确切字段形式请参阅[配置 → 凭据](/zh-cn/configuration/#凭据)。

## 记录的字段

仅 `version`——本探针不记录任何 `extra` 字段。

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`endoflife:forgejo`。
