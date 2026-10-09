---
title: Synology DSM
description: Como configurar o enodia para sondar o Synology DSM.
---

Faz login na própria Web API da Synology (`SYNO.API.Auth`) e, em seguida,
lê `SYNO.DSM.Info` para obter a versão, usando a sessão resultante — a
única sonda HTTP do enodia que precisa de uma etapa real de login em vez
de uma credencial estática.

```yaml
targets:
  - id: nas-main
    product: synology-dsm
    address: https://nas.example.com:5001
    credentials: synology-admin
```

## Autenticação — obrigatória, com usuário e senha

```yaml
credentials:
  synology-admin:
    kind: password
    username: enodia-ro
    password: "${SYNOLOGY_PASSWORD}"
```

Confirmado ao vivo: `SYNO.DSM.Info` sempre responde `{"error":{"code":119}}`
("sem sessão") sem um id de sessão e, quando a proteção CSRF está
habilitada, sem um `SynoToken` — nenhum dos dois pode ser obtido sem antes
chamar o método de login de `SYNO.API.Auth` com uma conta e senha reais.
Este é um caso realmente mais leve do que um login completo por
formulário HTML: uma API JSON simples que recebe usuário/senha como
parâmetros normais e retorna o id de sessão como um campo JSON normal,
sem necessidade de cookie jar nem de extrair token CSRF. Um logout em
regime de melhor esforço vem após a leitura da versão, para que a coleta
não acumule sessões abertas no NAS execução após execução.

As falhas de autenticação aqui não usam códigos de status HTTP: toda
chamada da Web API da Synology responde `200` mesmo em caso de falha, com
`success: false` no corpo — confirmado ao vivo, então esta sonda lê o
corpo, e não o código de status, para detectar um login rejeitado.

## Campos registrados

- `version` — extraída do formato `"DSM <version> Update
  <n>"` de `version_string`, por exemplo `"DSM 7.3.2-86009 Update 4"` → `7.3.2-86009`
- `extra.update` — o número do Update (`4`), desde a 2.2, quando a string
  tem um; mantido separado de `version` para que o drift e o ciclo de vida
  continuem comparando a própria versão

## Correlação de CVEs

Correlacionado com o NVD e o BDU FSTEC quando um [bloco `cve:`](/pt-br/cve/) está configurado. Desde a 2.2. Uma versão do DSM é
versão, build e Update (`7.2.1-69057 Update 6`), e os bancos de dados a
delimitam como `7.2.1-69057-6`; o `version` e o `extra.update` da sonda
são combinados em uma única versão comparável para a consulta. Um
inventário coletado antes da 2.2 não tem `extra.update` e é lido como
Update 0 — Updates corrigidos podem ser marcados, nenhum é deixado de
fora. Os intervalos por ramo do BDU ainda reportam em excesso nos ramos
mais antigos (os do NVD não) — consulte
[Dell iDRAC e Synology DSM](/pt-br/cve/#dell-idrac-e-synology-dsm) e
[Limitações conhecidas](/pt-br/cve/#limitações-conhecidas).

## Resolvedor de ciclo de vida

Nenhum — o endoflife.date não tem calendário em `synology-dsm`,
`synology` ou `dsm` (404 confirmado). Apenas inventário, por enquanto.
