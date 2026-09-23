---
title: Primeros pasos
description: Instale enodia y ejecute su primera comprobación.
---

## Instalación

La vía más sencilla: un solo comando, que elige el binario adecuado para
su sistema operativo y arquitectura:

```bash
curl -fsSL https://get.enodia.sh/unix | sh   # Linux/macOS/Android (Termux)
```

```powershell
irm https://get.enodia.sh/windows | iex      # Windows
```

`enodia` se puede ejecutar inmediatamente después en esa misma ventana
de PowerShell: el instalador modifica directamente el `PATH` de la sesión
actual, no solo el valor persistido en el registro que recogería una
terminal nueva.

En Windows también funciona
[Chocolatey](https://community.chocolatey.org/packages/enodia), si
prefiere que su gestor de paquetes se ocupe de las actualizaciones (hay
un paquete de winget en camino, aún no publicado):

```powershell
choco install enodia
```

:::tip[También funciona en Termux (Android)]
El mismo comando de una línea para Unix funciona sin modificaciones —
confirmado en un dispositivo real—, pero internamente instala un binario
distinto del que instalaría en un Linux real. El enlazador Bionic de
Android se niega a ejecutar cualquier cosa que no sea un binario PIE
(`ET_DYN`) (una política del kernel y del enlazador desde Android
Lollipop), y la compilación `linux/arm64` habitual de enodia es un
`ET_EXEC` simple, que en el primer intento no llegó a ejecutarse en
absoluto. `install.sh` detecta Termux mediante `$TERMUX_VERSION` y
descarga en su lugar una compilación `android/arm64` específica
(`GOOS=android`, PIE, intérprete `/system/bin/linker64`, una ruta que
existe con garantía en cualquier dispositivo Android, no algo que Termux
tenga que proporcionar). Además, recurre a `$PREFIX/bin` como directorio
de instalación cuando el habitual no admite escritura y `sudo` no es una
opción real (el paquete opcional `sudo` de Termux existe, pero se niega
a funcionar en un dispositivo sin root), así que no hace falta
sobrescribir ninguna variable de entorno para nada de esto; arm64 es la
única arquitectura Android para la que se compila hoy.
:::

:::caution[Los dispositivos Android con root pueden necesitar `su`]
Confirmado en vivo: en un dispositivo **con root** (Magisk/KernelSU), el
binario `android_arm64` correcto puede seguir sin ejecutarse como el
usuario normal de Termux; Cobra informa algo como `unknown command
"<path-to-enodia>" for "enodia"`, lo que en realidad significa que el
sistema operativo nunca llega a entregar al binario sus propios
argumentos. Ejecutar exactamente el mismo binario mediante `su` con la
ruta completa funciona. Se trata de un error upstream conocido y
abierto, [termux-exec#40](https://github.com/termux/termux-exec/issues/40):
la lógica de exención del enlazador de `termux-exec` no reconoce los
contextos de proceso de Magisk/KernelSU/`run-as`/ADB, en los que un
dispositivo con root suele colocar incluso una sesión normal de Termux.
Ni la compilación de enodia ni `install.sh` pueden sortearlo; un
dispositivo sin root no debería encontrarse con esto en absoluto.
:::

O un paquete, si prefiere que su gestor de paquetes se ocupe de las
actualizaciones:

```bash
sudo dpkg -i enodia_linux_amd64.deb                # Debian/Ubuntu
sudo rpm -i enodia_linux_amd64.rpm                 # Fedora/RHEL
apk add --allow-untrusted enodia_linux_amd64.apk   # Alpine
sudo pacman -U enodia_linux_amd64.pkg.tar.zst      # Arch
```

Todos los paquetes instalan el binario en `/usr/bin/enodia` y las
páginas de manual en `/usr/share/man/man1/`, y crean un usuario de
sistema `enodia` dedicado y sin privilegios: nada de esto necesita root
para ejecutarse. Descargue el adecuado desde la
[última versión](https://github.com/EpicMorg/enodia/releases/latest).

O un contenedor:

```bash
docker run --rm \
  -v /etc/enodia:/config:ro \
  ghcr.io/epicmorg/enodia:latest check --config /config/config.yaml
```

**Desde la 1.1.0, esta imagen la compila y publica un repositorio
complementario**,
[EpicMorg/docker](https://github.com/EpicMorg/docker/tree/master/linux/ecosystem/apps/enodia),
con su propio calendario, y ya no el pipeline de publicación de este
proyecto, aunque la dirección publicada y las etiquetas siguen siendo
las mismas. También se publica en `docker.io/epicmorg/enodia` y en Quay,
con las mismas etiquetas: `latest`, la versión mayor sola (`2`) y la
versión exacta sin sufijo de compilación (p. ej. `2.0.0`, confirmado en
vivo en los tres registros; las etiquetas de un pipeline anterior tenían
la forma `1.0.0-1`, que se pueden seguir descargando, pero así ya no se
etiquetarán las nuevas versiones). Dos cambios reales que conviene
conocer: la imagen ahora es **solo `linux/amd64`** (arm64 se eliminó al
trasladarse la publicación) y se ejecuta como **root** en lugar de un
usuario dedicado, sobre la base propia del proyecto `debian:trixie-light`
en lugar de `scratch`.

### Compilar desde el código fuente

Requiere Go; consulte `go.mod` para ver la versión exacta a la que se
dirige enodia actualmente.

```bash
git clone https://github.com/EpicMorg/enodia.git
cd enodia
go build -o enodia ./cmd/enodia
./enodia version
```

### Plataformas compatibles

| SO | Arquitectura | Versión mínima |
|---|---|---|
| Linux | amd64, arm64 | Kernel 3.2 o posterior: Debian 8+, Ubuntu 14.04+ y RHEL/CentOS 7+ cumplen el requisito con holgura |
| Windows | amd64, arm64, 386 | Windows 10 / Windows Server 2016 o posterior |
| macOS | amd64, arm64 | macOS 12 Monterey o posterior |
| Android (Termux) | solo arm64 | Android 7 o posterior: [el mínimo del propio Termux](https://github.com/termux/termux-app), más estricto que el mínimo de compatibilidad con PIE de Android 5.0 Lollipop que motivó en realidad la compilación separada (consulte la nota sobre Termux más arriba). Los dispositivos con root pueden necesitar `su`: consulte la advertencia anterior |

Estos son los mínimos de la propia cadena de herramientas de Go, no algo
que enodia añada por su cuenta. Compilar desde el código fuente con un
Go más reciente eleva aún más el mínimo de macOS; es una decisión de la
cadena de herramientas, no del proyecto.

## Su primera configuración

Cree `enodia.yaml` junto al binario (o en cualquiera de las ubicaciones
indicadas en [Configuración](/es/configuration/#ubicación-de-los-archivos)):

```yaml title="enodia.yaml"
schemaVersion: 1
targets:
  - id: gitlab-main
    product: gitlab
    address: https://gitlab.example.com
```

A continuación, ejecute:

```bash
enodia check
```

```console
ID           PRODUCT  PATCH  LIFECYCLE  BRANCH  SEVERITY  REASON  CVES
gitlab-main  gitlab   ...
```

`check` sin `--from` recopila y evalúa en un único proceso: enodia
accede a su destino y después accede a internet para consultar los datos
de su ciclo de vida. Si su destino solo tiene acceso de red a su
infraestructura (un entorno cerrado) y no a internet, separe las dos
fases:

```bash
# dentro de la red cerrada: no se necesita internet
enodia collect --config enodia.yaml -o inventory.jsonl

# en cualquier otro lugar: no se necesita acceso a sus servicios
enodia check --from inventory.jsonl
```

## Añadir credenciales

Un destino con una API privada necesita una credencial con nombre, que
se resuelve a partir del mapa `credentials:` del propio `enodia.yaml`
(o de un `credentials.yaml` separado; consulte
[Configuración](/es/configuration/)):

```yaml title="enodia.yaml"
schemaVersion: 1
targets:
  - id: gitlab-main
    product: gitlab
    address: https://gitlab.example.com
    credentials: gitlab-token

credentials:
  gitlab-token:
    kind: token-header
    header: PRIVATE-TOKEN
    value: "${GITLAB_TOKEN}"
```

`${GITLAB_TOKEN}` se interpola desde el entorno en el momento de la
carga; consulte
[Configuración](/es/configuration/#interpolación-de-variables-de-entorno).
Los secretos nunca tienen por qué estar en el mismo archivo que su
inventario de servicios.

## Siguientes pasos

- [Conceptos](/es/concepts/), para las decisiones de diseño que hay
  detrás de todo esto.
- [Referencia de la CLI](/es/cli-reference/), para todos los comandos y
  opciones.
- [Vistas](/es/views/), para `lifecycle`, `drift` y `fleet`, no solo la
  tabla predeterminada.
