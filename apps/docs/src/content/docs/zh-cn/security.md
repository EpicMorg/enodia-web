---
title: 安全
description: enodia 如何处理它所持有的您基础设施的凭据。
---

enodia 持有访问您基础设施的凭据。以下几点后果是有意为之，而非偶然：

- **凭据绝不会出现**在清单、导出的报告或日志中。
- **先尝试 HTTPS，再尝试 HTTP。** 除非您针对某个服务通过
  `allow_insecure_transport: true` 明确选择启用，否则凭据绝不会通过明文 HTTP 发送——请参阅[核心概念](/zh-cn/concepts/#https-优先默认绝不以明文发送凭据)。
- **默认启用 TLS 验证。** 支持自定义 CA（`tls.ca_file`）和证书固定（`tls.pin_sha256`），以便让 `tls.insecure: true` 始终只是真正的最后手段——请参阅[配置](/zh-cn/configuration/#tlstls)。未经验证而检查的服务会在报告中被标记出来，而不会被静默接受。
- **机密信息单独存放。** 使用具名的 `credentials:` 条目，或通过 `credentials_file` 引用的独立
  `credentials.yaml`——请参阅[配置](/zh-cn/configuration/#credentials_file)——这样您的服务清单（`enodia.yaml`）可以提交到 git，而您的机密信息则不必提交。

发现了安全问题？请参阅 GitHub 上 enodia 的[SECURITY.md](https://github.com/EpicMorg/enodia/blob/master/SECURITY.md)，了解如何负责任地报告。

## 许可证

enodia 采用 **AGPL-3.0-or-later** 许可证。如果 AGPL 不适合您的情况，可以获取商业许可证——请联系[developer@epicm.org](mailto:developer@epicm.org)。

参与贡献需要签署 enodia 的 CLA（在您提交第一个 pull request 时由机器人处理）——之所以需要它，是为了让项目能够在 AGPL 之外以商业条款提供，而您自己作品的版权仍归您所有。
