---
title: MinIO
description: 配置 enodia 通过 SSH 探测 MinIO。
---

一个 SSH 探针：它登录后运行服务器二进制程序自己的 `--version`——先按名称 `minio`，再用 `/usr/local/bin/minio`。端口默认为 `22`，不带协议前缀——与[基于 SSH 的操作系统识别](/zh-cn/configuration/products/ssh-os-probes/)系列使用相同的 SSH 机制、凭据和主机密钥校验。

```yaml
targets:
  - id: minio-01
    product: minio
    address: minio-01.example.com
    credentials: linux-host-ssh
```

## 为什么用 SSH

MinIO 在任何网络接口上都不会匿名给出版本：S3 API 的 `Server` 响应头只是一个光秃秃的 `MinIO`，Console 的匿名 `/api/v1/login` 只返回登录策略，而管理 API 和 Prometheus 指标需要管理员密钥或用 `mc` 生成的 bearer 令牌。

## 运行在容器中的 MinIO

当 MinIO 运行在 Docker 或 Podman 中、而主机本身没有该二进制程序时，请在 `options` 中指定容器名称——命令随后会通过 `docker exec`（或 `podman exec`）运行：

```yaml
targets:
  - id: minio-01
    product: minio
    address: minio-01.example.com
    credentials: linux-host-ssh
    options:
      container: minio               # 容器名称
      container_runtime: podman      # 可选：docker（默认）或 podman
```

SSH 用户必须有权使用该运行时。容器名称在放入远程命令之前，会先按 Docker 自己的名称规则进行校验。

## 以发布名称作为版本

MinIO 按 UTC 时间戳命名发布版本——`RELEASE.2025-10-15T17-29-55Z`——在 `--version` 和其 GitHub 标签中都是如此。enodia 会把这种名称（无论 `RELEASE` 之后是否带有 `_<MARKER>`，内部构建写作 `RELEASE_INHOUSE.…`）折算成可比较的 `2025.10.15.17.29.55`，对观测到的版本和解析器的标签都一样处理。

## 身份验证 — 必需

一个 SSH 凭据，`ssh-key` 或 `password`——参见[配置 → 凭据](/zh-cn/configuration/#凭据)。

## 记录的字段

- `version` — 例如 `RELEASE_INHOUSE.2025-03-12T18-04-18Z`，来自 `minio version RELEASE_INHOUSE.2025-03-12T18-04-18Z (commit-id=…)`
- `extra.build` — 非上游构建中 `RELEASE_` 之后的标记，例如 `INHOUSE`
- `extra.commit` — `commit-id`（如果存在）
- `extra.runtime` — 来自 `Runtime:` 行的 Go 运行时，例如 `go1.24.4`
- `extra.container` — 容器名称（设置了 `options.container` 时）
- `extra.hostKeyVerified`

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。两个来源都以发布时间戳的形式书写版本界限（`2025-10-15t17-29-55z`，大小写均可），这些界限会被折算成与探测到的版本相同的点分形式，以便两者可以比较；以普通日期给出的界限仍然无法解析。

## 生命周期解析器

`github:minio/minio`——endoflife.date 没有 MinIO 页面（已确认 404），因此改为根据 GitHub Releases 解析：只取最新发布的非预发布标签，不含 eol/support/lts 日期。该仓库已归档：社区版的最后一个发布版本是 `RELEASE.2025-10-15T17-29-55Z`，今后 MinIO 都将与它进行比较。
