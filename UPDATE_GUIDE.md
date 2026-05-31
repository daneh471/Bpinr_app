# 🚀 AKTUALIZÁCIA APLIKÁCIE NA GITHUB

## Zmeny v tejto verzii:
- ✅ Responzívne prihlasovacie a registračné okno bez nutnosti skrolovania
- ✅ Optimalizácia informačného modálu pre všetky veľkosti mobilov
- ✅ Oprava pretekania textu "Registrácia" v modrom tlačidle
- ✅ Úprava zobrazenia verzie na v85
- ✅ Aktualizácia Service Workera na v85

## POSTUP - Skopíruj do Git Bash:

```bash
cd "c:\Users\doros\Desktop\Nový priečinok"
git remote set-url origin https://github.com/daneh471/Zdravie_plus.git
git add .
git commit -m "Update v85: Fixed button text overflow in auth screen"
git push origin main --force
```

## ⏳ Čo s
1. GitHub aktualizuje stránku (1-2 minúty)
2. Service Worker detekuje zmenu (v33)
4. Stlačením **OK** sa app automaticky reloaduje
5. Nová verzia je načítaná! 🎉

## ✅ Hotovo!

GitHub Pages: https://daneh471.github.io/Zdravie_plus/
Vercel: https://zdravieplus123.vercel.app/
