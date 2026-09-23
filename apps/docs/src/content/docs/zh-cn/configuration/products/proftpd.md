---
title: ProFTPD
description: 配置 enodia 探测 ProFTPD。
---

一个原始 TCP 探针，而不是 HTTP——`address` 为 `host` 或 `host:port`，不带协议前缀。省略端口时默认为 `21`。读取每个服务器在连接时主动发送的 FTP 欢迎信息（RFC
959 的 `220` 应答），并在其中查找版本。

```yaml
targets:
  - id: ftp-main
    product: proftpd
    address: ftp.example.com:21
```

## 身份验证

无——欢迎信息在任何身份验证步骤之前就会发送。

## 开箱即用的默认配置完全不含版本

未配置 `ServerIdent` 指令时——这才是实际的默认情况，已针对一台真实的生产主机和一个全新的
`instantlinux/proftpd` 容器实测确认——欢迎信息为
`"ProFTPD Server (<ServerName>) [<address>]"`，不含版本。只有当管理员显式配置 `ServerIdent on
"... %{version} ..."` 时才会出现版本——同样已实测确认：
`"ProFTPD 1.3.9c ready at 127.0.0.1"`。因此本探针“未找到版本”的情况是常态，而不是例外。

## 记录的字段

仅 `version`——本探针不记录任何 `extra` 字段。

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`endoflife:proftpd`。
