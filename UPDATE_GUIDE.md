# 🚀 AKTUALIZÁCIA APLIKÁCIE NA GITHUB

## Zmeny v tejto verzii:
- ✅ Implementovaná podpora SKIP_WAITING správy pre Service Workera
- ✅ Tlačidlo OK v aktualizačnom dialógu teraz vynucuje okamžitý swap verzií
- ✅ Zlepšená detekcia čakajúceho Service Workera (reg.waiting)
- ✅ Úprava zobrazenia verzie na v2.4
- ✅ Aktualizácia Service Workera na v2.4

## POSTUP - Skopíruj do Git Bash:

```bash
cd "c:\Users\doros\Desktop\zdravieplus"
git remote set-url origin https://github.com/daneh471/Zdravie_plus.git
git add .
git commit -m "Update v2.4: Forced PWA update logic via SKIP_WAITING"
git push origin main --force
```

## ⏳ Čo s
1. GitHub aktualizuje stránku (1-2 minúty)
2. Service Worker detekuje zmenu (v2.0)
4. Stlačením **OK** sa app automaticky reloaduje
5. Nová verzia je načítaná! 🎉

## ✅ Hotovo!

GitHub Pages: https://daneh471.github.io/Zdravie_plus/
Vercel: https://zdravieplus123.vercel.app/
