---
title: NetBox
description: 配置 enodia 探测 NetBox。
---

读取匿名登录页面 `GET /login/`，其根元素带有 `data-netbox-version`——例如在通过 netbox-docker 运行的 NetBox 上为 `4.3.3-Docker-3.3.0`。如果缺少该属性，则改用页面加载其脚本包时所带的版本（`/static/netbox.js?v=4.3.3`）。默认协议为 `https`。

```yaml
targets:
  - id: netbox-main
    product: netbox
    address: https://netbox.example.com
```

## 为什么用登录页面

NetBox 的 REST API（`/api/status/`）需要令牌；登录页面无需令牌就带有版本（已在一台通过 netbox-docker 部署的生产 NetBox 上实测确认）。`-Docker-` 之前的部分是 NetBox 自己的版本；其余部分是 netbox-docker 的镜像版本。

## 身份验证

无——登录页面是公开的，探针不接受任何凭据类型。自 2.2.0 起，附加到 `netbox` 目标上的凭据会被视为配置错误，而不会被悄悄忽略——参见[配置 → 凭据](/zh-cn/configuration/#凭据)。

## 记录的字段

- `version` — NetBox 的版本，例如 `4.3.3`
- `extra.netboxDocker` — netbox-docker 的镜像版本（`3.3.0`），仅当 `data-netbox-version` 带有 `-Docker-` 后缀时

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 进行匹配。BDU 中的“LenelS2 NetBox”是另一个产品，不会使用。

## 生命周期解析器

`github:netbox-community/netbox`——endoflife.date 没有 NetBox 的日历（已确认 404），因此改为根据 GitHub Releases 解析：只取最新发布的非预发布标签，不含 eol/support/lts 日期（GitHub 对生命周期策略没有立场，只知道“最新的发布版本是什么”）。
