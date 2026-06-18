# 🚀 AKTUALIZÁCIA APLIKÁCIE NA GITHUB

## Zmeny v tejto verzii (v1.80):
- ✅ SYSTÉM: Presunutie zvyšných 3 obrázkov do zložky `img/`.
- ✅ SYSTÉM: Pridanie chýbajúcich obrázkov do Service Worker vyrovnávacej pamäte pre plnú offline dostupnosť.

## POSTUP - Skopíruj do Git Bash:

```bash
cd "c:\Users\doros\Desktop\Programovanie\Web a App_V1_01\Bpinr_app_v1_01"
mv "bp inr karta liekov.png" img/
mv "bp inr registracia.png" img/
mv "bp karta liekov.png" img/
git remote set-url origin https://github.com/daneh471/Zdravie_plus.git
git add .
git commit -m "Update v1.80: Move remaining images to img/ and update SW cache"
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