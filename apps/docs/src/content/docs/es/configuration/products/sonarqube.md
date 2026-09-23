---
title: SonarQube
description: Configuración de enodia para sondear SonarQube Server o Community Build.
---

Lee `GET /api/system/status` para obtener la versión: el mismo endpoint,
independientemente de qué SonarQube esté ejecutando realmente (véase más
abajo).

```yaml
targets:
  - id: sonarqube-main
    product: sonarqube
    address: https://sonarqube.example.com
```

## Autenticación

Ninguna: este endpoint (junto con `/api/server/version` y
`/api/system/ping`) sigue siendo accesible sin credenciales incluso tras
activar el ajuste global «Force user authentication» de SonarQube.
SonarQube lo trata como una ruta de comprobación de estado a la que un
balanceador de carga necesita llegar sin iniciar sesión, no como una API
protegida normal.

## SonarQube Server frente a SonarQube Community Build

SonarSource dividió «SonarQube» en dos productos a finales de 2024:
**SonarQube Server** (la continuación directa de todas las antiguas
ediciones Community/Developer/Enterprise/Data Center, que sigue usando
versiones de calendario `2025.1`, `2026.4`, ...) y **SonarQube Community
Build** (una compilación nueva, independiente y siempre gratuita, con su
propia cadencia más rápida, con versiones `24.12`, `25.12`, `26.9`, ...:
el mismo esquema de calendario, solo que con un año de dos cifras en lugar
de cuatro). endoflife.date los sigue como dos páginas distintas con datos
de ciclos realmente diferentes; `product: sonarqube` no necesita una
segunda entrada de configuración para distinguirlos, ya que cuál de los
dos aplica se puede leer de forma fiable a partir de la cadena de versión
que `sonarqubeProbe` ya obtiene:

- Un año inicial de cuatro cifras (`2025.x`, `2026.x`) → **SonarQube Server**.
- Uno de dos cifras a partir de `24` (`24.x`, `25.x`, `26.x`) →
  **SonarQube Community Build**.
- Cualquier valor menor (una versión mayor sin más, anterior a la
  división, p. ej. `9.9.8.100196`, `10.7.0.96327`) → se trata como
  Community Build, ya que ambas páginas contienen un historial idéntico
  para las versiones anteriores a la división.

## Campos registrados

- `version`
- `extra.id`
- `extra.status`: uno de `UP`, `DOWN`, `STARTING`, `RESTARTING`,
  `DB_MIGRATION_NEEDED`, `DB_MIGRATION_RUNNING`; un dato sobre el estado
  del servidor registrado tal cual, que no se convierte en un error cuando
  no es `UP`

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

Se elige por observación, no es fijo: `endoflife:sonarqube-server` o
`endoflife:sonarqube-community`, según la cadena de versión, como se ha
descrito más arriba. El propio listado de `enodia products` (que se
ejecuta sin haber sondeado nada todavía) muestra
`endoflife:sonarqube-server` como valor estático de reserva: eso es solo
lo que se imprime antes de que se haya comprobado realmente algún destino,
no necesariamente aquello contra lo que se resuelve cada observación.
