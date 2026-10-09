---
title: phpIPAM
description: 配置 enodia 探测 phpIPAM。
---

以匿名方式读取登录页面 `GET /index.php?page=login`。协议默认为 `https`。

```yaml
targets:
  - id: ipam-main
    product: phpipam
    address: https://ipam.example.com
```

## 版本从何而来

登录页面的页脚写着 `phpIPAM IP address management [v1.8.3]`，页面上的每个样式表和脚本加载时都带有 `?v=1.8.3_r002_v46`——phpIPAM 自己的脚本前缀：可见版本、代码修订号和数据库模式版本。页脚给出版本；当页脚被定制删除时，资源后缀作为回退来源，同时它也是修订号和模式版本的来源。较旧的发布版本加载资源时只带 `?v=1.7.3`（见于一台生产环境的 1.7.3），不含修订号和模式部分——版本仍然可以读取，此时两个 `extra` 字段不存在。两者都没有的页面会被报告为不支持。

## 身份验证

无——探针读取的是匿名页面，不接受任何凭据类型。自 2.2.0 起，为此目标配置凭据会被视为配置错误，而不再被忽略；参见[配置 → 凭据](/zh-cn/configuration/#凭据)。

## 记录的字段

- `version` — 例如 `1.8.3`，来自 `phpIPAM IP address management [v1.8.3]`（已在 `phpipam/phpipam-www:latest` 上实测确认）
- `extra.revision` — 来自资源后缀的代码修订号，例如 `002`
- `extra.dbVersion` — 来自资源后缀的数据库模式版本，例如 `46`

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`github:phpipam/phpipam`——endoflife.date 没有 phpIPAM 的日历（已确认 404），因此改为根据 GitHub Releases 解析：只取最新发布的非预发布标签，不含 eol/support/lts 日期（GitHub 对生命周期策略没有立场，只知道“最新的发布版本是什么”）。
