---
title: Kitsu
description: Configurarea enodia pentru a sonda Kitsu (frontendul CG-Wire pentru urmărirea producției).
---

„Kitsu” este marca cunoscută în mod obișnuit pentru stack-ul CG-Wire de
urmărire a producției, dar Kitsu în sine este un frontend Vue.js **fără
un endpoint de versiune propriu**. Ceea ce răspunde efectiv la
`GET /api/status` — confirmat live, inclusiv pe o gazdă numită literal
„kitsu” în DNS — este [Zou](/ro/configuration/products/zou/), backendul
API cu care comunică Kitsu. Îndreptați `address` spre același backend,
exact ca pentru `product:
zou` — nu există un URL „Kitsu” separat de configurat.

```yaml
targets:
  - id: kitsu-main
    product: kitsu
    address: https://kitsu.example.com
```

## Autentificare

Niciuna — endpointul nu acceptă nicio formă de credențiale.

## De ce `kitsu` este un produs separat de `zou`, nu un alias

Ambele indică același backend Zou și același endpoint, dar au nevoie de
**rezolvatori diferiți ai ciclului de viață**: depozitul GitHub propriu
`cgwire/zou` publică doar tag-uri git simple (confirmat live — API-ul său
Releases returnează o listă goală), pe care rezolvatorul GitHub Releases
al enodia nu le poate citi deloc. `cgwire/kitsu` are GitHub Releases
reale și este ceea ce o instalare care se consideră „rulând Kitsu”
dorește de fapt să urmărească. Numerele de versiune ale celor două
depozite diferă cu adevărat (backendul Zou este înaintea Kitsu), așa că
o comparație sub numele „tehnic mai precis” `zou` ar compara în tăcere
cu numerele componentei greșite — de aici două produse înregistrate care
împart o singură implementare de sondă, nu un singur produs cu un alias.

## Câmpuri înregistrate

- `version`
- `extra.databaseUp`, `extra.keyValueStoreUp`, `extra.eventStreamUp`,
  `extra.jobQueueUp`, `extra.indexerUp` — indicatori de sănătate ai
  componentelor, `"true"`/`"false"`

## Corelare CVE

Nu se corelează — niciuna dintre baze de date nu are date utilizabile pentru acest produs. Consultați [Corelare CVE](/ro/cve/#ce-produse-sunt-potrivite).

## Rezolvatorul ciclului de viață

`github:cgwire/kitsu` — doar cel mai recent release GitHub; fără date
eol/support/lts (GitHub nu are nicio opinie despre politica ciclului de
viață, doar despre „care este cel mai recent tag”).
