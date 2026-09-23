---
title: Correlación de CVE
description: Cotejo de cada versión sondeada con BDU FSTEC y NIST NVD, a partir de archivos que usted mismo descarga.
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
hallazgos se combinan por CVE. Es totalmente opcional: una configuración
sin bloque `cve:` se comporta exactamente como en la 1.x.

## enodia nunca descarga las bases de datos por sí mismo

Usted descarga los archivos, decide cuándo actualizarlos y apunta enodia
a ellos. enodia no tiene ninguna ruta de código que acceda por su cuenta
a bdu.fstec.ru o a nvd.nist.gov; es el mismo razonamiento de red cerrada
que el del [diseño en dos fases](/es/concepts/#dos-fases-separables-a-propósito):
la máquina que ejecuta `check` no necesita acceso a internet para la
correlación de CVE, solo una copia de los archivos.

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
`enodia config validate` comprueba la forma del bloque (incluida la
comprobación de caracteres de control descrita más abajo), pero no si
los archivos existen; eso solo se comprueba cuando una ejecución los
carga realmente.

:::caution[Rutas de Windows]
Escriba una ruta de Windows sin comillas, entre comillas simples, con
barras normales o como ruta UNC. Entre comillas **dobles** de YAML, `\t`
y `\n` se convierten en un tabulador y un salto de línea:
`"C:\tmp\bdu.zip"` apuntaría en silencio a otro lugar, así que enodia
rechaza al cargar cualquier ruta que contenga un carácter de control, con
una indicación.
:::

## Primera ejecución y caché

Ambas fuentes se analizan en flujo y el resultado se almacena en caché
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
  Es CSS puro: el informe predeterminado sin conexión sigue sin contener
  nada de JavaScript.
- **`export --format json`**: cada hallazgo por fuente, completo, en la
  matriz `cves` de cada evaluación: la fuente (`bdu`/`nvd`), el ID del
  aviso, los ID de CVE, el título, el texto de severidad de la propia
  fuente, el nombre de producto o CPE coincidente, el rango de versiones
  y una puntuación CVSS analizada. A diferencia de la tabla y de la lista
  HTML, que cuentan una línea por CVE, JSON conserva por separado el
  hallazgo de cada fuente: la misma CVE puede aparecer una vez desde BDU
  y una vez por cada CPE coincidente de NVD.
- **`export --format prometheus`**: sin datos de CVE.

**Las CVE no afectan a la severidad ni al código de salida.** `SEVERITY`
se sigue calculando solo a partir de los ejes de parche/ciclo de
vida/rama, y `--fail-on` también conoce únicamente esos tres ejes: un
hallazgo es un hecho que revisar, no un veredicto que enodia haya emitido
en su nombre. Si una CVE debería elevar la severidad, y cómo, es una
cuestión abierta upstream.

## Qué productos tienen correspondencia

52 de los 90 productos, con cada nombre de fabricante/producto comprobado
literalmente contra las exportaciones completas reales; consulte la
página de cada producto en
[Configuración de productos](/es/products/) para ver sus fuentes.

Sin correspondencia, cada uno por un motivo:

- **Distribuciones Linux de propósito general** (Debian, Ubuntu, RHEL,
  Alma, Rocky, Fedora, RED OS, Astra Linux, …): sus CVE son
  vulnerabilidades de paquetes; un número de versión no puede indicar qué
  paquetes se han parcheado desde entonces.
- **Los BSD y Oracle Solaris**: NVD registra sus niveles de parche (el
  `-p5` de FreeBSD, las erratas de OpenBSD) en un campo CPE que este
  cotejador no lee; cotejar solo por la versión marcaría un host
  totalmente parcheado con todas las CVE corregidas alguna vez en esa
  versión.
- **ESXi y vCenter**: el mismo problema: casi todas sus entradas son
  literales del estilo `7.0` + `update_1`.
- **Synology DSM**: límites como `6.2.4-25556-3` que el estricto
  analizador de rangos rechaza.
- **TrueNAS**: demasiado pocas entradas, con un esquema de versiones
  distinto del que informa la sonda.
- **Sin datos utilizables en ninguna de las fuentes**: Kitsu, Zou,
  postgres_exporter, Perforce Proxy, Perforce Helix Swarm.
- **`generic`**: un analizador escrito a mano no tiene una identidad de
  producto que buscar.

### Cotejo según la edición

GitLab, HashiCorp Vault, Nextcloud y MongoDB publican listas de CVE
separadas para sus ediciones community y enterprise. Sus sondas registran
la propia edición del servidor en `extra.enterprise`, y una instancia
community ya no ve los hallazgos exclusivos de enterprise: con datos
reales, GitLab 19.2.2 CE ve 4 de las 9 de NVD, y Nextcloud 27.1.3 CE, 11
de 23. Cuando se desconoce la edición (un servidor antiguo que no la
informa), se conservan todos los hallazgos.

### SSH

La sonda [`ssh`](/es/configuration/products/ssh/) cubre cualquier
implementación de SSH, así que se coteja por el banner: `OpenSSH_…` busca
OpenSSH, `dropbear_…` busca Dropbear, y cualquier otra pila SSH no
recibe ninguna búsqueda en lugar de tomar prestadas las CVE de OpenSSH.

## Limitaciones conocidas

- **BDU puede sobreinformar entre ramas.** Una entrada de BDU suele
  enumerar un rango distinto por cada rama de mantenimiento, todos con el
  mismo límite inferior, de modo que una versión que ya es la corrección
  en su propia rama puede seguir cayendo dentro del rango más amplio de
  una rama hermana (Confluence 8.3.3 frente a CVE-2023-22515 es el
  ejemplo documentado). Los rangos de NVD para la misma CVE tienen sus
  propios límites inferiores y no presentan este problema. enodia opta
  deliberadamente por informar de un hallazgo que conviene verificar en
  lugar de omitir en silencio uno real.
- **Las entradas de NVD sin ninguna restricción de versión se
  descartan.** Medido contra las exportaciones completas, casi todas eran
  CVE de hace décadas asociadas a versiones actuales; el coste es la rara
  CVE realmente sin corregir registrada de esa forma.
- **Las condiciones multiproducto de NVD** («vulnerable solo con la
  biblioteca Y») no se evalúan: una sonda informa de un producto por
  destino, así que cada entrada vulnerable de un producto con
  correspondencia cuenta por sí sola.
