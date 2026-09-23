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
  [cómo descargarlas](/es/cve/#enodia-nunca-descarga-las-bases-de-datos-por-sí-mismo),
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
