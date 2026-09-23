---
title: Artifactory
description: 配置 enodia 探测 JFrog Artifactory。
---

读取 `GET /artifactory/api/system/version` 获取版本。

```yaml
targets:
  - id: artifactory-main
    product: artifactory
    address: https://artifactory.example.com
```

## 身份验证

可选。该端点是否需要凭据因实例而异——已针对两台真实服务器确认：全新的 OSS 安装对匿名请求返回 `401`，但一个启用了“Allow Anonymous Access”的生产实例在完全不带凭据的情况下返回了 `200`。需要时可以使用 Basic 身份验证：

```yaml
credentials:
  artifactory-admin:
    kind: basic
    username: admin
    password: "${ARTIFACTORY_PASSWORD}"
```

## 记录的字段

- `version` — 例如 `7.161.20`
- `extra.revision`（如果响应中带有）

响应中还包含 `license`、`addons` 和 `entitlements`——刻意从不读取。在一个真实的生产实例上，`license` 是每个安装独有的指纹，而不是固定的字面值，而且这三者都不描述软件本身。

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`endoflife:artifactory`。
