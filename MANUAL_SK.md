# 📖 Kompletný prehľad a manuál k aplikácii BP & INR

Vitajte v aplikácii **BP & INR**! Táto aplikácia slúži ako osobný, plne off-line digitálny denník na sledovanie vášho krvného tlaku, tepu, zrážanlivosti krvi (INR) a telesnej váhy. 

Aplikácia je navrhnutá tak, aby bola maximálne bezpečná, rýchla a jednoduchá na používanie. Tu je kompletný zoznam funkcií a vysvetlenie, ako fungujú.

---

## 1. 🛡️ Bezpečnosť a Súkromie (100% Offline)
Najväčšou výhodou tejto aplikácie je jej bezpečnosť:
- **Žiadny internet:** Aplikácia po nainštalovaní nepotrebuje internetové pripojenie.
- **Dáta sú len u vás:** Všetky vaše zdravotné záznamy, profil, lieky a váha sa ukladajú **výhradne do pamäte vášho telefónu** (tzv. Local Storage). Neexistuje žiadna cloudová databáza, nikto okrem vás k nim nemá prístup.
- **Šifrovaný PIN:** Váš prihlasovací 6-miestny PIN kód sa ukladá v zašifrovanej podobe, takže ho nedokáže prečítať ani prípadný škodlivý kód v telefóne.
- **Ochrana pred kyber-útokmi:** Vstupy používateľov sú chránené proti vloženiu škodlivého kódu (XSS ochrana).

---

## 2. 🔐 Vytvorenie účtu a Prihlásenie
- **Registrácia:** Pri prvom spustení si zadáte svoje Meno a zvolíte si 6-miestny PIN kód.
- **Viac účtov:** V jednom zariadení (napríklad na jednom tablete) môže mať účet aj viacero ľudí. Prihlasujete sa svojím menom a PIN kódom, vďaka čomu sa vám zobrazia výlučne vaše dáta.

---

## 3. ⚙️ Dva režimy používania
V menu aplikácie si môžete kedykoľvek prepnúť režim, podľa toho, čo potrebujete sledovať:
1. **Režim "INR + Tlak":** Zobrazuje všetky políčka pre záznam – INR, Počet tabletiek (TAB), Systolický tlak, Diastolický tlak a Pulz. Ideálne pre pacientov užívajúcich lieky na riedenie krvi.
2. **Režim "Iba Tlak":** Skryje políčka INR a TAB. Slúži čisto na evidenciu krvného tlaku a pulzu.

---

## 4. 📝 Pridávanie záznamov
- **Rýchle pridanie:** Hneď na hlavnej obrazovke nájdete políčka. Zadáte namerané hodnoty a kliknete na "Pridať záznam". Dátum a čas sa priradia automaticky k aktuálnej sekunde.
- **Manuálny záznam:** Ak ste si zabudli hodnoty zapísať hneď a máte ich na papieriku, cez menu vyberiete "Manuálny záznam". Tu môžete upraviť aj dátum a čas, aby presne zodpovedal dobe merania.

---

## 5. 🗂️ Archív a Prehľad
- Archív ukladá všetky vaše merania a automaticky ich zoraďuje od najnovších po najstaršie.
- **Farebné označenie (Semafor):** Hodnoty tlaku a tepu sa automaticky farbia (Modrá = nízky, Zelená = ideálny, Červená = vysoký). Hodnoty INR/TAB svietia fialovo a žlto (keďže cieľové hodnoty INR sú vysoko individuálne a určuje ich lekár).
- **Mesačný archív:** Záznamy sú prehľadne rozdelené do mesiacov. Staršie mesiace sú schované pod tlačidlom "Mesačný archív", kde si ich môžete rozkliknúť.

---

## 6. ⚖️ Archív váhy a Trendy
Aplikácia sleduje vývoj vašej telesnej váhy inteligentným spôsobom:
- Do profilu (alebo do Archívu váhy) zadáte svoju váhu.
- Aplikácia uloží pre každý mesiac len **1 aktuálnu hodnotu**. Ak sa počas jedného mesiaca odvážite trikrát a hodnotu prepíšete, aktualizuje sa ten istý mesačný záznam, aby ste nemali archív zaplavený desiatkami čísel. Keď príde nový mesiac, vytvorí sa nový riadok.
- **Trendy:** Aplikácia pri váhe zobrazuje šípky (↑, ↓, =), vďaka čomu hneď vidíte, či ste oproti minulému mesiacu pribrali, schudli, alebo si váhu držíte.

---

## 7. 📄 Profil a Karta liekov
V sekcii "Profil" si môžete viesť svoje kompletné osobné údaje:
- Meno, priezvisko, váha, výška.
- **Karta liekov:** Môžete si pridať lieky, ktoré užívate (názov, silu, počet kusov a kedy ich užívate - ráno, naobed, atď.). 

---

## 8. 🖨️ Export do PDF (Pre lekára)
Toto je jedna z najužitočnejších funkcií. Všetky vaše záznamy si viete vygenerovať do nádherného, naformátovaného PDF dokumentu (napríklad predtým, než idete na vyšetrenie).
- **PDF Záznamov:** Pri každom mesiaci je modré tlačidlo "PDF Export". Vytvorí sa tabuľka so všetkými meraniami, hlavičkou s vašimi údajmi a legendou.
- **PDF Karty liekov:** V profile si môžete exportovať čistú kartu liekov.
- PDF súbory majú na pozadí krásne, polopriehľadné vodoznaky a prispôsobujú sa tomu, v akom režime aplikáciu používate (Zobrazí vodoznak tlaku alebo srdca pre INR).

---

## 9. 👆 Moderné ovládanie (Gestá)
Aplikácia je prispôsobená pre moderné smartfóny.
- **Krok späť prstom:** Kdekoľvek v aplikácii môžete prejsť prstom zľava doprava (Swipe) a aplikácia vás vráti o krok späť (zatvorí sa otvorené okno, schová sa menu alebo archív). Nemusíte tak hľadať tlačidlá "Zatvoriť".

---

## 10. 🌍 Jazyky a Nastavenia
- **Slovenčina a Nemčina:** V Nastaveniach si môžete kedykoľvek prepnúť jazyk celej aplikácie.
- **Aktualizácie (PWA):** Keďže ide o progresívnu webovú aplikáciu, kedykoľvek vyjde nová verzia (napr. pridaná nová funkcia), aplikácia si ju stiahne na pozadí a automaticky vám vyhodí informačné okno s novinkami. Následne sa sama zaktualizuje po kliknutí na "OK".

---

## ⚠️ Dôležité upozornenie pre používateľov
Keďže je aplikácia 100% offline, vaše dáta **nie sú zálohované na cloude**. Ak si v prehliadači kompletne **vymažete vyrovnávaciu pamäť (cache)**, alebo stratíte telefón, **dáta budú nenávratne stratené**. 
Preto sa odporúča aspoň raz za čas urobiť si **PDF export svojich dát a uložiť si ho do súborov v telefóne.**