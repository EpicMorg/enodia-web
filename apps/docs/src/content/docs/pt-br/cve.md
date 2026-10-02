---
title: Correlação de CVEs
description: Comparação de cada versão sondada com o BDU FSTEC e o NIST NVD, e dos pacotes instalados em hosts Linux com os dados de segurança dos próprios fornecedores — a partir de arquivos que você mesmo baixa.
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
são mesclados por CVE.

Desde a 2.1, dez distribuições Linux também têm correspondência **por
pacote instalado** com os dados de segurança dos próprios fornecedores — o
Debian Security Tracker, arquivos OVAL dos fornecedores e o secdb do
Alpine (consulte
[CVEs por pacote para distribuições Linux](#cves-por-pacote-para-distribuições-linux)).

Tudo é opcional: uma configuração sem bloco `cve:` se comporta exatamente
como na 1.x, e cada fonte funciona por conta própria.

## O enodia nunca baixa os bancos de dados por conta própria

Você baixa os arquivos, decide quando atualizá-los e aponta o enodia para
eles. O enodia não tem nenhum caminho de código que acesse qualquer uma
dessas fontes sozinho — o mesmo raciocínio de rede fechada do
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

### Debian Security Tracker

Um arquivo, a exportação JSON completa do tracker (cerca de 80 MB), para
alvos `debian`:

```bash
curl -fsSL -o /var/lib/enodia/cve/debian.json \
  https://security-tracker.debian.org/tracker/data/json
```

Cópias `.json.gz` e `.json.zip` também funcionam.

### OVAL dos fornecedores

Um arquivo por versão de distribuição presente na sua frota, todos em um
mesmo diretório, para alvos `ubuntu`, `linuxmint`, `rhel`, `rocky-linux`,
`almalinux`, `oracle-linux`, `astra-linux` e `redos`:

| Alvos | Arquivo |
|---|---|
| Ubuntu, Linux Mint (a sua base Ubuntu) | `https://security-metadata.canonical.com/oval/com.ubuntu.<codename>.usn.oval.xml.bz2` |
| RHEL **e Rocky Linux** | `https://security.access.redhat.com/data/oval/v2/RHEL<N>/rhel-<N>.oval.xml.bz2` |
| AlmaLinux | `https://security.almalinux.org/oval/org.almalinux.alsa-<N>.xml.bz2` |
| Oracle Linux | `https://linux.oracle.com/security/oval/com.oracle.elsa-ol<N>.xml.bz2` |
| Astra Linux SE 1.7, 1.8 | `https://dl.astralinux.ru/astra/oval/<1.7\|1.8>_x86-64/oval-definitions-alse-<1.7\|1.8>.xml` |
| RED OS 7.3, 8.0 | `https://redos.red-soft.ru/support/secure/<7.3\|8.0>/redos.xml` |

```bash
mkdir -p /var/lib/enodia/cve/oval && cd /var/lib/enodia/cve/oval
curl -fsSLO https://security-metadata.canonical.com/oval/com.ubuntu.noble.usn.oval.xml.bz2
curl -fsSLO https://security.access.redhat.com/data/oval/v2/RHEL9/rhel-9.oval.xml.bz2
curl -fsSL -o redos-8.0.xml https://redos.red-soft.ru/support/secure/8.0/redos.xml
```

Os arquivos são usados como são publicados, `.xml` ou `.xml.bz2`. A versão
a que um arquivo se refere é lida do seu conteúdo, nunca do seu nome — por
isso os dois arquivos do RED OS, ambos publicados como `redos.xml`, só
precisam ter nomes distintos no disco. Dois arquivos são recusados de
propósito, com um erro que indica o arquivo a usar no lugar:

- **O OVAL próprio do Rocky Linux** (`org.rockylinux.rlsa-<N>.xml`) — ele
  contém uma pequena fração dos avisos do Rocky e não passa na validação do
  esquema OVAL. O Rocky recompila os pacotes da Red Hat com as mesmas
  versões, então os hosts Rocky são correlacionados com o arquivo da Red
  Hat.
- **A variante `oci.` do Ubuntu** — ela verifica o arquivo de status do
  dpkg com expressões regulares em vez de pacotes.

Todas as URLs verificadas na prática em 2026-10-02.

### secdb do Alpine

Dois arquivos por branch do Alpine presente na sua frota, `main` e
`community`, para alvos `alpine-linux`. Eles têm os mesmos nomes em todos
os branches, então salve-os com nomes distintos:

```bash
mkdir -p /var/lib/enodia/cve/alpine && cd /var/lib/enodia/cve/alpine
for b in v3.20 v3.22; do
  for r in main community; do
    curl -fsSL -o "$b-$r.json" "https://secdb.alpinelinux.org/$b/$r.json"
  done
done
```

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
  debian:
    path: /var/lib/enodia/cve/debian.json
  oval:
    path: /var/lib/enodia/cve/oval
  alpine:
    path: /var/lib/enodia/cve/alpine
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
| `cve.debian.path` | a exportação do tracker: `.json`, `.json.gz` ou `.json.zip` |
| `cve.oval.path` | um arquivo OVAL (`.xml` ou `.xml.bz2`), ou um diretório com eles |
| `cve.alpine.path` | um arquivo `.json` do secdb, ou um diretório com eles |

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
vez de produzir um relatório que simplesmente não tem CVEs. Desde a 2.1,
o `enodia config validate` também verifica se cada caminho configurado
existe, então um erro de digitação aparece já ali. Se um arquivo de fato
pode ser processado continua sendo descoberto apenas quando uma execução o
carrega.

:::caution[Caminhos no Windows]
Escreva um caminho do Windows sem aspas, entre aspas simples, com barras
normais ou como caminho UNC. Entre aspas **duplas** do YAML, `\t` e `\n`
viram uma tabulação e uma quebra de linha — `"C:\tmp\bdu.zip"` apontaria
silenciosamente para outro lugar; por isso o enodia rejeita, no momento do
carregamento, um caminho que contenha um caractere de controle, com uma
dica.
:::

## Primeira execução e cache

O BDU e o NVD são processados em streaming e o resultado fica em cache no
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

O OVAL processado fica em cache da mesma forma — cerca de 11 s para
processar juntos os arquivos do Ubuntu noble, do RHEL 9, do AlmaLinux 9 e
do Oracle Linux 9, a maior parte disso em bzip2. A exportação do tracker do
Debian (cerca de um segundo para processar) e o secdb do Alpine (algumas
centenas de KB) não ficam em cache. Com todas as fontes configuradas ao
mesmo tempo (BDU, NVD, Debian, oito arquivos OVAL, Alpine), o upstream
mediu o `check` em cerca de 22 s a frio e 3,4 s com cache, com pico de
0,5–0,6 GB de memória — menos se `cve.oval.path` contiver apenas as
versões que você de fato usa.

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
  9.8`. Os achados por pacote são, em vez disso, uma linha por pacote —
  `linux 6.12.107-1 → 6.12.111-1`, com link para o aviso que traz a
  correção e a sua lista de CVEs recolhida logo abaixo. É CSS puro — o
  relatório offline padrão continua sem nenhum JavaScript.
- **`export --format json`** — todos os achados por fonte, por completo, no
  array `cves` de cada avaliação: a fonte (`bdu`/`nvd`), o ID do boletim,
  os IDs de CVE, o título, o texto de severidade da própria fonte, o nome do
  produto ou CPE correspondente, o intervalo de versões e uma classificação
  CVSS extraída. Ao contrário da tabela e da lista HTML, que contam uma
  linha por CVE, o JSON mantém separado o achado de cada fonte — a mesma
  CVE pode aparecer uma vez vinda do BDU e uma vez para cada CPE
  correspondente do NVD. Os achados por pacote (fonte `debian`, `oval` ou
  `alpine`) também trazem as versões instalada e corrigida — consulte
  [Relatórios](/pt-br/reporting/#--format-json).
- **`export --format prometheus`** — nenhum dado de CVE.

**As CVEs não afetam a severidade nem o código de saída.** A `SEVERITY`
continua sendo calculada apenas a partir dos eixos patch/ciclo de vida/ramo,
e o `--fail-on` também só conhece esses três eixos — um achado é um fato a
ser analisado, e não um veredito que o enodia deu em seu nome. Se e como
uma CVE deveria elevar a severidade é uma questão em aberto upstream.

## Quais produtos têm correspondência

63 dos 96 produtos: 53 pelo nome do produto no BDU e no NVD, cada nome de
fornecedor/produto conferido literalmente contra as exportações completas
reais, e 10 distribuições Linux por pacote instalado (veja a próxima
seção). Consulte a página de cada produto em
[Configuração de produtos](/pt-br/products/) para ver as suas fontes.

Sem correspondência, cada um por um motivo:

- **As demais distribuições Linux de uso geral** (Fedora, CentOS Stream,
  Amazon Linux, openSUSE, …) — as CVEs delas são vulnerabilidades de
  pacotes, um número de versão não diz quais pacotes foram corrigidos desde
  então, e ainda não há uma fonte por pacote para elas.
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
- **Ainda não mapeados** — MariaDB, pfSense e as três sondas de BMC
  (Supermicro, Dell iDRAC, HP iLO 4), todas novas na 2.1. O upstream deixou
  o mapeamento de CVEs delas para uma etapa posterior, dedicada.

## CVEs por pacote para distribuições Linux

Um número de versão não diz quais pacotes de um host foram corrigidos desde
então, por isso estas dez distribuições têm correspondência por pacote
instalado. As suas sondas leem os pacotes instalados e o kernel em execução
na mesma ida e volta SSH que a própria versão, e cada pacote é conferido
com os dados de segurança da sua própria distribuição:

| Sonda | Fonte | Chave |
|---|---|---|
| `debian` | Debian Security Tracker | `cve.debian.path` |
| `ubuntu` | OVAL da Canonical | `cve.oval.path` |
| `linuxmint` | OVAL da Canonical, para a sua base Ubuntu | `cve.oval.path` |
| `rhel`, `rocky-linux` | OVAL da Red Hat | `cve.oval.path` |
| `almalinux` | OVAL do AlmaLinux | `cve.oval.path` |
| `oracle-linux` | OVAL da Oracle | `cve.oval.path` |
| `astra-linux` | OVAL do Astra Linux (SE 1.7, 1.8) | `cve.oval.path` |
| `redos` | OVAL do RED OS (7.3, 8.0) | `cve.oval.path` |
| `alpine-linux` | secdb do Alpine | `cve.alpine.path` |

**Só são informadas as CVEs que já têm uma correção mais nova do que a
instalada** — o que uma atualização (e, para o kernel, uma reinicialização)
resolveria. As CVEs que o fornecedor ainda não corrigiu ficam de fora: elas
são as mesmas em todos os hosts de uma versão e ninguém pode agir sobre
elas, então soterrariam as que exigem ação.

**Um achado por pacote, e não por CVE.** Só um kernel desatualizado pode
trazer mais de mil CVEs; uma lista por CVE seria ilegível. Cada achado
indica o pacote, a sua versão instalada, a versão que resolve todas as
CVEs dele e o aviso que traz essa correção (USN, RHSA, ALSA, ELSA, boletim
do Astra, ROS ou a página do tracker do Debian/Alpine). A coluna `CVES`
continua contando CVEs, e não pacotes.

**As versões são comparadas pelas regras de cada gerenciador de pacotes** —
a ordenação do dpkg, do rpm e do apk, conferida upstream com `apt_pkg`, o
rpm e o apk-tools em milhares de pares de versões reais cada —, além dos
streams de módulos AppStream (um pacote só é correlacionado com as
correções do seu próprio stream), da arquitetura e das variantes FIPS e
Ksplice do Oracle Linux, e do kernel **em execução**, e não de quaisquer
pacotes de kernel que por acaso estejam instalados. Cada fonte foi
conferida upstream com `oscap oval eval`, `dnf updateinfo`, python3-apt ou
`apk version -t` em hosts e contêineres reais, com resultados idênticos.

**O Proxmox VE** recebe achados de pacotes como um segundo alvo: um alvo
SSH [`debian`](/pt-br/configuration/products/debian/) no mesmo host, ao
lado do seu alvo [`proxmox`](/pt-br/configuration/products/proxmox/) via
API. O pacote `linux` do Debian só é correlacionado com um kernel Debian em
execução, então o kernel próprio do Proxmox não é confundido com um.

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
- **A cobertura por pacote tem as suas próprias lacunas.** O tracker do
  Debian só cobre as versões que a equipe de segurança do Debian ainda
  suporta (bookworm, trixie, testing, sid) — hosts mais antigos não recebem
  achados de pacotes. O Alpine edge não tem branch numerado e também não
  recebe nenhum. O OVAL não é avaliado como um interpretador completo: as
  chaves de assinatura dos pacotes não são verificadas, então um pacote de
  terceiros com o nome de um pacote da distribuição é comparado como se
  fosse da distribuição. Os pacotes de kernel do Astra Linux são comparados
  como instalados, e não como em execução.
- **As condições multiproduto do NVD** ("vulnerável apenas com a
  biblioteca Y") não são avaliadas — uma sonda informa um produto por alvo,
  então cada entrada vulnerável de um produto com correspondência conta por
  si só.
