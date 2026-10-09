---
title: qBittorrent
description: Konfiguracja enodia do sondowania produktu qBittorrent.
---

Odczytuje wersję z API Web UI qBittorrent: loguje się przez
`POST /api/v2/auth/login`, następnie odczytuje `GET /api/v2/app/version`
i `GET /api/v2/app/buildInfo` z ciasteczkiem sesji, po czym się wylogowuje.

```yaml
targets:
  - id: qbittorrent-main
    product: qbittorrent
    address: https://qbittorrent.example.com
    credentials: qbittorrent-monitor
```

## Uwierzytelnianie

Opcjonalne, ale zwykle potrzebne: Web UI na wszystko, łącznie z `/`,
odpowiada `401` bez sesji (potwierdzone na żywo na
`linuxserver/qbittorrent` 5.2.4). To logowanie formularzem (pola
`username` i `password`), a nie HTTP Basic, więc rodzajem jest `password`:

```yaml
credentials:
  qbittorrent-monitor:
    kind: password
    username: monitor
    password: "${QBITTORRENT_PASSWORD}"
```

Akceptowany jest tylko `password`; każdy inny rodzaj jest błędem
konfiguracji. Zobacz
[Konfiguracja → Poświadczenia](/pl/configuration/#poświadczenia).

Bez poświadczeń sonda pyta bezpośrednio `/api/v2/app/version` — na
potrzeby Web UI skonfigurowanego tak, by pomijał uwierzytelnianie dla
podsieci sondującej. Jeśli odpowiedzią jest `401`, komunikat błędu mówi,
że należy skonfigurować poświadczenia.

Jakiekolwiek ciasteczko sesji ustawi logowanie, jest odsyłane bez zmian:
5.x odpowiada `204` i ustawia `QBT_SID_<port>`, 4.x odpowiada `200 Ok.`
i ustawia `SID`. Błędne hasło to `401` w 5.x i `200 Fails.` w 4.x; oba
przypadki są zgłaszane jako błąd uwierzytelniania.

## Za odwrotnym proxy

qBittorrent sprawdza, czy port w nagłówku `Host` odpowiada jego własnemu
oraz czy `Referer`/`Origin` odpowiada `Host`. Logowanie wysyła własny
origin celu jako `Referer`. Za odwrotnym proxy, które mapuje porty,
qBittorrent musi być do tego skonfigurowany — w przeciwnym razie każde
żądanie kończy się `401`, co pokazywało przechwycenie na żywo przez
przemapowany port kontenera, dopóki porty nie zostały dopasowane.

## Rejestrowane pola

- `version` — `/api/v2/app/version` bez początkowego `v`, np.
  `5.2.4`
- `extra.libtorrent` — z `/api/v2/app/buildInfo`, np. `2.0.15.0`
- `extra.qt` — z `/api/v2/app/buildInfo`, np. `6.11.2`

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`github:qbittorrent/qBittorrent` — endoflife.date nie ma kalendarza dla
qBittorrent (potwierdzone 404), więc zamiast tego jest rozwiązywany przez
GitHub Releases: wyłącznie najnowszy opublikowany tag niebędący wydaniem
wstępnym (prerelease), bez dat eol/support/lts (GitHub nie ma zdania na
temat polityki cyklu życia, zna tylko „najnowsze wydanie”). Wydania są
oznaczane tagami `release-5.2.4`; resolver usuwa prefiks `release-`
i odczytuje resztę jako wersję.
