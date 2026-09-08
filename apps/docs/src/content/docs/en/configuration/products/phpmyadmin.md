---
title: phpMyAdmin
description: Configuring enodia to probe phpMyAdmin.
---

Reads the version out of the login page's own `CommonParams.setAll({...})`
bootstrap call — phpMyAdmin's JS uses this object for every AJAX request
it makes, so it ships on every page, authenticated or not, with no
separate version endpoint needed.

```yaml
targets:
  - id: phpmyadmin-main
    product: phpmyadmin
    address: https://phpmyadmin.example.com
```

## Authentication

None — confirmed live against a real `phpmyadmin/phpmyadmin` container.

## Recorded fields

Only `version` — this probe records no `extra` fields.

## Lifecycle resolver

`endoflife:phpmyadmin`.
