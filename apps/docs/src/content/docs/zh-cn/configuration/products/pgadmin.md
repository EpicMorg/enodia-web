---
title: pgAdmin
description: 配置 enodia 探测 pgAdmin。
---

从 pgAdmin 在其登录页面每个静态资源上附加的 `?ver=NNNNN` 缓存破坏查询字符串中解码出版本——按设计可匿名访问，因为登录页面必须在任何会话存在之前渲染。

```yaml
targets:
  - id: pgadmin-main
    product: pgadmin
    address: https://pgadmin.example.com
```

## 身份验证

无——该端点不接受任何形式的凭据。

## 版本如何解码

已针对真实的 `dpage/pgadmin4` 容器和 pgAdmin 自己的源码（`version.py`）确认：`NNNNN` 就是 `APP_VERSION_INT`，其中记载为
`[X]XYYZZ`——依次为 release、revision 和后缀代码——例如 `91700` 表示 release 9、revision 17、后缀 `00`（GA）。只有 release.revision
主干会被重建为 `version`；非零的后缀代码（beta/dev 构建）没有文档记载的文本映射，仅凭代码无法重建，因此会以 `extra.suffixCode` 的形式呈现，而不是去猜测。

## 记录的字段

- `version` — 例如 `9.17`
- `extra.suffixCode`，仅当非零时记录

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

`github-tags:pgadmin-org/pgadmin4`。endoflife.date 没有 pgAdmin 的日历（已确认 404），而 `pgadmin-org/pgadmin4` 根本没有 GitHub
Releases（已实测确认：releases 端点返回空数组）——只有标签，形如 `REL-9_17`，而不是点分版本号。`github-tags` 解析器类型正是为此而存在的：它把这种形式转换为 `9.17`，并从获取到的页面中选出*解析后最高*的标签，而不是信任列表顺序，因为 tags 端点不像 Releases 那样有文档保证的倒序时间顺序。与普通的 `github:` 解析器一样，它只知道“最新版本”——没有 eol/support/lts 日期，因为 tags 端点不携带这些信息。可提高该解析器速率限制的 `GITHUB_TOKEN` 环境变量，请参阅[支持的产品](/zh-cn/products/#应用程序与基础设施服务)。
