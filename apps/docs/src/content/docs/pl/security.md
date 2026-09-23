---
title: Bezpieczeństwo
description: Jak enodia obchodzi się z poświadczeniami do infrastruktury.
---

enodia przechowuje poświadczenia do infrastruktury. Kilka konsekwencji
tego faktu jest zamierzonych, a nie przypadkowych:

- **Poświadczenia nigdy się nie pojawiają** w inwentarzu, eksportowanych
  raportach ani logach.
- **HTTPS jest próbowane przed HTTP.** Poświadczenia nigdy nie są
  wysyłane zwykłym HTTP, chyba że zostanie to jawnie włączone dla
  konkretnej usługi przez `allow_insecure_transport: true` — zobacz
  [Koncepcje](/pl/concepts/#najpierw-https-poświadczenia-domyślnie-nigdy-nie-są-wysyłane-otwartym-tekstem).
- **Weryfikacja TLS jest domyślnie włączona.** Obsługiwane są własne CA
  (`tls.ca_file`) i przypinanie certyfikatów (`tls.pin_sha256`), tak aby
  `tls.insecure: true` pozostawało rzeczywiście ostatecznością — zobacz
  [Konfiguracja](/pl/configuration/#tls-tls). Usługi sprawdzane bez
  weryfikacji są oznaczane w raporcie, a nie po cichu akceptowane.
- **Sekrety są przechowywane osobno.** W nazwanym wpisie `credentials:`
  albo w osobnym pliku `credentials.yaml` wskazanym przez
  `credentials_file` — zobacz
  [Konfiguracja](/pl/configuration/#credentials_file) — dzięki czemu
  inwentarz usług (`enodia.yaml`) można zatwierdzić w git, a sekretów
  nie.

Znaleziono problem z bezpieczeństwem? Sposób odpowiedzialnego zgłoszenia
opisuje plik
[SECURITY.md](https://github.com/EpicMorg/enodia/blob/master/SECURITY.md)
enodia na GitHubie.

## Licencja

enodia jest udostępniana na licencji **AGPL-3.0-or-later**. Jeśli AGPL
nie pasuje do danej sytuacji, dostępna jest licencja komercyjna —
kontakt: [developer@epicm.org](mailto:developer@epicm.org).

Wniesienie wkładu wymaga podpisania CLA enodia (bot obsługuje to przy
pierwszym pull requeście) — istnieje ono po to, aby projekt mógł być
oferowany na warunkach komercyjnych obok AGPL, a autor zachowuje prawa
autorskie do własnej pracy.
