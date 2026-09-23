---
title: Seguridad
description: Cómo gestiona enodia las credenciales de su infraestructura que tiene en su poder.
---

enodia guarda credenciales de su infraestructura. Algunas consecuencias
son deliberadas, no accidentales:

- **Las credenciales nunca aparecen** en el inventario, en los informes
  exportados ni en los registros.
- **HTTPS se prueba antes que HTTP.** Las credenciales nunca se envían
  por HTTP sin cifrar a menos que usted lo habilite explícitamente, por
  servicio, con `allow_insecure_transport: true`; consulte
  [Conceptos](/es/concepts/#https-primero-por-defecto-las-credenciales-nunca-se-envían-en-claro).
- **La verificación TLS está activada por defecto.** Se admiten una CA
  personalizada (`tls.ca_file`) y la fijación de certificados
  (`tls.pin_sha256`) para que `tls.insecure: true` siga siendo un
  verdadero último recurso; consulte
  [Configuración](/es/configuration/#tls-tls). Los servicios comprobados
  sin verificación se señalan en el informe, no se aceptan en silencio.
- **Los secretos se guardan por separado.** Una entrada `credentials:`
  con nombre, o un `credentials.yaml` independiente referenciado mediante
  `credentials_file` (consulte
  [Configuración](/es/configuration/#credentials_file)), de modo que su
  inventario de servicios (`enodia.yaml`) pueda confirmarse en git y sus
  secretos no.

¿Ha encontrado un problema de seguridad? Consulte el
[SECURITY.md](https://github.com/EpicMorg/enodia/blob/master/SECURITY.md)
de enodia en GitHub para saber cómo notificarlo de forma responsable.

## Licencia

enodia se distribuye bajo la licencia **AGPL-3.0-or-later**. Si la AGPL
no se ajusta a su situación, hay disponible una licencia comercial:
escriba a [developer@epicm.org](mailto:developer@epicm.org).

Para contribuir es necesario firmar el CLA de enodia (el bot se encarga
de ello en su primera pull request): existe para que el proyecto pueda
ofrecerse en condiciones comerciales junto con la AGPL, y usted conserva
los derechos de autor de su propio trabajo.
