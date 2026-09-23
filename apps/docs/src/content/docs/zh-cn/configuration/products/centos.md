---
title: CentOS Linux（旧版）
description: 配置 enodia 通过 SSH 探测已 EOL 的旧版 CentOS Linux。
---

与[基于 SSH 的操作系统识别](/zh-cn/configuration/products/ssh-os-probes/)
系列使用相同的 SSH 机制、凭据和主机密钥校验，但读取的是另一个文件：`/etc/redhat-release`，而不是
`/etc/os-release`。

```yaml
targets:
  - id: centos-host
    product: centos
    address: host.example.com
    credentials: linux-host-ssh
```

## 为什么不属于 os-release 系列

这是已经 EOL 的旧版 CentOS Linux（5/6/7/8）——区别于它仍在维护的继任者[CentOS Stream](/zh-cn/configuration/products/centos-stream/)。已实测确认 CentOS 5 和 6 完全早于 systemd 的
os-release 约定（根本没有 `/etc/os-release`），而
`/etc/redhat-release` 早在那之前就已存在于整个 RHEL 家族中。真实的服务器群中仍在运行这些系统——CentOS 进入 EOL 并不会让仍在运行它的机器退役，而这正是 enodia 要揭示而非掩盖的情况。

已在 `centos:5`（`"CentOS release 5.11 (Final)"`）、
`:6`（`"CentOS release 6.10 (Final)"`）和 `:7`（`"CentOS Linux release
7.9.2009 (Core)"`）上实测验证。CentOS Stream 9 主机自己的 `/etc/redhat-release`
（`"CentOS Stream release 9"`）**不会**匹配该模式——匹配要求“CentOS ”之后紧跟“CentOS release”或“CentOS Linux release”，因此即使两条产品线上都同时存在这两个文件，Stream 实例也绝不会被误识别为旧版
`centos`。

## 记录的字段

- `version` — 从 `/etc/redhat-release` 中解析出的发行版本号
- `extra.hostKeyVerified`

## CVE 关联

不进行匹配——通用发行版的 CVE 属于软件包漏洞，而发行版版本号无法说明此后哪些软件包已打过补丁。参见 [CVE 关联](/zh-cn/cve/#哪些产品会被匹配)。

## 生命周期解析器

`endoflife:centos`。
