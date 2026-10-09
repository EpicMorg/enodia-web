---
title: Registro de cambios
description: Cambios destacados de enodia, versión a versión.
---

La fuente canónica es el propio
[`CHANGELOG.md`](https://github.com/EpicMorg/enodia/blob/master/CHANGELOG.md)
de enodia: esta página lo refleja, se mantiene sincronizada junto con el
resto de este sitio en cada versión e incluye enlaces al resto de esta
documentación cuando un cambio afecta a cómo se configuraría algo en la
práctica. Las etiquetas siguen el formato `MAJOR.MINOR.PATCH+BUILD`, sin
prefijo `v`; `+BUILD` son metadatos de compilación de semver, que se usan
solo para una recompilación sin cambios funcionales, no para eludir un
incremento de versión real.

## 2.2.0+0 — 2026-10-09

`enodia cve update` descarga por sí mismo las bases de datos de CVE, los
propios datos de seguridad de los fabricantes (MariaDB, Atlassian,
PostgreSQL, nginx) se suman a BDU y NVD, la correlación de CVE llega a
iLO 4, iDRAC y Synology DSM, y se incorporan 27 sondas nuevas, 123 en
total. Todas las nuevas claves de `cve:` son opcionales, y las
configuraciones e inventarios de la 2.1 funcionan sin cambios, salvo una
credencial de un tipo que su producto nunca lee, que ahora es un error
(consulte Corregido).

### Añadido

- **[`enodia cve update`](/es/cve/#enodia-cve-update)** descarga las
  bases de datos de CVE que nombra cada `cve.*.path` configurado: BDU,
  NVD (este año, el año pasado y los años que falten; `--all-years` para
  todos), Debian, OVAL y Alpine (las versiones que ya están en disco, las
  que necesitan los inventarios de `--from`, `--oval`/`--alpine`),
  MariaDB, Atlassian, PostgreSQL (`--postgresql` para las páginas por
  versión mayor) y nginx. Usa If-Modified-Since; una descarga sustituye a
  un archivo solo después de cargarse correctamente. TLS se verifica
  contra las raíces del sistema más `cve.update.ca_file` y
  `cve.update.ca_dir`, o no se verifica en absoluto con
  `cve.update.tls_skip_verify`. Ningún otro comando descarga nada.
- **27 sondas nuevas:**
  - [`splunk`](/es/configuration/products/splunk/): la API de administración de splunkd en el 8089, Basic o un token de Splunk.
  - [`code-server`](/es/configuration/products/code-server/): `codeServerVersion` de la página de inicio de sesión.
  - [`phpipam`](/es/configuration/products/phpipam/): el pie de la página de inicio de sesión y la versión de sus recursos.
  - [`domainmod`](/es/configuration/products/domainmod/): el CHANGELOG de su raíz web.
  - [`netdata`](/es/configuration/products/netdata/): el `/api/v1/info` anónimo del agente.
  - [`libretranslate`](/es/configuration/products/libretranslate/): el documento OpenAPI público `/spec`.
  - [`torrserver`](/es/configuration/products/torrserver/): `/echo`.
  - [`kafka`](/es/configuration/products/kafka/): la versión del broker por SSH a partir de su propio jar, opcionalmente en un contenedor; las compilaciones de Confluent Platform se notifican como `confluent` con la línea de Apache Kafka que incluyen.
  - [`home-assistant`](/es/configuration/products/home-assistant/): `/api/config` con un token de acceso de larga duración, `kind: bearer`.
  - [`openhab`](/es/configuration/products/openhab/): la raíz REST anónima `/rest/`.
  - [`doxygen`](/es/configuration/products/doxygen/): qué Doxygen generó un sitio de documentación, a partir de su marca de generador.
  - [`qbittorrent`](/es/configuration/products/qbittorrent/): la API de la Web UI tras un inicio de sesión por formulario, `kind: password`.
  - [`netbox`](/es/configuration/products/netbox/): el `data-netbox-version` de la página de inicio de sesión anónima.
  - [`greenbone`](/es/configuration/products/greenbone/): (alias `openvas`, `gsad`) la versión de gsad a partir de su respuesta en `/gmp`, sin autenticación.
  - [`posthog`](/es/configuration/products/posthog/): el commit de git de PostHog autoalojado a partir de su página de inicio de sesión anónima.
  - [`uptime-kuma`](/es/configuration/products/uptime-kuma/): inicia sesión mediante la API socket.io de Uptime Kuma (`kind: password`) y lee la versión que envía tras el inicio de sesión.
  - [`wapt`](/es/configuration/products/wapt/): el `/ping` anónimo del servidor WAPT.
  - [`minio`](/es/configuration/products/minio/): `minio --version` por SSH, opcionalmente en un contenedor; los nombres `RELEASE.<timestamp>` de MinIO ahora se comparan como versiones.
  - [`sentry`](/es/configuration/products/sentry/): la versión de Sentry autoalojado a partir de su página de inicio de sesión anónima.
  - [`zookeeper`](/es/configuration/products/zookeeper/): la palabra de cuatro letras `srvr`.
  - [`ghost`](/es/configuration/products/ghost/): el `/ghost/api/admin/site/` anónimo, que da major.minor.
  - [`onlyoffice`](/es/configuration/products/onlyoffice/): y [`euro-office`](/es/configuration/products/euro-office/): ONLYOFFICE Docs y su bifurcación Euro-Office, leídos de forma anónima del `/index.html` del servidor de documentos; un servidor de la otra marca se rechaza indicando el producto que debe usarse.
  - [`weblate`](/es/configuration/products/weblate/): el pie anónimo «Powered by Weblate».
  - [`memcached`](/es/configuration/products/memcached/): el comando `version` del protocolo de texto, sin credenciales.
  - [`rabbitmq`](/es/configuration/products/rabbitmq/): el `/api/overview` del plugin de administración, `kind: basic`.
  - [`cassandra`](/es/configuration/products/cassandra/): `release_version` mediante el protocolo nativo CQL v4, `kind: password` cuando el clúster tiene PasswordAuthenticator.
- **CVE para los destinos [`mariadb`](/es/configuration/products/mariadb/).**
  BDU y NVD ahora cubren MariaDB, y un nuevo `cve.mariadb.path` lee la
  propia tabla de CVE corregidas de MariaDB (`community-server.md`), que
  conoce la versión que corrige cada CVE por serie. Cuando la tabla de
  MariaDB conoce una CVE, su veredicto sustituye a los rangos abiertos de
  BDU y NVD, de modo que la última versión de una serie mantenida ya no se
  marca por CVE corregidas solo en series más recientes; consulte
  [Datos propios de los fabricantes](/es/cve/#datos-propios-de-los-fabricantes).
- **`cve.atlassian.path`**: los propios datos de CVE por versión de
  Atlassian para `jira`, `confluence`, `bitbucket` y `bamboo`, incluidas
  las CVE de dependencias de terceros. Se evalúan dentro de cada rama;
  para una versión que Atlassian incluye, su veredicto prevalece; consulte
  [Atlassian](/es/cve/#atlassian).
- **`cve.postgresql.path` y `cve.nginx.path`**: las propias páginas de
  seguridad de los proyectos, con la versión que corrige cada CVE por
  rama. Las versiones actuales de PostgreSQL 17/16/15/14 y nginx 1.30.5
  ya no muestran los rangos sin rama de BDU; consulte
  [PostgreSQL](/es/cve/#postgresql) y [nginx](/es/cve/#nginx).
- **CVE para 24 productos más**: cassandra, code-server, domainmod,
  doxygen, ghost, greenbone, home-assistant, kafka, memcached, minio,
  netbox, netdata, onlyoffice, openhab, pfsense, phpipam, qbittorrent,
  rabbitmq, sentry, splunk, uptime-kuma, wapt, weblate, zookeeper. Las
  versiones con marca de tiempo de MinIO se comparan; pfSense CE y Splunk
  Enterprise omiten los rangos de otras ediciones; las compilaciones de
  Kafka de Confluent no reciben búsqueda.
- **CVE para [`hp-ilo4`](/es/configuration/products/hp-ilo4/),
  [`dell-idrac`](/es/configuration/products/dell-idrac/) y
  [`synology-dsm`](/es/configuration/products/synology-dsm/).** iDRAC se
  compara por generación, leída del modelo de Redfish; DSM compara
  versión, compilación y Update (`7.2.1-69057-6`), y la sonda ahora
  registra el Update en `extra.update`; consulte
  [Dell iDRAC y Synology DSM](/es/cve/#dell-idrac-y-synology-dsm).
  En total, ahora tienen correspondencia 91 de los 123 productos; consulte
  [qué productos tienen correspondencia](/es/cve/#qué-productos-tienen-correspondencia).
- Una página de [Privacidad](/es/privacy/): a qué se conecta enodia (sus
  destinos, endoflife.date, la API de GitHub, solo con nombres de
  productos y repositorios, y, solo para `enodia cve update`, los
  editores de las bases de datos de CVE) y qué almacena (solo sus propios
  archivos y una caché local). Sin telemetría.

### Cambiado

- El resolvedor `github` omite las versiones cuyo nombre de etiqueta
  indica una versión preliminar (`5.3.0.M2`, `2026.10.0b7`, `-rc1`,
  `-beta.1`) aunque GitHub no las marque como tales; lee como versiones
  las etiquetas escritas con guiones bajos (`Release_1_18_0`) y con el
  prefijo `release-` (`release-5.2.4`); y elimina un `<repo>-`/`<repo>_`
  inicial de las etiquetas, de modo que `weblate-2026.10` se lee como
  `2026.10`; consulte [Productos compatibles](/es/products/).
- [`teamcity`](/es/configuration/products/teamcity/) funciona sin
  credenciales: si no hay ninguna configurada, lee el
  `/app/rest/server/version` anónimo, abierto en todas las versiones de
  TeamCity comprobadas de la 2017.2 a la 2026.1, incluso con el inicio de
  sesión como invitado desactivado. Un token sigue seleccionando
  `/app/rest/server` como antes.

### Corregido

- Las CVE de [`jenkins`](/es/configuration/products/jenkins/): una versión
  LTS corregida ya no se marca por el rango semanal de la misma
  corrección (LTS 2.568.3 por «before 2.580»). Los rangos semanales y LTS
  ahora se aplican solo a su propia línea de versiones.
- El resolvedor `github` ya no falla en repositorios cuya lista de
  versiones supera 1 MiB (la de minio/minio ocupa 3,4 MB): ahora lee hasta
  8 MiB.
- **Una credencial de un tipo que su producto nunca envía es ahora un
  error de configuración** en lugar de descartarse en silencio.
  `kind: password` en un producto HTTP (RouterOS, Harbor, …) enviaba la
  solicitud sin ninguna cabecera `Authorization`; `config validate` ahora
  nombra los tipos que acepta el producto: para un inicio de sesión web es
  `kind: basic`. **Revise su configuración antes de actualizar**: una
  ejecución con una credencial así ahora se niega a arrancar. Consulte
  [Configuración → Credenciales](/es/configuration/#credenciales).

## 2.1.1+0 — 2026-10-08

### Corregido

- MariaDB 11.0+ ya no oculta su versión tras `5.5.5-`
  (`11.4.9-MariaDB-…`), por lo que [`mysql`](/es/configuration/products/mysql/)
  registraba esos servidores como MySQL y
  [`mariadb`](/es/configuration/products/mariadb/) los rechazaba. Ahora
  ambas sondas reconocen MariaDB en cualquiera de las dos formas. Un
  destino `product: mysql` que apunte a MariaDB 11.0+ ahora falla:
  cámbielo a `product: mariadb`.

## 2.1.0+0 — 2026-10-01

La correlación de CVE llega hasta los paquetes instalados en diez
distribuciones Linux, y se incorporan seis sondas nuevas. No se rompe
nada: las nuevas claves de `cve:` son opcionales y los inventarios solo
ganan campos opcionales, así que las configuraciones e inventarios de la
2.0 funcionan sin cambios.

### Añadido

- **[CVE a nivel de paquete para distribuciones Linux](/es/cve/#cve-a-nivel-de-paquete-para-distribuciones-linux).**
  Las sondas de SO leen ahora también los paquetes instalados y el kernel
  en ejecución en su único viaje de ida y vuelta por SSH, y los datos de
  seguridad propios de cada distribución se cotejan paquete a paquete.
  Cada fuente es un archivo que usted descarga, como BDU y NVD:
  - `cve.debian.path`: el JSON del Debian Security Tracker, para
    [`debian`](/es/configuration/products/debian/).
  - `cve.oval.path`: archivos OVAL del fabricante, uno por versión, para
    [`ubuntu`](/es/configuration/products/ubuntu/),
    [`linuxmint`](/es/configuration/products/linuxmint/) (a través de su
    base Ubuntu), [`rhel`](/es/configuration/products/rhel/),
    [`rocky-linux`](/es/configuration/products/rocky-linux/) (contra el
    archivo de Red Hat: el propio de Rocky se rechaza por inutilizable),
    [`almalinux`](/es/configuration/products/almalinux/),
    [`oracle-linux`](/es/configuration/products/oracle-linux/),
    [`astra-linux`](/es/configuration/products/astra-linux/) (SE 1.7/1.8)
    y [`redos`](/es/configuration/products/redos/) (7.3/8.0). El OVAL
    analizado se almacena en caché igual que BDU y NVD.
  - `cve.alpine.path`: el secdb de Alpine, para
    [`alpine-linux`](/es/configuration/products/alpine-linux/).
- Solo se informan las CVE que ya tienen una corrección más reciente que
  lo instalado: lo que cerraría una actualización (y, para el kernel, un
  reinicio). Un hallazgo por paquete, enlazado al aviso que incluye la
  corrección (USN, RHSA, ALSA, ELSA, boletín de Astra, ROS, página del
  tracker de Debian/Alpine), con todas sus CVE plegadas debajo en el
  informe HTML.
- El cotejo sigue las reglas propias de cada gestor de paquetes: el orden
  de versiones de dpkg, rpm y apk, los streams de módulos de AppStream,
  la arquitectura y las variantes FIPS y Ksplice de Oracle, y el kernel en
  ejecución en lugar de los paquetes de kernel que haya instalados. Cada
  fuente se contrastó con la herramienta de referencia
  (`oscap oval eval`, `dnf updateinfo`, python3-apt, `apk version -t`) en
  contenedores reales, con resultados idénticos.
- Sondas nuevas: [`mariadb`](/es/configuration/products/mariadb/),
  [`pfsense`](/es/configuration/products/pfsense/) (Community Edition,
  por SSH), [`supermicro-bmc`](/es/configuration/products/supermicro-bmc/),
  [`dell-idrac`](/es/configuration/products/dell-idrac/) y
  [`hp-ilo4`](/es/configuration/products/hp-ilo4/) (mediante Redfish), y
  [`freeradius`](/es/configuration/products/freeradius/) (por SSH, con
  `options.container` para un FreeRADIUS en Docker o Podman). 96 sondas
  en total.
- Resolvedor `github-tag-branches`: un ciclo de vida por cada
  major.minor a partir de las etiquetas de GitHub, para proyectos que
  mantienen varias ramas a la vez (FreeRADIUS 3.0.x y 3.2.x).
- FreeRADIUS se coteja tanto en NVD como en BDU.

### Corregido

- La abreviatura «8.0 U3k» de VMware en el calendario del ciclo de vida
  se considera ahora igual a «8.0.3»: un host
  [vCenter](/es/configuration/products/vcenter/) o
  [ESXi](/es/configuration/products/esxi/) 8.0 parcheado ya no aparece
  como `ahead`.
- Las columnas LATEST/CYCLE muestran versiones depuradas para los
  productos resueltos mediante GitHub, no la etiqueta en bruto
  (`2026.9.1`, no `v2026.9.1`).
- `config validate` informa de un archivo `cve.*.path` inexistente en
  lugar de darlo por bueno y fallar después en `check`.

### Notas

- Un host [Proxmox VE](/es/configuration/products/proxmox/) obtiene
  hallazgos de paquetes como un segundo destino `debian` por SSH, junto a
  su destino `proxmox` por la API; el `linux` de Debian solo se coteja con
  un kernel de Debian en ejecución, así que el kernel propio de Proxmox no
  se confunde con uno.
- Con todas las fuentes configuradas a la vez (BDU, NVD, Debian, ocho
  archivos OVAL, Alpine), `check` tardó ~22 s en frío y ~3,4 s en
  caliente, con un pico de ~0,5–0,6 GB; menos si `cve.oval.path` contiene
  solo las versiones que usted ejecuta.
- El historial del repositorio se reescribió y se volvió a firmar para
  eliminar nombres de host internos; todas las etiquetas se recrearon
  sobre el historial reescrito. Los binarios publicados hasta la 2.0.0+0
  informan hashes de commit anteriores a la reescritura.
- MariaDB, pfSense y las sondas de BMC aún no tienen correspondencia de
  CVE.

## 2.0.0+0 — 2026-09-23

Una versión mayor por una funcionalidad mayor, no por una ruptura: la
correlación de CVE es el primer eje de evaluación que no trata del ciclo
de vida. Los archivos `enodia.yaml`, `settings.yaml` y de inventario
existentes funcionan sin cambios: el nuevo bloque `cve:` es opcional, y
una configuración sin él se comporta exactamente como en la 1.2.

### Añadido

- **[Correlación de CVE](/es/cve/)** con dos bases de datos locales, BDU
  FSTEC y NIST NVD. enodia nunca las descarga: usted obtiene el
  `vulxml.zip` de BDU y los archivos anuales `nvdcve-2.0-<year>.json.gz`
  de NVD y apunta a ellos `cve.bdu.path` / `cve.nvd.path` en
  `enodia.yaml` (un archivo o, para NVD, un directorio de archivos).
  Cualquiera de las dos fuentes funciona por separado. Ambas se analizan
  en flujo y se almacenan en caché: la primera ejecución tras cambiar una
  base de datos tarda alrededor de un minuto para todo NVD más BDU, y cada
  ejecución posterior menos de un segundo. Consulte
  [cómo descargarlas](/es/cve/#descarga-de-las-bases-de-datos),
  incluido el certificado de CA adicional que necesita bdu.fstec.ru.
- **52 sondas con correspondencia** (53 nombres de producto upstream:
  `ssh` cuenta tanto como OpenSSH como Dropbear), todas las sondas con
  datos utilizables en alguna de las dos fuentes. Sin correspondencia a
  propósito, cada una por un motivo explícito: las distribuciones Linux
  de propósito general (sus CVE son a nivel de paquete), los BSD y
  Solaris, ESXi/vCenter y Synology DSM (niveles de parche y sufijos de
  compilación que el cotejador aún no lee); consulte
  [qué productos tienen correspondencia](/es/cve/#qué-productos-tienen-correspondencia)
  y la página de cada producto.
- **Cotejo según la edición** para [GitLab](/es/configuration/products/gitlab/),
  [Vault](/es/configuration/products/vault/),
  [Nextcloud](/es/configuration/products/nextcloud/) y
  [MongoDB](/es/configuration/products/mongodb/): una instancia community
  ya no ve los hallazgos exclusivos de enterprise (con datos reales,
  GitLab 19.2.2 CE ve 4 de las 9 de NVD, y Nextcloud 27.1.3 CE, 11 de
  23). Las cuatro sondas registran ahora la edición de su servidor en
  `extra.enterprise`; con una edición desconocida se conservan todos los
  hallazgos.
- Los destinos [`ssh`](/es/configuration/products/ssh/) se cotejan como
  OpenSSH o Dropbear según su banner; cualquier otra pila SSH no recibe
  ninguna búsqueda de CVE en lugar de recibir la de OpenSSH.
- Una **columna `CVES`** en las [vistas compact y drift](/es/views/) de
  `check`, que cuenta las CVE distintas.
- Una **lista por CVE** en
  [`export --format html`](/es/reporting/#la-lista-de-cve), CSS puro sin
  JavaScript, de modo que el informe en línea sigue siendo un archivo sin
  conexión con cero `<script>`: una línea por CVE con enlaces a NVD,
  cve.org y bdu.fstec.ru, el texto en ruso de BDU cuando BDU tiene la
  CVE, una puntuación de color `CRITICAL · CVSS 3.1 9.8`, de la más grave
  a la menos grave.
- [`export --format json`](/es/reporting/#--format-json) incluye cada
  hallazgo por fuente en el `cves` de cada evaluación, incluida una
  puntuación CVSS estructurada extraída de ambas fuentes.
- Sonda [`fortios`](/es/configuration/products/fortios/) para Fortinet
  FortiGate, mediante su API REST con un token de REST API Admin.
- Los informes HTML en modo CDN recuerdan, por cada lector, que se ha
  descartado la advertencia de «necesita acceso a internet».

### Notas

- El bloque `cve:` se lee de la configuración que realmente use la
  ejecución: `--config`, `$ENODIA_CONFIG` o las rutas de búsqueda
  predeterminadas.
- Las rutas de Windows funcionan sin comillas, entre comillas simples,
  con barras normales o como rutas UNC. Entre comillas dobles de YAML,
  `\t` y `\n` se convierten en un tabulador y un salto de línea, así que
  una ruta así se rechaza al cargar, con una indicación.
- `cisco-ios-xe` sale definitivamente de la hoja de ruta.

## 1.2.1+0 — 2026-09-10

### Corregido

- [`p4d`/`p4p`](/es/configuration/products/p4d/#tiempo-de-espera) no aplicaban
  `timeout` al subproceso de la CLI `p4` que invocan: todas las demás
  sondas de este árbol limitan su propio transporte a `timeout` antes de
  tocar la red, y esta no. Un proceso `p4` atascado al conectar con un
  servidor directo inaccesible (sin respuesta, sin reset: exactamente el
  comportamiento de red que es la razón misma por la que estas dos sondas
  invocan `p4`) se quedaba colgado indefinidamente, bloqueando una
  ejecución de recopilación completa. Notificado directamente a partir de
  un bloqueo real en producción.

## 1.2.0+0 — 2026-09-10

### Añadido

- Sondas [`p4d`](/es/configuration/products/p4d/) y
  [`p4p`](/es/configuration/products/p4p/), para Perforce Helix Core
  Server y Perforce Proxy. Se aplicó ingeniería inversa completa al
  protocolo RPC de red propio de Perforce, y un cliente hecho a mano
  reprodujo correctamente su handshake contra un proxy real, pero los
  servidores `p4d` directos reales descartan en silencio exactamente ese
  handshake, verificado como correcto byte a byte, por motivos que no son
  visibles desde el lado del cliente. En su lugar, ambas sondas invocan
  la propia CLI `p4` del operador: son las primeras sondas de enodia que
  ejecutan un proceso externo en lugar de hablar directamente un
  protocolo de red. La ruta del binario se puede configurar por destino
  mediante [`options.binary`](/es/configuration/#targets) (con `p4` en el
  `$PATH` como alternativa); funciona de forma idéntica en Windows,
  apuntando a `p4.exe`. La respuesta de un proxy se distingue de la de un
  servidor directo por la presencia de su propio campo `proxyVersion`:
  cada sonda rechaza la forma de la otra.

### Corregido

- El analizador de la salida de `p4 -Ztag` no eliminaba los finales de
  línea de Windows: un `p4.exe` real escribe `\r\n`, lo que dejaba un
  `\r` final dentro de valores de campo como `ServerID`.
- `probe.Observation.Resolver` (añadido en la 1.1.0+0 para
  [SonarQube](/es/configuration/products/sonarqube/)) era una estructura
  simple, no un puntero: `omitempty` de `encoding/json` no tiene concepto
  de «vacío» para un valor de estructura, así que cada una de las
  observaciones serializaba un `"resolver":{}` espurio en las
  exportaciones JSON, no solo las de SonarQube. Se cambió a un puntero,
  por la misma razón por la que `tlsVerified` ya admite nulo en lugar de
  ser un simple `false`.

## 1.1.1+0 — 2026-09-10

### Corregido

- [`debian`](/es/configuration/products/debian/) informaba una versión
  mayor a secas (`13`) en lugar de la versión puntual real (`13.6`): el
  `VERSION_ID` de `/etc/os-release` de Debian nunca la incluye, ni
  siquiera en una instalación totalmente parcheada; la versión puntual
  solo está en `/etc/debian_version`. `debian` dejó el mecanismo común
  `osReleaseFamilyProbe` y pasó a tener su propia sonda dedicada, que lee
  ambos archivos y solo confía en `debian_version` tras confirmar
  `ID=debian` y que su contenido es un número simple con puntos: se
  confirmó que una imagen real de Ubuntu incluye el mismo archivo con un
  contenido heredado sin sentido.
- [`ubuntu`](/es/configuration/products/ubuntu/) tenía la misma
  carencia: `VERSION_ID` nunca cambia después de publicarse una versión,
  así que un host `22.04` totalmente parcheado informaba `22.04` a secas,
  no `22.04.5`. `ubuntu` también dejó el mecanismo común y pasó a tener
  su propia sonda, que prefiere la versión puntual del propio campo
  `VERSION` de `os-release` cuando es estrictamente más precisa que
  `VERSION_ID`. Todos los demás productos de la familia común de
  [identificación del SO por SSH](/es/configuration/products/ssh-os-probes/)
  se auditaron de la misma manera; ninguno de los restantes tiene esta
  carencia.

Ningún cambio de configuración en ninguno de los dos: el mismo valor de
`product:`, las mismas credenciales, el mismo endpoint. Solo la `version`
informada se ha vuelto más precisa.

## 1.1.0+0 — 2026-09-10

### Añadido

- Un resolvedor del ciclo de vida `github-tags`, para un producto que no
  publica ninguna GitHub Release, solo etiquetas con una forma sin
  puntos: dio a [pgAdmin](/es/configuration/products/pgadmin/) su primer
  resolvedor funcional (las etiquetas de `pgadmin-org/pgadmin4` son
  `REL-9_17`, convertidas a `9.17`, eligiendo la etiqueta que se analiza
  como la más alta en lugar de la primera).
- La variable de entorno **`GITHUB_TOKEN`**: autentica todas las
  consultas del ciclo de vida basadas en GitHub, elevando el límite sin
  autenticación de 60 peticiones/hora a 5000/hora. Consulte
  [Productos compatibles](/es/products/#aplicaciones-y-servicios-de-infraestructura).
- Una sonda puede ahora sobrescribir el resolvedor del ciclo de vida de
  su producto por observación, para el caso poco frecuente en que el
  calendario correcto solo se puede conocer tras ver la respuesta de
  versión del propio fabricante. Se usó por primera vez para separar
  [SonarQube](/es/configuration/products/sonarqube/) entre SonarQube
  Server y SonarQube Community Build, dos productos distintos desde la
  separación de SonarSource a finales de 2024, que se siguen como dos
  páginas distintas de endoflife.date con datos de ciclo diferentes.

### Corregido

- Los fallos del resolvedor mostraban antes solo `resolver_error` en el
  informe, sin forma de distinguir un límite de peticiones de GitHub de
  un fallo de DNS o de una API que ha cambiado de forma.
  `enodia check`/`export` muestran ahora el error subyacente real en
  stderr cuando esto ocurre.
- SonarQube se comparaba siempre con el calendario del ciclo de vida de
  Community Build, incluso para una instancia de SonarQube Server: la
  recopilación de su versión funcionaba, pero el informe mostraba un
  ciclo sin correspondencia en cualquier caso. Ahora se resuelve por
  instancia a partir de la propia cadena de versión.

### Cambiado

- La publicación de la imagen de contenedor (`ghcr.io/epicmorg/enodia`,
  replicada también en Docker Hub y Quay) salió por completo del pipeline
  de publicación de este repositorio y pasó al monorepositorio
  `EpicMorg/docker`, con el calendario de compilación propio de ese
  repositorio. La dirección de la imagen publicada y las etiquetas
  (`latest`, `1`, la versión exacta) no cambian, pero la imagen en sí es
  ahora solo `linux/amd64` y se ejecuta como root; consulte
  [Primeros pasos](/es/getting-started/#instalación).

## 1.0.0+0 — 2026-09-09

Versión inicial. `collect → inventory.jsonl → evaluate → assessment →
render`, de principio a fin, verificado contra infraestructura de
producción real:

- **87 sondas**, un archivo cada una, compiladas y registradas
  explícitamente: la mayoría hablan HTTP, algunas
  ([Redis](/es/configuration/products/redis/),
  [PostgreSQL](/es/configuration/products/postgresql/),
  [MySQL](/es/configuration/products/mysql/),
  [MongoDB](/es/configuration/products/mongodb/)) hablan directamente su
  propio protocolo de red, y un conjunto creciente (todas las
  distribuciones Linux principales, los BSD, macOS, OPNsense, Proxmox
  VE, TrueNAS, Synology DSM, dispositivos de red) se alcanza por
  [SSH](/es/configuration/products/ssh-os-probes/) o mediante una API
  HTTP del fabricante, en lugar de suponer que existe siquiera un
  endpoint de versión.
- [`product: generic`](/es/configuration/products/generic/): una sonda
  solo de configuración para cualquier sistema interno, con un
  vocabulario deliberadamente congelado (sin condiciones, bucles ni
  plantillas).
- Resolución del ciclo de vida con endoflife.date y GitHub Releases,
  almacenada en caché en disco, evaluada en tres ejes independientes
  (desviación del parche, fase del ciclo de vida, rama más reciente) en
  lugar de un único veredicto combinado; consulte
  [Conceptos](/es/concepts/).
- Cuatro [vistas de informe](/es/views/) en salida de tabla, HTML, JSON
  y Prometheus.
- [`enodia serve`](/es/cli-reference/#enodia-serve): un servidor HTTP que
  solo sirve instantáneas; un temporizador en segundo plano recopila, y
  los manejadores solo leen la última instantánea.
- [Esquema de configuración](/es/configuration/) con interpolación
  `${VAR}`/`${VAR:-default}`, un almacén de credenciales dedicado y
  fijación TLS/habilitación explícita del modo inseguro por destino.
- Empaquetado: `.deb`, `.rpm`, `.apk` y `.pkg.tar.zst` de Arch, un
  usuario de sistema `enodia` dedicado y sin privilegios, páginas de
  manual para todos los comandos, archivos sin empaquetar para
  Linux/Windows/macOS/Android (Termux) y una imagen de contenedor;
  consulte [Primeros pasos](/es/getting-started/). Sumas de comprobación
  firmadas con cosign keyless (OIDC, sin ninguna clave que gestionar ni
  que pueda filtrarse).
