---
title: SonarQube
description: 配置 enodia 探测 SonarQube Server 或 Community Build。
---

读取 `GET /api/system/status` 获取版本——无论您实际运行的是哪种 SonarQube，端点都相同（见下文）。

```yaml
targets:
  - id: sonarqube-main
    product: sonarqube
    address: https://sonarqube.example.com
```

## 身份验证

无——即使启用了 SonarQube 的“Force user authentication”全局设置，该端点（以及 `/api/server/version` 和
`/api/system/ping`）仍然无需凭据即可访问。
SonarQube 将其视为负载均衡器无需登录即可访问的健康检查路由，而不是普通的受保护 API。

## SonarQube Server 与 SonarQube Community Build

SonarSource 在 2024 年底把“SonarQube”拆分为两个产品：**SonarQube Server**（此前所有 Community/
Developer/Enterprise/Data Center 版本的直接延续，仍采用日历式版本号
`2025.1`、`2026.4`……）和 **SonarQube Community Build**（一个新的、独立的、始终免费的构建，有自己更快的发布节奏，版本号为
`24.12`、`25.12`、`26.9`……——同样的日历方案，只是年份用两位而不是四位）。endoflife.date 将两者作为两个不同的页面跟踪，其周期数据确实不同——`product:
sonarqube` 无需第二个配置条目来区分它们，因为适用哪一个可以从 `sonarqubeProbe` 已经获取的版本字符串中可靠地读出：

- 开头为四位年份（`2025.x`、`2026.x`）→ **SonarQube Server**。
- 开头为从 `24` 起的两位数（`24.x`、`25.x`、`26.x`）→
  **SonarQube Community Build**。
- 更小的任何值（拆分之前的裸主版本号，例如 `9.9.8.100196`、
  `10.7.0.96327`）→ 视为 Community Build，因为对于拆分之前的版本，两个页面的历史数据完全相同。

## 记录的字段

- `version`
- `extra.id`
- `extra.status` — `UP`、`DOWN`、`STARTING`、`RESTARTING`、
  `DB_MIGRATION_NEEDED`、`DB_MIGRATION_RUNNING` 之一；这是关于服务器健康状况的事实，原样记录，不是 `UP` 时也不会变成错误

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。

## 生命周期解析器

按观测结果选择，而不是固定的：`endoflife:sonarqube-server` 或
`endoflife:sonarqube-community`，按上文所述从版本字符串中选出。`enodia products` 自己的列表（运行时还没有探测任何目标）会显示 `endoflife:sonarqube-server` 作为静态回退值——那只是在任何目标实际检查之前打印出来的内容，并不代表每个观测结果都一定据此解析。
