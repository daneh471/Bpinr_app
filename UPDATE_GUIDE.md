# 🚀 AKTUALIZÁCIA APLIKÁCIE NA GITHUB

## Zmeny v tejto verzii (v1.74):
- ✅ FUNKCIA: Gesto "Krok späť" (potiahnutie zľava doprava) teraz funguje kdekoľvek na displeji.
- ✅ OPRAVA: Odstránený vizuálny pásik hlavičky pri exporte aktuálneho mesiaca do PDF.
- ✅ DIZAJN: Zjednotené farby tlačidiel (modrá a zelená) v modálnych oknách a v archíve.

## POSTUP - Skopíruj do Git Bash:

```bash
cd "c:\Users\doros\Desktop\Programovanie\Web a App_V1_01\Bpinr_app_v1_01"
git remote set-url origin https://github.com/daneh471/Zdravie_plus.git
git add .
git commit -m "Update v1.74: Global swipe back gesture, PDF fixes, UI colors"
git push -u origin main --force
```

## ⏳ Čo sa stane potom:
1. GitHub aktualizuje stránku (1-2 minúty)
2. Service Worker detekuje zmenu (v1.72)
3. Stlačením **OK** v aplikácii sa vykoná aktualizácia
4. Nová verzia BP & INR je pripravená! 🎉

## ✅ Hotovo!

Hlavná doména: https://app.bpinr.sk/
Záloha (GitHub Pages): https://daneh471.github.io/Zdravie_plus/
Záloha (Vercel): https://zdravie-plus-ma1j.vercel.app/