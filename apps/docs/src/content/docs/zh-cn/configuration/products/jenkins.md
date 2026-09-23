---
title: Jenkins
description: 配置 enodia 探测 Jenkins。
---

从 **`X-Jenkins` 响应头**而不是响应体中读取版本——Jenkins 会在每个响应上设置该响应头，包括对未认证请求返回的
`403`，而认证请求得到的响应体中根本没有版本字段。

```yaml
targets:
  - id: jenkins-main
    product: jenkins
    address: https://jenkins.example.com
```

## 身份验证

可选。使用默认安全域的全新实例会对匿名请求的
`/api/json` 返回 `403`——这在这里并不算失败，同一个响应上仍然设置了 `X-Jenkins`。如果您希望进行身份验证，可以使用 Basic 身份验证：

```yaml
credentials:
  jenkins-admin:
    kind: basic
    username: admin
    password: "${JENKINS_TOKEN}"
```

## 记录的字段

- `version` — 来自 `X-Jenkins` 响应头
- `extra.mode`、`extra.useSecurity` — 仅当请求的认证程度足以获得 `200` 响应体时才会填充；匿名的
  `403` 响应中不存在

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`endoflife:jenkins`。
