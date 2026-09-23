---
title: NetBSD
description: Konfiguracja enodia do sondowania systemu NetBSD przez SSH.
---

Należy do rodziny [identyfikacji systemów operacyjnych przez SSH](/pl/configuration/products/ssh-os-probes/),
ale nie do grupy os-release — NetBSD w ogóle nie dostarcza odpowiednika
os-release, więc źródłem tożsamości jest zamiast tego `uname -sr`.
Wspólny mechanizm, poświadczenia i weryfikację klucza hosta opisano na
stronie rodziny.

```yaml
targets:
  - id: netbsd-host
    product: netbsd
    address: host.example.com
    credentials: linux-host-ssh
```

Zweryfikowano na żywo przez `vmactions/netbsd-vm` (poza tym nie istnieje
żaden gotowy, preinstalowany obraz do pobrania): `uname -sr` → `"NetBSD 11.0"`,
bez żadnej nazwy hosta — w przeciwieństwie do `uname -a`, którego ta
sonda celowo nie używa.

## Korelacja CVE

Brak dopasowania — NVD zapisuje poziomy poprawek w polu CPE, którego mechanizm dopasowania nie odczytuje, więc dopasowanie po samym wydaniu oznaczyłoby w pełni załatany host każdym CVE, jakie kiedykolwiek naprawiono w tym wydaniu. Zobacz stronę [Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane).

## Resolver cyklu życia

`endoflife:netbsd`.
