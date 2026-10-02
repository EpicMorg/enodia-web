---
title: FreeRADIUS
description: 配置 enodia 通过 SSH 探测 FreeRADIUS。
---

一个 SSH 探针：它登录后运行服务器自己的 `-v`。端口默认为 `22`，不带协议前缀——与[基于 SSH 的操作系统识别](/zh-cn/configuration/products/ssh-os-probes/)系列使用相同的 SSH 机制、凭据和主机密钥校验。

```yaml
targets:
  - id: radius-01
    product: freeradius
    address: radius-01.example.com
    credentials: linux-host-ssh
```

## 为什么用 SSH

RADIUS 没有版本交换，FreeRADIUS 的 Status-Server 应答也没有——它的字典定义的是统计计数器，没有版本属性。因此版本只能来自服务器二进制程序本身。本探针会尝试 `freeradius`（Debian/Ubuntu）和 `radiusd`（RHEL 系、源码构建），先按名称，再按其 `/usr/sbin` 路径，因为非登录 SSH 会话的 `PATH` 中常常没有 `/usr/sbin`。

## 身份验证 — 必需

一个 SSH 凭据，`ssh-key` 或 `password`——参见[配置 → 凭据](/zh-cn/configuration/#凭据)。

## 运行在容器中的 FreeRADIUS

当 FreeRADIUS 运行在 Docker 或 Podman 中、而主机本身没有该二进制程序时，请在 `options` 中指定容器名称——命令随后会通过 `docker exec`（或 `podman exec`）运行：

```yaml
targets:
  - id: radius-01
    product: freeradius
    address: radius-01.example.com
    credentials: linux-host-ssh
    options:
      container: freeradius          # 容器名称
      container_runtime: podman      # 可选：docker（默认）或 podman
```

SSH 用户必须有权使用该运行时。容器名称在放入远程命令之前，会先按 Docker 自己的名称规则进行校验。

## 记录的字段

- `version` — 例如 `3.2.10`，来自 `FreeRADIUS Version 3.2.10 (git #9071ea041)`
- `extra.git` — 构建的 git 哈希（如果存在）
- `extra.container` — 容器名称（设置了 `options.container` 时）
- `extra.hostKeyVerified`

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。两者都按发布原样使用：NVD 对 BlastRADIUS（CVE-2024-3596）给出的范围只覆盖 3.0.27 之前的版本，对 3.2 分支（在 3.2.5 中修复）没有任何条目，因此一台 3.2.3 主机不会因此得到发现。

## 生命周期解析器

`github-tag-branches:FreeRADIUS/freeradius-server`。endoflife.date 没有 FreeRADIUS 页面（已确认 404），而 FreeRADIUS 同时维护 3.0.x 和 3.2.x，发布标签形如 `release_3_2_10`。这种解析器类型将标签解读为**每个 major.minor 分支一个生命周期周期**，各自有其最新标签，因此一台完全打好补丁的 3.0.28 在其分支中显示为 `current`，并提示有更新的分支可用——而不是“落后于 3.2.10”。只读取 GitHub 单页最多 100 个标签；与其他 GitHub 解析器一样，它不带 EOL 日期，`GITHUB_TOKEN` 可以提高其速率限制（参见[支持的产品](/zh-cn/products/)）。
