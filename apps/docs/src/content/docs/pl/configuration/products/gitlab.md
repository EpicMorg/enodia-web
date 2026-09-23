---
title: GitLab
description: Konfiguracja enodia do sondowania produktu GitLab.
---

Odczytuje wersję z `GET /api/v4/version`.

```yaml
targets:
  - id: gitlab-main
    product: gitlab
    address: https://gitlab.example.com
    credentials: gitlab-token
```

## Uwierzytelnianie

GitLab domyślnie wymaga poświadczeń dla tego endpointu — nieuwierzytelnione
żądanie otrzymuje `401`. Osobisty token dostępu (personal access token)
działa na oba sposoby, co potwierdzono na żywo na rzeczywistej instancji:

```yaml
credentials:
  gitlab-token:
    kind: token-header
    header: PRIVATE-TOKEN
    value: "${GITLAB_TOKEN}"

  # równie poprawne — ten sam token jako zwykły token bearer
  gitlab-token-bearer:
    kind: bearer
    value: "${GITLAB_TOKEN}"
```

## Rejestrowane pola

- `version`
- `extra.revision`, jeśli występuje
- `extra.enterprise` — `"true"`/`"false"`, GitLab EE czy CE

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/). Uwzględnia edycję: sonda zapisuje edycję serwera w `extra.enterprise`, a instancja community nie widzi wyników dotyczących wyłącznie edycji enterprise. Przy nieznanej edycji zachowywane są wszystkie wyniki.

## Resolver cyklu życia

`endoflife:gitlab`.
