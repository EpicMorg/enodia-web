---
title: Portainer
description: 配置 enodia 探测 Portainer。
---

读取 `GET /api/system/status` 获取版本（旧的 `/api/status`
别名响应完全相同，但本探针始终使用当前路径）。

```yaml
targets:
  - id: portainer-main
    product: portainer
    address: https://portainer.example.com
```

## 身份验证

无——该端点有意公开，甚至在强制要求的首次运行管理员账户创建之前就可以访问。

## 记录的字段

- `version`
- `extra.instanceId`

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`github:portainer/portainer`——endoflife.date 没有 Portainer 的日历（已确认 404），因此改为根据 GitHub Releases 解析：只取最新发布的非预发布标签，不含 eol/support/lts 日期（GitHub 对生命周期策略没有立场，只知道“最新的发布版本是什么”）。
