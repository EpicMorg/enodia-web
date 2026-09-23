---
title: Mattermost
description: 配置 enodia 探测 Mattermost。
---

读取 `GET /api/v4/config/client?format=old` 获取版本——这正是登录页面在任何会话存在之前就需要的那个公开客户端配置端点。

```yaml
targets:
  - id: mattermost-main
    product: mattermost
    address: https://mattermost.example.com
```

## 身份验证

无——该端点不接受任何形式的凭据。

真实的响应是一份完整的客户端配置转储——一百多个键，包括功能开关、SSO 按钮颜色，以及真正能识别部署的字段（`SiteName`、`SupportEmail`、一个遥测/诊断 ID、一个签名公钥）。这些都不描述软件本身，因此只读取 `Version` 和 `Build*` 字段。

## 记录的字段

- `version`
- `extra.buildNumber`、`extra.buildHash`

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`endoflife:mattermost`。
