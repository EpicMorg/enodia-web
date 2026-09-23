---
title: macOS
description: Como configurar o enodia para sondar o macOS via SSH.
---

Usa o mesmo mecanismo SSH, as mesmas credenciais e a mesma verificação da
chave do host da família de [identificação de SO via SSH](/pt-br/configuration/products/ssh-os-probes/),
mas executa `sw_vers` — a forma padrão e documentada de ler a identidade
do SO de um Mac — em vez de ler um arquivo.

```yaml
targets:
  - id: mac-host
    product: macos
    address: host.example.com
    credentials: linux-host-ssh
```

## Por que `sw_vers`, e não `uname -a`

O `uname -a` do Darwin inclui o hostname da própria máquina na saída —
algo que esta sonda não tem motivo para ver nem armazenar. A saída de três
linhas `ProductName`/`ProductVersion`/`BuildVersion` do `sw_vers` não traz
nada disso. Verificado ao vivo com um Mac real (macOS 15.4,
`BuildVersion 24E248`, via SSH) — a EULA da Apple restringe a
virtualização do macOS a hardware Apple genuíno, então este foi o único
produto de toda a família SSH que precisou de um Mac físico real em vez de
um contêiner ou de uma imagem de VM para download.

Apenas `ProductName: macOS` (do 10.12 Sierra em diante) é reconhecido —
versões mais antigas informavam `"Mac OS X"`, um formato nunca confirmado
ao vivo com um sistema real, então ele é tratado como não suportado em
vez de adivinhado.

## Campos registrados

- `version` — a partir de `ProductVersion`
- `extra.buildVersion` — a partir de `BuildVersion`, quando presente
- `extra.hostKeyVerified`

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`endoflife:macos`.
