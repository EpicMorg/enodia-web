---
title: Synology DSM
description: Configurarea enodia pentru a sonda Synology DSM.
---

Se autentifică în Web API-ul propriu al Synology (`SYNO.API.Auth`), apoi
citește `SYNO.DSM.Info` pentru versiune, folosind sesiunea rezultată —
singura sondă HTTP din enodia care necesită un pas real de autentificare
în locul unei credențiale statice.

```yaml
targets:
  - id: nas-main
    product: synology-dsm
    address: https://nas.example.com:5001
    credentials: synology-admin
```

## Autentificare — obligatorie, nume de utilizator și parolă

```yaml
credentials:
  synology-admin:
    kind: password
    username: enodia-ro
    password: "${SYNOLOGY_PASSWORD}"
```

Confirmat live: `SYNO.DSM.Info` răspunde întotdeauna
`{"error":{"code":119}}` („no session”) fără un ID de sesiune și, atunci
când protecția CSRF este activată, fără un `SynoToken` — niciunul dintre
ele nu poate fi obținut fără a apela mai întâi metoda de autentificare a
`SYNO.API.Auth` cu un cont și o parolă reale. Este un caz cu adevărat mai
simplu decât o autentificare completă prin formular HTML: un simplu API
JSON care primește numele de utilizator/parola ca parametri obișnuiți și
returnează ID-ul sesiunii ca un câmp JSON obișnuit, fără a fi nevoie de
un cookie jar sau de extragerea unui token CSRF. După citirea versiunii
urmează o deconectare, pe cât posibil, astfel încât colectarea să nu
acumuleze sesiuni deschise pe NAS de la o rulare la alta.

Eșecurile de autentificare de aici nu folosesc deloc coduri de stare
HTTP: fiecare apel al Web API-ului Synology răspunde `200` chiar și în
caz de eșec, cu `success: false` în corp — confirmat live, așa că această
sondă citește corpul, nu codul de stare, pentru a detecta o autentificare
respinsă.

## Câmpuri înregistrate

- `version` — extras din forma `"DSM <version> Update
  <n>"` a `version_string`, de exemplu `"DSM 7.3.2-86009 Update 4"` → `7.3.2-86009`
- `extra.update` — numărul Update-ului (`4`), începând cu 2.2, atunci când
  șirul îl conține; păstrat separat de `version`, astfel încât drift-ul și
  ciclul de viață compară în continuare versiunea însăși

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/). Începând cu 2.2. O versiune DSM
înseamnă versiune, build și Update (`7.2.1-69057 Update 6`), iar bazele
de date o delimitează ca `7.2.1-69057-6`; `version` și `extra.update` ale
sondei sunt combinate într-o singură versiune comparabilă pentru căutare.
Un inventar colectat înainte de 2.2 nu are `extra.update` și este citit
ca Update 0 — Update-urile corectate pot fi semnalate, niciunul nu este
omis. Intervalele per ramură ale BDU raportează în continuare în exces pe
ramurile mai vechi (cele ale NVD nu) — consultați
[Dell iDRAC și Synology DSM](/ro/cve/#dell-idrac-și-synology-dsm) și
[Limitări cunoscute](/ro/cve/#limitări-cunoscute).

## Rezolvatorul ciclului de viață

Niciunul — endoflife.date nu are un calendar pentru `synology-dsm`,
`synology` sau `dsm` (404 confirmat). Doar pentru inventar, deocamdată.
