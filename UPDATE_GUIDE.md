# 🚀 AKTUALIZÁCIA APLIKÁCIE NA GITHUB

## Zmeny v tejto verzii:
- ✅ Vynútenie aktualizácie pre všetky zariadenia (Fix cache)
- ✅ Archív: Aktuálny mesiac + tlačidlo pre staršie mesiace
- ✅ Premenovanie aplikácie na BP & INR
- ✅ Aktualizácia Service Workera na v3.5

## POSTUP - Skopíruj do Git Bash:

```bash
cd "c:\Users\doros\Desktop\Programovanie\zdravieplus"
git remote set-url origin https://github.com/daneh471/Zdravie_plus.git
git add .
git commit -m "Update v3.5: Rename app to BP & INR"
git push origin main --force
```

## ⏳ Čo s
1. GitHub aktualizuje stránku (1-2 minúty)
2. Service Worker detekuje zmenu (v3.0)
4. Stlačením **OK** sa app automaticky reloaduje
5. Nová verzia je načítaná! 🎉

## ✅ Hotovo!

GitHub Pages: https://daneh471.github.io/Zdravie_plus/
Vercel: zdravie-plus-ma1j.vercel.app