---
title: Configuración
description: Todos los campos que aceptan enodia.yaml, credentials.yaml y settings.yaml.
---

enodia lee hasta tres archivos: **`enodia.yaml`** (obligatorio: su
inventario de servicios), un **`credentials.yaml`** separado opcional y
un **`settings.yaml`** opcional (preferencias personales de
visualización, nunca obligatorio). Los tres son YAML simple.

## `enodia.yaml`

### Nivel superior

```yaml
schemaVersion: 1
credentials_file: credentials.yaml   # opcional, véase más abajo
defaults:                            # opcional
  timeout: 10s
  concurrency: 5
  retries: 2
  backoff: 500ms
cve:                                 # opcional, véase "Correlación de CVE"
  bdu:
    path: vulxml.zip
  nvd:
    path: nvd/
credentials: {}                      # opcional, véase "Credenciales"
targets: []                          # sus servicios
```

`schemaVersion` se comprueba al leer: una versión futura se rechaza con
la recomendación de actualizar, en lugar de analizarse con optimismo.

### `defaults`

Se aplica a todos los destinos, salvo que se sobrescriba por destino.

| Campo | Tipo | Significado |
|---|---|---|
| `timeout` | duración | Tiempo de espera por petición (predeterminado: `10s` si no se establece en ningún sitio) |
| `concurrency` | int | Cuántos destinos se sondean a la vez |
| `retries` | int | Número de reintentos: solo se reintenta `ErrUnreachable`; una credencial rechazada no mejora en un segundo intento |
| `backoff` | duración | Espera entre reintentos |

Las duraciones usan la sintaxis de duración de Go: `500ms`, `10s`, `2m`,
`1h30m`.

### `cve`

Opcional. Indica a enodia una exportación de BDU FSTEC (`cve.bdu.path`)
y/o fuentes JSON de NVD (`cve.nvd.path`) que usted mismo haya
descargado: enodia nunca las descarga. Las rutas relativas se resuelven
respecto al directorio de esta configuración, y una ruta configurada que
no existe es un error. Qué hace, cómo obtener los archivos y qué
productos tienen correspondencia:
[Correlación de CVE](/es/cve/).

### `targets`

Una entrada por servicio:

```yaml
targets:
  - id: jira-main               # obligatorio, estable ante cambios de nombre: las métricas y el historial se indexan por él
    name: Jira (production)     # opcional, por defecto igual a id
    product: jira                # obligatorio; véase Productos compatibles
    address: https://jira.example.com   # obligatorio
    credentials: jira-token      # opcional, nombre de una entrada de credentials:
    timeout: 15s                 # opcional, sobrescribe defaults.timeout
    path: /rest/api/2/serverInfo # opcional, específico del producto: la mayoría de las sondas tienen un valor razonable por defecto
    method: GET                  # opcional
    headers:                     # opcional, cabeceras adicionales enviadas con cada petición
      X-Custom: value
    allow_insecure_transport: false   # opcional; véase "HTTPS primero" en Conceptos
    tls:                          # opcional, véase "TLS" más abajo
      ca_file: /etc/enodia/ca.pem
    options:                      # opcional, ajustes clave/valor específicos del producto
      key: value
    parser:                       # solo para product: generic; véase más abajo
      type: regex
```

