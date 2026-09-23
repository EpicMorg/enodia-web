---
title: Synology DSM
description: 配置 enodia 探测 Synology DSM。
---

先登录 Synology 自己的 Web API（`SYNO.API.Auth`），然后使用得到的会话读取
`SYNO.DSM.Info` 获取版本——这是 enodia 中唯一一个需要真正登录步骤、而不是静态凭据的 HTTP 探针。

```yaml
targets:
  - id: nas-main
    product: synology-dsm
    address: https://nas.example.com:5001
    credentials: synology-admin
```

## 身份验证 — 必需，用户名和密码

```yaml
credentials:
  synology-admin:
    kind: password
    username: enodia-ro
    password: "${SYNOLOGY_PASSWORD}"
```

已实测确认：如果没有会话 id，以及（在启用 CSRF 保护时）`SynoToken`，`SYNO.DSM.Info` 总是返回 `{"error":{"code":119}}`
（“no session”）——而这两者都必须先用真实的账户和密码调用
`SYNO.API.Auth` 的登录方法才能获得。这确实比完整的 HTML 表单登录轻量得多：一个普通的 JSON API，以常规参数接收用户名/密码，并以常规 JSON 字段返回会话 id，无需 cookie jar，也无需抓取 CSRF 令牌。读取版本之后会尽力执行注销，以免一次次采集在 NAS 上累积未关闭的会话。

这里的身份验证失败完全不使用 HTTP 状态码：Synology 的每个
Web API 调用即使失败也返回 `200`，并在响应体中带有 `success: false`——已实测确认，因此本探针通过读取响应体而不是状态码来检测登录被拒绝。

## 记录的字段

仅 `version`——从 `version_string` 的 `"DSM <version> Update
<n>"` 格式中解析，例如 `"DSM 7.3.2-86009 Update 4"` → `7.3.2-86009`。

## CVE 关联

不进行匹配——其范围使用了 `6.2.4-25556-3` 这样的边界，而严格的范围解析器会拒绝它们。参见 [CVE 关联](/zh-cn/cve/#哪些产品会被匹配)。

## 生命周期解析器

无——endoflife.date 在 `synology-dsm`、`synology`
或 `dsm` 下都没有日历（已确认 404）。目前仅用于清单。
