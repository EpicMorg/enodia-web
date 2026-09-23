---
title: Perforce Helix Core Server (p4d)
description: 配置 enodia 探测 Perforce Helix Core Server（p4d）。
---

运行 `p4 -Ztag -p <address> info`——**这是本项目中唯一一个调用外部二进制程序的探针**，而不是直接使用线路协议或
HTTP。原因见下文的[说明](#为什么用-cli-而不是线路协议客户端)。

```yaml
targets:
  - id: p4d-main
    product: p4d
    address: p4d.example.com:1666
```

## 运行 enodia 的机器上需要 `p4` CLI

这不是凭据或网络方面的要求——需要在 enodia 所在机器上实际安装一个二进制程序（Perforce 自己的命令行客户端，可免费下载）。缺少该程序时会清晰地报错，而不会被误认为网络问题。如果 `p4` 不在 `$PATH` 中，请用 `options.binary` 覆盖路径（在 Windows 上同样适用，指向
`p4.exe` 即可）：

```yaml
targets:
  - id: p4d-main
    product: p4d
    address: p4d.example.com:1666
    options:
      binary: /opt/perforce/bin/p4
```

## 为什么用 CLI 而不是线路协议客户端

Perforce 自己的 RPC 协议已经被完整地实测逆向（抓包，加上真实的 `p4` 二进制程序连接真实的生产代理），而且一个手工编写的客户端正确地重现了整个握手过程——已与抓包逐字节比对确认。但真实的直连 `p4d` 服务器会悄无声息地丢弃这个经过验证、完全正确的握手（强制 TLS 和速率限制都已实测排除：没有错误，没有重置，就是没有应答），而真实的 `p4` 二进制程序连接同样的地址却毫无问题。与其发布一个只能用于代理的探针，本探针和[Perforce Proxy](/zh-cn/configuration/products/p4p/) 都改为调用运维人员自己的 `p4` CLI。

## 超时

`timeout`（按目标设置，未设置时回退到 `defaults.timeout`）作用于
`p4` 子进程的方式，与作用于其他所有探针自身传输的方式相同。这一点在这里有实际意义：一个卡在拨号连接不可达直连服务器上的 `p4` 进程，会在 TCP 层面既无响应也无重置地一直挂起——正是上文描述的行为——因此如果没有超时，它会拖住整个采集运行，而不是仅让这一个目标失败。（已在 1.2.1 中修复——更早的版本根本没有向子进程传递超时。）

## 身份验证

无——已实测确认，在真实的生产服务器上，`info` 在完全未认证的情况下也会完整响应。

## 厂商身份校验

如果应答中带有 `proxyVersion` 字段，说明该地址实际上是一个[Perforce Proxy](/zh-cn/configuration/products/p4p/)，而不是直连服务器——
本探针会拒绝它，而不是报告错误产品的版本，与 `p4p` 反向拒绝直连服务器应答的做法相同。

## 与 Perforce Helix Swarm 不是同一个产品

[`perforce-swarm`](/zh-cn/configuration/products/perforce-swarm/) 是
Perforce 的 Web 代码评审界面，通过 HTTP 探测——它是与本页面所涵盖的 `p4d` 服务器本身不同的产品。

## 记录的字段

- `version` — 例如 `2024.2`，从 `serverVersion` 的
  `P4D/LINUX26X86_64/2024.2/2726408 (2025/02/27)` 格式中解析
- `extra.raw` — 未经解析的完整 `serverVersion` 字符串
- `extra.serverID`、`extra.serverServices`（如果存在）

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

无——Perforce 是专有软件，尝试过的任何 slug 下都没有 endoflife.date 页面（已确认 404），也没有可以回退使用的公开 GitHub 发布版本。仅用于清单，与[Gentoo](/zh-cn/configuration/products/gentoo/)/
[Kali Linux](/zh-cn/configuration/products/kali-linux/) 相同。
