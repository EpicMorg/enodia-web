---
title: Apache Kafka
description: Como configurar o enodia para sondar o Apache Kafka.
---

Uma sonda SSH: ela faz login no host do broker e lê a versão do próprio
`kafka_<scala>-<version>.jar` do broker. A porta padrão é `22`, sem
esquema — o mesmo mecanismo SSH, as mesmas credenciais e a mesma
verificação da chave do host da família de
[identificação de SO via SSH](/pt-br/configuration/products/ssh-os-probes/).
`product: apache-kafka` é aceito como alias.

```yaml
targets:
  - id: kafka-01
    product: kafka
    address: kafka-01.example.com
    credentials: linux-host-ssh
```

## Por que SSH

A única troca anônima do protocolo Kafka, ApiVersions, lista intervalos
de versões da API e nenhuma versão do software. O JMX a traz
(`kafka.server:type=app-info`), mas o JMX é Java RMI sobre serialização
Java — uma pilha de protocolos da JVM, não algo que o enodia
reimplementaria por uma única string — e a porta fica desligada, a menos
que o operador a ative. Via SSH, o jar do broker informa a versão.

## Como a versão é encontrada

Toda distribuição traz `kafka_<scala>-<version>.jar` no seu diretório de
bibliotecas — na imagem da Apache, `/opt/kafka/libs/kafka_2.13-4.3.1.jar`;
no cp-kafka da Confluent, `/usr/share/java/kafka/kafka_2.13-8.3.2-ccs.jar`.
A sonda o procura em `$KAFKA_HOME`, `/opt/kafka`, `/opt/bitnami/kafka`,
`/usr/local/kafka` e `/usr/share/java/kafka`, e o nome do jar é o que ela
registra. `kafka-topics.sh --version` (ou `kafka-topics --version`) a
partir do `PATH` — uma inicialização da JVM, alguns segundos — é o
recurso para uma instalação em outro lugar.

## Kafka em um contêiner

Quando o Kafka roda no Docker ou no Podman e o próprio host não tem a
instalação, indique o contêiner em `options` — o comando passa então a
rodar por meio de `docker exec` (ou `podman exec`):

```yaml
targets:
  - id: kafka-01
    product: kafka
    address: kafka-01.example.com
    credentials: linux-host-ssh
    options:
      container: kafka               # o nome do contêiner
      container_runtime: podman      # opcional: docker (padrão) ou podman
```

O usuário SSH precisa ter permissão para usar esse runtime. O nome do
contêiner é verificado contra o próprio padrão de nomes do Docker antes de
entrar no comando remoto.

## Confluent Platform

Os builds da Confluent Platform (`8.3.2-ccs`, `-ce`) são numerados na
linha própria da Confluent: desde a 7.0, a CP x.y traz o Apache Kafka
(x-4).y (7.6 → 3.6, 8.3 → 4.3; antes da 7.0 isso não valia — a 6.0 era a
2.6), mas os números de patch são da própria Confluent. Esse build é
informado como está, com edição `confluent`, e para a 7.0 em diante a
linha do Apache Kafka que ele traz vai para `extra.apacheKafka`. O patch
não é mapeado — isso seria inventar uma versão.

## Autenticação — obrigatória

Uma credencial SSH, `ssh-key` ou `password` — consulte
[Configuração → Credenciais](/pt-br/configuration/#credenciais).

## Campos registrados

- `version` — por exemplo `4.3.1`, de `/opt/kafka/libs/kafka_2.13-4.3.1.jar`;
  `8.3.2-ccs` para um build da Confluent
- `edition` — `confluent` para um build `-ccs`/`-ce`, ausente caso
  contrário
- `extra.apacheKafka` — o major.minor do Apache Kafka que um build
  Confluent 7.0+ traz, por exemplo `4.3`
- `extra.container` — o nome do contêiner, quando `options.container` está definido
- `extra.hostKeyVerified`

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/)
está configurado. Um build da Confluent Platform não é consultado: a sua
numeração própria seria comparada como mais nova que todos os limites do
Apache Kafka, e a versão Apache que ele traz só é conhecida até o
major.minor — o que não basta para uma correção em nível de patch.

## Resolvedor de ciclo de vida

`endoflife:apache-kafka`. O endoflife.date não tem um calendário da
Confluent Platform.
