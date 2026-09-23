---
title: 配置
description: enodia.yaml、credentials.yaml 和 settings.yaml 接受的每一个字段。
---

enodia 最多读取三个文件：**`enodia.yaml`**（必需——您的服务清单）、可选的单独 **`credentials.yaml`**，以及可选的 **`settings.yaml`**（个人显示偏好，从不是必需的）。三者都是普通的 YAML。

## `enodia.yaml`

### 顶层

```yaml
schemaVersion: 1
credentials_file: credentials.yaml   # 可选，见下文
defaults:                            # 可选
  timeout: 10s
  concurrency: 5
  retries: 2
  backoff: 500ms
cve:                                 # 可选，见“CVE 关联”
  bdu:
    path: vulxml.zip
  nvd:
    path: nvd/
credentials: {}                      # 可选，见“凭据”
targets: []                          # 您的服务
```

读取时会检查 `schemaVersion`——未来的版本会被拒绝，并提示您升级，而不是被乐观地解析。

### `defaults`

适用于每个目标，除非在单个目标上被覆盖。

| 字段 | 类型 | 含义 |
|---|---|---|
| `timeout` | duration | 每个请求的超时（如果任何地方都未设置，默认为 `10s`） |
| `concurrency` | int | 同时探测多少个目标 |
| `retries` | int | 重试次数——只有 `ErrUnreachable` 会被重试；被拒绝的凭据在第二次尝试时也不会变好 |
| `backoff` | duration | 两次重试之间的延迟 |

时长使用 Go 的 duration 语法：`500ms`、`10s`、`2m`、`1h30m`。

### `cve`

可选。让 enodia 指向您自行下载的 BDU FSTEC 导出文件（`cve.bdu.path`）和/或 NVD JSON 数据源（`cve.nvd.path`）——enodia 从不自行获取它们。相对路径相对于该配置文件自身所在目录进行解析，配置的路径不存在会被视为错误。它的作用、如何获取这些文件，以及哪些产品会被匹配：[CVE 关联](/zh-cn/cve/)。

### `targets`

每个服务一个条目：

```yaml
targets:
  - id: jira-main               # 必需，重命名时保持稳定——指标和历史记录都以此为键
    name: Jira (production)     # 可选，默认为 id
    product: jira                # 必需——见“支持的产品”
    address: https://jira.example.com   # 必需
    credentials: jira-token      # 可选，credentials: 中某个条目的名称
    timeout: 15s                 # 可选，覆盖 defaults.timeout
    path: /rest/api/2/serverInfo # 可选，因产品而异——大多数探针都有合理的默认值
    method: GET                  # 可选
    headers:                     # 可选，随每个请求发送的额外请求头
      X-Custom: value
    allow_insecure_transport: false   # 可选——见“核心概念”中的“HTTPS 优先”
    tls:                          # 可选，见下文“TLS”
      ca_file: /etc/enodia/ca.pem
    options:                      # 可选，因产品而异的键/值调节项
      key: value
    parser:                       # 仅用于 product: generic——见下文
      type: regex
```

