---
title: Perforce Helix Core Server (p4d)
description: Configuración de enodia para sondear Perforce Helix Core Server (p4d).
---

Ejecuta `p4 -Ztag -p <address> info`: **la única sonda de este proyecto
que invoca un binario externo** en lugar de hablar directamente un
protocolo de red o HTTP. Consulte [por qué](#por-qué-una-cli-en-lugar-de-un-cliente-del-protocolo-de-red)
más abajo.

```yaml
targets:
  - id: p4d-main
    product: p4d
    address: p4d.example.com:1666
```

## Requiere la CLI `p4` en la máquina que ejecuta enodia

No es un requisito de credenciales ni de red: hay que instalar un
binario real junto a enodia (el cliente de línea de comandos propio de
Perforce, descargable gratuitamente). Si falta el binario, falla con un
error claro en lugar de confundirse con un problema de red. Sobrescriba
la ruta con `options.binary` si `p4` no está en `$PATH` (funciona igual
en Windows, apuntando a `p4.exe`):

```yaml
targets:
  - id: p4d-main
    product: p4d
    address: p4d.example.com:1666
    options:
      binary: /opt/perforce/bin/p4
```

## Por qué una CLI en lugar de un cliente del protocolo de red

El protocolo RPC propio de Perforce se sometió a ingeniería inversa
completa en vivo (captura de paquetes y el binario `p4` real contra un
proxy de producción real), y un cliente hecho a mano reprodujo
correctamente todo el handshake, confirmado byte a byte contra la
captura. Pero los servidores `p4d` directos reales descartan en silencio
ese mismo handshake verificado como correcto (se descartaron en vivo
tanto el TLS obligatorio como la limitación de tasa: ningún error,
ningún reset, simplemente ninguna respuesta), mientras que el binario
`p4` real se conecta a esas mismas direcciones sin ningún problema. En
lugar de publicar una sonda que solo funcione contra proxies, tanto esta
sonda como [Perforce Proxy](/es/configuration/products/p4p/) invocan la
propia CLI `p4` del operador.

## Tiempo de espera

`timeout` (por destino, con `defaults.timeout` como valor de respaldo)
se aplica al subproceso `p4` del mismo modo que se aplica al transporte
propio de cualquier otra sonda. Esto importa aquí de forma concreta: un
proceso `p4` atascado marcando un servidor directo inaccesible se queda
colgado sin respuesta y sin reset a nivel TCP (exactamente el
comportamiento descrito arriba), así que sin un tiempo de espera
bloquearía toda una ejecución de recopilación en lugar de hacer fallar
solo ese destino. (Corregido en 1.2.1: una versión anterior no pasaba
ningún tiempo de espera al subproceso).

## Autenticación

Ninguna: confirmado en vivo que `info` responde por completo sin
autenticación en servidores de producción reales.

## Verificación de la identidad del fabricante

Una respuesta que incluye un campo `proxyVersion` significa que la
dirección es en realidad un [Perforce Proxy](/es/configuration/products/p4p/),
no un servidor directo: esta sonda la rechaza en lugar de informar la
versión del producto equivocado, igual que `p4p` rechaza, a la inversa,
la respuesta de un servidor directo.

## No es el mismo producto que Perforce Helix Swarm

[`perforce-swarm`](/es/configuration/products/perforce-swarm/) es la
interfaz web de revisión de código de Perforce, sondeada por HTTP: un
producto distinto del propio servidor `p4d`, que es el que trata esta
página.

## Campos registrados

- `version`: p. ej. `2024.2`, extraída de la forma
  `P4D/LINUX26X86_64/2024.2/2726408 (2025/02/27)` de `serverVersion`
- `extra.raw`: la cadena `serverVersion` completa sin analizar
- `extra.serverID`, `extra.serverServices`, cuando están presentes

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

Ninguno: Perforce es propietario, no tiene página en endoflife.date con
ninguno de los slugs probados (404 confirmado) ni releases públicas en
GitHub a las que recurrir. Solo inventario, igual que
[Gentoo](/es/configuration/products/gentoo/)/
[Kali Linux](/es/configuration/products/kali-linux/).
