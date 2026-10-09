---
title: Apache Kafka
description: 配置 enodia 探测 Apache Kafka。
---

一个 SSH 探针：它登录到 broker 所在的主机，从 broker 自己的 `kafka_<scala>-<version>.jar` 中读取版本。端口默认为 `22`，不带协议前缀——与[基于 SSH 的操作系统识别](/zh-cn/configuration/products/ssh-os-probes/)系列使用相同的 SSH 机制、凭据和主机密钥校验。`product: apache-kafka` 作为别名同样接受。

```yaml
targets:
  - id: kafka-01
    product: kafka
    address: kafka-01.example.com
    credentials: linux-host-ssh
```

## 为什么用 SSH

Kafka 协议唯一的匿名交换 ApiVersions 列出的是 API 版本范围，不含软件版本。JMX 确实带有版本（`kafka.server:type=app-info`），但 JMX 是基于 Java 序列化的 Java RMI——一整套 JVM 协议栈，不值得为了一个字符串让 enodia 重新实现——而且除非运维人员主动开启，该端口是关闭的。通过 SSH，broker 的 jar 文件名就给出了版本。

## 如何找到版本

每个发行版都会在其 libs 目录中附带 `kafka_<scala>-<version>.jar`——Apache 的镜像中是 `/opt/kafka/libs/kafka_2.13-4.3.1.jar`，Confluent 的 cp-kafka 中是 `/usr/share/java/kafka/kafka_2.13-8.3.2-ccs.jar`。探针会在 `$KAFKA_HOME`、`/opt/kafka`、`/opt/bitnami/kafka`、`/usr/local/kafka` 和 `/usr/share/java/kafka` 下查找它，并记录该 jar 的文件名。对于安装在其他位置的情况，回退方案是从 `PATH` 中运行 `kafka-topics.sh --version`（或 `kafka-topics --version`）——需要启动一次 JVM，耗时几秒。

## 运行在容器中的 Kafka

当 Kafka 运行在 Docker 或 Podman 中、而主机本身没有安装时，请在 `options` 中指定容器名称——命令随后会通过 `docker exec`（或 `podman exec`）运行：

```yaml
targets:
  - id: kafka-01
    product: kafka
    address: kafka-01.example.com
    credentials: linux-host-ssh
    options:
      container: kafka               # 容器名称
      container_runtime: podman      # 可选：docker（默认）或 podman
```

SSH 用户必须有权使用该运行时。容器名称在放入远程命令之前，会先按 Docker 自己的名称规则进行校验。

## Confluent Platform

Confluent Platform 的构建（`8.3.2-ccs`、`-ce`）按 Confluent 自己的版本线编号：自 7.0 起，CP x.y 附带 Apache Kafka (x-4).y（7.6 → 3.6，8.3 → 4.3；7.0 之前并不成立——6.0 对应 2.6），但补丁号是 Confluent 自己的。这样的构建会按原样报告，版本类型为 `confluent`；对于 7.0 及以后的版本，它所附带的 Apache Kafka 版本线会写入 `extra.apacheKafka`。补丁号不做映射——那等于凭空捏造一个版本。

## 身份验证 — 必需

一个 SSH 凭据，`ssh-key` 或 `password`——参见[配置 → 凭据](/zh-cn/configuration/#凭据)。

## 记录的字段

- `version` — 例如 `4.3.1`，来自 `/opt/kafka/libs/kafka_2.13-4.3.1.jar`；Confluent 构建则为 `8.3.2-ccs`
- `edition` — `-ccs`/`-ce` 构建为 `confluent`，否则不存在
- `extra.apacheKafka` — Confluent 7.0+ 构建所附带的 Apache Kafka major.minor，例如 `4.3`
- `extra.container` — 容器名称（设置了 `options.container` 时）
- `extra.hostKeyVerified`

## CVE 关联

配置了 [`cve:` 块](/zh-cn/cve/)时，会与 NVD 和 BDU FSTEC 进行匹配。Confluent Platform 构建不进行查找：它自己的编号在比较时会比所有 Apache Kafka 版本界限都新，而它所附带的 Apache 发布版本只知道到 major.minor——不足以判断补丁级别的修复。

## 生命周期解析器

`endoflife:apache-kafka`。endoflife.date 没有 Confluent Platform 的日历。
