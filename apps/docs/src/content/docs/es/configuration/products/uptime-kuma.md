---
title: Uptime Kuma
description: Configuración de enodia para sondear Uptime Kuma.
---

Inicia sesión mediante la propia API socket.io de Uptime Kuma y lee la
versión del evento `info` que el servidor envía tras el inicio de sesión.

```yaml
targets:
  - id: uptime-kuma-main
    product: uptime-kuma
    address: https://uptime-kuma.example.com
    credentials: kuma-monitor
```

## Por qué un inicio de sesión

Nada anónimo incluye la versión. El evento `info` del servidor sí la
incluye, pero una conexión nueva lo recibe sin ella hasta que el socket
inicia sesión. `/metrics` no tiene ninguna serie de versión, y las claves
de API solo dan acceso a `/metrics`. Confirmado en vivo en la 1.23.17 y la
2.5.5, y en la página de estado pública de una instancia de producción,
cuyos `/api/status-page/*` y socket tampoco la incluyen.

Así que la sonda habla lo justo del transporte HTTP long-polling de
Engine.IO v4 (`/socket.io/?EIO=4&transport=polling`) para abrir una
sesión, emitir `login` y sondear hasta que llegue un evento `info` con
`version`; después se desconecta. La 1.23.17 envía el `info` con versión
después de la confirmación del inicio de sesión, y la 2.5.5 antes; se
gestionan ambos órdenes.

## Autenticación — obligatoria

Un nombre de usuario y una contraseña, `kind: password`:

```yaml
credentials:
  kuma-monitor:
    kind: password
    username: monitor
    password: "${UPTIME_KUMA_PASSWORD}"
```

Solo se acepta `password`; cualquier otro tipo es un error de
configuración. Consulte
[Configuración → Credenciales](/es/configuration/#credenciales).

- Un inicio de sesión rechazado es un fallo de autenticación que incluye
  el propio mensaje de Uptime Kuma (`Incorrect username or password.`).
- **Un usuario con 2FA no puede iniciar sesión de esta forma**: la
  confirmación del inicio de sesión pide un token. Eso se notifica, no se
  sortea: use un usuario de monitorización sin 2FA.
- Uptime Kuma limita la frecuencia de los inicios de sesión: una ejecución
  justo después de varias contraseñas incorrectas falló una vez en la
  2.5.5, y funcionó en todas las ejecuciones posteriores.
- Un Uptime Kuma por HTTP sin cifrar necesita `allow_insecure_transport`,
  como con cualquier credencial; consulte
  [HTTPS primero](/es/concepts/#https-primero-por-defecto-las-credenciales-nunca-se-envían-en-claro).

## Campos registrados

- `version`: p. ej. `2.5.5`
- `extra.latestVersion`: la propia comprobación de actualizaciones de
  Uptime Kuma, p. ej. `2.5.5`
- `extra.dbType`: p. ej. `sqlite`

## Correlación de CVE

Se contrasta con NVD cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`github:louislam/uptime-kuma`: endoflife.date no tiene un calendario de
Uptime Kuma (404 confirmado), por lo que se resuelve contra GitHub
Releases: solo la última etiqueta publicada que no sea prerelease, sin
fechas eol/support/lts (GitHub no tiene opinión sobre la política de ciclo
de vida, solo sobre «cuál es la última versión»).
