---
title: MongoDB
description: 配置 enodia 探测 MongoDB。
---

一个原始线路协议探针，而不是 HTTP——`address` 为 `host` 或 `host:port`，不带协议前缀。省略端口时默认为 `27017`。通过线路协议（`OP_MSG`）运行 `buildInfo`
命令并读取其 `version` 字段——不使用客户端库，也不执行 `SELECT` 式的查询。

```yaml
targets:
  - id: mongodb-main
    product: mongodb
    address: db.example.com:27017
```

## 身份验证

无——`buildInfo` 属于 MongoDB 在身份验证之前总会响应的少数命令之一。已针对两个真实的 `mongo:7`
容器实测确认，一个完全没有访问控制，另一个启用了 `--auth` 并配置了 root 用户：在完全不发送凭据的情况下，两者都返回了完全相同的完整 `buildInfo` 文档。

## 记录的字段

- `version`
- `extra.enterprise` — 当 `buildInfo` 的 `modules` 中列出
  `enterprise` 时为 `"true"`，未列出时为 `"false"`（社区版服务器的该数组为空）；该字段不存在时不报告

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。区分版本类型：探针会在 `extra.enterprise` 中记录服务器自身的版本类型，社区版实例不会看到仅适用于企业版的发现项。版本类型未知时保留所有发现项。

## 生命周期解析器

`endoflife:mongodb`。
