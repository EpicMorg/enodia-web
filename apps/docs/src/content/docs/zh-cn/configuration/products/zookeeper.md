---
title: Apache ZooKeeper
description: 配置 enodia 探测 Apache ZooKeeper。
---

一个基于客户端端口的原始 TCP 探针，而不是 HTTP——`address` 为 `host` 或 `host:port`，不带协议前缀。省略端口时默认为 `2181`。发送四字命令 `srvr`，并读取回复直到服务器关闭连接。

```yaml
targets:
  - id: zk-01
    product: zookeeper
    address: zk-01.example.com:2181
```

## 为什么用 `srvr`

ZooKeeper 3.5+ 默认只允许 `srvr`（`4lw.commands.whitelist`）：`stat`、`mntr`、`ruok` 等其他命令会回复“is not executed because it is not in the whitelist”。如果某台服务器连 `srvr` 也从白名单中移除了，目标会以不支持失败。AdminServer（HTTP，8080）带有相同的数据，但常常不对外暴露；而客户端端口总是暴露的。

## 身份验证

无——四字命令没有身份验证。

## 记录的字段

- `version` — 例如 `3.9.6`，来自 `Zookeeper version: 3.9.6-a355171b081b5b60749db8f19cca1528b0df936f, built on 2026-09-03 19:29 UTC`
- `extra.git` — 构建的 git 哈希（如果存在）
- `extra.mode` — `Mode:` 行，例如 `standalone`

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`endoflife:zookeeper`。
