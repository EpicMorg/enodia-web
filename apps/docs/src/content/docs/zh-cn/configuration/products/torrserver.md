---
title: TorrServer
description: 配置 enodia 探测 TorrServer。
---

读取 `GET /echo`，TorrServer 会以纯文本形式返回其版本。协议默认为 `https`。

```yaml
targets:
  - id: torrserver-main
    product: torrserver
    address: https://torrserver.example.com
```

## 版本格式

`/echo` 的应答例如 `MatriX.146`——一个代号加一个数字，与 TorrServer 的 GitHub 发布标签写法相同（`MatriX.146`、`MatriX.145.2`）。版本按原样记录；比较时，两边都使用代号之后的数字。不符合这种格式的回复（例如一个 HTML 页面）会被报告为不支持。

## 身份验证

可选。如果配置了 `basic`，会将其发送出去，用于开启了自身身份验证的实例；未配置时请求是匿名的。`basic` 是唯一接受的类型——自 2.2.0 起，其他任何类型都是配置错误。参见[配置 → 凭据](/zh-cn/configuration/#凭据)。

```yaml
credentials:
  torrserver-auth:
    kind: basic
    username: admin
    password: "${TORRSERVER_PASSWORD}"
```

## 记录的字段

仅 `version`——例如 `MatriX.146`（一个实际运行的 `ghcr.io/yourok/torrserver:latest` 在 `/echo` 上的应答）。本探针不记录任何 `extra` 字段。

## CVE 关联

不进行匹配——两个数据库都没有可用的数据。参见 [CVE 关联](/zh-cn/cve/#哪些产品会被匹配)。

## 生命周期解析器

`github:YouROK/TorrServer`——endoflife.date 没有 TorrServer 的日历（已确认 404），因此改为根据 GitHub Releases 解析：只取最新发布的非预发布标签，不含 eol/support/lts 日期（GitHub 对生命周期策略没有立场，只知道“最新的发布版本是什么”）。
