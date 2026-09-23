---
title: 报告
description: export --format json/prometheus/html，以及 settings.yaml 会如何改变 HTML 报告。
---

`enodia export` 以三种格式之一写出报告。三种格式都接受 `--from`（读取现有清单而不是进行收集）和 `-o`/`--output`（文件路径，或 `-` 表示标准输出，即默认值）。

```bash
enodia export --format json
enodia export --format prometheus
enodia export --format html -o report.html
```

`--format` 的内置默认值是 `json`，但只要没有传入 `--format` 本身，`settings.yaml` 的
`export.default_format` 就会覆盖它——显式的 `--format` 始终优先，这与其他地方的
`render.default_view`/`html.view` 所使用的优先级规则相同。请参阅[配置](/zh-cn/configuration/#settingsyaml)。

## `--format json`

完整包含每一条观测结果和每一条评估结果——`--view` 会被忽略。如果您想在 enodia 的事实之上应用自己的严重级别策略，就应该使用这种格式（请参阅[核心概念](/zh-cn/concepts/#事实与判断相互分离)）。

配置了 [`cve:` 块](/zh-cn/cve/)后，每条评估结果还会带有一个 `cves` 数组——每个来源的每项发现对应一个条目（同时存在于 BDU 和 NVD 中的 CVE 会出现两次；NVD 的每个匹配 CPE 各出现一次）：

```json
{
  "Source": "bdu",
  "AdvisoryID": "BDU:2026-11879",
  "CVEIDs": ["CVE-2026-19478"],
  "Title": "Уязвимость программной платформы … GitLab EE/ CE …",
  "Severity": "Высокий уровень опасности (базовая оценка CVSS 2.0 составляет 9,7) …",
  "MatchedName": "Gitlab",
  "RangeText": "от 19.2.0 до 19.2.4",
  "FixStatus": "Уязвимость устранена",
  "CVSS": { "Version": "3.1", "Score": 9.4, "Severity": "CRITICAL" }
}
```

`Severity` 和 `RangeText` 是来源自身的原文，逐字保留；`CVSS` 是从中解析出的一个评分，优先选取 CVSS 3.1/3.0，其次是 4.0，再次是 2.0——几乎每个 CVE 在两个来源中都带有 3.x 版本的评分，因此同一列表中的分数保持在同一尺度上。表格视图中的 `CVES` 列统计的是这些条目中不同 CVE 的数量，而不是条目本身的数量。

## `--format prometheus`

一个 Prometheus 文本文件，供[`node_exporter` 的 textfile 收集器](https://github.com/prometheus/node_exporter)使用——
按计划将其写入 `node_exporter` 配置为扫描的位置，与其他任何 textfile 指标一样。
CVE 发现不会作为指标导出。

## `--format html`

一个单一、自包含的文件。没有内置的 Web 服务器——`enodia` 本身不提供该文件的服务（请参阅[核心概念](/zh-cn/concepts/#没有按请求轮询的内置-web-服务器)）；请将 nginx 指向它，并通过 cron 或 systemd 定时器重新生成它。如果您确实希望它按自己的计划自动提供服务，可以改用 `enodia serve`（请参阅 [CLI 参考](/zh-cn/cli-reference/#enodia-serve)）。

`--view` 会将报告限制为一个视图，而不是四个堆叠的部分。未传入该标志时，`settings.yaml` 的
`html.view` 起同样的作用。

### 默认离线

`settings.yaml` 的 `html.assets` 控制生成的文件需要什么：

- **`inline`**（默认）——零外部资源。已验证：输出中没有任何 `<script`，也没有任何通过
  `http(s)://` 加载的内容——此类 URL 只有普通链接（页脚、CVE 列表中的 NVD/cve.org/BDU 页面）。在完全封闭的网络中渲染效果完全相同。
- **`cdn`**——从 CDN 加载 Bootstrap 和一个 [Bootswatch](https://bootswatch.com/) 主题，并在页面中添加一条可见的警告，说明报告需要互联网访问才能以带样式的方式渲染。`html.theme` 选择主题（`none`、`default`，或 Bootswatch 的 26 个真实主题中的任意一个）；`html.cdn` 选择 CDN——
  `auto`（默认）会分别向 jsdelivr 和 cdnjs 发送一个 `HEAD` 请求进行竞速，并升级到最先响应的那一个，这样在某个网络中某个 CDN 被屏蔽时，报告的样式也不会随之失效。首次绘制始终使用 jsdelivr；竞速只会在之后*升级*样式表。报告还会提供一个主题选择器，按查看者记忆在浏览器的 `localStorage` 中，警告的关闭按钮也以同样方式记忆——关闭一次后，在该浏览器中即使报告重新生成也会保持关闭。

完整的 `settings.yaml` 示例请参阅[配置](/zh-cn/configuration/#settingsyaml)。

### CVE 列表

配置了 [`cve:` 块](/zh-cn/cve/)后，`compact` 和 `drift` 部分中的 `CVES` 单元格会变成一个链接，用于打开该目标的 CVE 列表：每个 CVE 一行，最严重的排在最前，带有指向 NVD、cve.org 的链接，对于 BDU 的发现还带有 bdu.fstec.ru 页面的链接，评分以彩色徽章显示（`CRITICAL · CVSS 3.1 9.8`）。当 BDU 收录了该 CVE 时，描述使用 BDU 的俄文文本，否则使用 NVD 的英文文本。它是纯 CSS 实现（一个 `:target` 模态框），因此在完全没有脚本的 `inline` 模式下同样可用。

### CDN 模式下的行颜色

使用 `html.assets: cdn` 时，每一行都会获得一个 Bootstrap 上下文类——失败的实例为红色，可达的实例为绿色——适用于所配置的任何主题，而不是由 enodia 为每个主题维护的硬编码颜色：

```html
<table class="table table-striped table-hover table-sm align-middle">
<thead><tr><th>PRODUCT</th><th>VERSION</th><th>STATUS</th><th>COUNT</th><th>INSTANCES</th></tr></thead>
<tbody>
<tr class="table-danger"><td>gitlab</td><td>(unknown)</td><td>auth</td><td>1</td><td>gitlab-2</td></tr>
<tr class="table-success"><td>gitlab</td><td>18.2.1</td><td>ok</td><td>1</td><td>gitlab-1</td></tr>
<tr class="table-danger"><td>jira</td><td>(unknown)</td><td>unreachable</td><td>1</td><td>jira-staging</td></tr>
<tr class="table-success"><td>jira</td><td>10.3.1</td><td>ok</td><td>1</td><td>jira-3</td></tr>
<tr class="table-success"><td>jira</td><td>10.3.2</td><td>ok</td><td>2</td><td>jira-1, jira-2</td></tr>
</tbody>
</table>
```

### 页脚和网站图标

每份生成的报告的页脚都会链接回 GitHub 上的项目，以及 `enodia.sh` 和 `docs.enodia.sh`——
都是普通的 `<a href>`，而不是资源获取，因此不会影响 `inline` 模式的离线保证（该保证专门针对
*加载的*资源，而不是静态的超链接文本）。两种模式都带有标签页图标：`inline` 会将 `enodia.sh` 自己的
`apple-touch-icon.png` 的一个小型 base64 副本直接嵌入文件中（而不是完整的多分辨率 `favicon.ico`，那会为了一个标签页图标给每份报告增加大约半兆字节）；`cdn` 模式则链接 `enodia.sh` 上的在线图标，因为该模式本来就需要互联网访问才能渲染。

### 第三方资源

`html.assets: cdn` 会在有人在浏览器中打开报告时，从 jsdelivr 或 cdnjs 加载 Bootstrap，以及（除非 `html.theme: none`）一个 Bootswatch 主题——两者均采用 MIT 许可证。两者都没有打包进
enodia 本身或任何发布产物中；每份 CDN 模式的报告都会在其页脚中注明两者的名称，并附上其许可证链接。

## 跨多份清单的历史

按计划运行 `enodia collect -o "$(date +%F).jsonl"`，就已经能生成 `enodia history`
所需的大部分内容——一个存放按日期命名的清单的目录。`history --dir <that directory>` 会读取其中的每个
`*.jsonl` 文件，并按各自的收集时间对每个文件进行评估，为每个目标 ID 构建一条时间线。请参阅[CLI 参考](/zh-cn/cli-reference/#enodia-history)。
