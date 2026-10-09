---
title: qBittorrent
description: Como configurar o enodia para sondar o qBittorrent.
---

Lê a versão pela API da Web UI do qBittorrent: faz login com
`POST /api/v2/auth/login`, depois lê `GET /api/v2/app/version` e
`GET /api/v2/app/buildInfo` com o cookie de sessão, e faz logout.

```yaml
targets:
  - id: qbittorrent-main
    product: qbittorrent
    address: https://qbittorrent.example.com
    credentials: qbittorrent-monitor
```

## Autenticação

Opcional, mas geralmente necessária: a Web UI responde a tudo, inclusive
`/`, com `401` sem sessão (confirmado ao vivo em
`linuxserver/qbittorrent` 5.2.4). É um login por formulário (campos
`username` e `password`), não HTTP Basic, então o tipo é `password`:

```yaml
credentials:
  qbittorrent-monitor:
    kind: password
    username: monitor
    password: "${QBITTORRENT_PASSWORD}"
```

Apenas `password` é aceito; qualquer outro tipo é um erro de
configuração. Consulte
[Configuração → Credenciais](/pt-br/configuration/#credenciais).

Sem credenciais, a sonda consulta `/api/v2/app/version` diretamente —
para uma Web UI configurada para dispensar a autenticação na sub-rede da
sonda. Se isso responder `401`, o erro diz para configurar credenciais.

Qualquer cookie de sessão definido pelo login é devolvido como está: a
5.x responde `204` e define `QBT_SID_<port>`, a 4.x responde `200 Ok.` e
define `SID`. Uma senha errada é `401` na 5.x e `200 Fails.` na 4.x;
ambos são relatados como falha de autenticação.

## Atrás de um proxy reverso

O qBittorrent verifica se a porta do cabeçalho `Host` corresponde à sua
própria e se `Referer`/`Origin` corresponde a `Host`. O login envia a
origem do próprio alvo como `Referer`. Atrás de um proxy reverso que
remapeia portas, o qBittorrent precisa ser configurado para isso — caso
contrário, toda requisição é `401`, que foi o que uma captura ao vivo
através de uma porta de contêiner remapeada mostrou até as portas
coincidirem.

## Campos registrados

- `version` — `/api/v2/app/version` sem o `v` inicial, por exemplo
  `5.2.4`
- `extra.libtorrent` — de `/api/v2/app/buildInfo`, por exemplo `2.0.15.0`
- `extra.qt` — de `/api/v2/app/buildInfo`, por exemplo `6.11.2`

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`github:qbittorrent/qBittorrent` — o endoflife.date não tem um calendário
do qBittorrent (404 confirmado), então a resolução é feita pelos GitHub
Releases: apenas a tag publicada mais recente que não seja pré-lançamento,
sem datas de eol/support/lts (o GitHub não tem opinião sobre política de
ciclo de vida, apenas sobre "qual é o lançamento mais recente"). Os
lançamentos têm tags como `release-5.2.4`; o resolvedor remove o prefixo
`release-` e lê o resto como a versão.
