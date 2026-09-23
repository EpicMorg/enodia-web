---
title: SSH
description: 配置 enodia 探测 SSH 服务器的 banner。
---

一个原始 TCP 探针，而不是 HTTP——`address` 为 `host` 或 `host:port`，不带协议前缀。省略端口时默认为 `22`。读取每个 SSH 服务器在客户端连接瞬间主动发送的标识字符串（RFC 4253 §4.2）——无需身份验证，无需密钥交换，只需 TCP
连接。

不绑定某一个厂商：OpenSSH、Dropbear 以及其他任何使用 SSH 传输协议的软件都以相同方式标识自己，因此该产品是通用的 `ssh`，而不是每种实现一个探针。

```yaml
targets:
  - id: bastion-main
    product: ssh
    address: bastion.example.com:22
```

## 身份验证

无——banner 在任何身份验证步骤出现之前就已发送。

## 这里的“version”是什么意思

`version` 是与报告完全一致的软件字符串，例如
`OpenSSH_10.3` 或 `OpenSSH_9.6p1`——而不是规范化后的数字，因为
`ssh` 涵盖了多个互不相关的实现。末尾的任何发行版注释（例如 Ubuntu 的 `Ubuntu-3ubuntu13.18` 后缀）都会被丢弃，而不会被当作版本的一部分。

## 记录的字段

- `version` — 软件字符串
- `extra.protocol` — SSH 协议版本，例如 `2.0`

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。按 banner 匹配：`OpenSSH_…` 视为 OpenSSH，`dropbear_…` 视为 Dropbear；其他任何 SSH 实现都不会进行查询，而不是被套用 OpenSSH 的 CVE。

## 生命周期解析器

无——`ssh` 不是只有一个生命周期日历的单一产品；OpenSSH 和
Dropbear 各有自己的日历，而无论某个目标实际运行的是什么，探针的 `Meta` 都是静态的。仅用于清单。
