---
title: HashiCorp Vault
description: 配置 enodia 探测 HashiCorp Vault。
---

读取 `GET /v1/sys/health` 获取版本——Vault 的集群健康检查端点，有意设计为匿名访问，以便负载均衡器轮询。发送令牌对这些行为没有任何影响。

```yaml
targets:
  - id: vault-main
    product: vault
    address: https://vault.example.com
```

## 身份验证

无——按设计，该端点不接受任何形式的凭据。

## 集群状态不算失败

`/sys/health` 会根据集群拓扑返回不同的状态码——已封存（`503`）、备用（`429`）、DR/性能备用（`472`/`473`）、未初始化（`501`）——而**每一种都仍然携带相同的 JSON 响应体，包括版本**。enodia 将它们全部视为成功的观测结果，而不是错误：一个已封存的 Vault 节点是关于该节点的事实，而不是探针失败（参见[核心概念](/zh-cn/concepts/#事实与判断相互分离)）。

## 记录的字段

- `version`
- `extra.initialized`、`extra.sealed`、`extra.standby` — `"true"`/`"false"`
- `extra.clusterName`（如果存在）
- `extra.enterprise` — `"true"`/`"false"`，仅当 `/sys/health` 带有其 `enterprise` 字段时记录

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。区分版本类型：探针会在 `extra.enterprise` 中记录服务器自身的版本类型，社区版实例不会看到仅适用于企业版的发现项。版本类型未知时保留所有发现项。

## 生命周期解析器

`endoflife:hashicorp-vault`。
