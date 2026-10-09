---
title: qBittorrent
description: 配置 enodia 探测 qBittorrent。
---

从 qBittorrent 的 Web UI API 读取版本：通过 `POST /api/v2/auth/login` 登录，然后带着会话 cookie 读取 `GET /api/v2/app/version` 和 `GET /api/v2/app/buildInfo`，最后注销。

```yaml
targets:
  - id: qbittorrent-main
    product: qbittorrent
    address: https://qbittorrent.example.com
    credentials: qbittorrent-monitor
```

## 身份验证

可选，但通常需要：没有会话时，Web UI 对一切请求（包括 `/`）都返回 `401`（已针对 `linuxserver/qbittorrent` 5.2.4 实测确认）。它是表单登录（字段为 `username` 和 `password`），不是 HTTP Basic，因此类型为 `password`：

```yaml
credentials:
  qbittorrent-monitor:
    kind: password
    username: monitor
    password: "${QBITTORRENT_PASSWORD}"
```

仅接受 `password`；其他任何类型都是配置错误。参见[配置 → 凭据](/zh-cn/configuration/#凭据)。

未配置凭据时，探针会直接请求 `/api/v2/app/version`——适用于已配置为对探测方所在子网绕过身份验证的 Web UI。如果它返回 `401`，错误信息会提示配置凭据。

登录设置的任何会话 cookie 都会按原样回传：5.x 返回 `204` 并设置 `QBT_SID_<port>`，4.x 返回 `200 Ok.` 并设置 `SID`。密码错误时，5.x 返回 `401`，4.x 返回 `200 Fails.`；两者都报告为身份验证失败。

## 位于反向代理之后

qBittorrent 会检查 `Host` 请求头中的端口是否与它自己的端口一致，以及 `Referer`/`Origin` 是否与 `Host` 一致。登录时会把目标自身的源作为 `Referer` 发送。位于做了端口映射的反向代理之后时，必须为此配置 qBittorrent——否则每个请求都是 `401`；通过重新映射的容器端口进行的一次实际抓包正是如此，直到端口一致为止。

## 记录的字段

- `version` — 去掉开头 `v` 的 `/api/v2/app/version`，例如 `5.2.4`
- `extra.libtorrent` — 来自 `/api/v2/app/buildInfo`，例如 `2.0.15.0`
- `extra.qt` — 来自 `/api/v2/app/buildInfo`，例如 `6.11.2`

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`github:qbittorrent/qBittorrent`——endoflife.date 没有 qBittorrent 的日历（已确认 404），因此改为根据 GitHub Releases 解析：只取最新发布的非预发布标签，不含 eol/support/lts 日期（GitHub 对生命周期策略没有立场，只知道“最新的发布版本是什么”）。发布标签形如 `release-5.2.4`；解析器会去掉 `release-` 前缀，把其余部分读作版本。
