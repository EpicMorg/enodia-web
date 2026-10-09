---
title: 隐私
description: enodia 会连接什么、会存储什么——没有遥测。
---

enodia 是一个在您自己的机器上运行的命令行工具。它没有遥测、没有使用统计、没有更新检查，也没有账户。EpicMorg 不运行任何与 enodia 通信的服务器，也不会从中收到任何数据。

本页是 enodia 自己的 [`PRIVACY.md`](https://github.com/EpicMorg/enodia/blob/master/PRIVACY.md) 的镜像。

## enodia 会连接什么

- **您自己的服务**——`enodia.yaml` 中列出的目标，通过 HTTPS、SSH 或它们的原生协议，使用您配置的凭据，读取它们的版本（对于 Linux 主机，还会读取已安装的软件包列表）。
- **endoflife.date**（`https://endoflife.date/api/...`）——获取公开的发布日期和生命周期结束日期。请求中只包含一个产品名称（例如 `postgresql`）；不会发送主机名、地址、版本或任何其他关于您机群的数据。
- **GitHub API**（`https://api.github.com/repos/.../releases`、`.../tags`）——用于在 GitHub 上发布版本的产品。与上面相同：请求中只有公开的仓库名称。如果您设置了 `GITHUB_TOKEN`，它只会发送给 GitHub，用于提高速率限制。

仅此而已。CVE 数据库（NVD、BDU FSTEC、Debian、OVAL、Alpine、MariaDB）是您自行下载的文件；enodia 只从磁盘读取它们——参见 [CVE 关联](/zh-cn/cve/)。

设置 `html.assets: cdn` 时，HTML 报告会**在打开它的浏览器中**从 CDN（jsDelivr / cdnjs）加载 Bootstrap；默认值（`inline`）完全不发出任何外部请求——参见[报告](/zh-cn/reporting/)。

## enodia 会存储什么

只存储在您的机器上，并且只存储在您指定的位置：

- 您用 `-o` 写入的清单、报告和历史文件；
- 操作系统缓存目录（`~/.cache/enodia`、`%LocalAppData%\enodia`）中 endoflife.date/GitHub 响应以及已解析 CVE 数据库的缓存——可以随时安全删除。

不会发送到任何其他地方，EpicMorg 也不会保留任何数据。

## 本网站

enodia.sh、get.enodia.sh 和 docs.enodia.sh 网站——而不是 enodia 工具——使用 Yandex.Metrica 网站分析来统计访问量。

## 联系方式

如有疑问：请在 [github.com/EpicMorg/enodia/issues](https://github.com/EpicMorg/enodia/issues) 提交 issue。
