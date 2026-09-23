---
title: Traefik
description: 配置 enodia 探测 Traefik。
---

读取 `GET /api/version`。

```yaml
targets:
  - id: traefik-main
    product: traefik
    address: https://traefik.example.com
```

## 身份验证

可选。已针对真实的 `traefik:v3.1` 容器实测确认：只要启用了 API 路由（默认关闭——标准实例上既没有设置 `--api` 也没有设置
`--api.insecure`），并使用 `--api.insecure=true`，该端点就无需凭据。如果部署改为把 API 路由放在它自己的 Basic/Digest 身份验证中间件之后（这是 Traefik 文档中暴露 API 的“安全”方式），则会返回普通的 HTTP Basic
质询：

```yaml
credentials:
  traefik-basic:
    kind: basic
    username: admin
    password: "${TRAEFIK_PASSWORD}"
```

完全未启用 API 的实例在这里会返回 `404`，与地址错误无法区分。

## 记录的字段

仅 `version`——本探针不记录任何 `extra` 字段（`Codename` 和
`startDate` 描述的是发布版本而不是部署，因此不读取）。

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`endoflife:traefik`。
