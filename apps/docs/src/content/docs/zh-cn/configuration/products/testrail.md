---
title: TestRail
description: 配置 enodia 探测 TestRail。
---

读取 `GET /version.txt`——TestRail 在其 Web 根目录中附带的一个普通静态文件，而不是 REST API 响应。TestRail 自己有文档说明的 REST API
（`get_current_user` 等）需要凭据，而且根本不包含产品版本，因此本探针改为读取这个静态文件。

```yaml
targets:
  - id: testrail-main
    product: testrail
    address: https://testrail.example.com
```

## 身份验证

无——该端点不接受任何形式的凭据。

## 记录的字段

仅 `version`——即去除首尾空白后的文件内容，与服务端返回的完全一致。

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 进行匹配。

## 生命周期解析器

无——endoflife.date 没有 TestRail 的日历（已确认 404）。目前仅用于清单。
