---
title: GitLab
description: 配置 enodia 探测 GitLab。
---

读取 `GET /api/v4/version` 获取版本。

```yaml
targets:
  - id: gitlab-main
    product: gitlab
    address: https://gitlab.example.com
    credentials: gitlab-token
```

## 身份验证

GitLab 默认要求该端点提供凭据——未认证的请求会收到 `401`。个人访问令牌两种方式都可以使用，已针对真实实例实测确认：

```yaml
credentials:
  gitlab-token:
    kind: token-header
    header: PRIVATE-TOKEN
    value: "${GITLAB_TOKEN}"

  # 同样有效——将同一个令牌作为裸 bearer 令牌使用
  gitlab-token-bearer:
    kind: bearer
    value: "${GITLAB_TOKEN}"
```

## 记录的字段

- `version`
- `extra.revision`（如果存在）
- `extra.enterprise` — `"true"`/`"false"`，区分 GitLab EE 与 CE

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。区分版本类型：探针会在 `extra.enterprise` 中记录服务器自身的版本类型，社区版实例不会看到仅适用于企业版的发现项。版本类型未知时保留所有发现项。

## 生命周期解析器

`endoflife:gitlab`。