`address` 完全按照您平时输入的方式书写——每个探针会自行解析它。没有 `https://`/`http://`
前缀的裸主机名会被自动解析（请参阅[核心概念](/zh-cn/concepts/#https-优先默认绝不以明文发送凭据)），您也可以运行 `enodia config resolve`，在不发送任何凭据的情况下查看每个目标将使用哪种协议。

`options` 是一个因产品而异的自由格式映射——大多数探针完全忽略它。[`p4d`/`p4p`](/zh-cn/configuration/products/p4d/)
是最先真正读取它的探针：`options.binary` 会覆盖它们所调用的 `p4` CLI 的路径。

每个内置的 90 个探针的确切端点、身份验证要求和记录的字段，请参阅侧边栏中的**产品配置**（或[支持的产品](/zh-cn/products/)表格）——上面的 `path`、`credentials` 和 `options` 只是通用结构；每个产品自己的页面会说明它实际需要什么。

### TLS（`tls:`）

三个级别，按正确性从高到低排列：

```yaml
tls:
  ca_file: /etc/enodia/corp-ca.pem   # 企业 CA 证书包——大多数封闭环境都运行自己的 PKI
  pin_sha256:                         # 固定的叶证书指纹
    - "AB:CD:...:EF"
  server_name: internal.example.com   # SNI 覆盖
  min_version: "1.2"                  # TLS 最低版本
  insecure: true                      # 最后手段——见下文
```

`insecure: true` 在每次运行时都会发出警告，而不仅是在校验时，因为它往往是被“临时”加上，却一留就是好几年。它还会被带入观测结果，因此报告同时也是一份覆盖整个服务器群的 TLS 审计——您可以看到哪些服务是在未经验证的情况下被检查的。

## 凭据

具名条目，由目标的 `credentials:` 字段按名称引用：

```yaml
credentials:
  jira-token:
    kind: bearer
    value: "${JIRA_TOKEN}"

  gitlab-token:
    kind: token-header
    header: PRIVATE-TOKEN
    value: "${GITLAB_TOKEN}"

  vault-basic:
    kind: basic
    username: enodia
    password: "${VAULT_PASSWORD}"

  redis-auth:
    kind: password
    password: "${REDIS_PASSWORD}"

  linux-host-ssh:
    kind: ssh-key
    username: enodia-ro
    private_key_file: /etc/enodia/ssh/id_ed25519
    passphrase: "${SSH_KEY_PASSPHRASE}"   # 可选，仅在密钥已加密时需要
```

| `kind` | 使用的字段 | 发送内容 |
|---|---|---|
| `none`（省略时的默认值） | — | 不发送凭据 |
| `bearer` | `value` | `Authorization: Bearer <value>` |
| `token-header` | `header`、`value` | 自定义请求头，例如 `PRIVATE-TOKEN`、`X-Vault-Token` |
| `basic` | `username`、`password` | HTTP Basic 身份验证 |
| `password` | `password`（对于使用用户名的协议——Redis ACL、PostgreSQL——还需要 `username`） | 协议原生的身份验证（Redis `AUTH`、SQL 连接自身的密码等） |
| `ssh-key` | `username`、`private_key_file`、`passphrase`（可选） | SSH 公钥身份验证，用于基于 SSH 的操作系统识别探针（请参阅[支持的产品](/zh-cn/products/)） |

对于 SSH 目标，使用 `kind: password` 且不带 `private_key_file` 时配合 `username` 同样可行——
SSH 探针接受密码或私钥，与任何 SSH 客户端一样（`kind: password` 下使用 `username` 加 `password`，或 `kind: ssh-key` 下使用 `username` 加 `private_key_file`）。

### SSH 主机密钥验证

每个基于 SSH 的探针都复用 HTTPS 探针用于证书验证的同一个 `tls:` 块——这里的 `pin_sha256`
保存的是主机密钥自身线路编码的十六进制 SHA-256，而不是 TLS 证书，但结构相同：“固定一个指纹，或者声明 `insecure` 并收到警告”：

```yaml
targets:
  - id: linux-host
    product: debian
    address: host.example.com
    credentials: linux-host-ssh
    tls:
      pin_sha256:
        - "AB:CD:...:EF"   # 主机密钥的 sha256，可通过 ssh-keyscan 或类似工具获取
      # insecure: true      # 最后手段——完全跳过主机密钥验证
```

如果既没有设置 `pin_sha256`，也没有设置 `insecure: true`，连接会在发送任何凭据之前就被拒绝。

### `credentials_file`

一个单独的文件，结构与内联的 `credentials:` 映射相同：

```yaml title="credentials.yaml"
jira-token:
  kind: bearer
  value: "${JIRA_TOKEN}"
```

```yaml title="enodia.yaml"
schemaVersion: 1
credentials_file: credentials.yaml
targets:
  - id: jira-main
    product: jira
    address: https://jira.example.com
    credentials: jira-token
```

正是这一点让服务清单可以提交到 git，而机密信息则完全不在其中。`credentials_file` 中的条目优先于同名的内联条目。
`credentials_file` 相对于引用它的配置文件进行解析，而不是相对于当前目录。

### 环境变量插值

`enodia.yaml` 或 `credentials.yaml` 中的任何字符串值都可以引用环境变量：

- `${VAR}`——替换为 `$VAR` 的值；未设置时报错。
- `${VAR:-default}`——替换为 `$VAR` 的值，未设置时替换为 `default`。

## HashiCorp Vault Agent 集成

无论是 `enodia.yaml` 的内联 `credentials:` 映射，还是单独的 `credentials.yaml`，都不需要由人来编写。两者都只是 enodia 每次运行时重新读取的文件——已在源码中确认：`enodia check` 每次调用时都会从头重新加载配置和凭据，
`enodia serve --interval` 在每个刷新周期也会这样做（每次运行 `collectObservations` 时，`Config.Build`
都会调用 `LoadCredentials`——在进程的整个生命周期内不缓存任何内容，因此编辑其中任一文件无需重启即可生效）。这正是 [Vault Agent](https://developer.hashicorp.com/vault/docs/agent-and-proxy/agent)
自身的 `template` 渲染所针对的场景。enodia 没有任何专门针对 Vault 的集成——也不需要，因为下面的两种机制已经能直接与之配合。

### Vault Agent 渲染环境变量

将 Vault Agent 的 `template`（或 `env_template`）段指向目标所需的机密信息，然后通过上文的[环境变量插值](#环境变量插值)以常规方式引用它们：

```yaml title="credentials.yaml"
jira-token:
  kind: bearer
  value: "${JIRA_TOKEN}"
```

Vault Agent 的 `exec` 模式会将 enodia 本身（或调用 `enodia check` 的包装脚本）作为其受监管的子进程运行，并将渲染出的变量直接注入该进程的环境中——任何机密信息都不会以 enodia 需要读取的文件形式落盘。
Vault Agent 的 `exec` 段还支持在模板化的机密信息发生变化时重启子进程，如果您希望长时间运行的
`enodia serve` 立即获取轮换后的令牌，而不是等到下一个 `--interval` 周期时指望它仍然有效——
具体配置请参阅 Vault Agent 自己的文档，这完全是 Vault Agent 一侧的事情。

### Vault Agent 直接渲染 `credentials.yaml`

将 `credentials_file:` 指向 Vault Agent 的 `template` 段写入的路径，并按照[`credentials_file`](#credentials_file) 所期望的确切结构编写模板：

```yaml title="enodia.yaml"
schemaVersion: 1
credentials_file: /run/enodia/credentials.yaml
targets:
  - id: jira-main
    product: jira
    address: https://jira.example.com
    credentials: jira-token
```

```hcl title="Vault Agent 模板段——仅作示意；确切语法请参阅 Vault Agent 自己的文档"
template {
  destination = "/run/enodia/credentials.yaml"
  perms       = "0600"
  contents    = <<EOT
jira-token:
  kind: bearer
  value: "{{ with secret "secret/data/enodia/jira" }}{{ .Data.data.token }}{{ end }}"
EOT
}
```

这种方式完全不需要 `exec`/重启相关的配置：`enodia check` 每次调用时都会从头重新读取 `credentials_file`，
`enodia serve` 在每个刷新周期都会重新读取它，无论它在磁盘上是如何变化的。由 cron 调度的 `enodia check`
和长时间运行的 `enodia serve` 都只会按各自的计划读取 Vault Agent 最后写入的内容——无需为此进行任何 enodia 特有的配置。

### 无论哪种方式，都遵循 enodia 自身的凭据处理规则

两种模式仍然处于[安全](/zh-cn/security/)一节已经涵盖的范围之内——凭据绝不会出现在清单、导出的报告或日志中，
TLS 验证保持启用，除非您针对某个目标选择关闭。Vault Agent 自身的 `perms` 和目标目录的选择，决定了渲染出的文件不会被其他任何东西读取；除了相对于引用它的配置文件解析相对路径之外，enodia
本身对 `credentials_file` 存放在哪里没有任何主张。

## 通用探针

`product: generic` 是为永远不会有专用探针的目标准备的应急出口。它的表达能力被有意设计得很小并且已冻结——
没有条件判断、没有循环、没有链式请求、没有模板。需要其中任何一项的目标，需要的是一个用 Go 编写的真正探针，而不是更多的通用探针功能。

```yaml
targets:
  - id: in-house-api
    product: generic
    address: https://internal.example.com
    parser:
      type: regex          # json | xml | header | plaintext | regex
      key: version          # 点分路径（json）、标签/类 XPath 路径（xml）或请求头名称
      regex: 'v(\d+\.\d+\.\d+)'
      clean_regex: '^v'     # 第一个捕获组生效——snake_case，见下文
      line: 1                # 仅限 plaintext——读取哪一行
```

:::caution[字段拼写：是 `clean_regex`，而不是 `cleanRegex` 或 `cleanregex`]
`ParserSpec` 现在带有显式的 `yaml:` 标签，与 `enodia.yaml` 其余部分的 snake_case 约定（`ca_file`、`min_version`、`allow_insecure_transport` 等）保持一致——自 2026-09-07 起，
`clean_regex` 是正确的写法。在那次修复之前，该结构体完全没有显式标签，因此适用 YAML 的无标签默认规则（小写、不拆分单词），唯一可用的拼写是 `cleanregex`；单纯的 `cleanRegex` 在任何时候都从未生效过。两次检查时都直接对照解析器进行了确认，而不是根据文字描述推断。
:::

## 文件位置

`enodia.yaml` 和 `settings.yaml` 的查找方式相同：显式路径（`--config`/`--settings`，或用于指定确切文件的
`$ENODIA_CONFIG`/`$ENODIA_SETTINGS`）始终优先，并且该文件必须存在——拼写错误会报错，绝不会悄无声息地回退到其他文件。如果没有显式路径，则按下面的顺序搜索；第一个匹配项直接胜出，不会合并找到的多个文件。位置优先于命名：当前目录中的匹配项始终优先于 `$XDG_CONFIG_HOME` 中的匹配项，而后者又始终优先于 `/etc/enodia/` 中的匹配项，无论在哪里匹配到的是哪个名称。

**`enodia.yaml`：**

1. `./enodia.yaml`
2. `./enodia.yml`
3. `./config.yaml`
4. `./config.yml`
5. `./.enodia.yaml`
6. `./.enodia.yml`
7. `./.config.yaml`
8. `./.config.yml`
9. `$XDG_CONFIG_HOME/enodia/enodia.yaml`（如果未设置 `$XDG_CONFIG_HOME`，则为 `~/.config/enodia/enodia.yaml`）
10. `$XDG_CONFIG_HOME/enodia/enodia.yml`
11. `$XDG_CONFIG_HOME/enodia/config.yaml`
12. `$XDG_CONFIG_HOME/enodia/config.yml`
13. `/etc/enodia/enodia.yaml`
14. `/etc/enodia/enodia.yml`
15. `/etc/enodia/config.yaml`
16. `/etc/enodia/config.yml`

完全找不到任何文件会报错——找不到配置值得大声报错，因为这通常意味着即将使用错误的文件（或根本没有文件）。运行 `enodia config path` 可以查看实际会选用哪个文件。

**`settings.yaml`**——思路相同，但有几点不同：它还会检查普通的 `settings.` 名称（而不仅是 `enodia.settings.`），它还会额外检查正在运行的可执行文件所在的目录（而不仅是当前目录——见下文），并且完全找不到任何文件**不会**报错——
每个字段都只是回退到其内置默认值，因为这个文件完全是可选的：

1. `./enodia.settings.yaml`
2. `./enodia.settings.yml`
3. `./settings.yaml`
4. `./settings.yml`
5. `./.enodia.settings.yaml`
6. `./.enodia.settings.yml`
7. `./.settings.yaml`
8. `./.settings.yml`
9. `<directory containing the running executable>/settings.yaml`
10. `<same>/settings.yml`
11. `$XDG_CONFIG_HOME/enodia/settings.yaml`（如果未设置 `$XDG_CONFIG_HOME`，则为 `~/.config/enodia/settings.yaml`）
12. `$XDG_CONFIG_HOME/enodia/settings.yml`
13. `/etc/enodia/settings.yaml`
14. `/etc/enodia/settings.yml`

第 9-10 步与当前目录（第 1-8 步）不同：便携式安装（解压到任意位置，不使用包管理器）会从运维人员恰好所在的任何目录运行，尤其是在 Windows 上，这基本上从来都不是安装目录本身（`install.ps1` 默认使用 `%LOCALAPPDATA%\enodia`，并将其添加到 `PATH`——`PATH` 的意义就在于让当前目录变得无关紧要）。这一步有意仅限于 `settings.yaml`——
它只是可选的显示偏好，因此共享安装目录中的一个错误的或被劫持的设置文件，最坏也只是外观上的问题。
`enodia.yaml` 包含凭据，因此没有对应的这一步。

## `settings.yaml`

个人的、按运维人员区分的显示偏好——从不包含目标，从不包含凭据，也从不像 `enodia.yaml` 通常那样被共享。

```yaml title="settings.yaml"
schemaVersion: 1

render:
  # compact（默认）| lifecycle | drift | fleet
  default_view: fleet

export:
  # json（默认）| prometheus | html——每当 `export` 本身
  # 在未带 --format 的情况下运行时使用
  default_format: html

html:
  # inline（默认，完全离线）| cdn（加载 Bootstrap/Bootswatch）
  assets: cdn

  # none（完全没有样式表）| default（纯 Bootstrap）| 以下
  # Bootswatch 26 个真实主题中的任意一个：brite, cerulean, cosmo, cyborg, darkly,
  # flatly, journal, litera, lumen, lux, materia, minty, morph, pulse,
  # quartz, sandstone, simplex, sketchy, slate, solar, spacelab,
  # superhero, united, vapor, yeti, zephyr
  theme: lumen

  # auto（默认：让 jsdelivr 和 cdnjs 竞速，使用最先响应的那一个）
  # | jsdelivr | cdnjs
  cdn: auto

  # 可选：将导出限制为一个视图，而不是全部四个
  # view: fleet
```

每当未传入 `check` 的 `--view` 标志本身时，`render.default_view` 就会生效。`export.default_format`
对 `export` 的 `--format` 起同样的作用。`html.*` 只对 `export --format html` 有意义——
每个字段实际会改变什么，请参阅[报告](/zh-cn/reporting/)。
