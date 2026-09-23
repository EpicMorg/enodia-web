---
title: Pierwsze kroki
description: Instalacja enodia i pierwsze sprawdzenie.
---

## Instalacja

Najprostsza droga — jedno polecenie, które samo wybiera właściwy plik
binarny dla danego systemu i architektury:

```bash
curl -fsSL https://get.enodia.sh/unix | sh   # Linux/macOS/Android (Termux)
```

```powershell
irm https://get.enodia.sh/windows | iex      # Windows
```

`enodia` można uruchomić od razu w tym samym oknie PowerShell —
instalator modyfikuje `PATH` bieżącej sesji bezpośrednio, a nie tylko
wartość zapisaną w rejestrze, którą odczytałby dopiero nowy terminal.

W systemie Windows działa również
[Chocolatey](https://community.chocolatey.org/packages/enodia), jeśli
aktualizacje ma śledzić menedżer pakietów (pakiet winget jest w
przygotowaniu, jeszcze nie został opublikowany):

```powershell
choco install enodia
```

:::tip[Działa także w Termux (Android)]
To samo jednolinijkowe polecenie dla Uniksa działa bez zmian —
potwierdzone na prawdziwym urządzeniu — ale pod spodem instaluje inny
plik binarny niż na zwykłym Linuksie. Linker Bionic w Androidzie
odmawia uruchomienia czegokolwiek poza plikiem PIE (`ET_DYN`) (polityka
jądra/linkera od Androida Lollipop), a zwykła kompilacja `linux/arm64`
enodia to zwykły `ET_EXEC` — przy pierwszej próbie w ogóle się nie
uruchomiła. `install.sh` wykrywa Termux po `$TERMUX_VERSION` i zamiast
tego pobiera dedykowaną kompilację `android/arm64` (`GOOS=android`, PIE,
interpreter `/system/bin/linker64` — ścieżka, która na pewno istnieje na
każdym urządzeniu z Androidem, a nie coś, co musiałby dostarczać sam
Termux). Jako katalogu instalacji używa też awaryjnie `$PREFIX/bin`, gdy
standardowy katalog nie jest zapisywalny, a `sudo` nie wchodzi w grę
(opcjonalny pakiet `sudo` Termuxa istnieje, ale na urządzeniu bez roota
po prostu odmawia działania) — nie trzeba więc do niczego z tego
nadpisywać zmiennych środowiskowych; arm64 to obecnie jedyna budowana
architektura dla Androida.
:::

:::caution[Urządzenia z Androidem z rootem mogą wymagać `su`]
Potwierdzone w praktyce: na urządzeniu **z rootem** (Magisk/KernelSU)
nawet właściwy plik binarny `android_arm64` może nie dać się uruchomić
jako zwykły użytkownik Termuxa — Cobra zgłasza wtedy coś w rodzaju
`unknown command "<path-to-enodia>" for "enodia"`, co w rzeczywistości
oznacza, że system w ogóle nie przekazał plikowi binarnemu jego własnych
argumentów. Uruchomienie dokładnie tego samego pliku przez `su` z pełną
ścieżką działa. To znany, otwarty błąd upstream —
[termux-exec#40](https://github.com/termux/termux-exec/issues/40):
logika wyjątków linkera w `termux-exec` nie rozpoznaje kontekstów
procesów Magisk/KernelSU/`run-as`/ADB, w których urządzenie z rootem
często umieszcza nawet zwykłą sesję Termuxa. Ani kompilacja enodia, ani
`install.sh` nie są w stanie tego obejść — na urządzeniu bez roota ten
problem w ogóle nie powinien wystąpić.
:::

Można też użyć pakietu, jeśli aktualizacje ma śledzić menedżer pakietów:

```bash
sudo dpkg -i enodia_linux_amd64.deb                # Debian/Ubuntu
sudo rpm -i enodia_linux_amd64.rpm                 # Fedora/RHEL
apk add --allow-untrusted enodia_linux_amd64.apk   # Alpine
sudo pacman -U enodia_linux_amd64.pkg.tar.zst      # Arch
```

Każdy pakiet instaluje plik binarny w `/usr/bin/enodia`, strony man
w `/usr/share/man/man1/` i tworzy dedykowanego, nieuprzywilejowanego
użytkownika systemowego `enodia` — nic tu nie wymaga uprawnień roota do
działania. Właściwy pakiet można pobrać z
[najnowszego wydania](https://github.com/EpicMorg/enodia/releases/latest).

Albo kontener:

```bash
docker run --rm \
  -v /etc/enodia:/config:ro \
  ghcr.io/epicmorg/enodia:latest check --config /config/config.yaml
```

**Od wersji 1.1.0 ten obraz jest budowany i publikowany przez
repozytorium towarzyszące**,
[EpicMorg/docker](https://github.com/EpicMorg/docker/tree/master/linux/ecosystem/apps/enodia),
według własnego harmonogramu — nie przez potok wydań tego projektu,
choć adres publikacji i tagi pozostają takie same. Obraz jest też
publikowany w `docker.io/epicmorg/enodia` i Quay, z tymi samymi tagami —
`latest`, sama wersja główna (`2`) oraz dokładna wersja bez sufiksu
kompilacji (np. `2.0.0` — potwierdzone na żywo we wszystkich trzech
rejestrach; tagi wcześniejszego potoku wyglądały zamiast tego jak
`1.0.0-1`, nadal można je pobrać, ale nowe wydania nie są już tak
tagowane). Dwie realne zmiany, o których warto wiedzieć: obraz jest
teraz **wyłącznie `linux/amd64`** (arm64 porzucono przy przeniesieniu
publikacji) i działa jako **root**, a nie jako dedykowany użytkownik,
na własnym obrazie bazowym projektu `debian:trixie-light` zamiast
`scratch`.

### Kompilacja ze źródeł

Wymaga Go — dokładną wersję, na którą obecnie celuje enodia, podaje
plik `go.mod`.

```bash
git clone https://github.com/EpicMorg/enodia.git
cd enodia
go build -o enodia ./cmd/enodia
./enodia version
```

### Obsługiwane platformy

| System | Architektura | Minimalna wersja |
|---|---|---|
| Linux | amd64, arm64 | Jądro 3.2 lub nowsze — Debian 8+, Ubuntu 14.04+, RHEL/CentOS 7+ spełniają to z zapasem |
| Windows | amd64, arm64, 386 | Windows 10 / Windows Server 2016 lub nowszy |
| macOS | amd64, arm64 | macOS 12 Monterey lub nowszy |
| Android (Termux) | tylko arm64 | Android 7 lub nowszy — [minimum samego Termuxa](https://github.com/termux/termux-app), bardziej restrykcyjne niż minimum Androida 5.0 Lollipop z obsługą PIE, które faktycznie wymusiło osobną kompilację (zobacz uwagę o Termuxie powyżej). Urządzenia z rootem mogą wymagać `su` — zobacz ostrzeżenie powyżej |

Są to minima samego zestawu narzędzi Go, a nie coś, co enodia dokłada
od siebie. Kompilacja ze źródeł nowszą wersją Go podnosi minimum dla
macOS jeszcze wyżej — to decyzja zestawu narzędzi, a nie projektu.

## Pierwsza konfiguracja

Należy utworzyć `enodia.yaml` obok pliku binarnego (albo w dowolnej
z lokalizacji wymienionych w sekcji
[Konfiguracja](/pl/configuration/#lokalizacje-plików)):

```yaml title="enodia.yaml"
schemaVersion: 1
targets:
  - id: gitlab-main
    product: gitlab
    address: https://gitlab.example.com
```

Następnie uruchomić:

```bash
enodia check
```

```console
ID           PRODUCT  PATCH  LIFECYCLE  BRANCH  SEVERITY  REASON  CVES
gitlab-main  gitlab   ...
```

`check` bez `--from` zbiera i ocenia dane w jednym procesie — enodia
łączy się z celem, a następnie z internetem, aby sprawdzić dane cyklu
życia. Jeśli cel ma dostęp sieciowy tylko do infrastruktury (środowisko
zamknięte), a nie do internetu, należy zamiast tego rozdzielić obie
fazy:

```bash
# wewnątrz sieci zamkniętej - dostęp do internetu nie jest potrzebny
enodia collect --config enodia.yaml -o inventory.jsonl

# gdziekolwiek indziej - dostęp do usług nie jest potrzebny
enodia check --from inventory.jsonl
```

## Dodawanie poświadczeń

Cel z prywatnym API potrzebuje nazwanego poświadczenia, rozwiązywanego
z mapy `credentials:` w samym `enodia.yaml` (albo z osobnego pliku
`credentials.yaml` — zobacz [Konfiguracja](/pl/configuration/)):

```yaml title="enodia.yaml"
schemaVersion: 1
targets:
  - id: gitlab-main
    product: gitlab
    address: https://gitlab.example.com
    credentials: gitlab-token

credentials:
  gitlab-token:
    kind: token-header
    header: PRIVATE-TOKEN
    value: "${GITLAB_TOKEN}"
```

`${GITLAB_TOKEN}` jest podstawiane ze środowiska w chwili wczytywania —
zobacz [Konfiguracja](/pl/configuration/#podstawianie-zmiennych-środowiskowych).
Sekrety nigdy nie muszą znajdować się w tym samym pliku co inwentarz
usług.

## Dalej

- [Koncepcje](/pl/concepts/) — decyzje projektowe stojące za tym
  wszystkim.
- [Dokumentacja CLI](/pl/cli-reference/) — każde polecenie i flaga.
- [Widoki](/pl/views/) — `lifecycle`, `drift` i `fleet`, a nie tylko
  domyślna tabela.
