---
title: Apache HTTP Server
description: 配置 enodia 探测 Apache HTTP Server。
---

读取 Apache httpd 在每个响应中设置的 `Server` 响应头——
问题性质与 [nginx](/zh-cn/configuration/products/nginx/) 相同：没有版本端点，而任何状态码的响应都带有该响应头。也接受 `product: httpd` 作为别名。

```yaml
targets:
  - id: apache-main
    product: apache
    address: https://www.example.com
```

## 身份验证

无——无论身份验证与否，每个响应都会发送 `Server` 响应头。

## `ServerTokens Prod` 会去掉版本

已针对真实的 `httpd:2.4` 容器实测确认：默认构建返回 `"Apache/2.4.68 (Unix)"`；`ServerTokens Prod`（Apache 自己的加固指令，在生产环境中很常见）会将其精简为裸的
`"Apache"`，完全不含版本——这是一个已确认的产品，只是没有剩下任何可与生命周期日历比较的信息，并不是解析器的缺陷。

## 记录的字段

仅 `version`——本探针不记录任何 `extra` 字段。

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`endoflife:apache-http-server`——在 endoflife.date 上，`apache` 和 `httpd` 都会 301 重定向到这个 slug；enodia 直接解析目标 slug，而不是在每次查询时都多走这一跳。
