---
title: Relatórios
description: export --format json/prometheus/html e o que o settings.yaml muda no relatório HTML.
---

O `enodia export` gera um relatório em um de três formatos. Os três aceitam
`--from` (ler um inventário existente em vez de coletar) e `-o`/`--output`
(um caminho de arquivo, ou `-` para a saída padrão, o padrão).

```bash
enodia export --format json
enodia export --format prometheus
enodia export --format html -o report.html
```

O padrão embutido de `--format` é `json`, mas o `export.default_format` do
`settings.yaml` o substitui sempre que o próprio `--format` não é passado —
um `--format` explícito sempre prevalece, a mesma precedência que
`render.default_view`/`html.view` já usam em outros lugares. Consulte
[Configuração](/pt-br/configuration/#settingsyaml).

## `--format json`

Todas as observações e todas as avaliações, por completo — `--view` é
ignorado. Este é o formato a consumir se você quiser aplicar a sua própria
política de severidade sobre os fatos do enodia (consulte
[Conceitos](/pt-br/concepts/#fatos-e-julgamento-são-separados)).

Com um [bloco `cve:`](/pt-br/cve/) configurado, cada avaliação também traz
um array `cves` — uma entrada por achado, por fonte (uma CVE presente tanto
no BDU quanto no NVD aparece duas vezes; no NVD, uma vez por CPE
correspondente):

```json
{
  "Source": "bdu",
  "AdvisoryID": "BDU:2026-11879",
  "CVEIDs": ["CVE-2026-19478"],
  "Title": "Уязвимость программной платформы … GitLab EE/ CE …",
  "Severity": "Высокий уровень опасности (базовая оценка CVSS 2.0 составляет 9,7) …",
  "MatchedName": "Gitlab",
  "RangeText": "от 19.2.0 до 19.2.4",
  "FixStatus": "Уязвимость устранена",
  "CVSS": { "Version": "3.1", "Score": 9.4, "Severity": "CRITICAL" }
}
```

`Severity` e `RangeText` são o texto da própria fonte, literalmente; `CVSS`
é uma única classificação extraída dele, escolhendo primeiro CVSS 3.1/3.0,
depois 4.0 e depois 2.0 — 3.x é a versão que quase toda CVE traz nas duas
fontes, então as pontuações de uma mesma lista ficam na mesma escala. A
coluna `CVES` das visões em tabela conta as CVEs distintas entre essas
entradas, e não as entradas em si.

## `--format prometheus`

Um textfile do Prometheus, destinado ao
[coletor de textfile do `node_exporter`](https://github.com/prometheus/node_exporter)
— grave-o em algum lugar que o `node_exporter` esteja configurado para
varrer, em um agendamento, como qualquer outra métrica de textfile. Os
achados de CVE não são exportados como métricas.

## `--format html`

Um único arquivo autocontido. Não há servidor web embutido — o `enodia` não
serve esse arquivo por conta própria (consulte
[Conceitos](/pt-br/concepts/#nenhum-servidor-web-embutido-que-faça-coleta-sob-demanda));
aponte o nginx para ele e regenere-o via cron ou um timer do systemd. O
`enodia serve` (consulte [Referência da CLI](/pt-br/cli-reference/#enodia-serve))
é a alternativa se você quiser que ele seja servido automaticamente, com o
seu próprio agendamento.

`--view` restringe o relatório a uma única visão em vez das quatro seções
empilhadas. O `html.view` do `settings.yaml` faz o mesmo quando a flag não é
passada.

### Offline por padrão

O `html.assets` do `settings.yaml` controla do que o arquivo gerado
precisa:

- **`inline`** (padrão) — zero recursos externos. Verificado: nenhum
  `<script` em lugar algum da saída e nada carregado via `http(s)://` — as
  únicas URLs desse tipo são links simples (o rodapé, as páginas do
  NVD/cve.org/BDU na lista de CVEs). A renderização é idêntica dentro de
  uma rede totalmente fechada.
- **`cdn`** — carrega o Bootstrap e um tema do
  [Bootswatch](https://bootswatch.com/) a partir de uma CDN, e adiciona um
  aviso visível na página de que o relatório precisa de acesso à internet
  para ser exibido com estilo. `html.theme` escolhe o tema (`none`,
  `default` ou qualquer um dos 26 temas reais do Bootswatch); `html.cdn`
  escolhe a CDN — `auto` (padrão) faz uma corrida entre jsdelivr e cdnjs com
  uma requisição `HEAD` para cada uma e passa a usar a que responder
  primeiro, para que uma CDN bloqueada em determinada rede não derrube junto
  o estilo do relatório. A primeiríssima renderização sempre usa o
  jsdelivr; a corrida só *troca* a folha de estilo depois disso. O
  relatório também ganha um seletor de tema, lembrado por visitante no
  `localStorage` do navegador, e o botão de fechar o aviso é lembrado da
  mesma forma — dispensado uma vez, ele continua dispensado naquele
  navegador entre relatórios regenerados.

Consulte [Configuração](/pt-br/configuration/#settingsyaml) para o exemplo
completo de `settings.yaml`.

### A lista de CVEs

Com um [bloco `cve:`](/pt-br/cve/) configurado, a célula `CVES` das seções
`compact` e `drift` vira um link que abre a lista de CVEs daquele alvo: uma
linha por CVE, da mais grave para a menos grave, com links para o NVD, o
cve.org e, para achados do BDU, a página em bdu.fstec.ru, e a classificação
como badges coloridos (`CRITICAL · CVSS 3.1 9.8`). A descrição é o texto
em russo do BDU quando o BDU tem a CVE, e o texto em inglês do NVD caso
contrário. É CSS puro (um modal com `:target`), então funciona da mesma
forma no modo `inline`, sem nenhum script.

### Cores das linhas no modo CDN

Com `html.assets: cdn`, cada linha recebe uma classe contextual do
Bootstrap — vermelho para uma instância com falha, verde para uma acessível
— no tema que estiver configurado, e não uma cor fixa que o enodia mantenha
para cada tema:

```html
<table class="table table-striped table-hover table-sm align-middle">
<thead><tr><th>PRODUCT</th><th>VERSION</th><th>STATUS</th><th>COUNT</th><th>INSTANCES</th></tr></thead>
<tbody>
<tr class="table-danger"><td>gitlab</td><td>(unknown)</td><td>auth</td><td>1</td><td>gitlab-2</td></tr>
<tr class="table-success"><td>gitlab</td><td>18.2.1</td><td>ok</td><td>1</td><td>gitlab-1</td></tr>
<tr class="table-danger"><td>jira</td><td>(unknown)</td><td>unreachable</td><td>1</td><td>jira-staging</td></tr>
<tr class="table-success"><td>jira</td><td>10.3.1</td><td>ok</td><td>1</td><td>jira-3</td></tr>
<tr class="table-success"><td>jira</td><td>10.3.2</td><td>ok</td><td>2</td><td>jira-1, jira-2</td></tr>
</tbody>
</table>
```

### Rodapé e favicon

O rodapé de todo relatório gerado tem links para o projeto no GitHub, além
de `enodia.sh` e `docs.enodia.sh` — simples `<a href>`, e não o carregamento
de um recurso, então isso não afeta a garantia offline do modo `inline`
(que trata especificamente de recursos *carregados*, e não de texto de
hiperlink inerte). Os dois modos também ganham um favicon na aba: o
`inline` embute uma pequena cópia em base64 do próprio
`apple-touch-icon.png` do `enodia.sh` diretamente no arquivo (e não o
`favicon.ico` completo em múltiplas resoluções, que acrescentaria cerca de
meio megabyte a cada relatório só por um ícone de aba); o modo `cdn`
referencia os ícones ao vivo em `enodia.sh`, já que esse modo precisa de
acesso à internet para ser exibido de qualquer forma.

### Recursos de terceiros

`html.assets: cdn` carrega o Bootstrap e, a menos que `html.theme: none`, um
tema do Bootswatch — ambos sob licença MIT — a partir do jsdelivr ou do
cdnjs no momento em que alguém abre o relatório em um navegador. Nenhum dos
dois é empacotado no próprio enodia nem em qualquer artefato de release;
todo relatório em modo CDN dá crédito aos dois pelo nome, com um link para
a licença de cada um, no próprio rodapé.

## Histórico ao longo de vários inventários

`enodia collect -o "$(date +%F).jsonl"` em um agendamento já produz a maior
parte do que o `enodia history` precisa — um diretório de inventários
datados. `history --dir <that directory>` lê todos os arquivos `*.jsonl` desse
diretório e avalia cada um na data da sua própria coleta, montando uma linha do
tempo por ID de alvo. Consulte
[Referência da CLI](/pt-br/cli-reference/#enodia-history).
