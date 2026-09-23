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

Apenas `version` — extraída do formato `"DSM <version> Update
<n>"` de `version_string`, por exemplo `"DSM 7.3.2-86009 Update 4"` → `7.3.2-86009`.

## Correlação de CVEs

Sem correlação — seus intervalos usam limites como `6.2.4-25556-3`, que o analisador estrito de intervalos rejeita. Consulte [Correlação de CVEs](/pt-br/cve/#quais-produtos-têm-correspondência).

## Resolvedor de ciclo de vida

Nenhum — o endoflife.date não tem calendário em `synology-dsm`,
`synology` ou `dsm` (404 confirmado). Apenas inventário, por enquanto.
