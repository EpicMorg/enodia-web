---
title: Correlação de CVEs
description: Comparação de cada versão sondada com o BDU FSTEC e o NIST NVD, a partir de arquivos que você mesmo baixa.
---

Desde a 2.0, o enodia consegue dizer quais vulnerabilidades conhecidas
afetam a versão exata que cada alvo informa — ao lado dos eixos
patch/ciclo de vida/ramo, e não no lugar deles. Ele faz a correspondência
com dois bancos de dados públicos:

- **BDU FSTEC** — o banco de dados de vulnerabilidades do FSTEC (Rússia),
  [bdu.fstec.ru](https://bdu.fstec.ru/).
- **NIST NVD** — o National Vulnerability Database dos EUA,
  [nvd.nist.gov](https://nvd.nist.gov/).

Qualquer um dos dois funciona sozinho; com ambos configurados, os achados
são mesclados por CVE. É totalmente opcional: uma configuração sem bloco
`cve:` se comporta exatamente como na 1.x.

## O enodia nunca baixa os bancos de dados por conta própria

Você baixa os arquivos, decide quando atualizá-los e aponta o enodia para
eles. O enodia não tem nenhum caminho de código que acesse bdu.fstec.ru ou
nvd.nist.gov sozinho — o mesmo raciocínio de rede fechada do
[design em duas fases](/pt-br/concepts/#duas-fases-separáveis-de-propósito):
a máquina que executa o `check` não precisa de acesso à internet para a
correspondência de CVEs, apenas de uma cópia dos arquivos.

### BDU FSTEC

Um arquivo, a exportação completa do FSTEC (cerca de 33 MB compactado):

```bash
curl -fL --cacert ru-chain.pem \
  -o /var/lib/enodia/cve/bdu/vulxml.zip \
  https://bdu.fstec.ru/files/documents/vulxml.zip
```

O bdu.fstec.ru usa um certificado da CA nacional da Rússia (Mintsifry, o
Ministério do Desenvolvimento Digital), que não está nos repositórios de
confiança habituais do sistema — um `curl` simples falha com um erro de
certificado. Além disso, o servidor não envia o seu certificado
intermediário, e o `curl` (ao contrário de um navegador) não busca por
conta própria um intermediário ausente, então instalar apenas a raiz não é
suficiente. Monte um bundle com a raiz e o intermediário indicado pelo
certificado do site:

```bash
curl -fsS -o root.crt https://gu-st.ru/content/lending/russian_trusted_root_ca_pem.crt
curl -fsS -o sub.crt  http://nuc-cdp.digital.gov.ru/cdp/subca_ssl_rsa2024.crt
{ cat root.crt; echo; cat sub.crt; } > ru-chain.pem
```

Verificado na prática em 2026-09-23. Se deixar de funcionar, o mais
provável é que o intermediário tenha sido trocado: o próprio campo
*Authority Information Access* do certificado do site indica o atual
(`openssl s_client
-connect bdu.fstec.ru:443 | openssl x509 -noout -ext authorityInfoAccess`).
O `curl -k` também baixa o arquivo, mas deixa de verificar aquilo que você
está prestes a usar no seu relatório de segurança.

### NIST NVD

Um arquivo por ano, `nvdcve-2.0-<year>.json.gz`, de 2002 até o ano atual.
Coloque os que você quiser em um mesmo diretório:

```bash
mkdir -p /var/lib/enodia/cve/nvd && cd /var/lib/enodia/cve/nvd
for y in $(seq 2002 "$(date +%Y)"); do
  curl -fsSLO "https://nvd.nist.gov/feeds/json/cve/2.0/nvdcve-2.0-$y.json.gz"
done
```

O arquivo do ano atual é atualizado diariamente; os anos anteriores mudam
raramente. Cada arquivo tem um arquivo `.meta` associado
(`nvdcve-2.0-<year>.meta`) com o seu tamanho e `sha256` — observe que o
hash é do JSON *descompactado*, e não do `.gz`.

## Configuração

Um bloco `cve:` no `enodia.yaml` — e não no `settings.yaml`, já que ele
muda a avaliação, e não só a exibição:

```yaml title="enodia.yaml"
schemaVersion: 1
cve:
  bdu:
    path: /var/lib/enodia/cve/bdu/vulxml.zip
  nvd:
    path: /var/lib/enodia/cve/nvd
targets:
  - id: gitlab-main
    product: gitlab
    address: https://gitlab.example.com
    credentials: gitlab-token
```

| Campo | Aceita |
|---|---|
| `cve.bdu.path` | um `.xml`, um `.zip` (a exportação como é publicada) ou um `.tar.gz`/`.tgz` |
| `cve.nvd.path` | um único arquivo `.json`, `.json.gz` ou `.json.zip`, ou um diretório com eles |

Caminhos relativos são resolvidos em relação ao diretório do arquivo de
configuração que os menciona, assim como `credentials_file`. O bloco é lido
da configuração que a execução de fato usa — `--config`, `$ENODIA_CONFIG`
ou os [caminhos de busca padrão](/pt-br/configuration/#localização-dos-arquivos).
Isso inclui `check --from inventory.jsonl`: um inventário coletado dentro de
uma rede fechada é correlacionado onde quer que o `check` rode, desde que
lá seja encontrada uma configuração com bloco `cve:`. Sem nenhuma
configuração encontrada, o `check --from` continua funcionando, só que sem
CVEs.

**Um caminho configurado que não existe é um erro**, e não algo ignorado em
silêncio — o `check` termina com `stat ...: no such file or directory` em
vez de produzir um relatório que simplesmente não tem CVEs. O `enodia config
validate` verifica o formato do bloco (incluindo a verificação de
caracteres de controle abaixo), mas não se os arquivos existem — isso só é
verificado quando uma execução de fato os carrega.

:::caution[Caminhos no Windows]
Escreva um caminho do Windows sem aspas, entre aspas simples, com barras
normais ou como caminho UNC. Entre aspas **duplas** do YAML, `\t` e `\n`
viram uma tabulação e uma quebra de linha — `"C:\tmp\bdu.zip"` apontaria
silenciosamente para outro lugar; por isso o enodia rejeita, no momento do
carregamento, um caminho que contenha um caractere de controle, com uma
dica.
:::

## Primeira execução e cache

As duas fontes são processadas em streaming e o resultado fica em cache no
diretório de cache do SO (`$XDG_CACHE_HOME/enodia/cve`, ou seja,
`~/.cache/enodia/cve` por padrão no Linux; `~/Library/Caches/enodia/cve` no
macOS; `%LocalAppData%\enodia\cve` no Windows). A primeira execução depois
que um arquivo muda o processa por completo — cerca de um minuto para todo
o NVD mais o BDU; medido em 2026-09-23 com o BDU mais apenas o arquivo de
2026 do NVD, 25 s. Todas as execuções seguintes leem o cache: 0,2 s para os
mesmos dados, um cache de 11 MB. Não há TTL — o cache é indexado pelos
próprios arquivos (tamanho e data de modificação) e pelas tabelas de
produtos do próprio enodia, então substituir um arquivo, adicionar um ano
ao diretório do NVD ou atualizar o enodia disparam, cada um por si, uma
reconstrução.

O `enodia serve` relê o bloco `cve:` e os arquivos a cada ciclo de
`--interval` (a baixo custo, a partir do cache), então substituir os
arquivos via cron passa a valer sem reiniciar o servidor.

## Onde os achados aparecem

- **`check`** — uma coluna `CVES` nas [visões `compact` e
  `drift`](/pt-br/views/): o número de CVEs distintas que afetam aquela
  versão exata. `-` significa nenhum achado — nenhuma afeta aquela versão,
  não há bloco `cve:` ou o enodia não faz correspondência para o produto
  (veja abaixo); a coluna em si está sempre presente. As visões
  `lifecycle` e `fleet` não têm essa coluna.
- **`export --format html`** — a mesma coluna, com um link que abre uma
  lista por alvo: uma linha por CVE, da mais grave para a menos grave, com
  links para o NVD, o cve.org e, para achados do BDU, a página em
  bdu.fstec.ru; o texto em russo do BDU quando o BDU tem a CVE, e a
  descrição em inglês do NVD caso contrário; e a classificação como badges
  coloridos, por exemplo `CRITICAL · CVSS 3.1
  9.8`. É CSS puro — o relatório offline padrão continua sem nenhum
  JavaScript.
- **`export --format json`** — todos os achados por fonte, por completo, no
  array `cves` de cada avaliação: a fonte (`bdu`/`nvd`), o ID do boletim,
  os IDs de CVE, o título, o texto de severidade da própria fonte, o nome do
  produto ou CPE correspondente, o intervalo de versões e uma classificação
  CVSS extraída. Ao contrário da tabela e da lista HTML, que contam uma
  linha por CVE, o JSON mantém separado o achado de cada fonte — a mesma
  CVE pode aparecer uma vez vinda do BDU e uma vez para cada CPE
  correspondente do NVD.
- **`export --format prometheus`** — nenhum dado de CVE.

**As CVEs não afetam a severidade nem o código de saída.** A `SEVERITY`
continua sendo calculada apenas a partir dos eixos patch/ciclo de vida/ramo,
e o `--fail-on` também só conhece esses três eixos — um achado é um fato a
ser analisado, e não um veredito que o enodia deu em seu nome. Se e como
uma CVE deveria elevar a severidade é uma questão em aberto upstream.

## Quais produtos têm correspondência

52 dos 90 produtos, cada nome de fornecedor/produto conferido literalmente
contra as exportações completas reais — consulte a página de cada produto
em [Configuração de produtos](/pt-br/products/) para ver as suas fontes.

Sem correspondência, cada um por um motivo:

- **Distribuições Linux de uso geral** (Debian, Ubuntu, RHEL, Alma, Rocky,
  Fedora, RED OS, Astra Linux, …) — as CVEs delas são vulnerabilidades de
  pacotes; um número de versão não diz quais pacotes foram corrigidos desde
  então.
- **Os BSDs e o Oracle Solaris** — o NVD registra os seus níveis de patch
  (o `-p5` do FreeBSD, as erratas do OpenBSD) em um campo de CPE que este
  mecanismo de correspondência não lê; fazer a correspondência só pela
  versão marcaria um host totalmente corrigido com todas as CVEs já
  corrigidas naquela versão.
- **ESXi e vCenter** — o mesmo problema: quase todas as entradas deles são
  literais no estilo `7.0` + `update_1`.
- **Synology DSM** — limites como `6.2.4-25556-3`, que o parser estrito de
  intervalos rejeita.
- **TrueNAS** — entradas de menos, com um versionamento diferente do que a
  sonda informa.
- **Nenhum dado utilizável em nenhuma das fontes** — Kitsu, Zou,
  postgres_exporter, Perforce Proxy, Perforce Helix Swarm.
- **`generic`** — um parser escrito à mão não tem uma identidade de produto
  para consultar.

### Correspondência sensível à edição

GitLab, HashiCorp Vault, Nextcloud e MongoDB publicam listas de CVEs
separadas para as edições community e enterprise. As sondas deles registram
a edição do próprio servidor em `extra.enterprise`, e uma instância
community deixa de ver achados exclusivos da enterprise — com dados reais,
o GitLab 19.2.2 CE vê 4 das 9 do NVD, e o Nextcloud 27.1.3 CE, 11 de 23.
Quando a edição é desconhecida (um servidor mais antigo que não a informa),
todos os achados são mantidos.

### SSH

A sonda [`ssh`](/pt-br/configuration/products/ssh/) cobre qualquer
implementação de SSH, então a correspondência é feita pelo banner:
`OpenSSH_…` consulta o OpenSSH, `dropbear_…` consulta o Dropbear, e qualquer
outra pilha SSH não recebe consulta alguma, em vez de herdar as CVEs do
OpenSSH.

## Limitações conhecidas

- **O BDU pode reportar em excesso entre ramos.** Uma entrada do BDU
  frequentemente lista um intervalo separado por ramo de manutenção, todos
  com o mesmo limite inferior, então uma versão que já é a correção no seu
  próprio ramo ainda pode cair dentro do intervalo mais amplo de um ramo
  vizinho (o Confluence 8.3.3 em relação à CVE-2023-22515 é o exemplo
  documentado). Os intervalos do NVD para a mesma CVE têm os seus próprios
  limites inferiores e não têm esse problema. O enodia deliberadamente
  prefere reportar um achado a ser conferido a deixar passar um real em
  silêncio.
- **Entradas do NVD sem nenhuma restrição de versão são descartadas.**
  Medido contra as exportações completas, eram quase todas CVEs de décadas
  atrás associadas a versões atuais; o custo é a rara CVE realmente não
  corrigida registrada dessa forma.
- **As condições multiproduto do NVD** ("vulnerável apenas com a
  biblioteca Y") não são avaliadas — uma sonda informa um produto por alvo,
  então cada entrada vulnerável de um produto com correspondência conta por
  si só.
