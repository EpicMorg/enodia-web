---
title: qBittorrent
description: Configuración de enodia para sondear qBittorrent.
---

Lee la versión desde la API de la Web UI de qBittorrent: inicia sesión con
`POST /api/v2/auth/login`, después lee `GET /api/v2/app/version` y
`GET /api/v2/app/buildInfo` con la cookie de sesión, y cierra la sesión.

```yaml
targets:
  - id: qbittorrent-main
    product: qbittorrent
    address: https://qbittorrent.example.com
    credentials: qbittorrent-monitor
```

## Autenticación

Opcional, pero normalmente necesaria: sin sesión, la Web UI responde a
todo, `/` incluido, con `401` (confirmado en vivo contra
`linuxserver/qbittorrent` 5.2.4). Es un inicio de sesión por formulario
(campos `username` y `password`), no HTTP Basic, así que el tipo es
`password`:

```yaml
credentials:
  qbittorrent-monitor:
    kind: password
    username: monitor
    password: "${QBITTORRENT_PASSWORD}"
```

Solo se acepta `password`; cualquier otro tipo es un error de
configuración. Consulte
[Configuración → Credenciales](/es/configuration/#credenciales).

Sin credenciales, la sonda consulta `/api/v2/app/version` directamente,
para una Web UI configurada para omitir la autenticación en la subred del
sondeador. Si eso responde `401`, el error indica que hay que configurar
credenciales.

La cookie de sesión que establezca el inicio de sesión se devuelve tal
cual: la 5.x responde `204` y establece `QBT_SID_<port>`, la 4.x responde
`200 Ok.` y establece `SID`. Una contraseña incorrecta es `401` en la 5.x
y `200 Fails.` en la 4.x; ambos casos se notifican como un fallo de
autenticación.

## Detrás de un proxy inverso

qBittorrent comprueba que el puerto de la cabecera `Host` coincida con el
suyo, y que `Referer`/`Origin` coincida con `Host`. El inicio de sesión
envía el propio origen del destino como `Referer`. Detrás de un proxy
inverso que reasigne puertos, qBittorrent debe configurarse para ello: de
lo contrario, cada petición es un `401`, que es lo que mostró una captura
en vivo a través de un puerto de contenedor reasignado hasta que los
puertos coincidieron.

## Campos registrados

- `version`: `/api/v2/app/version` sin la `v` inicial, p. ej. `5.2.4`
- `extra.libtorrent`: de `/api/v2/app/buildInfo`, p. ej. `2.0.15.0`
- `extra.qt`: de `/api/v2/app/buildInfo`, p. ej. `6.11.2`

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`github:qbittorrent/qBittorrent`: endoflife.date no tiene un calendario de
qBittorrent (404 confirmado), por lo que se resuelve contra GitHub
Releases: solo la última etiqueta publicada que no sea prerelease, sin
fechas eol/support/lts (GitHub no tiene opinión sobre la política de ciclo
de vida, solo sobre «cuál es la última versión»). Las versiones se
etiquetan como `release-5.2.4`; el resolvedor quita el prefijo `release-`
y lee el resto como la versión.
