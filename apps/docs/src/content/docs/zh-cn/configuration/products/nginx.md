---
title: nginx
description: 配置 enodia 探测 nginx。
---

读取 nginx 在每个响应中设置的 `Server` 响应头。没有版本端点：nginx（与 NGINX Plus 的 REST API 不同）不会匿名暴露其他任何信息——`ngx_http_stub_status_module` 的 `/stub_status` 只提供连接计数，从不提供版本。

```yaml
targets:
  - id: nginx-main
    product: nginx
    address: https://www.example.com
```

## 身份验证

无——接受任何状态码，因为 nginx 在错误页面和重定向上加盖自己的 `Server`
响应头的方式与 `200` 响应完全相同。即使目标的 `/` 恰好返回 404，或位于启用 basic 身份验证的虚拟主机之后，也照样能报告版本。已针对真实的 `nginx:1.27.4`
容器对这两种情况实测确认。

## `server_tokens off` 会去掉版本

nginx 自己的加固设置（在生产环境中很常见）会把该响应头写成裸的 `"nginx"`，完全不含版本——这是一个已确认的产品，只是没有剩下任何可与生命周期日历比较的信息，并不是解析器的缺陷。

## 记录的字段

仅 `version`——本探针不记录任何 `extra` 字段。

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`endoflife:nginx`。
