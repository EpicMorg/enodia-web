---
title: Conceptos
description: Las decisiones de diseño detrás de enodia; por qué tiene la forma que tiene.
---

Estas son las decisiones que sostienen el diseño de enodia. Entenderlas
explica gran parte de un comportamiento que, de otro modo, parecería
arbitrario.

## Dos fases, separables a propósito

La recopilación se comunica con sus servicios. La evaluación se comunica
con internet (los calendarios de ciclo de vida de los fabricantes). En
mucha infraestructura real, nada tiene acceso de red a ambos a la vez.

```
collect  →  inventory.jsonl  →  evaluate  →  assessment  →  render
```

```bash
# dentro de la red cerrada: no se necesita internet
enodia collect --config config.yaml -o inventory.jsonl

# en cualquier otro lugar: no se necesita acceso a sus servicios
enodia check --from inventory.jsonl
```

`enodia check` sin `--from` son estas dos fases compuestas en un único
proceso, no una segunda ruta de código: el inventario que se produce por
el camino es un artefacto real y de primera clase (con su propio esquema
y su propia versión), no un simple valor intermedio en memoria.

## Tres ejes ortogonales, no un único estado

Una rama puede estar perfectamente sana mientras existe una versión mayor
más reciente: Confluence 10 LTS está al día dentro de su rama, tiene
soporte activo y ya se ha publicado una versión mayor más reciente, todo
a la vez. Reducir eso a un único estado desecha precisamente la
información que usted quería.

| Eje | Valores |
|---|---|
| Parche | `current` · `behind` · `ahead` · `unknown` |
| Ciclo de vida | `active` · `security` · `eol` · `unknown` |
| Rama más reciente | `latest` · `newer` · `newer_lts` · `unknown` |

`ahead` no es nada exótico: las versiones candidatas y el desfase entre
el anuncio de un fabricante y su página de descargas lo producen
habitualmente.

Las CVE conocidas, cuando están [configuradas](/es/cve/), son un hecho
aparte junto a los tres ejes, no un cuarto eje: se enumeran por
evaluación, pero nunca influyen en la severidad, el código de salida ni
`--fail-on`.

## Los hechos y el juicio están separados

Una `Observation` contiene lo que realmente se vio: una cadena de
versión, si el destino era accesible, qué error se produjo (si lo hubo).
Una `Assessment` contiene lo que la política de enodia opina sobre esos
hechos: la severidad, calculada encima a partir de una política que
usted controla.

La exportación `--format json` emite hechos. Un consumidor con otras
prioridades puede aplicar su propia política encima en lugar de la de
enodia. Incorporar la severidad en la propia observación lo haría
imposible.

## El tiempo es un parámetro

La evaluación recibe una marca de tiempo `asOf` explícita: nada en la
ruta de evaluación llama directamente al reloj del sistema.
`check --from` toma `asOf` de la propia cabecera del inventario
(`collectedAt`), de modo que un inventario de hace un mes se evalúa
según *el momento en que se recopiló*, sin volver a juzgarlo en silencio
con la fecha de hoy. Repetir más tarde la misma evaluación produce el
mismo resultado.

## Las sondas están compiladas, no son un DSL en YAML

La API de cada fabricante es tan distinta que un lenguaje declarativo de
sondas solo parece general hasta que aparece el primer fabricante fuera
del conjunto para el que se diseñó. Cada sonda es un archivo Go con una
entrada explícita en un registro: codificar el conocimiento sobre el
fabricante en código significa que un `if` es simplemente un `if`,
legible y depurable, en lugar de una condición reexpresada en YAML.

Esto implica que añadir un producto nuevo requiere una nueva versión, no
solo editar su propia configuración. La vía de escape: `product: generic`
acepta una especificación de analizador (`json` / `xml` / `header` /
`plaintext` / `regex`) directamente desde su configuración, para los
sistemas internos que nunca tendrán una sonda dedicada; consulte
[Configuración](/es/configuration/#la-sonda-genérica). El vocabulario de
la sonda genérica está congelado a propósito: sin condiciones, sin
bucles, sin peticiones encadenadas. Un destino que necesite cualquiera
de esas cosas necesita una sonda real, escrita en Go.

## HTTPS primero; por defecto, las credenciales nunca se envían en claro

Resolución del esquema para un destino sin `https://`/`http://` explícito
en su dirección: se prueba primero `https`, se recurre a `http` si falla,
y se emite una advertencia en cualquier caso. enodia nunca prueba `http`
primero: la primera petición ya llevaría una credencial en claro, y una
redirección posterior a `https` no la desharía. Un destino `http://` con
credenciales asociadas es un error grave, a menos que se establezca
`allow_insecure_transport: true` en ese servicio concreto.

## Sin servidor web integrado que sondee a petición

`enodia serve` y `export --format html` muestran ambos la última
instantánea finalizada: ninguno de ellos lanza nunca una recopilación
nueva en respuesta a una petición. Un botón de actualizar que sondea
toda su flota en cada clic es una denegación de servicio autoinfligida
contra su propia producción. La recopilación se ejecuta según una
programación (`serve --interval`, o cron/un temporizador de systemd que
regenere una exportación HTML); HTTP solo lee lo que haya producido el
último ciclo correcto.
