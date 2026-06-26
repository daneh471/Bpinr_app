# 🚀 AKTUALIZÁCIA APLIKÁCIE NA GITHUB

## Zmeny v tejto verzii (v2.36):
- ✅ **SECURITY:** Pridané šifrovanie všetkých lokálnych dát (AES-GCM).

## POSTUP - Skopíruj do Git Bash:

```bash
cd "c:\Users\doros\Desktop\Programovanie\Web a App_V1_01\Bpinr.app"
git remote set-url origin https://github.com/daneh471/Zdravie_plus.git
git add .
git commit -m "Release v2.36: Add data encryption"
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
Záloha (Vercel): https://zdravieplus123.vercel.app/