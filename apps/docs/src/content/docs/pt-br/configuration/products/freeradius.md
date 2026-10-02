---
title: FreeRADIUS
description: Como configurar o enodia para sondar o FreeRADIUS via SSH.
---

Uma sonda SSH: ela faz login e executa o próprio `-v` do servidor. A porta
padrão é `22`, sem esquema — o mesmo mecanismo SSH, as mesmas credenciais
e a mesma verificação da chave do host da família de
[identificação de SO via SSH](/pt-br/configuration/products/ssh-os-probes/).

```yaml
targets:
  - id: radius-01
    product: freeradius
    address: radius-01.example.com
    credentials: linux-host-ssh
```

## Por que SSH

O RADIUS não tem troca de versão, e a resposta Status-Server do
FreeRADIUS também não — os seus dicionários definem contadores de
estatísticas, e nenhum atributo de versão. Então a versão só pode vir do
próprio binário do servidor. A sonda tenta `freeradius` (Debian/Ubuntu) e
`radiusd` (família RHEL, builds a partir do código-fonte), pelo nome e
depois pelo caminho em `/usr/sbin`, já que o `PATH` de uma sessão SSH sem
login muitas vezes não inclui `/usr/sbin`.

## Autenticação — obrigatória

Uma credencial SSH, `ssh-key` ou `password` — consulte
[Configuração → Credenciais](/pt-br/configuration/#credenciais).

## FreeRADIUS em um contêiner

Quando o FreeRADIUS roda no Docker ou no Podman e o próprio host não tem
o binário, indique o contêiner em `options` — o comando passa então a
rodar por meio de `docker exec` (ou `podman exec`):

```yaml
targets:
  - id: radius-01
    product: freeradius
    address: radius-01.example.com
    credentials: linux-host-ssh
    options:
      container: freeradius          # o nome do contêiner
      container_runtime: podman      # opcional: docker (padrão) ou podman
```

O usuário SSH precisa ter permissão para usar esse runtime. O nome do
contêiner é verificado contra o próprio padrão de nomes do Docker antes de
entrar no comando remoto.

## Campos registrados

- `version` — por exemplo `3.2.10`, de `FreeRADIUS Version 3.2.10 (git #9071ea041)`
- `extra.git` — o hash git do build, quando presente
- `extra.container` — o nome do contêiner, quando `options.container` está definido
- `extra.hostKeyVerified`

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/)
está configurado. Ambos são seguidos como publicados: o intervalo do NVD
para o BlastRADIUS (CVE-2024-3596) só cobre as versões anteriores à
3.0.27, sem nada para o branch 3.2 (corrigido na 3.2.5), então um host
3.2.3 não recebe achado para ela.

## Resolvedor de ciclo de vida

`github-tag-branches:FreeRADIUS/freeradius-server`. O endoflife.date não
tem página do FreeRADIUS (404 confirmado), e o FreeRADIUS mantém o 3.0.x e
o 3.2.x lado a lado, marcando as versões com tags como `release_3_2_10`.
Este tipo de resolvedor lê as tags como **um ciclo de vida por branch
major.minor**, cada um com a sua tag mais recente, então um 3.0.28
totalmente atualizado aparece como `current` no seu branch, com um branch
mais novo disponível — e não como "atrás da 3.2.10". Só é lida a página
máxima de 100 tags do GitHub; como os outros resolvedores do GitHub, ele
não traz datas de EOL, e o `GITHUB_TOKEN` eleva o seu limite de
requisições (consulte [Produtos suportados](/pt-br/products/)).
