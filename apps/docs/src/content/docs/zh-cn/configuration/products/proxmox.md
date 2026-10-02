---
title: Proxmox VE
description: 配置 enodia 探测 Proxmox VE。
---

读取 `GET /api2/json/version`。

```yaml
targets:
  - id: proxmox-main
    product: proxmox
    address: https://proxmox.example.com:8006
    credentials: proxmox-token
```

## 身份验证 — 必需

已针对一台真实的 Proxmox VE 9.2.2 主机实测确认：没有凭据时该端点返回 `401`。Proxmox 自己的 API 令牌形式是一个普通的 `Authorization` 头值——`PVEAPIToken=user@realm!tokenid=secret`，整个字符串作为一个令牌——因此 `token-header` 可以直接适用，其默认的头（`Authorization`）也已经正确：

```yaml
credentials:
  proxmox-token:
    kind: token-header
    value: "PVEAPIToken=enodia@pve!readonly=${PROXMOX_TOKEN_SECRET}"
```

刻意不支持另一种用户名/密码 ticket 流程（通过 `POST /access/ticket`
获取会话 cookie 和 CSRF 令牌）——这是一种更重的会话登录方式，而且 Proxmox 自己的文档也推荐在无人值守的自动化场景中使用 API 令牌。

## 记录的字段

- `version`
- `extra.repoid`（如果存在）

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

此目标覆盖的是 Proxmox VE 本身。要获得主机上已安装软件包的 CVE，请为同一台主机再添加一个通过 SSH 的 [`product: debian`](/zh-cn/configuration/products/debian/) 目标——它的 os-release 就是 Debian 的。Debian 的 `linux` 软件包只与正在运行的 Debian 内核匹配，因此 Proxmox 自己的内核不会被误认为 Debian 内核；Proxmox 构建的软件包不会有任何发现（它们没有公开的数据源）。参见 [CVE 关联](/zh-cn/cve/#linux-发行版的软件包级-cve)。

## 生命周期解析器

`endoflife:proxmox-ve`。
