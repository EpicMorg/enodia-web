---
title: OPNsense
description: 配置 enodia 通过 SSH 探测 OPNsense。
---

与[基于 SSH 的操作系统识别](/zh-cn/configuration/products/ssh-os-probes/)
系列使用相同的 SSH 机制、凭据和主机密钥校验，但运行的是 `opnsense-version`，而不是读取文件。

```yaml
targets:
  - id: opnsense-host
    product: opnsense
    address: host.example.com
    credentials: linux-host-ssh
```

## 为什么用命令而不是文件

OPNsense 构建在 FreeBSD 基础系统之上，根本没有 `/etc/os-release`，而且它的实际版本分散在
`/usr/local/opnsense/version/` 下的多个组件文件中（base、kernel、core、pkgs）——没有一个明显的单一身份文件。`opnsense-version` 是 OPNsense 自己的包装程序，它会读取正确的文件，并在一行中输出完整信息。已针对一个真实的 OPNsense 26.7 实例实测验证（通过
`vmactions/opnsense-vm` 访问）：`"OPNsense 26.7 (amd64)"`。

## 记录的字段

- `version` — 从 `opnsense-version` 的输出中解析
- `extra.hostKeyVerified`

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`endoflife:opnsense`。
