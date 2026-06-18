# 🚀 AKTUALIZÁCIA APLIKÁCIE NA GITHUB

## Zmeny v tejto verzii (v1.93):
- ✅ SYSTÉM: Pridaná automatická diagnostika Iframe prostredia, ktorá upozorní používateľa, ak mu maskovaná doména blokuje inštaláciu.

## POSTUP - Skopíruj do Git Bash:

```bash
cd "c:\Users\doros\Desktop\Programovanie\Web a App_V1_01\Bpinr_app_v1_01"
git remote set-url origin https://app.bpinr.sk/
git add .
git commit -m "Update v1.93: Add iframe detection for PWA install block"
git push -u origin main --force
```

## ⏳ Čo sa stane potom:
1. GitHub aktualizuje stránku (1-2 minúty)
2. Service Worker detekuje zmenu (v1.79)
3. Stlačením **OK** v aplikácii sa vykoná aktualizácia
4. Nová verzia BP & INR je pripravená! 🎉

## ✅ Hotovo!

Hlavná doména: https://app.bpinr.sk/
Záloha (GitHub Pages): https://daneh471.github.io/Zdravie_plus/
Záloha (Vercel): https://zdravie-plus-ma1j.vercel.app/