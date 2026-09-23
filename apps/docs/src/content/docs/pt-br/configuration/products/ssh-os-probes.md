---
title: Identificação de SO via SSH
description: Como funciona a família de sondas SSH/os-release/uname do enodia — compartilhada por 30 produtos de sistema operacional.
---

30 dos produtos do enodia — todas as distribuições Linux, FreeBSD, OpenBSD,
NetBSD, macOS, Oracle Solaris, OPNsense e o CentOS legado — são
identificados via **SSH**, não via HTTP. Esta página explica o mecanismo
compartilhado uma única vez; a página de cada SO (com link em
[Produtos suportados](/pt-br/products/)) informa apenas o seu valor
específico de `product:`, o campo de identidade exato usado na
correspondência e o seu resolvedor de ciclo de vida.

## Como funciona

Uma conexão SSH, um comando, uma desconexão — isto não é um cliente de
execução remota de uso geral, apenas o suficiente para ler um único fato
de identidade:

- **21 produtos** leem `/etc/os-release` (o arquivo de identidade
  padronizado pelo systemd que toda distribuição Linux moderna traz, além
  do próprio `/var/run/os-release` do FreeBSD, gerado dinamicamente na
  inicialização no mesmo formato `KEY=VALUE`) e verificam o seu campo
  `ID` — um mecanismo genérico e compartilhado (`osReleaseFamilyProbe`).
- **Mais 2** ([Debian](/pt-br/configuration/products/debian/),
  [Ubuntu](/pt-br/configuration/products/ubuntu/)) também leem
  `/etc/os-release`, mas por meio de uma sonda dedicada própria em vez do
  mecanismo genérico acima — ambas as distribuições deixam `VERSION_ID`
  impreciso (o do Debian nunca traz uma point release; o do Ubuntu fica
  congelado no primeiro lançamento e nunca reflete uma point release
  posterior), então cada uma lê mais adiante para obter a versão real: o
  Debian confere `/etc/debian_version`, e o Ubuntu prefere o campo
  `VERSION` do mesmo arquivo quando ele é mais preciso. Consulte as
  páginas de cada uma para saber exatamente por quê.
- **2 produtos** (OpenBSD, NetBSD) não têm nenhum arquivo equivalente ao
  os-release — a fonte de identidade é `uname -sr` (`"<kernel name>
  <release>"`, por exemplo `"OpenBSD 7.9"`).
- **Mais 5** (Astra Linux, CentOS legado, macOS, OPNsense, Oracle
  Solaris) leem, cada um, um arquivo ou comando de identidade próprio e
  específico do produto — consulte as páginas de cada um.

`product:` é sempre declarado explicitamente e verificado contra o campo
de identidade real, nunca adivinhado a partir da resposta (o mesmo
princípio que as [sondas da Atlassian](/pt-br/configuration/products/jira/)
usam para o `<typeId>` do manifesto) — apontar um host Debian para
`product: ubuntu` é um erro real de configuração que falha de forma
explícita em vez de ser registrado como um fato errado.

## Configuração

```yaml
targets:
  - id: web-01
    product: debian          # ou qualquer outro produto de SO — veja a página dele
    address: web-01.example.com
    credentials: linux-host-ssh
    tls:
      pin_sha256:
        - "AB:CD:...:EF"      # sha256 da chave SSH do host
```

```yaml
credentials:
  linux-host-ssh:
    kind: ssh-key
    username: enodia-ro
    private_key_file: /etc/enodia/ssh/id_ed25519
```

A porta padrão é `22` quando `address` não traz uma — sem esquema, assim
como no MySQL/Redis (um `host:port` simples, não uma URL).

## Autenticação — obrigatória

Todas as sondas desta família têm `Required: true` — não existe caminho
anônimo para a identidade de um SO, ao contrário da maioria dos produtos
baseados em HTTP. Dois formatos de credencial funcionam, exatamente como
em qualquer cliente SSH:

- `kind: password` — `username` + `password`
- `kind: ssh-key` — `username` + `private_key_file` (+ `passphrase` se
  a chave estiver criptografada)

Consulte [Configuração → Credenciais](/pt-br/configuration/#credenciais)
para a referência completa dos campos.

## Verificação da chave do host

Reaproveita o mesmo bloco `tls:` que as sondas HTTPS usam para fixação de
certificado — `tls.pin_sha256` contém o SHA-256 em hexadecimal da
codificação de rede da própria chave SSH do host (não de um certificado
TLS), e `tls.insecure: true` é a mesma opção de último recurso, com o
mesmo aviso. **Sem nenhum dos dois definido, a conexão é recusada antes
que uma única credencial seja enviada.** Consulte
[Configuração → Verificação da chave de host SSH](/pt-br/configuration/#verificação-da-chave-de-host-ssh)
para a explicação completa.

## Campos registrados

Todas as sondas desta família registram:

- `version` — a partir de `VERSION_ID` (família os-release) ou da release
  do kernel (família uname); Debian e Ubuntu leem mais adiante para obter
  uma point release precisa que `VERSION_ID` sozinho não traz — consulte
  as páginas de cada um
- `extra.hostKeyVerified` — `"true"`/`"false"`, se `tls.pin_sha256`
  realmente correspondeu (aparece da mesma forma que `TLSVerified` para
  alvos HTTPS — uma auditoria de toda a frota sobre quais alvos SSH estão
  fixados)

## Um alvo sem o arquivo ou comando correspondente falha de forma explícita

Tanto `cat /etc/os-release` em um host que não tem esse arquivo quanto
`uname -sr` informando o nome de kernel errado retornam um erro claro de
"não é este produto" em vez de uma falha genérica de conexão — a sessão
SSH em si foi bem-sucedida; o que falhou foi a verificação de identidade.
