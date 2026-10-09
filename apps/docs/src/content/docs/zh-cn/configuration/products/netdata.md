---
title: Netdata
description: 配置 enodia 探测 Netdata。
---

读取代理的 `GET /api/v1/info`，默认无需登录即可访问。协议默认为 `https`。

```yaml
targets:
  - id: netdata-01
    product: netdata
    address: https://netdata-01.example.com
```

## 读取哪些内容

回复以 `"version": "v2.12.1"` 开头，旁边还有 `release-channel`。其余内容描述的是主机——uid、内核、标签、硬件、云——都不描述软件本身，因此只读取版本和发布渠道。不含 `version` 的回复会被报告为不支持（不是 Netdata）。

## 身份验证

可选——代理默认以匿名方式应答。配置了 `basic` 或 `bearer` 时会将其传递出去，用于位于要求这些凭据的代理之后的 Netdata；自 2.2.0 起，其他任何类型都是配置错误。参见[配置 → 凭据](/zh-cn/configuration/#凭据)。

```yaml
credentials:
  netdata-proxy:
    kind: basic
    username: enodia
    password: "${NETDATA_PROXY_PASSWORD}"
```

## 记录的字段

- `version` — 按代理报告的原样，例如 `v2.12.1`（已在 `netdata/netdata:stable` 上实测确认）
- `extra.releaseChannel` — 例如 `stable` 或 `nightly`（如果存在）

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`github:netdata/netdata`——endoflife.date 没有 Netdata 的日历（已确认 404），因此改为根据 GitHub Releases 解析：只取最新发布的非预发布标签，不含 eol/support/lts 日期（GitHub 对生命周期策略没有立场，只知道“最新的发布版本是什么”）。