`address` se escribe exactamente como usted lo teclearía: cada sonda lo
analiza por su cuenta. Un host sin prefijo `https://`/`http://` se
resuelve automáticamente (consulte
[Conceptos](/es/concepts/#https-primero-por-defecto-las-credenciales-nunca-se-envían-en-claro)),
o bien ejecute `enodia config resolve` para ver qué esquema usaría cada
destino sin enviar ninguna credencial.

`options` es un mapa libre por producto: la mayoría de las sondas lo
ignoran por completo. [`p4d`/`p4p`](/es/configuration/products/p4d/) son
las primeras que realmente leen uno: `options.binary` sobrescribe la ruta
de la CLI `p4` que invocan.

Consulte **Configuración de productos** en la barra lateral (o la tabla
de [Productos compatibles](/es/products/)) para ver el endpoint exacto,
los requisitos de autenticación y los campos registrados de cada una de
las 90 sondas integradas: `path`, `credentials` y `options` de arriba son
la forma general; la página de cada producto indica lo que realmente
necesita.

### TLS (`tls:`)

Tres niveles, en orden decreciente de corrección:

```yaml
tls:
  ca_file: /etc/enodia/corp-ca.pem   # un paquete de CA corporativa: la mayoría de los entornos cerrados tienen su propia PKI
  pin_sha256:                         # huella(s) fijada(s) del certificado final
    - "AB:CD:...:EF"
  server_name: internal.example.com   # sobrescritura de SNI
  min_version: "1.2"                  # versión mínima de TLS
  insecure: true                      # último recurso; véase más abajo
```

`insecure: true` emite una advertencia en cada ejecución, no solo al
validar, porque tiene la costumbre de añadirse «temporalmente» y quedarse
durante años. También se traslada a la observación, de modo que un
informe sirve a la vez como auditoría TLS de toda la flota: se puede ver
qué servicios se están comprobando sin verificación.

## Credenciales

Entradas con nombre, a las que se hace referencia por su nombre desde el
campo `credentials:` de un destino:

```yaml
credentials:
  jira-token:
    kind: bearer
    value: "${JIRA_TOKEN}"

  gitlab-token:
    kind: token-header
    header: PRIVATE-TOKEN
    value: "${GITLAB_TOKEN}"

  vault-basic:
    kind: basic
    username: enodia
    password: "${VAULT_PASSWORD}"

  redis-auth:
    kind: password
    password: "${REDIS_PASSWORD}"

  linux-host-ssh:
    kind: ssh-key
    username: enodia-ro
    private_key_file: /etc/enodia/ssh/id_ed25519
    passphrase: "${SSH_KEY_PASSPHRASE}"   # opcional, solo si la clave está cifrada
```

| `kind` | Campos utilizados | Envía |
|---|---|---|
| `none` (predeterminado si se omite) | — | ninguna credencial |
| `bearer` | `value` | `Authorization: Bearer <value>` |
| `token-header` | `header`, `value` | una cabecera personalizada, p. ej. `PRIVATE-TOKEN`, `X-Vault-Token` |
| `basic` | `username`, `password` | autenticación HTTP Basic |
| `password` | `password` (más `username`, para los protocolos que lo usan: Redis ACL, PostgreSQL) | autenticación nativa del protocolo (`AUTH` de Redis, la propia contraseña de una conexión SQL, ...) |
| `ssh-key` | `username`, `private_key_file`, `passphrase` (opcional) | autenticación SSH por clave pública, para las sondas de identificación del SO basadas en SSH (consulte [Productos compatibles](/es/products/)) |

`username` solo con `kind: password` y sin `private_key_file` también
funciona para destinos SSH: las sondas SSH aceptan una contraseña o una
clave privada, igual que cualquier cliente SSH (`username` más
`password` con `kind: password`, o `username` más `private_key_file` con
`kind: ssh-key`).

### Verificación de la clave de host SSH

Todas las sondas basadas en SSH reutilizan el mismo bloque `tls:` que las
sondas HTTPS usan para verificar certificados: aquí `pin_sha256` contiene
el SHA-256 en hexadecimal de la codificación de red de la propia clave de
host, no de un certificado TLS, pero con la misma forma de «fijar una
huella, o indicar `insecure` y recibir una advertencia»:

```yaml
targets:
  - id: linux-host
    product: debian
    address: host.example.com
    credentials: linux-host-ssh
    tls:
      pin_sha256:
        - "AB:CD:...:EF"   # sha256 de la clave de host, con ssh-keyscan o similar
      # insecure: true      # último recurso: omite por completo la verificación de la clave de host
```

Si no se establece ni `pin_sha256` ni `insecure: true`, la conexión se
rechaza antes de enviar una sola credencial.

### `credentials_file`

Un archivo separado, con la misma forma que el mapa `credentials:` en
línea:

```yaml title="credentials.yaml"
jira-token:
  kind: bearer
  value: "${JIRA_TOKEN}"
```

```yaml title="enodia.yaml"
schemaVersion: 1
credentials_file: credentials.yaml
targets:
  - id: jira-main
    product: jira
    address: https://jira.example.com
    credentials: jira-token
```

Esto es lo que permite confirmar un inventario de servicios en git
mientras los secretos quedan completamente fuera de él. Las entradas de
`credentials_file` tienen prioridad sobre una entrada en línea con el
mismo nombre. `credentials_file` se resuelve respecto al archivo de
configuración que lo menciona, no respecto al directorio actual.

### Interpolación de variables de entorno

Cualquier valor de cadena de `enodia.yaml` o `credentials.yaml` puede
hacer referencia a una variable de entorno:

- `${VAR}`: se sustituye por el valor de `$VAR`; si falta, es un error.
- `${VAR:-default}`: se sustituye por el valor de `$VAR`, o por
  `default` si no está definida.

## Integración con HashiCorp Vault Agent

Ni el mapa `credentials:` en línea de `enodia.yaml` ni un
`credentials.yaml` separado necesitan que los escriba una persona. Ambos
son simplemente archivos que enodia lee de nuevo en cada ejecución,
confirmado en el código fuente: `enodia check` vuelve a cargar la
configuración y las credenciales desde cero en cada invocación, y
`enodia serve --interval` hace lo mismo en cada ciclo de actualización
(`Config.Build` llama a `LoadCredentials` cada vez que se ejecuta
`collectObservations`; nada se almacena en caché durante la vida del
proceso, así que editar cualquiera de los dos archivos surte efecto sin
reiniciar). Esa es exactamente la forma para la que está pensado el
renderizado `template` de
[Vault Agent](https://developer.hashicorp.com/vault/docs/agent-and-proxy/agent).
enodia no tiene ninguna integración propia específica para Vault, ni la
necesita, ya que los dos mecanismos siguientes ya se combinan
directamente con él.

### Vault Agent renderiza variables de entorno

Apunte la sección `template` (o `env_template`) de Vault Agent a los
secretos que necesita un destino y haga referencia a ellos de la forma
habitual, mediante la
[interpolación de variables de entorno](#interpolación-de-variables-de-entorno)
descrita más arriba:

```yaml title="credentials.yaml"
jira-token:
  kind: bearer
  value: "${JIRA_TOKEN}"
```

El modo `exec` de Vault Agent ejecuta el propio enodia (o un script
envoltorio que llame a `enodia check`) como su proceso hijo supervisado,
inyectando las variables renderizadas directamente en el entorno de ese
proceso: ningún secreto llega nunca al disco como un archivo que enodia
tenga que leer. La sección `exec` de Vault Agent también permite
reiniciar el proceso hijo cuando cambia un secreto de plantilla, si
desea que un `enodia serve` de larga duración recoja inmediatamente un
token rotado en lugar de confiar en que siga siendo válido en el
siguiente ciclo de `--interval`; consulte la documentación de Vault
Agent para la configuración exacta, ya que depende por completo de Vault
Agent.

### Vault Agent renderiza un `credentials.yaml` directamente

Apunte `credentials_file:` a la ruta en la que escribe la sección
`template` de Vault Agent, y use como plantilla exactamente la forma que
espera [`credentials_file`](#credentials_file):

```yaml title="enodia.yaml"
schemaVersion: 1
credentials_file: /run/enodia/credentials.yaml
targets:
  - id: jira-main
    product: jira
    address: https://jira.example.com
    credentials: jira-token
```

```hcl title="Sección template de Vault Agent — ilustrativa; consulte la documentación de Vault Agent para la sintaxis exacta"
template {
  destination = "/run/enodia/credentials.yaml"
  perms       = "0600"
  contents    = <<EOT
jira-token:
  kind: bearer
  value: "{{ with secret "secret/data/enodia/jira" }}{{ .Data.data.token }}{{ end }}"
EOT
}
```

Esta vía no necesita ninguna configuración de `exec`/reinicio:
`enodia check` vuelve a leer `credentials_file` desde cero en cada
invocación, y `enodia serve` lo vuelve a leer en cada ciclo de
actualización, independientemente de cómo haya cambiado en el disco. Un
`enodia check` programado con cron o un `enodia serve` de larga duración
simplemente recogen lo último que haya escrito Vault Agent, con su propia
programación: no hay nada específico de enodia que configurar para ello.

### En ambos casos, se aplica el tratamiento de credenciales de enodia

Ambos patrones quedan dentro de todo lo que ya cubre
[Seguridad](/es/security/): las credenciales nunca aparecen en el
inventario, en los informes exportados ni en los registros, y la
verificación TLS sigue activada salvo que usted la desactive por
destino. Son los `perms` de Vault Agent y la elección del directorio de
destino lo que impide que cualquier otro proceso pueda leer el archivo
renderizado; enodia en sí no tiene ninguna opinión sobre dónde se
encuentra `credentials_file`, más allá de resolver una ruta relativa
respecto al archivo de configuración que la menciona.

## La sonda genérica

`product: generic` es la vía de escape para un destino que nunca tendrá
una sonda dedicada. Su vocabulario es deliberadamente pequeño y está
congelado: sin condiciones, sin bucles, sin peticiones encadenadas, sin
plantillas. Un destino que necesite cualquiera de esas cosas necesita
una sonda real escrita en Go, no más funciones en la sonda genérica.

```yaml
targets:
  - id: in-house-api
    product: generic
    address: https://internal.example.com
    parser:
      type: regex          # json | xml | header | plaintext | regex
      key: version          # ruta con puntos (json), ruta de etiquetas tipo XPath (xml) o nombre de cabecera
      regex: 'v(\d+\.\d+\.\d+)'
      clean_regex: '^v'     # gana el primer grupo de captura; snake_case, véase más abajo
      line: 1                # solo plaintext: qué línea leer
```

:::caution[Grafía del campo: `clean_regex`, no `cleanRegex` ni `cleanregex`]
`ParserSpec` incluye ahora etiquetas `yaml:` explícitas que siguen la
misma convención snake_case del resto de `enodia.yaml` (`ca_file`,
`min_version`, `allow_insecure_transport`, ...): `clean_regex` es
correcto desde el 2026-09-07. Antes de esa corrección, la estructura no
tenía ninguna etiqueta explícita, así que se aplicaba el valor
predeterminado de YAML sin etiquetas (minúsculas, sin separar palabras)
y la única grafía que funcionaba era `cleanregex`; un `cleanRegex` a
secas no ha funcionado nunca. Confirmado directamente contra el
analizador las dos veces que se comprobó, no deducido de la
documentación.
:::

## Ubicación de los archivos

Tanto `enodia.yaml` como `settings.yaml` se buscan de la misma manera:
una ruta explícita (`--config`/`--settings`, o `$ENODIA_CONFIG`/
`$ENODIA_SETTINGS` para un archivo exacto) siempre prevalece y debe
existir: una errata es un error, nunca un paso silencioso a otro
archivo. En su ausencia, se realiza una búsqueda en el orden indicado
abajo; la primera coincidencia gana sin más, y no se combina nada de
varios archivos encontrados. La ubicación pesa más que el nombre: una
coincidencia en el directorio actual siempre gana a una en
`$XDG_CONFIG_HOME`, que a su vez siempre gana a una en `/etc/enodia/`,
independientemente de qué nombre coincidiera en cada lugar.

**`enodia.yaml`:**

1. `./enodia.yaml`
2. `./enodia.yml`
3. `./config.yaml`
4. `./config.yml`
5. `./.enodia.yaml`
6. `./.enodia.yml`
7. `./.config.yaml`
8. `./.config.yml`
9. `$XDG_CONFIG_HOME/enodia/enodia.yaml` (`~/.config/enodia/enodia.yaml` si `$XDG_CONFIG_HOME` no está definida)
10. `$XDG_CONFIG_HOME/enodia/enodia.yml`
11. `$XDG_CONFIG_HOME/enodia/config.yaml`
12. `$XDG_CONFIG_HOME/enodia/config.yml`
13. `/etc/enodia/enodia.yaml`
14. `/etc/enodia/enodia.yml`
15. `/etc/enodia/config.yaml`
16. `/etc/enodia/config.yml`

No encontrar nada en absoluto es un error: una configuración que no se
puede encontrar merece un fallo ruidoso, ya que normalmente significa
que se va a usar el archivo equivocado (o ninguno). Ejecute
`enodia config path` para ver qué archivo se tomaría realmente.

**`settings.yaml`**: la misma idea, con algunas diferencias: también
comprueba un nombre simple `settings.` (no solo `enodia.settings.`),
comprueba además el directorio en el que se encuentra el ejecutable en
marcha (no solo el directorio actual; véase más abajo), y no encontrar
nada en absoluto **no** es un error: cada campo simplemente recurre a su
valor predeterminado integrado, ya que este archivo es completamente
opcional:

1. `./enodia.settings.yaml`
2. `./enodia.settings.yml`
3. `./settings.yaml`
4. `./settings.yml`
5. `./.enodia.settings.yaml`
6. `./.enodia.settings.yml`
7. `./.settings.yaml`
8. `./.settings.yml`
9. `<directory containing the running executable>/settings.yaml` (el directorio que contiene el ejecutable en marcha)
10. `<same>/settings.yml`
11. `$XDG_CONFIG_HOME/enodia/settings.yaml` (`~/.config/enodia/settings.yaml` si `$XDG_CONFIG_HOME` no está definida)
12. `$XDG_CONFIG_HOME/enodia/settings.yml`
13. `/etc/enodia/settings.yaml`
14. `/etc/enodia/settings.yml`

Los pasos 9-10 son distintos del directorio actual (pasos 1-8): una
instalación portátil (descomprimir en cualquier sitio, sin gestor de
paquetes) se ejecuta desde el directorio en el que se encuentre el
operador en ese momento, que en Windows en particular casi nunca es el
propio directorio de instalación (`install.ps1` usa por defecto
`%LOCALAPPDATA%\enodia`, añadido al `PATH`; la razón de ser del `PATH` es
precisamente que el directorio actual deje de importar). Este paso se
limita deliberadamente a `settings.yaml`: son preferencias opcionales de
visualización, así que uno incorrecto o manipulado en un directorio de
instalación compartido es, como mucho, un problema estético.
`enodia.yaml` contiene credenciales y no tiene un paso equivalente.

## `settings.yaml`

Preferencias de visualización personales, por operador: nunca destinos,
nunca credenciales, nunca compartido como suele compartirse
`enodia.yaml`.

```yaml title="settings.yaml"
schemaVersion: 1

render:
  # compact (predeterminado) | lifecycle | drift | fleet
  default_view: fleet

export:
  # json (predeterminado) | prometheus | html: se usa siempre que `export`
  # se ejecute sin --format
  default_format: html

html:
  # inline (predeterminado, totalmente sin conexión) | cdn (carga Bootstrap/Bootswatch)
  assets: cdn

  # none (ninguna hoja de estilos) | default (Bootstrap simple) | cualquiera de
  # los 26 temas reales de Bootswatch: brite, cerulean, cosmo, cyborg, darkly,
  # flatly, journal, litera, lumen, lux, materia, minty, morph, pulse,
  # quartz, sandstone, simplex, sketchy, slate, solar, spacelab,
  # superhero, united, vapor, yeti, zephyr
  theme: lumen

  # auto (predeterminado: hace competir a jsdelivr y cdnjs y usa la que
  # responda primero) | jsdelivr | cdnjs
  cdn: auto

  # opcional: restringir la exportación a una vista en lugar de las cuatro
  # view: fleet
```

`render.default_view` se aplica a `--view` de `check` siempre que no se
haya pasado la opción. `export.default_format` hace lo mismo con
`--format` de `export`. `html.*` solo importa para
`export --format html`; consulte [Informes](/es/reporting/) para ver qué
cambia realmente cada campo.
