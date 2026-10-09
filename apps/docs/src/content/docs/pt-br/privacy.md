---
title: Privacidade
description: A que o enodia se conecta e o que ele armazena — sem telemetria.
---

O enodia é uma ferramenta de linha de comando que você executa na sua
própria máquina. Ele não tem telemetria, estatísticas de uso, verificação
de atualizações nem conta. A EpicMorg não opera nenhum servidor com o qual
o enodia se comunique e não recebe nada dele.

Esta página espelha o próprio
[`PRIVACY.md`](https://github.com/EpicMorg/enodia/blob/master/PRIVACY.md)
do enodia.

## A que o enodia se conecta

- **Os seus próprios serviços** — os alvos listados no seu `enodia.yaml`,
  via HTTPS, SSH ou os seus protocolos nativos, com as credenciais que você
  configurar, para ler a versão deles (e, em hosts Linux, a lista de
  pacotes instalados).
- **endoflife.date** (`https://endoflife.date/api/...`) — para buscar
  datas públicas de lançamento e de fim de vida. A requisição cita um
  produto (por exemplo, `postgresql`); nenhum nome de host, endereço,
  versão ou outro dado sobre a sua frota é enviado.
- **API do GitHub** (`https://api.github.com/repos/.../releases`,
  `.../tags`) — para produtos cujas versões são publicadas no GitHub. O
  mesmo que acima: só o nome público do repositório vai na requisição. Se
  você definir `GITHUB_TOKEN`, ele é enviado apenas ao GitHub, para
  aumentar o limite de requisições.

Isso é tudo. Os bancos de dados de CVEs (NVD, BDU FSTEC, Debian, OVAL,
Alpine, MariaDB) são arquivos que você mesmo baixa; o enodia apenas os lê
do disco — consulte [Correlação de CVEs](/pt-br/cve/).

O relatório HTML carrega o Bootstrap de uma CDN (jsDelivr / cdnjs) **no
navegador que o abre** quando `html.assets: cdn` está definido; o padrão
(`inline`) não faz nenhuma requisição externa — consulte
[Relatórios](/pt-br/reporting/).

## O que o enodia armazena

Apenas na sua máquina, e apenas onde você mandar:

- os arquivos de inventário, relatórios e histórico que você grava com
  `-o`;
- um cache de respostas do endoflife.date/GitHub e de bancos de dados de
  CVEs já processados no diretório de cache do sistema operacional
  (`~/.cache/enodia`, `%LocalAppData%\enodia`) — pode ser apagado a
  qualquer momento.

Nada é enviado a nenhum outro lugar, e nada é retido pela EpicMorg.

## Este site

Os sites enodia.sh, get.enodia.sh e docs.enodia.sh — não a ferramenta
enodia — usam a análise web Yandex.Metrica para contar visitas.

## Contato

Dúvidas: abra uma issue em
[github.com/EpicMorg/enodia/issues](https://github.com/EpicMorg/enodia/issues).
