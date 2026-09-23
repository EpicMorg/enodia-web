---
title: Primii pași
description: Instalați enodia și rulați prima verificare.
---

## Instalare

Calea cea mai simplă — o singură comandă, care alege binarul potrivit
pentru sistemul de operare și arhitectura dumneavoastră:

```bash
curl -fsSL https://get.enodia.sh/unix | sh   # Linux/macOS/Android (Termux)
```

```powershell
irm https://get.enodia.sh/windows | iex      # Windows
```

`enodia` poate fi rulat imediat după aceea în aceeași fereastră
PowerShell — programul de instalare modifică direct `PATH`-ul sesiunii
curente, nu doar valoarea persistată în registru pe care ar prelua-o un
terminal nou.

Pe Windows funcționează și [Chocolatey](https://community.chocolatey.org/packages/enodia),
dacă preferați ca managerul de pachete să urmărească actualizările (un
pachet winget este pe drum, încă nepublicat):

```powershell
choco install enodia
```

:::tip[Funcționează și în Termux (Android)]
Aceeași comandă Unix funcționează fără modificări — confirmat pe un
dispozitiv real — dar în culise instalează un alt binar decât pe un Linux
obișnuit. Linker-ul Bionic din Android refuză să execute altceva decât un
binar PIE (`ET_DYN`) (o politică a kernelului/linker-ului începând cu
Android Lollipop), iar build-ul obișnuit `linux/arm64` al enodia este un
simplu `ET_EXEC` — care, la prima încercare, nu a putut fi executat
deloc. `install.sh` detectează Termux prin `$TERMUX_VERSION` și descarcă
în schimb un build dedicat `android/arm64` (`GOOS=android`, PIE,
interpretor `/system/bin/linker64` — o cale garantată pe orice dispozitiv
Android, nu ceva ce Termux trebuie să furnizeze). De asemenea, revine la
`$PREFIX/bin` ca director de instalare atunci când directorul obișnuit nu
poate fi scris și `sudo` nu este o opțiune reală (pachetul opțional
`sudo` al Termux există, dar pur și simplu refuză pe un dispozitiv fără
root) — așa că nu este necesară nicio suprascriere prin variabile de
mediu pentru nimic din toate acestea; arm64 este singura arhitectură
Android pentru care se face build astăzi.
:::

:::caution[Dispozitivele Android cu root pot necesita `su`]
Confirmat în practică: pe un dispozitiv **cu root** (Magisk/KernelSU),
binarul corect `android_arm64` poate totuși să nu se execute ca
utilizator Termux obișnuit — Cobra raportează ceva de genul
`unknown command "<path-to-enodia>" for "enodia"`, ceea ce înseamnă de
fapt că sistemul de operare nu transmite deloc binarului propriile
argumente. Rularea exact a aceluiași binar prin `su`, cu calea completă,
funcționează. Este un bug cunoscut, deschis, din amonte —
[termux-exec#40](https://github.com/termux/termux-exec/issues/40):
logica de excepție de la linker a `termux-exec` nu recunoaște contextele
de proces Magisk/KernelSU/`run-as`/ADB, în care un dispozitiv cu root
plasează adesea chiar și o sesiune Termux obișnuită. Nu este ceva ce
build-ul enodia sau `install.sh` pot ocoli — un dispozitiv fără root nu
ar trebui să întâmpine deloc această problemă.
:::

Sau un pachet, dacă preferați ca managerul de pachete să urmărească
actualizările:

```bash
sudo dpkg -i enodia_linux_amd64.deb                # Debian/Ubuntu
sudo rpm -i enodia_linux_amd64.rpm                 # Fedora/RHEL
apk add --allow-untrusted enodia_linux_amd64.apk   # Alpine
sudo pacman -U enodia_linux_amd64.pkg.tar.zst      # Arch
```

Fiecare pachet instalează binarul în `/usr/bin/enodia`, paginile de
manual în `/usr/share/man/man1/` și creează un utilizator de sistem
dedicat, neprivilegiat, `enodia` — nimic de aici nu necesită root pentru
a rula. Descărcați pachetul potrivit din
[cea mai recentă versiune](https://github.com/EpicMorg/enodia/releases/latest).

Sau un container:

```bash
docker run --rm \
  -v /etc/enodia:/config:ro \
  ghcr.io/epicmorg/enodia:latest check --config /config/config.yaml
```

**Începând cu 1.1.0, această imagine este construită și publicată de un
repository însoțitor**,
[EpicMorg/docker](https://github.com/EpicMorg/docker/tree/master/linux/ecosystem/apps/enodia),
după propriul program — nu mai este publicată de pipeline-ul de lansare
al acestui proiect, deși adresa publicată și tag-urile rămân aceleași.
Este publicată și în `docker.io/epicmorg/enodia` și pe Quay, cu aceleași
tag-uri — `latest`, versiunea majoră simplă (`2`) și versiunea exactă
fără sufix de build (de exemplu `2.0.0` — confirmat în practică pe toate
cele trei registre; tag-urile unui pipeline anterior arătau în schimb ca
`1.0.0-1`, încă disponibile pentru pull, doar că noile versiuni nu mai
sunt etichetate astfel de acum înainte). Două schimbări reale care merită
știute: imaginea este acum **doar `linux/amd64`** (arm64 a fost renunțat
odată cu mutarea publicării) și rulează ca **root** în loc de un
utilizator dedicat, pe baza proprie a proiectului, `debian:trixie-light`,
în loc de `scratch`.

### Build din surse

Necesită Go — verificați `go.mod` pentru versiunea exactă pe care o
vizează în prezent enodia.

```bash
git clone https://github.com/EpicMorg/enodia.git
cd enodia
go build -o enodia ./cmd/enodia
./enodia version
```

### Platforme acceptate

| Sistem de operare | Arhitectură | Versiune minimă |
|---|---|---|
| Linux | amd64, arm64 | Kernel 3.2 sau mai nou — Debian 8+, Ubuntu 14.04+, RHEL/CentOS 7+ se încadrează toate fără probleme |
| Windows | amd64, arm64, 386 | Windows 10 / Windows Server 2016 sau mai nou |
| macOS | amd64, arm64 | macOS 12 Monterey sau mai nou |
| Android (Termux) | doar arm64 | Android 7 sau mai nou — [pragul propriu al Termux](https://github.com/termux/termux-app), mai strict decât minimul Android 5.0 Lollipop pentru suportul PIE, care a determinat de fapt build-ul separat (consultați nota despre Termux de mai sus). Dispozitivele cu root pot necesita `su` — consultați avertismentul de mai sus |

Acestea sunt pragurile proprii ale toolchain-ului Go, nu ceva adăugat de
enodia. Un build din surse cu o versiune Go mai nouă ridică și mai mult
pragul pentru macOS — aceasta este o decizie a toolchain-ului, nu a
proiectului.

## Prima configurație

Creați `enodia.yaml` lângă binar (sau în oricare dintre locațiile
enumerate în [Configurare](/ro/configuration/#locațiile-fișierelor)):

```yaml title="enodia.yaml"
schemaVersion: 1
targets:
  - id: gitlab-main
    product: gitlab
    address: https://gitlab.example.com
```

Apoi rulați:

```bash
enodia check
```

```console
ID           PRODUCT  PATCH  LIFECYCLE  BRANCH  SEVERITY  REASON  CVES
gitlab-main  gitlab   ...
```

`check` fără `--from` colectează și evaluează într-un singur proces —
enodia accesează ținta, apoi accesează internetul pentru a verifica
datele ciclului de viață. Dacă ținta are acces de rețea doar la
infrastructura dumneavoastră (un mediu închis), nu și la internet,
separați în schimb cele două faze:

```bash
# în interiorul rețelei închise - nu este nevoie de internet
enodia collect --config enodia.yaml -o inventory.jsonl

# oriunde altundeva - nu este nevoie de acces la serviciile dumneavoastră
enodia check --from inventory.jsonl
```

## Adăugarea credențialelor

O țintă cu un API privat are nevoie de o credențială cu nume, rezolvată
din harta `credentials:` a fișierului `enodia.yaml` (sau dintr-un fișier
separat `credentials.yaml` — consultați [Configurare](/ro/configuration/)):

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

`${GITLAB_TOKEN}` este interpolat din mediu la încărcare — consultați
[Configurare](/ro/configuration/#interpolarea-variabilelor-de-mediu).
Secretele nu trebuie să se afle niciodată în același fișier cu inventarul
serviciilor dumneavoastră.

## Mai departe

- [Concepte](/ro/concepts/) pentru deciziile de design din spatele
  tuturor acestora.
- [Referință CLI](/ro/cli-reference/) pentru fiecare comandă și flag.
- [Vizualizări](/ro/views/) pentru `lifecycle`, `drift` și `fleet` — nu
  doar tabelul implicit.
