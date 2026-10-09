---
title: Apache Cassandra
description: 配置 enodia 探测 Apache Cassandra。
---

一个 CQL 原生协议探针，而不是 HTTP——`address` 为 `host` 或 `host:port`，不带协议前缀。省略端口时默认为 `9042`。通过 `SELECT release_version FROM system.local` 读取 `release_version`。

```yaml
targets:
  - id: cassandra-01
    product: cassandra
    address: cassandra-01.example.com:9042
```

## 协议

Cassandra 没有 HTTP API，因此 enodia 不借助驱动程序、直接使用 CQL：先发送 `STARTUP`，然后——仅当服务器回复 `AUTHENTICATE` 时——发送一次 SASL PLAIN 应答，最后执行那一条查询。`OPTIONS`/`SUPPORTED` 是唯一的认证前交换，它带有 CQL 和协议版本，但不带服务器自身的版本。使用协议 v4，因为所有受支持的 Cassandra 都支持它：3.x、4.x 和 5.0 都接受它，而 3.11 会拒绝 v5。Cassandra 2.x（最高支持 v3）早已停止支持，不会尝试。

## 身份验证

可选，`kind: password`——仅在集群要求时（`PasswordAuthenticator`）才发送。参见[配置 → 凭据](/zh-cn/configuration/#凭据)。

```yaml
credentials:
  cassandra-ro:
    kind: password
    username: enodia_ro
    password: "${CASSANDRA_PASSWORD}"
```

如果集群要求身份验证而未配置凭据，会以身份验证错误失败，并给出其认证器的名称；凭据被拒绝同样是身份验证错误。

## 记录的字段

仅 `version`——例如 `5.0.9` 或 `3.11.19`。本探针不记录任何 `extra` 字段。

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`endoflife:apache-cassandra`。
