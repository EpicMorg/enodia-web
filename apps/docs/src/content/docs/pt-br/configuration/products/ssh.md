---
title: SSH
description: Como configurar o enodia para sondar o banner de um servidor SSH.
---

Uma sonda TCP bruta, não HTTP — `address` é `host` ou `host:port`, sem
esquema. A porta padrão é `22` quando omitida. Lê a string de
identificação que todo servidor SSH envia espontaneamente no instante em
que um cliente se conecta (RFC 4253 §4.2) — sem autenticação, sem troca
de chaves, apenas a conexão TCP.

Não está vinculada a um único fornecedor: OpenSSH, Dropbear e qualquer
outra implementação que fale o protocolo de transporte SSH se identificam
da mesma forma, e é por isso que o produto é o genérico `ssh`, e não uma
sonda por implementação.

```yaml
targets:
  - id: bastion-main
    product: ssh
    address: bastion.example.com:22
```

## Autenticação

Nenhuma — o banner é enviado antes que exista qualquer etapa de
autenticação.

## O que "versão" significa aqui

`version` é a string de software exatamente como informada, por exemplo
`OpenSSH_10.3` ou `OpenSSH_9.6p1` — não um número normalizado, já que
`ssh` abrange várias implementações sem relação entre si. Qualquer
comentário de distribuição no final (por exemplo, o sufixo
`Ubuntu-3ubuntu13.18` do Ubuntu) é descartado em vez de ser tratado como
parte da versão.

## Campos registrados

- `version` — a string de software
- `extra.protocol` — a versão do protocolo SSH, por exemplo `2.0`

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado. A correspondência é feita pelo banner: `OpenSSH_…` como OpenSSH, `dropbear_…` como Dropbear; qualquer outra implementação SSH não recebe consulta, em vez de receber as CVEs do OpenSSH.

## Resolvedor de ciclo de vida

Nenhum — `ssh` não é um único produto com um único calendário de ciclo de
vida; o OpenSSH e o Dropbear têm cada um o seu, e o `Meta` de uma sonda é
estático, independentemente do que um determinado alvo acabe executando.
Apenas inventário.
