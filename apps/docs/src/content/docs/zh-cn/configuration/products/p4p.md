---
title: Perforce Proxy (p4p)
description: 配置 enodia 探测 Perforce Proxy（p4p）。
---

运行 `p4 -Ztag -p <address> info`——与 [`p4d`](/zh-cn/configuration/products/p4d/) 使用相同的命令和相同的外部 CLI 机制；为什么调用运维人员自己的 `p4` 二进制程序，而不是直接使用 Perforce 的线路协议，请参阅该页面。

```yaml
targets:
  - id: p4p-main
    product: p4p
    address: p4p.example.com:1666
```

## 运行 enodia 的机器上需要 `p4` CLI

与 [`p4d`](/zh-cn/configuration/products/p4d/#运行-enodia-的机器上需要-p4-cli) 相同
——如果 `p4` 不在
`$PATH` 中，请用 `options.binary` 覆盖二进制程序路径：

```yaml
targets:
  - id: p4p-main
    product: p4p
    address: p4p.example.com:1666
    options:
      binary: /opt/perforce/bin/p4
```

## 超时

`timeout`（按目标设置，未设置时回退到 `defaults.timeout`）作用于
`p4` 子进程的方式，与作用于其他所有探针自身传输的方式相同——为什么这一点对 Perforce 具体而言很重要，请参阅[`p4d` 页面中的说明](/zh-cn/configuration/products/p4d/#超时)。已在 1.2.1 中修复。

## 身份验证

无——已实测确认，在一个真实的生产代理上，`info` 在完全未认证的情况下也会完整响应。

## 厂商身份校验

代理对 `info` 的应答包含直连服务器应答的全部内容，**外加它自己的 `proxyVersion` 字段**——后端服务器的 `serverVersion`/
`ServerID`/`serverServices` 都原样透传，描述的是代理背后的服务器，而不是代理本身。本探针要求必须存在
`proxyVersion`，并拒绝直连服务器的应答（其中没有该字段），而不是报告错误产品的版本——
与 [`p4d`](/zh-cn/configuration/products/p4d/) 以相反方向执行的检查相同。

## 记录的字段

- `version` — 例如 `2024.2`，从 `proxyVersion` 的
  `P4P/LINUX26X86_64/2024.2/2832881 (2025/09/30)` 格式中解析
- `extra.raw` — 未经解析的完整 `proxyVersion` 字符串
- `extra.backendServerVersion`、`extra.backendServerID` — 后端
  `p4d` 自己的版本/ID，从同一应答中透传（如果存在）

## CVE 关联

不进行匹配——两个数据库都没有可用的数据。参见 [CVE 关联](/zh-cn/cve/#哪些产品会被匹配)。

## 生命周期解析器

无——Perforce 是专有软件，尝试过的任何 slug 下都没有 endoflife.date 页面（已确认 404），也没有可以回退使用的公开 GitHub 发布版本。仅用于清单，与[`p4d`](/zh-cn/configuration/products/p4d/) 相同。
