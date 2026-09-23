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

## 生命周期解析器

`endoflife:proxmox-ve`。
