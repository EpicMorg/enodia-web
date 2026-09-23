---
title: Conceitos
description: As decisões de design por trás do enodia - por que ele tem o formato que tem.
---

Estas são as decisões estruturais por trás do design do enodia. Entendê-las
explica muito comportamento que, de outra forma, pareceria arbitrário.

## Duas fases, separáveis de propósito

A coleta conversa com os seus serviços. A avaliação conversa com a internet
(calendários de ciclo de vida dos fornecedores). Em muita infraestrutura
real, nada tem acesso de rede aos dois ao mesmo tempo.

```
collect  →  inventory.jsonl  →  evaluate  →  assessment  →  render
```

```bash
# dentro da rede fechada - não precisa de internet
enodia collect --config config.yaml -o inventory.jsonl

# em qualquer outro lugar - não precisa de acesso aos seus serviços
enodia check --from inventory.jsonl
```

O `enodia check` sem `--from` é a composição dessas duas fases em um único
processo, e não um segundo caminho de código — o inventário produzido no
caminho é um artefato real e de primeira classe (com esquema e versão
próprios), e não apenas um valor intermediário em memória.

## Três eixos ortogonais, não um único status

Um ramo pode estar perfeitamente saudável enquanto existe uma versão major
mais nova — o Confluence 10 LTS está atualizado dentro do seu ramo, tem
suporte ativo e uma major mais nova já foi lançada, tudo ao mesmo tempo.
Reduzir isso a um único status joga fora justamente a informação que você
queria.

| Eixo | Valores |
|---|---|
| Patch | `current` · `behind` · `ahead` · `unknown` |
| Ciclo de vida | `active` · `security` · `eol` · `unknown` |
| Ramo mais novo | `latest` · `newer` · `newer_lts` · `unknown` |

`ahead` não é exótico — release candidates e o atraso de calendário entre o
anúncio de um fornecedor e a sua página de download produzem esse valor
rotineiramente.

As CVEs conhecidas, quando [configuradas](/pt-br/cve/), são um fato à parte
ao lado dos três eixos, e não um quarto eixo: elas são listadas por
avaliação, mas nunca alimentam a severidade, o código de saída ou o
`--fail-on`.

## Fatos e julgamento são separados

Uma `Observation` contém o que foi de fato visto: uma string de versão, se o
alvo estava acessível, qual erro (se houve algum) ocorreu. Um `Assessment`
contém o que a política do enodia pensa sobre esses fatos — a severidade,
calculada por cima, a partir de uma política que você controla.

Exportar com `--format json` emite fatos. Um consumidor com prioridades
diferentes pode aplicar a sua própria política por cima, em vez da do
enodia. Embutir a severidade na própria observação tornaria isso impossível.

## O tempo é um parâmetro

A avaliação recebe um timestamp `asOf` explícito — nada no caminho de
avaliação chama o relógio do sistema diretamente. O `check --from` obtém o
`asOf` do próprio cabeçalho do inventário (`collectedAt`), então um
inventário de um mês atrás é avaliado *na data em que foi coletado*, e não
silenciosamente rejulgado com base no dia de hoje. Executar a mesma
avaliação depois produz o mesmo resultado.

## As sondas são compiladas, não uma DSL em YAML

A API de cada fornecedor é diferente o bastante para que uma linguagem
declarativa de sondas só pareça genérica até o primeiro fornecedor fora do
conjunto para o qual ela foi criada. Cada sonda é um arquivo Go com uma
entrada explícita em um registro — codificar o conhecimento sobre o
fornecedor em código significa que um `if` é só um `if`, legível e
depurável, em vez de uma condicional reexpressa em YAML.

Isso significa que adicionar um novo produto exige uma nova versão, e não
apenas uma edição na sua própria configuração. A válvula de escape:
`product: generic` aceita uma especificação de parser (`json` / `xml` /
`header` / `plaintext` / `regex`) diretamente da sua configuração, para os
sistemas internos que nunca vão ganhar uma sonda dedicada — consulte
[Configuração](/pt-br/configuration/#a-sonda-genérica). O vocabulário da
sonda genérica é deliberadamente congelado: sem condicionais, sem laços, sem
requisições encadeadas. Um alvo que precise de qualquer uma dessas coisas
precisa de uma sonda de verdade, escrita em Go.

## HTTPS primeiro, credenciais nunca enviadas em texto claro por padrão

Resolução do esquema para um alvo sem `https://`/`http://` explícito no
endereço: tenta `https` primeiro, recorre a `http` e emite um aviso em
ambos os casos. O enodia nunca tenta `http` primeiro — a primeira requisição
já levaria uma credencial em texto claro, e um redirecionamento posterior
para `https` não desfaria o envio. Um alvo `http://` com credenciais
associadas é um erro fatal, a menos que `allow_insecure_transport: true`
esteja definido nesse serviço específico.

## Nenhum servidor web embutido que faça coleta sob demanda

O `enodia serve` e o `export --format html` mostram o último snapshot
concluído — nenhum dos dois dispara uma nova coleta em resposta a uma
requisição. Um botão de atualizar que consulta a frota inteira a cada clique
é uma negação de serviço autoinfligida contra a sua própria produção. A
coleta roda em um agendamento (`serve --interval`, ou cron/um timer do
systemd regenerando uma exportação HTML); o HTTP só lê o que o último ciclo
bem-sucedido produziu.
