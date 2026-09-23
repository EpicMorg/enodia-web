---
title: 快速开始
description: 安装 enodia 并运行您的第一次检查。
---

## 安装

最简单的方式——一条命令，自动为您的操作系统/架构选择正确的二进制文件：

```bash
curl -fsSL https://get.enodia.sh/unix | sh   # Linux/macOS/Android (Termux)
```

```powershell
irm https://get.enodia.sh/windows | iex      # Windows
```

安装完成后，在同一个 PowerShell 窗口中即可立即运行 `enodia`——安装程序会直接修改当前会话的 `PATH`，而不仅仅是修改新终端才会读取的、持久化在注册表中的值。

在 Windows 上，如果您希望由包管理器跟踪更新，也可以使用[Chocolatey](https://community.chocolatey.org/packages/enodia)（winget 软件包正在准备中，尚未发布）：

```powershell
choco install enodia
```

:::tip[同样适用于 Termux（Android）]
同一条 Unix 单行命令无需修改即可使用——已在真实设备上确认——但它在底层安装的二进制文件与真正的
Linux 上不同。Android 的 Bionic 链接器拒绝执行 PIE（`ET_DYN`）以外的任何二进制文件（这是自
Android Lollipop 以来的内核/链接器策略），而 enodia 常规的 `linux/arm64` 构建是普通的 `ET_EXEC`——
首次尝试时它根本无法执行。`install.sh` 通过 `$TERMUX_VERSION` 检测 Termux，并改为下载专用的
`android/arm64` 构建（`GOOS=android`、PIE、解释器为 `/system/bin/linker64`——该路径在任何
Android 设备上都保证存在，而不需要由 Termux 自身提供）。当常规安装目录不可写、而 `sudo`
又不是可行选项时（Termux 自己确实有可选的 `sudo` 软件包，但在未 root 的设备上只会拒绝执行），它还会回退到 `$PREFIX/bin` 作为安装目录——因此这一切都不需要任何环境变量覆盖；目前只为 arm64
这一种 Android 架构提供构建。
:::

:::caution[已 root 的 Android 设备可能需要 `su`]
已实际确认：在**已 root** 的设备（Magisk/KernelSU）上，即使是正确的 `android_arm64` 二进制文件，以普通 Termux 用户身份运行时仍可能无法执行——Cobra 会报告类似 `unknown command "<path-to-enodia>"
for "enodia"` 的错误，实际原因是操作系统从一开始就没有把参数正确地交给该二进制文件。通过 `su`
并使用完整路径运行完全相同的二进制文件则可以正常工作。这是一个已知的、尚未解决的上游缺陷——
[termux-exec#40](https://github.com/termux/termux-exec/issues/40)：`termux-exec` 自身的链接器豁免逻辑无法识别 Magisk/KernelSU/`run-as`/ADB 进程上下文，而已 root 的设备通常会把即使是普通的 Termux
会话也置于这类上下文中。这不是 enodia 的构建或 `install.sh` 能够绕开的问题——未 root 的设备根本不应遇到此问题。
:::

或者，如果您希望由包管理器跟踪更新，也可以使用软件包：

```bash
sudo dpkg -i enodia_linux_amd64.deb                # Debian/Ubuntu
sudo rpm -i enodia_linux_amd64.rpm                 # Fedora/RHEL
apk add --allow-untrusted enodia_linux_amd64.apk   # Alpine
sudo pacman -U enodia_linux_amd64.pkg.tar.zst      # Arch
```

每个软件包都会将二进制文件安装到 `/usr/bin/enodia`，将 man 手册页安装到 `/usr/share/man/man1/` 下，并创建一个专用的非特权 `enodia` 系统用户——运行这些都不需要 root 权限。请从[最新发布](https://github.com/EpicMorg/enodia/releases/latest)中获取合适的软件包。

或者使用容器：

```bash
docker run --rm \
  -v /etc/enodia:/config:ro \
  ghcr.io/epicmorg/enodia:latest check --config /config/config.yaml
```

**从 1.1.0 开始，该镜像由一个配套仓库构建和发布**，即[EpicMorg/docker](https://github.com/EpicMorg/docker/tree/master/linux/ecosystem/apps/enodia)，按其自己的计划进行——不再由本项目自身的发布流水线负责，但发布地址和标签保持不变。镜像同时发布到
`docker.io/epicmorg/enodia` 和 Quay，标签相同——`latest`、单独的主版本号（`2`），以及不带构建后缀的确切版本（例如 `2.0.0`——已在全部三个镜像仓库上实际确认；早期流水线的标签形如 `1.0.0-1`，仍然可以拉取，只是今后的新版本不再这样打标签）。有两处值得了解的实际变化：该镜像现在**仅支持 `linux/amd64`**
（发布流程迁移时放弃了 arm64），并且以 **root** 身份运行，而不是专用用户，其基础镜像是本项目自有的
`debian:trixie-light`，而不是 `scratch`。

### 从源码构建

需要 Go——enodia 当前所针对的确切版本请查看 `go.mod`。

```bash
git clone https://github.com/EpicMorg/enodia.git
cd enodia
go build -o enodia ./cmd/enodia
./enodia version
```

### 支持的平台

| 操作系统 | 架构 | 最低版本 |
|---|---|---|
| Linux | amd64, arm64 | 内核 3.2 或更高——Debian 8+、Ubuntu 14.04+、RHEL/CentOS 7+ 均完全满足 |
| Windows | amd64, arm64, 386 | Windows 10 / Windows Server 2016 或更高 |
| macOS | amd64, arm64 | macOS 12 Monterey 或更高 |
| Android (Termux) | 仅 arm64 | Android 7 或更高——即 [Termux 自身的最低要求](https://github.com/termux/termux-app)，比实际促成单独构建的 Android 5.0 Lollipop PIE 支持最低要求更严格（参见上文关于 Termux 的说明）。已 root 的设备可能需要 `su`——参见上文的注意事项 |

这些是 Go 工具链自身的最低要求，而不是 enodia 额外附加的要求。使用更新的 Go 从源码构建会进一步提高
macOS 的最低版本——这是工具链的决定，而不是本项目的决定。

## 您的第一个配置

在二进制文件旁边（或在[配置](/zh-cn/configuration/#文件位置)中列出的任一位置）创建 `enodia.yaml`：

```yaml title="enodia.yaml"
schemaVersion: 1
targets:
  - id: gitlab-main
    product: gitlab
    address: https://gitlab.example.com
```

然后运行：

```bash
enodia check
```

```console
ID           PRODUCT  PATCH  LIFECYCLE  BRANCH  SEVERITY  REASON  CVES
gitlab-main  gitlab   ...
```

不带 `--from` 的 `check` 会在一个进程中完成收集和评估——enodia 先访问您的目标，再访问互联网检查其生命周期数据。如果您的目标所在环境只能访问您的基础设施（封闭环境）而无法访问互联网，请改为将两个阶段拆开：

```bash
# 在封闭网络内部——无需互联网
enodia collect --config enodia.yaml -o inventory.jsonl

# 在其他任何地方——无需访问您的服务
enodia check --from inventory.jsonl
```

## 添加凭据

具有私有 API 的目标需要一个具名凭据，它从 `enodia.yaml` 自身的 `credentials:` 映射中解析（或从单独的 `credentials.yaml` 中解析——请参阅[配置](/zh-cn/configuration/)）：

```yaml title="enodia.yaml"
schemaVersion: 1
targets:
  - id: gitlab-main
    product: gitlab
    address: https://gitlab.example.com
    credentials: gitlab-token

credentials:
  gitlab-token:
    kind: token-header
    header: PRIVATE-TOKEN
    value: "${GITLAB_TOKEN}"
```

`${GITLAB_TOKEN}` 会在加载时从环境变量中插值——请参阅[配置](/zh-cn/configuration/#环境变量插值)。机密信息永远不必与您的服务清单放在同一个文件中。

## 下一步

- [核心概念](/zh-cn/concepts/)：了解这一切背后的设计决策。
- [CLI 参考](/zh-cn/cli-reference/)：了解每一条命令和标志。
- [视图](/zh-cn/views/)：了解 `lifecycle`、`drift` 和 `fleet`——而不仅仅是默认表格。
