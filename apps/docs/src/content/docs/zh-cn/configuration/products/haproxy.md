---
title: HAProxy
description: 配置 enodia 探测 HAProxy。
---

从 HAProxy 自身**统计页面**的标题中读取版本——HAProxy
没有版本端点，而且与 nginx 不同，默认完全不设置用于标识自身的 `Server` 响应头。

```yaml
targets:
  - id: haproxy-main
    product: haproxy
    address: https://haproxy.example.com
```

`/stats` 是本探针的默认路径——只有当您的统计页面挂载在其他位置时，才需要显式设置 `path:`。

## 必须启用统计页面

已针对真实的 `haproxy:3.0` 容器实测确认：统计页面（HAProxy 自身配置中的 `stats enable`；**默认不开启**）是唯一带有版本信息的匿名界面——`;csv` 统计导出约 140 列的表头中没有任何版本列，因此本探针专门读取 HTML 形式。

## 身份验证

可选。`stats auth user:pass`（HAProxy 用于该页面的配置指令）就是普通的 HTTP Basic：

```yaml
credentials:
  haproxy-stats:
    kind: basic
    username: admin
    password: "${HAPROXY_STATS_PASSWORD}"
```

## 记录的字段

仅 `version`——本探针不记录任何 `extra` 字段。

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`endoflife:haproxy`。
