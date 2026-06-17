# 🚀 AKTUALIZÁCIA APLIKÁCIE NA GITHUB

## Zmeny v tejto verzii (v1.71):
- ✅ IKONA: Nastavené čierne pozadie pre ikonu na ploche a splash screen.
- ✅ MANIFEST: Vytvorenie a prepojenie nového `manifest.json` pre lepšiu PWA integráciu.
- ✅ STABILITA: Drobné úpravy pre zabezpečenie správneho priebehu aktualizácií.

## POSTUP - Skopíruj do Git Bash:

```bash
cd "c:\Users\doros\Desktop\Programovanie\Web a App_V1_01\Bpinr_app_v1_01"
git remote set-url origin https://github.com/daneh471/Zdravie_plus.git
git add .
git commit -m "Update v1.71: Black background for PWA icon"
git push -u origin main --force
```

## ⏳ Čo sa stane potom:
1. GitHub aktualizuje stránku (1-2 minúty)
2. Service Worker detekuje zmenu (v1.71)
3. Stlačením **OK** v aplikácii sa vykoná aktualizácia
4. **POZOR:** Ak sa názov na ploche nezmenil, vymaž starú ikonu a pridaj aplikáciu na plochu znova cez prehliadač.
5. Nová verzia BP & INR je pripravená! 🎉

## ✅ Hotovo!

Hlavná doména: https://app.bpinr.sk/
Záloha (GitHub Pages): https://daneh471.github.io/Zdravie_plus/
Záloha (Vercel): https://zdravie-plus-ma1j.vercel.app/