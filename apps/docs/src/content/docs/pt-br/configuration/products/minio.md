---
title: MinIO
description: Como configurar o enodia para sondar o MinIO via SSH.
---

Uma sonda SSH: ela faz login e executa o próprio `--version` do binário
do servidor — `minio` pelo nome, depois `/usr/local/bin/minio`. A porta
padrão é `22`, sem esquema — o mesmo mecanismo SSH, as mesmas credenciais
e a mesma verificação da chave do host da família de
[identificação de SO via SSH](/pt-br/configuration/products/ssh-os-probes/).

```yaml
targets:
  - id: minio-01
    product: minio
    address: minio-01.example.com
    credentials: linux-host-ssh
```

## Por que SSH

O MinIO não informa a versão anonimamente em nenhuma superfície de rede:
o cabeçalho `Server` da API S3 é um simples `MinIO`, o `/api/v1/login`
anônimo do Console retorna apenas a estratégia de login, e a API de
administração e as métricas do Prometheus exigem uma chave de
administrador ou um token bearer gerado com o `mc`.

## MinIO em um contêiner

Quando o MinIO roda no Docker ou no Podman e o próprio host não tem o
binário, indique o contêiner em `options` — o comando passa então a rodar
por meio de `docker exec` (ou `podman exec`):

```yaml
targets:
  - id: minio-01
    product: minio
    address: minio-01.example.com
    credentials: linux-host-ssh
    options:
      container: minio               # o nome do contêiner
      container_runtime: podman      # opcional: docker (padrão) ou podman
```

O usuário SSH precisa ter permissão para usar esse runtime. O nome do
contêiner é verificado contra o próprio padrão de nomes do Docker antes de
entrar no comando remoto.

## Nomes de lançamento como versões

O MinIO nomeia os lançamentos por timestamp UTC —
`RELEASE.2025-10-15T17-29-55Z` — tanto no `--version` quanto nas suas
tags do GitHub. O enodia converte esse nome, com ou sem um `_<MARKER>`
depois de `RELEASE` (builds internos dizem `RELEASE_INHOUSE.…`), em um
`2025.10.15.17.29.55` comparável, tanto na versão observada quanto na tag
do resolvedor.

## Autenticação — obrigatória

Uma credencial SSH, `ssh-key` ou `password` — consulte
[Configuração → Credenciais](/pt-br/configuration/#credenciais).

## Campos registrados

- `version` — por exemplo `RELEASE_INHOUSE.2025-03-12T18-04-18Z`, de
  `minio version RELEASE_INHOUSE.2025-03-12T18-04-18Z (commit-id=…)`
- `extra.build` — o marcador depois de `RELEASE_` em um build que não é
  o upstream, por exemplo `INHOUSE`
- `extra.commit` — o `commit-id`, quando presente
- `extra.runtime` — o runtime Go da linha `Runtime:`, por exemplo
  `go1.24.4`
- `extra.container` — o nome do contêiner, quando `options.container` está definido
- `extra.hostKeyVerified`

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/)
está configurado. Ambas as fontes escrevem os seus limites como
timestamps de lançamento (`2025-10-15t17-29-55z`, em qualquer caixa),
convertidos para a mesma forma pontuada da versão sondada, para que as
duas possam ser comparadas; um limite dado como data simples continua não
sendo interpretado.

## Resolvedor de ciclo de vida

`github:minio/minio` — o endoflife.date não tem página do MinIO (404
confirmado), então a resolução é feita pelos GitHub Releases: apenas a
tag publicada mais recente que não seja pré-lançamento, sem datas de
eol/support/lts. O repositório está arquivado: o último lançamento da
edição comunitária é `RELEASE.2025-10-15T17-29-55Z`, que é com o que um
MinIO passa a ser comparado daqui em diante.
