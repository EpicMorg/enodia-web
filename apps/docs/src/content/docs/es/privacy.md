---
title: Privacidad
description: A qué se conecta enodia y qué almacena; sin telemetría.
---

enodia es una herramienta de línea de comandos que usted ejecuta en su
propia máquina. No tiene telemetría, ni estadísticas de uso, ni
comprobación de actualizaciones, ni cuenta. EpicMorg no opera ningún
servidor con el que enodia se comunique y no recibe nada de él.

Esta página refleja el propio
[`PRIVACY.md`](https://github.com/EpicMorg/enodia/blob/master/PRIVACY.md)
de enodia.

## A qué se conecta enodia

- **Sus propios servicios**: los destinos indicados en su `enodia.yaml`,
  por HTTPS, SSH o sus protocolos nativos, con las credenciales que usted
  configure, para leer su versión (y, en hosts Linux, la lista de
  paquetes instalados).
- **endoflife.date** (`https://endoflife.date/api/...`): para obtener
  fechas públicas de publicación y de fin de vida. La solicitud nombra un
  producto (por ejemplo, `postgresql`); no se envían nombres de host,
  direcciones, versiones ni ningún otro dato sobre su parque.
- **API de GitHub** (`https://api.github.com/repos/.../releases`,
  `.../tags`): para los productos cuyas versiones se publican en GitHub.
  Igual que arriba: en la solicitud solo figura el nombre público del
  repositorio. Si define `GITHUB_TOKEN`, se envía únicamente a GitHub,
  para aumentar el límite de solicitudes.
- **Editores de las bases de datos de CVE**, solo cuando ejecuta
  `enodia cve update`, y solo los que nombran sus entradas `cve.*.path`:
  nvd.nist.gov, bdu.fstec.ru, security-tracker.debian.org, los editores
  de OVAL (Canonical, Red Hat, AlmaLinux, Oracle, Astra Linux, RED OS),
  secdb.alpinelinux.org, mariadb.com, api.atlassian.com,
  www.postgresql.org y nginx.org. Las solicitudes son simples descargas
  de archivos públicos; lo único que revelan sobre su parque es para qué
  versiones de SO y versiones mayores de PostgreSQL obtiene datos.

Eso es todo. Todos los demás comandos solo leen del disco los archivos de
CVE; consulte [Correlación de CVE](/es/cve/).

El informe HTML carga Bootstrap desde una CDN (jsDelivr / cdnjs) **en el
navegador que lo abre** cuando se establece `html.assets: cdn`; el valor
predeterminado (`inline`) no realiza ninguna solicitud externa; consulte
[Informes](/es/reporting/).

## Qué almacena enodia

Solo en su máquina, y solo donde usted le indique:

- los archivos de inventario, informes e historial que escribe con `-o`;
- una caché de respuestas de endoflife.date/GitHub y de bases de datos de
  CVE analizadas en el directorio de caché del sistema operativo
  (`~/.cache/enodia`, `%LocalAppData%\enodia`), que se puede eliminar en
  cualquier momento.

No se envía nada a ningún otro sitio, y EpicMorg no conserva nada.

## Este sitio web

Los sitios web enodia.sh, get.enodia.sh y docs.enodia.sh (no la
herramienta enodia) utilizan la analítica web Yandex.Metrica para contar
las visitas.

## Contacto

Preguntas: abra una incidencia en
[github.com/EpicMorg/enodia/issues](https://github.com/EpicMorg/enodia/issues).
