---
title: DomainMOD
description: 配置 enodia 探测 DomainMOD。
---

读取 `GET /CHANGELOG`——DomainMOD 随附在其 Web 根目录中、以静态文件形式提供的变更日志文件。协议默认为 `https`。

```yaml
targets:
  - id: domainmod-main
    product: domainmod
    address: https://domains.example.com
```

安装在子路径下（`DOMAINMOD_WEB_ROOT`）的 DomainMOD，可以通过把该路径写进地址来访问，例如 `https://www.example.com/domainmod`。

## 为什么用 CHANGELOG

DomainMOD 只在登录后布局的页脚中显示 `Version 4.23.0`。CHANGELOG 是匿名可访问的：它以 `DomainMOD CHANGELOG` 开头，接着是一条分隔线，然后最新的条目排在最前——`v4.23.0     2025-01-04`。探针要求必须有这个标题，以免把其他应用的变更日志当作 DomainMOD 的来读取。如果 Web 服务器屏蔽了该文件，目标会显示为“不支持”。

## 身份验证

无——探针读取的是静态文件，不接受任何凭据类型。自 2.2.0 起，为此目标配置凭据会被视为配置错误，而不再被忽略；参见[配置 → 凭据](/zh-cn/configuration/#凭据)。

## 记录的字段

仅 `version`——例如 `4.23.0`，来自 CHANGELOG 最新的条目 `v4.23.0     2025-01-04`（已在 `domainmod/domainmod:latest` 上实测确认，其 `software.inc.php` 中写的是 `SOFTWARE_VERSION = '4.23.0'`）。本探针不记录任何 `extra` 字段。

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 进行匹配。

## 生命周期解析器

`github:domainmod/domainmod`——endoflife.date 没有 DomainMOD 的日历（已确认 404），因此改为根据 GitHub Releases 解析：只取最新发布的非预发布标签，不含 eol/support/lts 日期（GitHub 对生命周期策略没有立场，只知道“最新的发布版本是什么”）。
