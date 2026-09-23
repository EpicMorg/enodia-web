---
title: Keycloak
description: 配置 enodia 探测 Keycloak。
---

读取 `GET /admin/serverinfo` 获取版本。

```yaml
targets:
  - id: keycloak-main
    product: keycloak
    address: https://keycloak.example.com
    credentials: keycloak-token
```

## 身份验证 — 必需

Keycloak 是这里唯一一个**完全没有匿名途径获取版本**的产品：已实测确认，`/realms/<realm>/.well-known/openid-configuration`
（每个 realm 无需令牌即可访问的端点）中没有任何版本字段，而包含版本的 `/admin/serverinfo` 在没有令牌时返回 `401`。未配置凭据的目标在采集时会被**跳过**，而不是算作失败。

```yaml
credentials:
  keycloak-token:
    kind: bearer
    value: "${KEYCLOAK_ACCESS_TOKEN}"
```

只接受 `bearer`。获取该访问令牌——以标准的 OpenID Connect 方式，通过 realm 自己的令牌端点——不在 enodia 的职责范围内（探针负责传输，不负责身份联合）：配置中需要的是一个已经签发的令牌。访问令牌通常有效期很短，因此在采集时提供 `KEYCLOAK_ACCESS_TOKEN` 的机制需要保持其有效；enodia 本身没有令牌刷新逻辑。

## 记录的字段

- `version` — 来自 `systemInfo.version`
- `extra.javaVersion`

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`endoflife:keycloak`。
