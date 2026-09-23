---
title: Jaeger
description: 配置 enodia 探测 Jaeger。
---

读取 Jaeger query-service（提供 UI 的组件，默认端口
16686）在构建时通过查找/替换嵌入到其自身 `index.html` 中的版本——没有单独的版本 API。

```yaml
targets:
  - id: jaeger-main
    product: jaeger
    address: https://jaeger.example.com
```

## 身份验证

无——Jaeger 本身完全没有身份验证。部署在反向代理或 SSO 网关（oauth2-proxy 是常见的实际选择）之后的实例，会返回一个跳转到该网关自身登录流程的重定向，而不是 Jaeger 的 HTML，这会表现为本探针自己的“no
JAEGER_VERSION found”错误——这不是本探针能够独立完成的，与表单登录类产品存在的缺口性质相同。

## 记录的字段

仅 `version`——本探针不记录任何 `extra` 字段。

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 进行匹配。

## 生命周期解析器

`endoflife:jaeger`。
