---
title: Informes
description: "export --format json/prometheus/html, y qué cambia settings.yaml en el informe HTML."
---

`enodia export` escribe un informe en uno de tres formatos. Los tres
aceptan `--from` (leer un inventario existente en lugar de recopilar) y
`-o`/`--output` (una ruta de archivo, o `-` para stdout, el valor
predeterminado).

```bash
enodia export --format json
enodia export --format prometheus
enodia export --format html -o report.html
```

El valor predeterminado integrado de `--format` es `json`, pero
`export.default_format` de `settings.yaml` lo sustituye siempre que no se
pase `--format`: un `--format` explícito siempre prevalece, con la misma
precedencia que ya usan `render.default_view`/`html.view` en otros
puntos. Consulte [Configuración](/es/configuration/#settingsyaml).

## `--format json`

Todas las observaciones y todas las evaluaciones, completas; `--view` se
ignora. Este es el formato que conviene consumir si desea aplicar su
propia política de severidad sobre los hechos de enodia (consulte
[Conceptos](/es/concepts/#los-hechos-y-el-juicio-están-separados)).

Con un [bloque `cve:`](/es/cve/) configurado, cada evaluación incluye
además una matriz `cves`: una entrada por hallazgo y por fuente (una CVE
presente tanto en BDU como en NVD aparece dos veces; en NVD, una vez por
cada CPE coincidente):

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

`Severity` y `RangeText` son el texto literal de la propia fuente; `CVSS`
es una única puntuación extraída de él, eligiendo primero CVSS 3.1/3.0,
luego 4.0 y luego 2.0: 3.x es la versión que incluye casi cualquier CVE
en ambas fuentes, así que las puntuaciones de una misma lista se
mantienen en la misma escala. La columna `CVES` de las vistas en tabla
cuenta las CVE distintas entre estas entradas, no las entradas en sí.

## `--format prometheus`

Un archivo de texto de Prometheus, pensado para el
[recopilador textfile de `node_exporter`](https://github.com/prometheus/node_exporter):
escríbalo de forma programada en algún lugar que `node_exporter` tenga
configurado para explorar, como cualquier otra métrica de textfile. Los
hallazgos de CVE no se exportan como métricas.

## `--format html`

Un único archivo autocontenido. No hay servidor web integrado: `enodia`
no lo sirve por sí mismo (consulte
[Conceptos](/es/concepts/#sin-servidor-web-integrado-que-sondee-a-petición));
apunte nginx a él y regenérelo desde cron o un temporizador de systemd.
`enodia serve` (consulte
[Referencia de la CLI](/es/cli-reference/#enodia-serve)) es la
alternativa si desea que se sirva automáticamente, con su propia
programación.

`--view` restringe el informe a una sola vista en lugar de las cuatro
secciones apiladas. `html.view` de `settings.yaml` hace lo mismo cuando
no se pasa la opción.

### Sin conexión por defecto

`html.assets` de `settings.yaml` controla qué necesita el archivo
generado:

- **`inline`** (predeterminado): ningún recurso externo. Verificado: no
  hay ningún `<script` en la salida y no se carga nada por `http(s)://`;
  las únicas URL de ese tipo son enlaces simples (el pie de página, las
  páginas de NVD/cve.org/BDU de la lista de CVE). Se muestra de forma
  idéntica dentro de una red completamente cerrada.
- **`cdn`**: carga Bootstrap y un tema de
  [Bootswatch](https://bootswatch.com/) desde una CDN, y añade en la
  página una advertencia visible de que el informe necesita acceso a
  internet para mostrarse con estilos. `html.theme` elige el tema
  (`none`, `default` o cualquiera de los 26 temas reales de Bootswatch);
  `html.cdn` elige la CDN: `auto` (predeterminado) hace competir a
  jsdelivr y cdnjs con una petición `HEAD` a cada una y cambia a la que
  responda primero, de modo que el bloqueo de una CDN en una red concreta
  no arrastre consigo los estilos del informe. El primer renderizado
  siempre usa jsdelivr; la competición solo *mejora* la hoja de estilos
  después. El informe también incluye un selector de tema, recordado por
  cada lector en el `localStorage` del navegador, y el botón de cierre de
  la advertencia se recuerda de la misma manera: una vez descartada,
  sigue descartada en ese navegador en los informes regenerados.

Consulte [Configuración](/es/configuration/#settingsyaml) para ver el
ejemplo completo de `settings.yaml`.

### La lista de CVE

Con un [bloque `cve:`](/es/cve/) configurado, la celda `CVES` de las
secciones `compact` y `drift` se convierte en un enlace que abre la lista
de CVE de ese destino: una línea por CVE, de la más grave a la menos
grave, con enlaces a NVD, a cve.org y, para los hallazgos de BDU, a la
página de bdu.fstec.ru, y la puntuación como insignias de color
(`CRITICAL · CVSS 3.1 9.8`). La descripción es el texto en ruso de BDU
cuando BDU tiene la CVE y, en caso contrario, el texto en inglés de NVD.
Es CSS puro (un modal `:target`), así que funciona igual en el modo
`inline` sin ningún script.

### Colores de las filas en modo CDN

Con `html.assets: cdn`, cada fila recibe una clase contextual de
Bootstrap —rojo para una instancia fallida, verde para una accesible— en
el tema que esté configurado, no un color fijo que enodia mantenga para
cada tema:

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

### Pie de página y favicon

El pie de página de cada informe generado enlaza con el proyecto en
GitHub, además de con `enodia.sh` y `docs.enodia.sh`: son simples
`<a href>`, no la descarga de un recurso, así que no afectan a la
garantía de funcionamiento sin conexión del modo `inline` (que se refiere
específicamente a los recursos *cargados*, no al texto inerte de un
hipervínculo). Ambos modos incluyen también un favicon para la pestaña:
`inline` incrusta directamente en el archivo una pequeña copia en base64
del propio `apple-touch-icon.png` de `enodia.sh` (no el `favicon.ico`
completo de múltiples resoluciones, que añadiría aproximadamente medio
megabyte a cada informe por un icono de pestaña); el modo `cdn` enlaza en
su lugar los iconos publicados en `enodia.sh`, ya que ese modo necesita
acceso a internet de todos modos para mostrarse.

### Recursos de terceros

`html.assets: cdn` carga Bootstrap y, salvo con `html.theme: none`, un
tema de Bootswatch —ambos con licencia MIT— desde jsdelivr o cdnjs en el
momento en que alguien abre el informe en un navegador. Ninguno de los
dos se incluye en enodia ni en ningún artefacto de publicación; cada
informe en modo CDN menciona a ambos por su nombre, con un enlace a su
licencia, en su propio pie de página.

## Historial a partir de muchos inventarios

`enodia collect -o "$(date +%F).jsonl"` ejecutado de forma programada ya
produce la mayor parte de lo que necesita `enodia history`: un directorio
de inventarios fechados. `history --dir <that directory>` lee todos los
archivos `*.jsonl` que contiene y evalúa cada uno según su propio momento
de recopilación, construyendo una línea temporal por ID de destino.
Consulte [Referencia de la CLI](/es/cli-reference/#enodia-history).
