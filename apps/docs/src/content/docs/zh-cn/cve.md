---
title: CVE 关联
description: 将每个探测到的版本与 BDU FSTEC 和 NIST NVD 进行匹配，并将 Linux 主机上已安装的软件包与其厂商自己的安全数据进行匹配——数据来自您自行下载的文件。
---

从 2.0 开始，enodia 可以告诉您哪些已知漏洞影响每个目标所报告的确切版本——与补丁/生命周期/分支维度并列，而不是取而代之。它会与两个公开数据库进行匹配：

- **BDU FSTEC**——俄罗斯 FSTEC 的漏洞数据库，[bdu.fstec.ru](https://bdu.fstec.ru/)。
- **NIST NVD**——美国国家漏洞数据库，[nvd.nist.gov](https://nvd.nist.gov/)。

两者都可以单独使用；同时配置两者时，它们的发现会按 CVE 合并。

MariaDB 还会与它自己的已修复 CVE 表进行匹配（参见 [MariaDB：厂商自己的表](#mariadb-the-vendors-own-table)）。

从 2.1 开始，还有十个 Linux 发行版会**按已安装的软件包**与其厂商自己的安全数据进行匹配——Debian Security Tracker、厂商 OVAL 文件和 Alpine 的 secdb（请参阅 [Linux 发行版的软件包级 CVE](#linux-发行版的软件包级-cve)）。

这一切都是可选的：没有 `cve:` 块的配置，其行为与 1.x 完全相同，并且每个来源都可以单独使用。

## enodia 从不自行下载数据库

由您下载文件、由您决定何时刷新，再让 enodia 指向这些文件。enodia 没有任何会自行访问这些来源中任何一个的代码路径——这与[两阶段设计](/zh-cn/concepts/#两个阶段有意设计为可分离)
基于同样的封闭网络考量：运行 `check` 的机器进行 CVE 匹配时不需要互联网访问，只需要这些文件的副本。

### BDU FSTEC

一个文件，即 FSTEC 的完整导出（压缩后约 33 MB）：

```bash
curl -fL --cacert ru-chain.pem \
  -o /var/lib/enodia/cve/bdu/vulxml.zip \
  https://bdu.fstec.ru/files/documents/vulxml.zip
```

bdu.fstec.ru 使用的是俄罗斯国家 CA（俄罗斯数字发展部，Минцифры）签发的证书，该 CA 不在常见的系统信任库中——
直接使用 `curl` 会因证书错误而失败。服务器也不发送其中间证书，而 `curl`（与浏览器不同）不会自行获取缺失的中间证书，因此只安装根证书是不够的。请用根证书和该站点证书所指明的中间证书构建一个证书包：

```bash
curl -fsS -o root.crt https://gu-st.ru/content/lending/russian_trusted_root_ca_pem.crt
curl -fsS -o sub.crt  http://nuc-cdp.digital.gov.ru/cdp/subca_ssl_rsa2024.crt
{ cat root.crt; echo; cat sub.crt; } > ru-chain.pem
```

已于 2026-09-23 实际验证。如果它不再有效，很可能是中间证书已轮换：站点证书自身的
*Authority Information Access*（授权信息访问）字段会指明当前的中间证书（`openssl s_client
-connect bdu.fstec.ru:443 | openssl x509 -noout -ext authorityInfoAccess`）。
`curl -k` 也能获取该文件，但会跳过对您即将输入到安全报告中的内容的验证。

### NIST NVD

每年一个文件，`nvdcve-2.0-<year>.json.gz`，从 2002 年到当前年份。将您需要的文件放在同一个目录中：

```bash
mkdir -p /var/lib/enodia/cve/nvd && cd /var/lib/enodia/cve/nvd
for y in $(seq 2002 "$(date +%Y)"); do
  curl -fsSLO "https://nvd.nist.gov/feeds/json/cve/2.0/nvdcve-2.0-$y.json.gz"
done
```

当前年份的文件每天更新；较早年份的文件很少变化。每个文件都有一个 `.meta` 附属文件（`nvdcve-2.0-<year>.meta`），其中包含文件大小和 `sha256`——注意该哈希值是针对*未压缩*的 JSON，而不是 `.gz` 文件。

### Debian Security Tracker

一个文件，即跟踪器的完整 JSON 导出（约 80 MB），用于 `debian` 目标：

```bash
curl -fsSL -o /var/lib/enodia/cve/debian.json \
  https://security-tracker.debian.org/tracker/data/json
```

`.json.gz` 和 `.json.zip` 副本同样可用。

### 厂商 OVAL

您的机群中每个发行版本一个文件，全部放在同一个目录中，用于 `ubuntu`、`linuxmint`、`rhel`、`rocky-linux`、`almalinux`、`oracle-linux`、`astra-linux` 和 `redos` 目标：

| 目标 | 文件 |
|---|---|
| Ubuntu、Linux Mint（其 Ubuntu 基础） | `https://security-metadata.canonical.com/oval/com.ubuntu.<codename>.usn.oval.xml.bz2` |
| RHEL **和 Rocky Linux** | `https://security.access.redhat.com/data/oval/v2/RHEL<N>/rhel-<N>.oval.xml.bz2` |
| AlmaLinux | `https://security.almalinux.org/oval/org.almalinux.alsa-<N>.xml.bz2` |
| Oracle Linux | `https://linux.oracle.com/security/oval/com.oracle.elsa-ol<N>.xml.bz2` |
| Astra Linux SE 1.7、1.8 | `https://dl.astralinux.ru/astra/oval/<1.7\|1.8>_x86-64/oval-definitions-alse-<1.7\|1.8>.xml` |
| RED OS 7.3、8.0 | `https://redos.red-soft.ru/support/secure/<7.3\|8.0>/redos.xml` |

```bash
mkdir -p /var/lib/enodia/cve/oval && cd /var/lib/enodia/cve/oval
curl -fsSLO https://security-metadata.canonical.com/oval/com.ubuntu.noble.usn.oval.xml.bz2
curl -fsSLO https://security.access.redhat.com/data/oval/v2/RHEL9/rhel-9.oval.xml.bz2
curl -fsSL -o redos-8.0.xml https://redos.red-soft.ru/support/secure/8.0/redos.xml
```

文件按发布原样使用，`.xml` 或 `.xml.bz2` 均可。一个文件对应哪个发行版本是从其内容中读取的，从不根据文件名判断——因此两个都以 `redos.xml` 发布的 RED OS 文件，只需在磁盘上使用不同的名称即可。有两种文件会被有意拒绝，并给出一条指明应改用哪个文件的错误：

- **Rocky Linux 自己的 OVAL**（`org.rockylinux.rlsa-<N>.xml`）——它只包含 Rocky 公告中的一小部分，并且无法通过 OVAL 模式校验。Rocky 以相同的版本号重新构建 Red Hat 的软件包，因此 Rocky 主机与 Red Hat 的文件进行匹配。
- **Ubuntu 的 `oci.` 变体**——它用正则表达式检查 dpkg 状态文件，而不是检查软件包。

所有 URL 均已于 2026-10-02 实际验证。

### Alpine secdb

您的机群中每个 Alpine 分支两个文件，`main` 和 `community`，用于 `alpine-linux` 目标。它们在各分支之间同名，因此请以不同的名称保存：

```bash
mkdir -p /var/lib/enodia/cve/alpine && cd /var/lib/enodia/cve/alpine
for b in v3.20 v3.22; do
  for r in main community; do
    curl -fsSL -o "$b-$r.json" "https://secdb.alpinelinux.org/$b/$r.json"
  done
done
```

### MariaDB 自己的 CVE 表

一个文件，用于 `mariadb` 目标：MariaDB 自己的页面“Security Vulnerabilities (CVE) Fixed in MariaDB Community Server”，按原样以其 Markdown 源文件保存（约 320 KB）：

```bash
curl -fsSL -o /var/lib/enodia/cve/mariadb.md \
  https://mariadb.com/docs/server/security/cve/community-server.md
```

已于 2026-10-09 实际验证。

## 配置

在 `enodia.yaml` 中添加一个 `cve:` 块——而不是在 `settings.yaml` 中，因为它改变的是评估，而不仅仅是显示：

```yaml title="enodia.yaml"
schemaVersion: 1
cve:
  bdu:
    path: /var/lib/enodia/cve/bdu/vulxml.zip
  nvd:
    path: /var/lib/enodia/cve/nvd
  debian:
    path: /var/lib/enodia/cve/debian.json
  oval:
    path: /var/lib/enodia/cve/oval
  alpine:
    path: /var/lib/enodia/cve/alpine
  mariadb:
    path: /var/lib/enodia/cve/mariadb.md
targets:
  - id: gitlab-main
    product: gitlab
    address: https://gitlab.example.com
    credentials: gitlab-token
```

| 字段 | 接受的值 |
|---|---|
| `cve.bdu.path` | `.xml`、`.zip`（按发布原样的导出文件）或 `.tar.gz`/`.tgz` |
| `cve.nvd.path` | 单个 `.json`、`.json.gz` 或 `.json.zip` 文件，或包含此类文件的目录 |
| `cve.debian.path` | 跟踪器的导出文件：`.json`、`.json.gz` 或 `.json.zip` |
| `cve.oval.path` | 一个 OVAL 文件（`.xml` 或 `.xml.bz2`），或包含此类文件的目录 |
| `cve.alpine.path` | 一个 secdb `.json` 文件，或包含此类文件的目录 |
| `cve.mariadb.path` | MariaDB 的 `community-server.md`，按原样保存 |

相对路径相对于引用它们的配置文件所在目录进行解析，与 `credentials_file` 相同。该块从本次运行实际使用的配置中读取——
`--config`、`$ENODIA_CONFIG`，或[默认搜索路径](/zh-cn/configuration/#文件位置)。这也包括 `check --from inventory.jsonl`：在封闭网络内部收集的清单，无论 `check` 在何处运行都会进行关联，只要在那里能找到带有 `cve:` 块的配置即可。如果完全找不到配置，`check --from` 仍然可以工作，只是没有 CVE。

**配置的路径不存在会被视为错误**，而不是被静默跳过——`check` 会以 `stat ...: no such file or directory`
退出，而不是生成一份悄无声息地不含任何 CVE 的报告。从 2.1 开始，`enodia config validate` 也会检查每个配置的路径是否存在，因此拼写错误会首先在那里暴露出来。文件能否真正被解析，仍然只有在运行时加载它时才能知道。

:::caution[Windows 路径]
Windows 路径请不加引号书写，或使用单引号、正斜杠，或写成 UNC 路径。在 YAML 的**双**引号中，
`\t` 和 `\n` 会变成制表符和换行符——`"C:\tmp\bdu.zip"` 会悄无声息地指向别处，因此 enodia
会在加载时拒绝包含控制字符的路径，并给出提示。
:::

## 首次运行与缓存

BDU 和 NVD 以流式方式解析，结果缓存在操作系统的缓存目录中（`$XDG_CACHE_HOME/enodia/cve`，即 Linux 上默认为 `~/.cache/enodia/cve`；macOS 上为 `~/Library/Caches/enodia/cve`；
Windows 上为 `%LocalAppData%\enodia\cve`）。文件变化后的首次运行会完整解析它——全部 NVD 加上 BDU
大约需要一分钟；2026-09-23 仅用 BDU 加 NVD 的 2026 年文件实测为 25 秒。之后的每次运行都读取缓存：同样的数据只需 0.2 秒，缓存大小为 11 MB。缓存没有 TTL——它以文件本身（大小和修改时间）以及 enodia
自己的产品表为键，因此替换文件、向 NVD 目录添加一个年份，或升级 enodia，都会各自触发重建。

解析后的 OVAL 也以同样方式缓存——同时解析 Ubuntu noble、RHEL 9、AlmaLinux 9 和 Oracle Linux 9 的文件约需 11 秒，其中大部分时间花在 bzip2 上。Debian 跟踪器的导出（解析约需一秒）和 Alpine 的 secdb（几百 KB）不做缓存。同时配置所有来源时（BDU、NVD、Debian、八个 OVAL 文件、Alpine），上游测得 `check` 冷启动约 22 秒、热启动约 3.4 秒，内存峰值为 0.5–0.6 GB——如果 `cve.oval.path` 中只放您实际运行的版本，则会更少。

`enodia serve` 在每个 `--interval` 周期都会重新读取 `cve:` 块和文件（从缓存中读取，开销很小），因此通过 cron 替换文件后无需重启服务器即可生效。

## 发现结果显示在哪里

- **`check`**——[`compact` 和 `drift` 视图](/zh-cn/views/)中的 `CVES` 列：影响该确切版本的不同 CVE 的数量。
  `-` 表示没有发现——没有影响该版本的 CVE、没有 `cve:` 块，或 enodia 未匹配该产品（见下文）；该列本身始终存在。`lifecycle` 和 `fleet` 不带有该列。
- **`export --format html`**——同样的列，附带一个信息链接，用于打开按目标划分的列表：每个 CVE 一行，最严重的排在最前，带有指向 NVD、cve.org 的链接，对于 BDU 的发现还带有 bdu.fstec.ru 页面的链接；当 BDU 收录了该 CVE 时使用 BDU 的俄文文本，否则使用 NVD 的英文描述；评分以彩色徽章显示，例如 `CRITICAL · CVSS 3.1 9.8`。软件包级发现则是每个软件包一行——`linux 6.12.107-1 → 6.12.111-1`，链接到包含该修复的公告，其 CVE 列表折叠在下方。它是纯 CSS 实现——默认的离线报告仍然完全不包含 JavaScript。
- **`export --format json`**——在每条评估结果的 `cves` 数组下完整列出每个来源的每项发现：来源（`bdu`/`nvd`）、公告 ID、CVE ID、标题、来源自身的严重级别文本、匹配到的产品名称或 CPE、版本范围，以及解析出的 CVSS 评分。与表格和 HTML 列表按每个 CVE 一行计数不同，JSON 会分别保留每个来源的发现——同一个 CVE 可能来自 BDU 出现一次，并且每个匹配的 NVD CPE 各出现一次。软件包级发现（来源为 `debian`、`oval` 或 `alpine`）还带有已安装版本和修复版本——请参阅[报告](/zh-cn/reporting/#--format-json)。
- **`export --format prometheus`**——不包含 CVE 数据。

**CVE 不影响严重级别或退出码。** `SEVERITY` 仍然仅根据补丁/生命周期/分支维度计算，`--fail-on`
也只认识这三个维度——一项发现是需要您查看的事实，而不是 enodia 代您做出的判定。CVE 是否以及如何提升严重级别，在上游仍是一个悬而未决的问题。

## 哪些产品会被匹配

96 个产品中的 64 个：54 个按产品名称与 BDU 和 NVD 匹配（MariaDB 还会与它自己的表匹配——见[下文](#mariadb-the-vendors-own-table)），每个厂商/产品名称都已对照真实的完整导出文件逐字核对；另有 10 个 Linux 发行版按已安装的软件包匹配（见下一节）。各产品的来源请参阅[产品配置](/zh-cn/products/)下各自的页面。

未匹配的产品，各有原因：

- **其他通用 Linux 发行版**（Fedora、CentOS Stream、Amazon Linux、openSUSE 等）——它们的 CVE 是软件包漏洞，发行版版本号无法说明此后哪些软件包已经打过补丁，而且目前还没有针对它们的软件包级数据源。
- **各 BSD 系统和 Oracle Solaris**——NVD 将它们的补丁级别（FreeBSD 的 `-p5`、OpenBSD 的 errata）记录在该匹配器不读取的 CPE 字段中；仅按发行版本匹配，会让一台完全打好补丁的主机被标记出该版本中曾经修复过的所有 CVE。
- **ESXi 和 vCenter**——同样的问题：它们几乎所有条目都是 `7.0` + `update_1` 式的字面值。
- **Synology DSM**——诸如 `6.2.4-25556-3` 之类的边界值会被严格的范围解析器拒绝。
- **TrueNAS**——条目太少，且版本编号方式与探针报告的不同。
- **两个来源中都没有可用数据**——Kitsu、Zou、postgres_exporter、Perforce Proxy、Perforce Helix Swarm。
- **`generic`**——手写的解析器没有可供查询的产品标识。
- **尚未映射**——pfSense 和三个 BMC 探针（Supermicro、Dell iDRAC、HP iLO 4），均为 2.1 新增。上游将它们的 CVE 映射留给之后专门的一轮工作。

## Linux 发行版的软件包级 CVE

发行版版本号无法说明主机上哪些软件包此后已打过补丁，因此这十个发行版改为按已安装的软件包进行匹配。它们的探针在读取版本本身的同一次 SSH 往返中读取已安装的软件包和正在运行的内核，每个软件包都与其发行版自己的安全数据进行核对：

| 探针 | 来源 | 键 |
|---|---|---|
| `debian` | Debian Security Tracker | `cve.debian.path` |
| `ubuntu` | Canonical OVAL | `cve.oval.path` |
| `linuxmint` | Canonical OVAL，针对其 Ubuntu 基础 | `cve.oval.path` |
| `rhel`、`rocky-linux` | Red Hat OVAL | `cve.oval.path` |
| `almalinux` | AlmaLinux OVAL | `cve.oval.path` |
| `oracle-linux` | Oracle OVAL | `cve.oval.path` |
| `astra-linux` | Astra Linux OVAL（SE 1.7、1.8） | `cve.oval.path` |
| `redos` | RED OS OVAL（7.3、8.0） | `cve.oval.path` |
| `alpine-linux` | Alpine secdb | `cve.alpine.path` |

**只报告已有比已安装版本更新的修复的 CVE**——也就是一次升级（对于内核，还需一次重启）就能消除的那些。厂商尚未修复的 CVE 不会列出：它们在同一版本的每台主机上都相同，而且没有人能对其采取行动，只会淹没那些可以处理的发现。

**每个软件包一项发现，而不是每个 CVE 一项。** 仅一个落后的内核就可能带有一千多个 CVE；按 CVE 列出的列表将无法阅读。每项发现都会给出软件包名称、其已安装的版本、能消除其中所有 CVE 的版本，以及包含该修复的公告（USN、RHSA、ALSA、ELSA、Astra 公告、ROS，或 Debian/Alpine 跟踪页面）。`CVES` 列统计的仍然是 CVE，而不是软件包。

**版本按各包管理器自己的规则比较**——dpkg、rpm 和 apk 的排序规则，上游已分别在数千对真实版本上与 `apt_pkg`、rpm 和 apk-tools 进行了核对——此外还考虑 AppStream 模块流（软件包只与其自身模块流的修复匹配）、Oracle Linux 的架构、FIPS 和 Ksplice 变体，以及**正在运行的**内核，而不是碰巧安装的任何内核软件包。每个来源都由上游在真实主机和容器上与 `oscap oval eval`、`dnf updateinfo`、python3-apt 或 `apk version -t` 进行了交叉核对，结果完全一致。

**Proxmox VE** 的软件包级发现通过第二个目标获得：在同一台主机上，在其 API [`proxmox`](/zh-cn/configuration/products/proxmox/) 目标旁边再添加一个 SSH [`debian`](/zh-cn/configuration/products/debian/) 目标。Debian 的 `linux` 软件包只与正在运行的 Debian 内核匹配，因此 Proxmox 自己的内核不会被误认为 Debian 内核。

### 区分版本类型的匹配

GitLab、HashiCorp Vault、Nextcloud 和 MongoDB 为其社区版和企业版分别发布 CVE 列表。它们的探针会将服务器自身的版本类型记录在 `extra.enterprise` 中，社区版实例不会再看到仅限企业版的发现——在真实数据上，GitLab 19.2.2 CE
只看到 NVD 9 项中的 4 项，Nextcloud 27.1.3 CE 看到 23 项中的 11 项。当版本类型未知时（不报告该信息的较旧服务器），所有发现都会保留。

### SSH

[`ssh`](/zh-cn/configuration/products/ssh/) 探针覆盖任何 SSH 实现，因此按横幅（banner）进行匹配：
`OpenSSH_…` 查询 OpenSSH，`dropbear_…` 查询 Dropbear，其他任何 SSH 实现都不进行查询，而不是借用 OpenSSH 的 CVE。

## MariaDB：厂商自己的表

MariaDB 同时维护五到六个发布系列，而 BDU 和 NVD 都把某个系列中的修复描述为一个开放式范围（“before 11.4.10”）——这个范围随后也覆盖了所有更旧的系列，包括那些从未存在该缺陷的系列。在真实机群的版本上，这会把仍在维护的系列中最新、已完全修补的版本（10.11.19、11.4.13）标记出来，而同样这两个数据库却漏掉了 MariaDB 自己为 10.11.8 列出的 21 个 CVE 中的 9 个。

`cve.mariadb.path` 加入了 MariaDB 自己的已修复 CVE 表，该表**按系列**给出包含修复的版本。它与 BDU 和 NVD 合并，并在此之上附加一条规则：对于 MariaDB 的表中列出的 CVE，以它的结论为准——如果某个 BDU 或 NVD 发现所涉及的 CVE 都在表中，而表并未针对此版本标记它们，该发现就会被丢弃。表中未列出的 CVE（比您下载的副本更新的、仅见于 BDU 的，或没有 CVE 编号的）仍来自 BDU 和 NVD。

该表的解读方式：

- 有自己修复的系列，从其首个版本直到该修复之前都受影响。
- 没有自己的修复、但在该 CVE 于其他系列中被修复时仍在维护的系列，不受影响——MariaDB 会同时修复所有仍在维护的系列。
- 当时已经结束维护的系列，其每个版本都会被标记，并以更新系列中最低的修复版本作为应升级到的版本（`FixStatus` 会注明这一点）。这是有意偏向于报告，而且只针对已结束的系列。

没有 `cve.mariadb.path` 时，`mariadb` 目标仍只与 BDU 和 NVD 进行匹配——并存在上述重叠问题。

## 已知限制

- **BDU 可能跨分支过度报告。** 一个 BDU 条目通常为每个维护分支列出一个单独的范围，而它们共用同一个下界，因此一个在其自身分支上已是修复版本的版本，仍可能落入某个兄弟分支更宽的范围内（Confluence 8.3.3 对照
  CVE-2023-22515 就是有记录的例子）。NVD 针对同一 CVE 的范围带有各自的下界，因此没有这个问题。enodia
  有意倾向于报告一项需要复核的发现，而不是悄无声息地漏掉一个真实的漏洞。
- **完全没有版本约束的 NVD 条目会被丢弃。** 对照完整导出文件测量，这类条目几乎全是附加到当前版本上的、几十年前的 CVE；代价是偶尔会漏掉以这种方式记录的、真正未修复的 CVE。
- **软件包级覆盖也有其自身的缺口。** Debian 跟踪器只覆盖 Debian 安全团队仍在支持的版本（bookworm、trixie、testing、sid）——更旧的主机不会有任何软件包级发现。Alpine edge 没有编号分支，同样不会有发现。OVAL 并没有作为完整的解释器来求值：不检查软件包签名密钥，因此一个与发行版软件包同名的第三方软件包会被当作发行版自己的软件包进行比较。Astra Linux 的内核软件包按已安装的版本比较，而不是按正在运行的版本。
- **NVD 的多产品条件**（“仅在使用库 Y 时存在漏洞”）不会被评估——探针为每个目标报告一个产品，因此匹配产品的每个易受攻击条目都会单独计数。
