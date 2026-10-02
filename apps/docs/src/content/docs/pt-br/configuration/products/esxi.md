---
title: VMware ESXi
description: Como configurar o enodia para sondar o VMware ESXi.
---

Chama `ServiceContent.about` por meio da própria chamada SOAP de
descoberta `RetrieveServiceContent` da API do vSphere, em `/sdk` — a mesma
chamada e o mesmo endpoint que o [vCenter Server](/pt-br/configuration/products/vcenter/)
responde, diferenciados pelo campo `apiType`.

```yaml
targets:
  - id: esxi-main
    product: esxi
    address: https://esxi-host.example.com
```

## Autenticação

Nenhuma — confirmado ao vivo com um host ESXi 8.0.3 real de produção, sem
credencial alguma.

## Verificação da identidade do fornecedor

`apiType` é comparado com `"HostAgent"` — um vCenter Server real responde
à mesma chamada com `apiType=VirtualCenter` (consulte
[vCenter Server](/pt-br/configuration/products/vcenter/), que executa essa
mesma verificação no sentido inverso). Apontar `product: esxi` para uma
instância do vCenter falha de forma explícita em vez de ser registrado
como um fato errado.

## Campos registrados

- `version` — por exemplo `8.0.3`
- `extra.build`, quando presente

## Correlação de CVEs

Sem correlação — quase todas as suas entradas são literais no estilo `7.0` + `update_1`, que o correlacionador não lê, então o resultado seria nada ou tudo. Consulte [Correlação de CVEs](/pt-br/cve/#quais-produtos-têm-correspondência).

## Resolvedor de ciclo de vida

`endoflife:esxi`. O calendário escreve o nível de patch mais recente do branch 8.0 da
VMware na abreviação própria da VMware (`8.0 U3k` / `8.0 Update 3k`);
desde a 2.1 isso é lido como `8.0.3`, então um host 8.0 Update 3
totalmente atualizado aparece como `current` em vez de `ahead`. A letra
de patch final é descartada — a própria string de versão do host não tem
com o que compará-la.
