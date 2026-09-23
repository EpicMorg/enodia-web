---
title: Identificación del SO por SSH
description: "Cómo funciona la familia de sondas SSH/os-release/uname de enodia, compartida por 30 productos de sistema operativo."
---

30 de los productos de enodia (todas las distribuciones Linux, FreeBSD,
OpenBSD, NetBSD, macOS, Oracle Solaris, OPNsense y el CentOS heredado)
se identifican por **SSH**, no por HTTP. Esta página explica el mecanismo
común una sola vez; la página de cada sistema operativo (enlazada desde
[Productos compatibles](/es/products/)) solo indica su valor concreto de
`product:`, el campo de identidad exacto con el que coincide y su
resolvedor del ciclo de vida.

## Cómo funciona

Una conexión SSH, un comando, una desconexión: no es un cliente de
ejecución remota de propósito general, solo lo justo para leer un único
dato de identidad:

- **21 productos** leen `/etc/os-release` (el archivo de identidad
  estandarizado por systemd que incluye toda distribución Linux moderna,
  además del `/var/run/os-release` propio de FreeBSD, generado
  dinámicamente durante el arranque con la misma forma `KEY=VALUE`) y
  comprueban su campo `ID`: un mecanismo común y genérico
  (`osReleaseFamilyProbe`).
- **2 más** ([Debian](/es/configuration/products/debian/),
  [Ubuntu](/es/configuration/products/ubuntu/)) también leen
  `/etc/os-release`, pero mediante su propia sonda dedicada en lugar del
  mecanismo genérico anterior: ambas distribuciones dejan `VERSION_ID`
  impreciso (el de Debian nunca incluye la versión puntual; el de Ubuntu
  se congela en la primera versión y nunca refleja una versión puntual
  posterior), así que cada una lee algo más para obtener la real: Debian
  contrasta con `/etc/debian_version`, y Ubuntu prefiere el campo
  `VERSION` del mismo archivo cuando es más preciso. Consulte sus propias
  páginas para saber exactamente por qué.
- **2 productos** (OpenBSD, NetBSD) no tienen ningún archivo equivalente a
  os-release: la fuente de identidad es `uname -sr` (`"<kernel name>
  <release>"`, p. ej. `"OpenBSD 7.9"`).
- **5 más** (Astra Linux, el CentOS heredado, macOS, OPNsense, Oracle
  Solaris) leen cada uno un archivo o comando de identidad distinto y
  propio del producto; consulte sus propias páginas.

`product:` siempre se declara de forma explícita y se verifica con el
campo de identidad real, nunca se deduce de la respuesta (el mismo
principio que usan las [sondas de Atlassian](/es/configuration/products/jira/)
para el `<typeId>` de su manifiesto): apuntar un host Debian a
`product: ubuntu` es un error de configuración real que falla de forma
explícita en lugar de registrarse como un dato erróneo.

## Configuración

```yaml
targets:
  - id: web-01
    product: debian          # o cualquier otro producto de SO; consulte su propia página
    address: web-01.example.com
    credentials: linux-host-ssh
    tls:
      pin_sha256:
        - "AB:CD:...:EF"      # sha256 de la clave SSH del host
```

```yaml
credentials:
  linux-host-ssh:
    kind: ssh-key
    username: enodia-ro
    private_key_file: /etc/enodia/ssh/id_ed25519
```

El puerto es `22` por defecto cuando `address` no incluye ninguno; sin
esquema, igual que MySQL/Redis (un `host:port` simple, no una URL).

## Autenticación — obligatoria

Todas las sondas de esta familia tienen `Required: true`: no existe una vía
anónima para obtener la identidad de un sistema operativo, a diferencia de
la mayoría de los productos basados en HTTP. Funcionan dos formas de
credencial, exactamente como en cualquier cliente SSH:

- `kind: password` — `username` + `password`
- `kind: ssh-key` — `username` + `private_key_file` (+ `passphrase` si
  la clave está cifrada)

Consulte [Configuración → Credenciales](/es/configuration/#credenciales)
para la referencia completa de campos.

## Verificación de la clave de host

Reutiliza el mismo bloque `tls:` que las sondas HTTPS usan para fijar
certificados: `tls.pin_sha256` contiene el SHA-256 en hexadecimal de la
codificación de red de la propia clave de host SSH (no de un certificado
TLS), y `tls.insecure: true` es la misma exclusión de último recurso, con
la misma advertencia. **Si no se define ninguno de los dos, la conexión se
rechaza antes de enviar una sola credencial.** Consulte
[Configuración → Verificación de la clave de host SSH](/es/configuration/#verificación-de-la-clave-de-host-ssh)
para la explicación completa.

## Campos registrados

Todas las sondas de esta familia registran:

- `version` — de `VERSION_ID` (familia os-release) o de la versión del
  kernel (familia uname); Debian y Ubuntu leen algo más para obtener una
  versión puntual precisa que `VERSION_ID` por sí solo no incluye;
  consulte sus propias páginas
- `extra.hostKeyVerified` — `"true"`/`"false"`, si `tls.pin_sha256`
  coincidió realmente (se muestra igual que `TLSVerified` para los
  destinos HTTPS: una auditoría de toda la flota de qué destinos SSH
  tienen la clave fijada)

## Un destino sin el archivo o comando esperado falla de forma explícita

Tanto `cat /etc/os-release` en un host que no lo tiene como `uname
-sr` con un nombre de kernel incorrecto devuelven un error claro de «no es
este producto» en lugar de un fallo de conexión genérico: la propia sesión
SSH tuvo éxito, lo que falló fue la verificación de identidad.
