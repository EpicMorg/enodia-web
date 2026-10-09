---
title: Splunk
description: 配置 enodia 探测 Splunk。
---

从 splunkd 的管理端口（而不是 Web UI）读取 `GET /services/server/info?output_mode=json`。不带端口的地址会使用 `8089`（splunkd 的管理端口）；默认协议为 `https`。

```yaml
targets:
  - id: splunk-main
    product: splunk
    address: splunk.example.com
    credentials: splunk-monitor
```

## 为什么用管理端口

Web UI（端口 8000）不是询问的正确地方：它常常发布在代理或 CDN 之后，而其登录页面不带任何值得依赖的版本。splunkd 的管理端口是直连的，`/services/server/info` 的应答中带有 `entry[0].content`——`version`、`build`、`product_type`、`isFree`/`isTrial`。探针在 Web 端口上没有可读取的内容，这就是为什么光秃秃的主机名会使用 `8089`，而不是协议的默认端口。

## 身份验证 — 必需

不带凭据时，splunkd 会返回 `401`，附带 XML `<msg type="ERROR">Unauthorized</msg>` 和 `Server: Splunkd`（见于一台生产环境的 9.4.1 以及 `splunk/splunk` 10.6.0.5）。接受两种类型——通过 HTTP Basic 的 Splunk 用户，或作为 Bearer 的 Splunk 身份验证令牌：

```yaml
credentials:
  splunk-monitor:
    kind: basic
    username: monitor
    password: "${SPLUNK_PASSWORD}"
```

```yaml
credentials:
  splunk-token:
    kind: bearer
    value: "${SPLUNK_TOKEN}"
```

其他任何类型都是配置错误。参见[配置 → 凭据](/zh-cn/configuration/#凭据)。

## 记录的字段

- `version` — `entry[0].content.version`，例如 `10.6.0.5`
- `extra.build` — 例如 `86587d4e3b27`
- `extra.license` — `free` 或 `trial`，当 splunkd 报告其中之一时；否则不存在
- `extra.productType` — splunkd 自己的 `product_type`，例如 `enterprise`

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

区分版本类型：NVD 按版本类型把 `splunk:splunk` 拆分为 `enterprise` 和早已退役的 `light`，由 `extra.productType`（`enterprise`、`lite`）选择适用哪一个。版本类型未知时保留所有发现项。Splunk Cloud 有自己的 CPE，未做映射。

## 生命周期解析器

`endoflife:splunk`。比日历更新的构建（10.6，当时 endoflife.date 只列到 10.4）在日历跟上之前会显示为 `cycle_unmatched`。
