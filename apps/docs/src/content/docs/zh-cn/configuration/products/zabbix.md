---
title: Zabbix
description: 配置 enodia 探测 Zabbix。
---

调用 JSON-RPC 方法 `apiinfo.version`——Zabbix API 中唯一一个明确记载无需身份验证的方法。

```yaml
targets:
  - id: zabbix-main
    product: zabbix
    address: https://zabbix.example.com
```

## 身份验证

无——Zabbix API 中的其他所有方法都需要会话令牌，而本探针没有理由持有它；`apiinfo.version` 是有意为之的例外。

## 记录的字段

仅 `version`——本探针不记录任何 `extra` 字段。

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`endoflife:zabbix`。
