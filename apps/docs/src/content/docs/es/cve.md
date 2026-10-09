---
title: Correlación de CVE
description: Cotejo de cada versión sondeada con BDU FSTEC, NIST NVD y los datos de seguridad propios de los fabricantes, y de los paquetes instalados en hosts Linux con los de sus distribuciones, a partir de archivos locales que descarga enodia cve update o usted mismo.
---

Desde la 2.0, enodia puede indicarle qué vulnerabilidades conocidas
afectan a la versión exacta que informa cada destino, junto a los ejes
de parche/ciclo de vida/rama, no en su lugar. Coteja con dos bases de
datos públicas:

- **BDU FSTEC**: la base de datos de vulnerabilidades del FSTEC (Rusia),
  [bdu.fstec.ru](https://bdu.fstec.ru/).
- **NIST NVD**: la Base Nacional de Datos de Vulnerabilidades de EE. UU.,
  [nvd.nist.gov](https://nvd.nist.gov/).

Cualquiera de las dos funciona por separado; con ambas configuradas, sus
hallazgos se combinan por CVE.

Desde la 2.2, se suman los datos de seguridad propios de cuatro
fabricantes allí donde los publican: MariaDB, Atlassian (Jira, Confluence,
Bitbucket, Bamboo), PostgreSQL y nginx; consulte
[Datos propios de los fabricantes](#datos-propios-de-los-fabricantes).

Desde la 2.1, diez distribuciones Linux también se cotejan **por paquete
instalado** con los datos de seguridad propios de sus fabricantes: el
Debian Security Tracker, archivos OVAL del fabricante y el secdb de
Alpine (consulte
[CVE a nivel de paquete para distribuciones Linux](#cve-a-nivel-de-paquete-para-distribuciones-linux)).

Todo es opcional: una configuración sin bloque `cve:` se comporta
exactamente como en la 1.x, y cada fuente funciona por separado.

## Descarga de las bases de datos

enodia coteja solo con archivos locales. `check`, `collect` y `serve`
nunca descargan nada; es el mismo razonamiento de red cerrada que el del
[diseño en dos fases](/es/concepts/#dos-fases-separables-a-propósito):
la máquina que ejecuta `check` no necesita acceso a internet para la
correlación de CVE, solo una copia de los archivos. Desde la 2.2, un
comando aparte los obtiene, y solo cuando usted lo ejecuta:
`enodia cve update`. O descárguelos usted mismo, como se describe más
abajo para cada fuente; los archivos son los mismos en ambos casos.

### `enodia cve update`

```bash
enodia cve update                         # todos los cve.*.path de la configuración activa
enodia cve update --from inventory.jsonl  # también lo que necesitan los hosts de ese inventario
enodia cve update --dry-run               # enumera lo que se obtendría, sin descargar nada
```

En cada `cve.*.path` configurado obtiene lo que lee esa entrada:

- **BDU**: `vulxml.zip`. Aquí `cve.bdu.path` tiene que ser un `.zip`; las
  formas `.xml` y `.tar.gz` que también acepta la búsqueda son un
  reempaquetado suyo, que `update` no produce.
- **NVD**: el archivo de este año, el del año pasado y el de cualquier año
  que aún no esté en disco; `--all-years` actualiza todos los años (NVD
  regenera a diario todos los archivos anuales). `cve.nvd.path` tiene que
  ser un directorio.
- **Debian**: el `.json` del tracker.
- **OVAL, secdb de Alpine, páginas por versión mayor de PostgreSQL**: un
  archivo por versión, así que las versiones proceden de tres lugares:
  los archivos que ya están en el directorio, los inventarios indicados
  con `--from` (las versiones que ejecuten sus hosts) y `--oval`,
  `--alpine` y `--postgresql`. `cve.oval.path` y `cve.alpine.path` tienen
  que ser directorios; un `cve.postgresql.path` que sea un archivo recibe
  solo la página principal.
- **MariaDB, Atlassian, nginx** y la página principal de PostgreSQL: un
  archivo cada uno.

| Opción | Obtiene |
|---|---|
| `--from <inventory>` | las versiones OVAL, ramas de Alpine y versiones mayores de PostgreSQL que necesitan los hosts de ese inventario (repetible) |
| `--oval <release>` | una versión OVAL: `ubuntu:<codename>`, `rhel:<N>`, `almalinux:<N>`, `oracle-linux:<N>`, `astra-linux:<X.Y>`, `redos:<X.Y>` (repetible) |
| `--alpine <branch>` | el secdb de una rama de Alpine, p. ej. `v3.22` (repetible) |
| `--postgresql <major>` | la página de seguridad propia de una versión mayor de PostgreSQL, p. ej. `13` (repetible) |
| `--all-years` | todos los años de NVD, no solo este, el pasado y los que falten |
| `--dry-run` | enumera lo que se obtendría, sin descargar nada |

Cada archivo se solicita con If-Modified-Since respecto a su copia en
disco, se descarga en `.enodia-update/` junto a ella, **se carga con el
mismo código que usa la búsqueda de CVE** y solo entonces sustituye a la
copia anterior: un zip truncado o una página de error HTML nunca
sustituyen a un archivo que funciona. Un archivo sin cambios cuesta una
solicitud (MariaDB, PostgreSQL y Atlassian no envían Last-Modified, así
que esos se vuelven a descargar y se comparan). Los errores de red, 429 y
5xx se reintentan dos veces. Un fallo no detiene el resto; el código de
salida es `1` si falló algún archivo. Ejecútelo desde cron: el siguiente
ciclo de `check` o `serve` recoge los archivos nuevos.

TLS se verifica contra las raíces de confianza del sistema, más lo que
añada un bloque `cve.update`:

```yaml title="enodia.yaml"
cve:
  update:
    ca_file: /etc/enodia/russian-trusted.pem  # se añade a las raíces del sistema: PEM (uno o varios) o DER
    ca_dir: /etc/enodia/ca                    # cada archivo de certificado que contenga, igualmente
    tls_skip_verify: false                    # true: no verifica nada, en ninguna descarga
```

bdu.fstec.ru lo necesita: su cadena termina en la Russian Trusted Root
CA, que casi ningún almacén de confianza incluye, y el servidor no envía
su intermedio (consulte [BDU FSTEC](#bdu-fstec) más abajo). Sin ninguno
de los dos, la descarga de BDU falla con
`certificate signed by unknown authority` y las demás se completan
igualmente. La Root CA y la Sub CA de 2024 se publican en
`http://nuc-cdp.digital.gov.ru/cdp/rootca_ssl_rsa2022.crt` y
`http://nuc-cdp.digital.gov.ru/cdp/subca_ssl_rsa2024.crt`; un archivo con
ambas concatenadas sirve como `ca_file`.

Nombra los archivos igual que los comandos manuales de más abajo
(`v3.22-main.json`, `13.html`, …), así que ambos métodos se pueden
combinar. Los hosts a los que se conecta se enumeran en la página de
[Privacidad](/es/privacy/).

### BDU FSTEC

Un único archivo, la exportación completa del FSTEC (unos 33 MB
comprimido):

```bash
curl -fL --cacert ru-chain.pem \
  -o /var/lib/enodia/cve/bdu/vulxml.zip \
  https://bdu.fstec.ru/files/documents/vulxml.zip
```

bdu.fstec.ru usa un certificado de la CA nacional de Rusia (Минцифры,
el Ministerio de Desarrollo Digital), que no está en los almacenes de
confianza habituales del sistema: un `curl` simple falla con un error de
certificado. Además, el servidor no envía su certificado intermedio, y
`curl` (a diferencia de un navegador) no descarga por sí mismo uno que
falte, así que instalar solo la raíz no basta. Construya un paquete con
la raíz y el intermedio que indica el certificado del sitio:

```bash
curl -fsS -o root.crt https://gu-st.ru/content/lending/russian_trusted_root_ca_pem.crt
curl -fsS -o sub.crt  http://nuc-cdp.digital.gov.ru/cdp/subca_ssl_rsa2024.crt
{ cat root.crt; echo; cat sub.crt; } > ru-chain.pem
```

Comprobado en vivo el 2026-09-23. Si deja de funcionar, lo más probable
es que se haya rotado el intermedio: el propio campo *Authority
Information Access* del certificado del sitio indica el actual
(`openssl s_client -connect bdu.fstec.ru:443 | openssl x509 -noout -ext
authorityInfoAccess`). `curl -k` también descarga el archivo, pero omite
verificar lo que está a punto de introducir en su informe de seguridad.

### NIST NVD

Un archivo por año, `nvdcve-2.0-<year>.json.gz`, desde 2002 hasta el año
en curso. Coloque los que desee en un mismo directorio:

```bash
mkdir -p /var/lib/enodia/cve/nvd && cd /var/lib/enodia/cve/nvd
for y in $(seq 2002 "$(date +%Y)"); do
  curl -fsSLO "https://nvd.nist.gov/feeds/json/cve/2.0/nvdcve-2.0-$y.json.gz"
done
```

El archivo del año en curso se actualiza a diario; los de años
anteriores cambian rara vez. Cada archivo tiene un archivo complementario
`.meta` (`nvdcve-2.0-<year>.meta`) con su tamaño y su `sha256`; tenga en
cuenta que el hash corresponde al JSON *sin comprimir*, no al `.gz`.

### Debian Security Tracker

Un único archivo, la exportación JSON completa del tracker (unos 80 MB),
para los destinos `debian`:

```bash
curl -fsSL -o /var/lib/enodia/cve/debian.json \
  https://security-tracker.debian.org/tracker/data/json
```

También funcionan las copias `.json.gz` y `.json.zip`.

### OVAL del fabricante

Un archivo por cada versión de distribución de su parque, todos en un
mismo directorio, para los destinos `ubuntu`, `linuxmint`, `rhel`,
`rocky-linux`, `almalinux`, `oracle-linux`, `astra-linux` y `redos`:

| Destinos | Archivo |
|---|---|
| Ubuntu, Linux Mint (su base Ubuntu) | `https://security-metadata.canonical.com/oval/com.ubuntu.<codename>.usn.oval.xml.bz2` |
| RHEL **y Rocky Linux** | `https://security.access.redhat.com/data/oval/v2/RHEL<N>/rhel-<N>.oval.xml.bz2` |
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

Los archivos se toman tal como se publican, `.xml` o `.xml.bz2`. A qué
versión corresponde un archivo se lee de su contenido, nunca de su
nombre, así que los dos archivos de RED OS, publicados ambos como
`redos.xml`, solo necesitan nombres distintos en el disco. Dos archivos
se rechazan a propósito, con un error que indica qué archivo usar en su
lugar:

- **El OVAL propio de Rocky Linux** (`org.rockylinux.rlsa-<N>.xml`):
  contiene una pequeña fracción de los avisos de Rocky y no supera la
  validación del esquema OVAL. Rocky recompila los paquetes de Red Hat
  con las mismas versiones, así que los hosts Rocky se cotejan con el
  archivo de Red Hat.
- **La variante `oci.` de Ubuntu**: comprueba el archivo de estado de
  dpkg con expresiones regulares en lugar de paquetes.

Todas las URL se comprobaron en vivo el 2026-10-02.

### secdb de Alpine

Dos archivos por cada rama de Alpine de su parque, `main` y `community`,
para los destinos `alpine-linux`. Comparten nombre entre ramas, así que
guárdelos con nombres distintos:

```bash
mkdir -p /var/lib/enodia/cve/alpine && cd /var/lib/enodia/cve/alpine
for b in v3.20 v3.22; do
  for r in main community; do
    curl -fsSL -o "$b-$r.json" "https://secdb.alpinelinux.org/$b/$r.json"
  done
done
```

### Tabla de CVE propia de MariaDB

Un único archivo, para los destinos `mariadb`: la propia página de MariaDB
"Security Vulnerabilities (CVE) Fixed in MariaDB Community Server",
guardada tal cual en su fuente Markdown (unos 320 KB):

```bash
curl -fsSL -o /var/lib/enodia/cve/mariadb.md \
  https://mariadb.com/docs/server/security/cve/community-server.md
```

Comprobado en vivo el 2026-10-09.

### Datos de vulnerabilidades de Atlassian

Un único archivo, para los destinos `jira`, `confluence`, `bitbucket` y
`bamboo`: la exportación de transparencia de vulnerabilidades de
Atlassian, el JSON que devuelve esta URL, guardado tal cual (unos 2,3 MB,
sin inicio de sesión):

```bash
curl -fsSL -o /var/lib/enodia/cve/atlassian.json \
  https://api.atlassian.com/vuln-transparency/v1/products
```

### Páginas de seguridad de PostgreSQL

Para los destinos `postgresql`: la página de seguridad del proyecto
guardada como HTML. Solo nombra las versiones mayores que tienen soporte
hoy; para una versión mayor más antigua, guarde su propia página
(`/support/security/<major>/`) en el mismo directorio:

```bash
mkdir -p /var/lib/enodia/cve/postgresql && cd /var/lib/enodia/cve/postgresql
curl -fsSL -o security.html https://www.postgresql.org/support/security/
curl -fsSL -o 13.html   https://www.postgresql.org/support/security/13/
```

### Avisos de seguridad de nginx

Un único archivo, para los destinos `nginx`: la página de avisos guardada
como HTML:

```bash
curl -fsSL -o /var/lib/enodia/cve/nginx.html \
  https://nginx.org/en/security_advisories.html
```

Las tres URL se comprobaron en vivo el 2026-10-09.

## Configuración

Un bloque `cve:` en `enodia.yaml` —no en `settings.yaml`, ya que cambia
la evaluación, no solo la visualización—:

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
  mariadb:
    path: /var/lib/enodia/cve/mariadb.md
  atlassian:
    path: /var/lib/enodia/cve/atlassian.json
  postgresql:
    path: /var/lib/enodia/cve/postgresql
  nginx:
    path: /var/lib/enodia/cve/nginx.html
targets:
  - id: gitlab-main
    product: gitlab
    address: https://gitlab.example.com
    credentials: gitlab-token
```

| Campo | Acepta |
|---|---|
| `cve.bdu.path` | un `.xml`, un `.zip` (la exportación tal como se publica) o un `.tar.gz`/`.tgz` |
| `cve.nvd.path` | un único archivo `.json`, `.json.gz` o `.json.zip`, o un directorio que los contenga |
| `cve.debian.path` | la exportación del tracker: `.json`, `.json.gz` o `.json.zip` |
| `cve.oval.path` | un archivo OVAL (`.xml` o `.xml.bz2`), o un directorio que los contenga |
| `cve.alpine.path` | un archivo `.json` de secdb, o un directorio que los contenga |
| `cve.mariadb.path` | el `community-server.md` de MariaDB, guardado tal cual |
| `cve.atlassian.path` | el JSON vuln-transparency de Atlassian, guardado tal cual |
| `cve.postgresql.path` | la página de seguridad de PostgreSQL como HTML, o un directorio con varias de esas páginas |
| `cve.nginx.path` | el `security_advisories.html` de nginx, guardado tal cual |
| `cve.update` | opciones de TLS solo para [`enodia cve update`](#enodia-cve-update): `ca_file`, `ca_dir`, `tls_skip_verify` |

Las rutas relativas se resuelven respecto al directorio del archivo de
configuración que las menciona, igual que `credentials_file`. El bloque
se lee de la configuración que realmente use la ejecución: `--config`,
`$ENODIA_CONFIG` o las
[rutas de búsqueda predeterminadas](/es/configuration/#ubicación-de-los-archivos).
Eso incluye `check --from inventory.jsonl`: un inventario recopilado
dentro de una red cerrada se correlaciona allí donde se ejecute `check`,
siempre que se encuentre allí una configuración con un bloque `cve:`. Si
no se localiza ninguna configuración, `check --from` sigue funcionando,
solo que sin CVE.

**Una ruta configurada que no existe es un error**, no se omite en
silencio: `check` termina con `stat ...: no such file or directory` en
lugar de producir un informe que, sin avisar, no contiene ninguna CVE.
Desde la 2.1, `enodia config validate` también comprueba que exista cada
ruta configurada, así que una errata aparece ahí primero (desde la 2.2,
también `cve.update.ca_file` y `ca_dir`). Si un archivo se puede analizar
realmente sigue descubriéndose solo cuando una ejecución lo carga, o
cuando `enodia cve update` lo descarga.

:::caution[Rutas de Windows]
Escriba una ruta de Windows sin comillas, entre comillas simples, con
barras normales o como ruta UNC. Entre comillas **dobles** de YAML, `\t`
y `\n` se convierten en un tabulador y un salto de línea:
`"C:\tmp\bdu.zip"` apuntaría en silencio a otro lugar, así que enodia
rechaza al cargar cualquier ruta que contenga un carácter de control, con
una indicación.
:::

## Primera ejecución y caché

BDU y NVD se analizan en flujo y el resultado se almacena en caché
en el directorio de caché del sistema operativo
(`$XDG_CACHE_HOME/enodia/cve`, es decir, `~/.cache/enodia/cve` por
defecto en Linux; `~/Library/Caches/enodia/cve` en macOS;
`%LocalAppData%\enodia\cve` en Windows). La primera ejecución tras
cambiar un archivo lo analiza por completo: alrededor de un minuto para
todo NVD más BDU; medido el 2026-09-23 con BDU más solo el archivo 2026
de NVD, 25 s. Cada ejecución posterior lee la caché: 0,2 s para los
mismos datos, con una caché de 11 MB. No hay TTL: la caché se indexa por
los propios archivos (tamaño y fecha de modificación) y por las tablas
de productos de enodia, así que sustituir un archivo, añadir un año al
directorio de NVD o actualizar enodia provocan cada uno por sí solo una
reconstrucción.

El OVAL analizado se almacena en caché de la misma manera: unos 11 s
para analizar juntos los archivos de Ubuntu noble, RHEL 9, AlmaLinux 9 y
Oracle Linux 9, la mayor parte en bzip2. La exportación del tracker de
Debian (alrededor de un segundo de análisis) y el secdb de Alpine (unos
cientos de KB) no se almacenan en caché. Con todas las fuentes
configuradas a la vez (BDU, NVD, Debian, ocho archivos OVAL, Alpine),
upstream midió `check` en unos 22 s en frío y 3,4 s en caliente, con un
pico de 0,5–0,6 GB de memoria; menos si `cve.oval.path` contiene solo
las versiones que usted ejecuta realmente.

`enodia serve` vuelve a leer el bloque `cve:` y los archivos en cada
ciclo de `--interval` (con poco coste, desde la caché), así que sustituir
los archivos desde cron surte efecto sin reiniciar el servidor.

## Dónde aparecen los hallazgos

- **`check`**: una columna `CVES` en las
  [vistas `compact` y `drift`](/es/views/): el número de CVE distintas
  que afectan a esa versión exacta. `-` significa que no hay hallazgos:
  ninguna afecta a esa versión, no hay bloque `cve:`, o enodia no tiene
  correspondencia para el producto (véase más abajo); la columna en sí
  siempre está presente. `lifecycle` y `fleet` no incluyen la columna.
- **`export --format html`**: la misma columna, con un enlace informativo
  que abre una lista por destino: una línea por CVE, de la más grave a la
  menos grave, con enlaces a NVD, a cve.org y, para los hallazgos de BDU,
  a la página de bdu.fstec.ru; el texto en ruso de BDU cuando BDU tiene
  la CVE y, en caso contrario, la descripción en inglés de NVD; y la
  puntuación como insignias de color, p. ej. `CRITICAL · CVSS 3.1 9.8`.
  Los hallazgos a nivel de paquete son, en cambio, una línea por
  paquete (`linux 6.12.107-1 → 6.12.111-1`), enlazada al aviso que
  incluye la corrección, con su lista de CVE plegada debajo. Es CSS puro: el informe predeterminado sin conexión sigue sin contener
  nada de JavaScript.
- **`export --format json`**: cada hallazgo por fuente, completo, en la
  matriz `cves` de cada evaluación: la fuente (`bdu`, `nvd` o la de un
  fabricante: `mariadb`, `atlassian`, `postgresql`, `nginx`), el ID del
  aviso, los ID de CVE, el título, el texto de severidad de la propia
  fuente, el nombre de producto o CPE coincidente, el rango de versiones
  y una puntuación CVSS analizada. A diferencia de la tabla y de la lista
  HTML, que cuentan una línea por CVE, JSON conserva por separado el
  hallazgo de cada fuente: la misma CVE puede aparecer una vez desde BDU
  y una vez por cada CPE coincidente de NVD. Los hallazgos a nivel de
  paquete (fuente `debian`, `oval` o `alpine`) incluyen además las
  versiones instalada y corregida; consulte
  [Informes](/es/reporting/#--format-json).
- **`export --format prometheus`**: sin datos de CVE.

**Las CVE no afectan a la severidad ni al código de salida.** `SEVERITY`
se sigue calculando solo a partir de los ejes de parche/ciclo de
vida/rama, y `--fail-on` también conoce únicamente esos tres ejes: un
hallazgo es un hecho que revisar, no un veredicto que enodia haya emitido
en su nombre. Si una CVE debería elevar la severidad, y cómo, es una
cuestión abierta upstream.

## Qué productos tienen correspondencia

91 de los 123 productos: 81 por nombre de producto con BDU y NVD (seis de
ellos también con los datos propios de su fabricante; véase
[más abajo](#datos-propios-de-los-fabricantes)), con cada
nombre de fabricante/producto comprobado literalmente contra las
exportaciones completas reales, y 10 distribuciones Linux por paquete
instalado (véase la sección siguiente). Consulte la página de cada
producto en [Configuración de productos](/es/products/) para ver sus
fuentes.

Sin correspondencia, cada uno por un motivo:

- **Las demás distribuciones Linux de propósito general** (Fedora,
  CentOS Stream, Amazon Linux, openSUSE, …): sus CVE son
  vulnerabilidades de paquetes, un número de versión no puede indicar qué
  paquetes se han parcheado desde entonces, y todavía no hay ninguna
  fuente a nivel de paquete para ellas.
- **Los BSD y Oracle Solaris**: NVD registra sus niveles de parche (el
  `-p5` de FreeBSD, las erratas de OpenBSD) en un campo CPE que este
  cotejador no lee; cotejar solo por la versión marcaría un host
  totalmente parcheado con todas las CVE corregidas alguna vez en esa
  versión.
- **ESXi y vCenter**: el mismo problema: casi todas sus entradas son
  literales del estilo `7.0` + `update_1`.
- **TrueNAS**: demasiado pocas entradas, con un esquema de versiones
  distinto del que informa la sonda.
- **Sin datos utilizables en ninguna de las fuentes**: Kitsu, Zou,
  postgres_exporter, Perforce Proxy, Perforce Helix Swarm, Supermicro
  BMC, LibreTranslate, TorrServer y Euro-Office (una bifurcación sin
  entradas propias).
- **PostHog**: sus límites en NVD son commits de git, no versiones.
- **`generic`**: un analizador escrito a mano no tiene una identidad de
  producto que buscar.

## CVE a nivel de paquete para distribuciones Linux

Un número de versión no puede indicar qué paquetes de un host se han
parcheado desde entonces, así que estas diez distribuciones se cotejan,
en cambio, por paquete instalado. Sus sondas leen los paquetes
instalados y el kernel en ejecución en el mismo viaje de ida y vuelta
por SSH que la propia versión, y cada paquete se comprueba con los datos
de seguridad propios de su distribución:

| Sonda | Fuente | Clave |
|---|---|---|
| `debian` | Debian Security Tracker | `cve.debian.path` |
| `ubuntu` | OVAL de Canonical | `cve.oval.path` |
| `linuxmint` | OVAL de Canonical, para su base Ubuntu | `cve.oval.path` |
| `rhel`, `rocky-linux` | OVAL de Red Hat | `cve.oval.path` |
| `almalinux` | OVAL de AlmaLinux | `cve.oval.path` |
| `oracle-linux` | OVAL de Oracle | `cve.oval.path` |
| `astra-linux` | OVAL de Astra Linux (SE 1.7, 1.8) | `cve.oval.path` |
| `redos` | OVAL de RED OS (7.3, 8.0) | `cve.oval.path` |
| `alpine-linux` | secdb de Alpine | `cve.alpine.path` |

**Solo se informan las CVE que ya tienen una corrección más reciente que
lo instalado**: lo que cerraría una actualización (y, para el kernel, un
reinicio). Las CVE que el fabricante aún no ha corregido se omiten: son
las mismas en todos los hosts de una versión y nadie puede actuar sobre
ellas, así que sepultarían las que sí son accionables.

**Un hallazgo por paquete, no por CVE.** Un kernel desactualizado puede
acumular por sí solo más de mil CVE; una lista por CVE sería ilegible.
Cada hallazgo indica el paquete, su versión instalada, la versión que
cierra todas sus CVE y el aviso que incluye esa corrección (USN, RHSA,
ALSA, ELSA, boletín de Astra, ROS o la página del tracker de
Debian/Alpine). La columna `CVES` sigue contando CVE, no paquetes.

**Las versiones se comparan según las reglas propias de cada gestor de
paquetes**: el orden de dpkg, rpm y apk, comprobado upstream contra
`apt_pkg`, rpm y apk-tools con miles de pares de versiones reales en cada
caso; además de los streams de módulos de AppStream (un paquete solo se
coteja con las correcciones de su propio stream), la arquitectura de
Oracle Linux, las variantes FIPS y Ksplice, y el kernel **en ejecución**
en lugar de los paquetes de kernel que haya instalados. Cada fuente se
contrastó upstream con `oscap oval eval`, `dnf updateinfo`, python3-apt
o `apk version -t` en hosts y contenedores reales, con resultados
idénticos.

**Proxmox VE** obtiene hallazgos de paquetes como un segundo destino: un
destino [`debian`](/es/configuration/products/debian/) por SSH en el
mismo host, junto a su destino [`proxmox`](/es/configuration/products/proxmox/)
por la API. El paquete `linux` de Debian solo se coteja con un kernel de
Debian en ejecución, así que el kernel propio de Proxmox no se confunde
con uno.

### Cotejo según la edición

GitLab, HashiCorp Vault, Nextcloud y MongoDB publican listas de CVE
separadas para sus ediciones community y enterprise. Sus sondas registran
la propia edición del servidor en `extra.enterprise`, y una instancia
community ya no ve los hallazgos exclusivos de enterprise: con datos
reales, GitLab 19.2.2 CE ve 4 de las 9 de NVD, y Nextcloud 27.1.3 CE, 11
de 23. Cuando se desconoce la edición (un servidor antiguo que no la
informa), se conservan todos los hallazgos.

Desde la 2.2, las versiones de algunos productos más indican a qué línea
o edición se aplica un rango:

- **Jenkins**: las versiones semanales (`2.580`) y LTS (`2.568.3`)
  reciben la misma corrección con números distintos, y ambas bases de
  datos escriben un rango para cada una. La forma de la versión elige la
  línea (dos partes, semanal; tres, LTS), así que una LTS corregida ya no
  se marca por el límite semanal de la misma corrección.
- **Splunk**: solo se aplican los rangos de Splunk Enterprise (el propio
  `product_type` de splunkd indica cuál es); Splunk Cloud no tiene
  correspondencia.
- **pfSense**: la sonda informa solo de Community Edition, así que los
  rangos de pfSense Plus nunca se aplican.
- **WAPT**: la propia edición del servidor (`community` o `enterprise`)
  se transmite tal cual.
- **Kafka**: una compilación de Confluent Platform (`7.6.1-ccs`) no
  recibe ninguna búsqueda: su propia numeración se leería como más
  reciente que cualquier límite de Apache Kafka.

### Dell iDRAC y Synology DSM

**iDRAC**: ambas bases de datos nombran cada generación de iDRAC como un
producto propio, y sus números de firmware se solapan (iDRAC7 e iDRAC8
ejecutan ambos la 2.x, con correcciones distintas). La generación se lee
del `extra.model` de la sonda, la propia cadena de modelo de Redfish: 11G
es iDRAC6; 12G, iDRAC7; 13G, iDRAC8; 14G–16G, iDRAC9; 17G, iDRAC10. Sin
modelo, solo se busca el firmware 3.x y posterior, que solo puede ser
iDRAC9.

**Synology DSM**: una versión consta de versión, compilación y Update:
Synology escribe `DSM 7.2.1-69057 Update 6`, y NVD y BDU,
`7.2.1-69057-6`. Desde la 2.2, la sonda registra además el Update en
`extra.update`, y ambos lados se combinan en una única versión
comparable. Un inventario recopilado antes de la 2.2 no tiene
`extra.update` y se lee como Update 0: pueden marcarse Updates ya
corregidos, pero no se pasa por alto ninguno.

### SSH

La sonda [`ssh`](/es/configuration/products/ssh/) cubre cualquier
implementación de SSH, así que se coteja por el banner: `OpenSSH_…` busca
OpenSSH, `dropbear_…` busca Dropbear, y cualquier otra pila SSH no
recibe ninguna búsqueda en lugar de tomar prestadas las CVE de OpenSSH.

## Datos propios de los fabricantes

BDU y NVD describen a menudo una corrección en una rama como un rango
abierto ("before 11.4.10"), que entonces cubre también todas las ramas
más antiguas, incluidas versiones corregidas y ramas que nunca tuvieron
el fallo. Cuatro fabricantes publican ellos mismos la información exacta
por rama, y enodia la lee junto a BDU y NVD con una regla adicional:
**cuando los datos del fabricante conocen una CVE, su veredicto
prevalece**; se descarta un hallazgo de BDU o NVD cuyas CVE cubre el
fabricante y que este no marca para esta versión. Las CVE que el
fabricante no incluye siguen procediendo de BDU y NVD.

| Clave | Productos | Fuente |
|---|---|---|
| `cve.mariadb.path` | `mariadb` | la tabla de CVE corregidas de MariaDB |
| `cve.atlassian.path` | `jira`, `confluence`, `bitbucket`, `bamboo` | los datos de vulnerabilidades por versión de Atlassian |
| `cve.postgresql.path` | `postgresql` | las páginas de seguridad de PostgreSQL |
| `cve.nginx.path` | `nginx` | los avisos de seguridad de nginx |

Sin estas claves, los productos se siguen cotejando únicamente con BDU y
NVD, con el problema de solapamiento descrito arriba.

### MariaDB

MariaDB mantiene cinco o seis series de versiones a la vez. Con versiones
reales de un parque, los rangos de BDU y NVD marcaban las últimas
versiones, totalmente parcheadas, de series mantenidas (10.11.19,
11.4.13), mientras que esas mismas dos bases de datos pasaban por alto 9
de las 21 CVE que la propia MariaDB indica para la 10.11.8.

`cve.mariadb.path` añade la propia tabla de CVE corregidas de MariaDB,
que nombra la versión que corrige cada CVE **por serie**. Las CVE que la
tabla no incluye (más recientes que su copia descargada, exclusivas de
BDU o sin identificador CVE) siguen procediendo de BDU y NVD.

Cómo se lee la tabla:

- Una serie con su propia corrección es vulnerable desde su primera
  versión hasta esa corrección.
- Una serie sin corrección propia que todavía se mantenía cuando la CVE
  se corrigió en otra serie no está afectada: MariaDB corrige todas las
  series vigentes a la vez.
- Una serie que ya había finalizado para entonces se marca en todas sus
  versiones, con la corrección más baja de una serie más reciente como la
  versión a la que migrar (`FixStatus` lo indica). Esto tiende a informar
  de más a propósito, y solo para series finalizadas.

### Atlassian

La exportación de Atlassian enumera cada versión de Jira Software, Jira
Core, Confluence, Bitbucket y Bamboo (Server y Data Center) con las CVE
que la afectan y la versión que corrige cada una, **incluidas las CVE de
dependencias de terceros**, que las entradas de Atlassian en NVD nunca
incluyen. La sonda no puede distinguir Server de Data Center, así que se
leen ambas listas. Jira Service Management numera sus versiones por su
cuenta y no tiene correspondencia; las versiones candidatas y las EAP se
omiten.

Un destino se evalúa **dentro de su propia rama major.minor**: desde una
versión afectada hasta la siguiente que figure como su corrección, o
hasta el final de la rama si no sigue ninguna corrección. Jira 10.3.26 no
se marca por una CVE que Atlassian incluye solo para la 10.1 y la 11.3.
Como Atlassian enumera las versiones una a una, su veredicto vale solo
para una versión que figure en la lista: una versión más reciente que su
copia del archivo conserva los hallazgos de BDU y NVD. Upstream midió que
la versión más reciente de cada rama mantenida no tiene hallazgos de
Atlassian, mientras que las más antiguas ganan muchos: Jira 10.3.12 pasó
de 4 CVE a 119, casi todas de dependencias corregidas en versiones 10.3
posteriores.

### PostgreSQL

La página de seguridad nombra, para cada CVE, las versiones mayores con
soporte a las que afecta y la corrección en cada una. Su veredicto cubre
solo las versiones mayores que nombran las páginas guardadas: la página
principal enumera solo las versiones mayores con soporte hoy, así que
para una versión mayor finalizada (13, 9.6) guarde su propia página en
el mismo directorio; sin ella, esa versión mayor conserva los hallazgos
de BDU y NVD. Una versión mayor que ya había finalizado antes de que
apareciera una CVE se marca sin corrección cuando la CVE se remonta hasta
la versión mayor más antigua que aún tenía soporte entonces, igual que
con las series finalizadas de MariaDB. Las filas `packaging` (un
instalador o una compilación RPM) se registran, pero no se marcan.
Upstream midió que las versiones actuales 18/17/16/15/14 pasaron de hasta
55 hallazgos de BDU cada una a ninguno.

### nginx

Cada aviso enumera las versiones vulnerables y, por rama, la primera
versión corregida (`1.31.3+, 1.30.4+`): la estable 1.30.5 ya no se marca
por un rango escrito hasta la corrección de mainline. Las ramas que nunca
recibieron la corrección siguen marcadas; los avisos solo para
nginx/Windows se omiten.

## Limitaciones conocidas

- **BDU puede sobreinformar entre ramas.** Una entrada de BDU suele
  enumerar un rango distinto por cada rama de mantenimiento, todos con el
  mismo límite inferior, de modo que una versión que ya es la corrección
  en su propia rama puede seguir cayendo dentro del rango más amplio de
  una rama hermana (Confluence 8.3.3 frente a CVE-2023-22515 es el
  ejemplo documentado; los rangos por rama de Synology DSM hacen lo
  mismo: DSM 7.2.1-69057 Update 8 recibe 5 hallazgos de BDU). Los rangos de NVD para la misma CVE tienen sus
  propios límites inferiores y no presentan este problema. enodia opta
  deliberadamente por informar de un hallazgo que conviene verificar en
  lugar de omitir en silencio uno real.
- **Las entradas de NVD sin ninguna restricción de versión se
  descartan.** Medido contra las exportaciones completas, casi todas eran
  CVE de hace décadas asociadas a versiones actuales; el coste es la rara
  CVE realmente sin corregir registrada de esa forma.
- **La cobertura a nivel de paquete también tiene sus lagunas.** El
  tracker de Debian solo cubre las versiones que el equipo de seguridad
  de Debian sigue manteniendo (bookworm, trixie, testing, sid): los hosts
  más antiguos no obtienen hallazgos de paquetes. Alpine edge no tiene
  una rama numerada y tampoco obtiene ninguno. OVAL no se evalúa como un
  intérprete completo: no se comprueban las claves de firma de los
  paquetes, así que un paquete de terceros con el nombre de un paquete
  de la distribución se compara como si fuera de la distribución. Los
  paquetes de kernel de Astra Linux se comparan tal como están
  instalados, no según el que está en ejecución.
- **Las condiciones multiproducto de NVD** («vulnerable solo con la
  biblioteca Y») no se evalúan: una sonda informa de un producto por
  destino, así que cada entrada vulnerable de un producto con
  correspondencia cuenta por sí sola.
