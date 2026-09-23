---
title: pgAdmin
description: Como configurar o enodia para sondar o pgAdmin.
---

Decodifica a versão a partir da query string de cache-busting
`?ver=NNNNN` que o pgAdmin acrescenta a todo asset estático da sua
própria página de login — anônima por design, já que ela precisa ser
renderizada antes de existir qualquer sessão.

```yaml
targets:
  - id: pgadmin-main
    product: pgadmin
    address: https://pgadmin.example.com
```

## Autenticação

Nenhuma — o endpoint não aceita nenhum tipo de credencial.

## Como a versão é decodificada

Confirmado com um contêiner `dpage/pgadmin4` real e com o código-fonte do
próprio pgAdmin (`version.py`): `NNNNN` é `APP_VERSION_INT`, documentado
ali como `[X]XYYZZ` — release, revisão e, por fim, um código de sufixo —,
por exemplo `91700` para a release 9, revisão 17, sufixo `00` (GA).
Apenas a espinha release.revisão é reconstruída em `version`; um código
de sufixo diferente de zero (um build beta/dev) não tem mapeamento textual
documentado que permita reconstruí-lo apenas a partir do código, então
ele é exposto como `extra.suffixCode` em vez de adivinhado.

## Campos registrados

- `version` — por exemplo `9.17`
- `extra.suffixCode`, apenas quando diferente de zero

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado.

## Resolvedor de ciclo de vida

`github-tags:pgadmin-org/pgadmin4`. O endoflife.date não tem um
calendário do pgAdmin (404 confirmado), e `pgadmin-org/pgadmin4` não tem
nenhum GitHub Release (confirmado ao vivo: o endpoint de releases retorna
um array vazio) — apenas tags, no formato `REL-9_17` em vez de uma versão
com pontos. O tipo de resolvedor `github-tags` existe exatamente para
isso: ele converte esse formato em `9.17` e escolhe a tag *de maior
versão reconhecível* da página obtida, em vez de confiar na ordem da
lista, já que o endpoint de tags não documenta nenhuma garantia de
ordenação, ao contrário da ordem cronológica inversa dos Releases. Assim
como o resolvedor `github:` simples, ele só conhece a "versão mais
recente" — sem datas de eol/support/lts, já que o endpoint de tags não
traz nenhuma. Consulte [Produtos suportados](/pt-br/products/#aplicações-e-serviços-de-infraestrutura)
para a variável de ambiente `GITHUB_TOKEN`, que aumenta o limite de taxa
deste resolvedor.
