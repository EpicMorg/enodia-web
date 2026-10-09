---
title: Uptime Kuma
description: Konfiguracja enodia do sondowania produktu Uptime Kuma.
---

Loguje się przez własne API socket.io Uptime Kuma i odczytuje wersję
ze zdarzenia `info`, które serwer wysyła po zalogowaniu.

```yaml
targets:
  - id: uptime-kuma-main
    product: uptime-kuma
    address: https://uptime-kuma.example.com
    credentials: kuma-monitor
```

## Dlaczego logowanie

Nic anonimowego nie zawiera wersji. Zawiera ją zdarzenie `info` serwera,
ale nowe połączenie otrzymuje je bez wersji, dopóki gniazdo nie zostanie
zalogowane. `/metrics` nie ma serii z wersją, a klucze API otwierają tylko
`/metrics`. Potwierdzone na żywo na 1.23.17 i 2.5.5 oraz na publicznej
stronie statusu instancji produkcyjnej, której `/api/status-page/*`
i gniazdo również jej nie zawierają.

Dlatego sonda mówi transportem HTTP long-polling Engine.IO v4
(`/socket.io/?EIO=4&transport=polling`) tylko w takim zakresie, by otworzyć
sesję, wyemitować `login` i odpytywać, aż nadejdzie zdarzenie `info`
z `version` — po czym się rozłącza. 1.23.17 wysyła `info` z wersją po
potwierdzeniu logowania, 2.5.5 przed nim; obie kolejności są obsługiwane.

## Uwierzytelnianie — wymagane

Nazwa użytkownika i hasło, `kind: password`:

```yaml
credentials:
  kuma-monitor:
    kind: password
    username: monitor
    password: "${UPTIME_KUMA_PASSWORD}"
```

Akceptowany jest tylko `password`; każdy inny rodzaj jest błędem
konfiguracji. Zobacz
[Konfiguracja → Poświadczenia](/pl/configuration/#poświadczenia).

- Odrzucone logowanie to błąd uwierzytelniania zawierający własny
  komunikat Uptime Kuma (`Incorrect username or password.`).
- **Użytkownik z 2FA nie może zalogować się w ten sposób** — potwierdzenie
  logowania prosi o token. Jest to zgłaszane, a nie obchodzone: należy
  użyć użytkownika monitorującego bez 2FA.
- Uptime Kuma ogranicza liczbę logowań: przebieg tuż po kilku błędnych
  hasłach raz zakończył się niepowodzeniem na 2.5.5, a każdy kolejny
  przebieg się powiódł.
- Uptime Kuma na zwykłym HTTP wymaga `allow_insecure_transport`, jak
  w przypadku każdego poświadczenia — zobacz
  [Najpierw HTTPS](/pl/concepts/#najpierw-https-poświadczenia-domyślnie-nigdy-nie-są-wysyłane-otwartym-tekstem).

## Rejestrowane pola

- `version` — np. `2.5.5`
- `extra.latestVersion` — własne sprawdzanie aktualizacji Uptime Kuma, np. `2.5.5`
- `extra.dbType` — np. `sqlite`

## Korelacja CVE

Dopasowywany do NVD, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`github:louislam/uptime-kuma` — endoflife.date nie ma kalendarza dla
Uptime Kuma (potwierdzone 404), więc zamiast tego jest rozwiązywany przez
GitHub Releases: wyłącznie najnowszy opublikowany tag niebędący wydaniem
wstępnym (prerelease), bez dat eol/support/lts (GitHub nie ma zdania na
temat polityki cyklu życia, zna tylko „najnowsze wydanie”).
