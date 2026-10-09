---
title: Uptime Kuma
description: Como configurar o enodia para sondar o Uptime Kuma.
---

Faz login pela própria API socket.io do Uptime Kuma e lê a versão do
evento `info` que o servidor envia após o login.

```yaml
targets:
  - id: uptime-kuma-main
    product: uptime-kuma
    address: https://uptime-kuma.example.com
    credentials: kuma-monitor
```

## Por que um login

Nada anônimo traz a versão. O evento `info` do servidor a traz, mas uma
conexão nova o recebe sem ela até que o socket esteja logado. `/metrics`
não tem nenhuma série de versão, e as chaves de API abrem apenas
`/metrics`. Confirmado ao vivo na 1.23.17 e na 2.5.5, e na página de
status pública de uma instância de produção, cujos `/api/status-page/*` e
socket também não a trazem.

Por isso a sonda fala apenas o suficiente do transporte HTTP
long-polling do Engine.IO v4 (`/socket.io/?EIO=4&transport=polling`) para
abrir uma sessão, emitir `login` e consultar até chegar um evento `info`
com `version` — e então se desconecta. A 1.23.17 envia o `info` com
versão depois da confirmação do login, a 2.5.5 antes dela; as duas ordens
são tratadas.

## Autenticação — obrigatória

Um nome de usuário e uma senha, `kind: password`:

```yaml
credentials:
  kuma-monitor:
    kind: password
    username: monitor
    password: "${UPTIME_KUMA_PASSWORD}"
```

Apenas `password` é aceito; qualquer outro tipo é um erro de
configuração. Consulte
[Configuração → Credenciais](/pt-br/configuration/#credenciais).

- Um login recusado é uma falha de autenticação que traz a própria
  mensagem do Uptime Kuma (`Incorrect username or password.`).
- **Um usuário com 2FA não consegue fazer login desta forma** — a
  confirmação do login pede um token. Isso é relatado, não contornado:
  use um usuário de monitoramento sem 2FA.
- O Uptime Kuma limita a taxa de logins: uma execução logo após várias
  senhas erradas falhou uma vez na 2.5.5, e passou em todas as execuções
  seguintes.
- Um Uptime Kuma em HTTP simples exige `allow_insecure_transport`, como
  para qualquer credencial — consulte
  [HTTPS primeiro](/pt-br/concepts/#https-primeiro-credenciais-nunca-enviadas-em-texto-claro-por-padrão).

## Campos registrados

- `version` — por exemplo `2.5.5`
- `extra.latestVersion` — a verificação de atualizações do próprio
  Uptime Kuma, por exemplo `2.5.5`
- `extra.dbType` — por exemplo `sqlite`

## Correlação de CVEs

Correlacionado com o NVD quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`github:louislam/uptime-kuma` — o endoflife.date não tem um calendário do
Uptime Kuma (404 confirmado), então a resolução é feita pelos GitHub
Releases: apenas a tag publicada mais recente que não seja pré-lançamento,
sem datas de eol/support/lts (o GitHub não tem opinião sobre política de
ciclo de vida, apenas sobre "qual é o lançamento mais recente").
