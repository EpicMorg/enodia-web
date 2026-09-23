---
title: Sonatype Nexus Repository
description: Konfiguracja enodia do sondowania produktu Sonatype Nexus Repository.
---

Odczytuje nagłówek odpowiedzi `Server`, który Nexus ustawia w każdej
odpowiedzi — tak samo jak
[nginx](/pl/configuration/products/nginx/)/
[Apache](/pl/configuration/products/apache/) — ale odpytuje specjalnie do
tego przeznaczony anonimowy endpoint statusu zamiast `/`, ponieważ jest to
szybka kontrola stanu z pustą treścią, a nie pełna strona portalu.

```yaml
targets:
  - id: nexus-main
    product: nexus
    address: https://nexus.example.com
```

## Uwierzytelnianie

Brak — potwierdzono na żywo na rzeczywistym kontenerze `sonatype/nexus3`:
`"Nexus/3.96.0-09 (COMMUNITY)"` zarówno na endpoincie statusu, na stronie
portalu, jak i w odpowiedzi `401` z innego, faktycznie chronionego
endpointu. W przeciwieństwie do nginx/Apache nie udokumentowano ani nie
znaleziono żadnego przełącznika konfiguracji, który skracałby to do
samego `"Nexus"` — ale ta sonda kończy się jasnym błędem zamiast awarii,
jeśli przyszła wersja lub konfiguracja z reverse proxy kiedykolwiek to
zrobi.

## Rejestrowane pola

Tylko `version` — ta sonda nie zapisuje żadnych pól `extra` (edycja, np.
`COMMUNITY`/`PRO`, jest pomijana, ponieważ `product: nexus` już ją
implikuje i nie trzeba jej zapisywać dla każdego celu osobno).

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:nexus`.
