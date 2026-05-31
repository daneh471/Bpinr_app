# 🚀 AKTUALIZÁCIA APLIKÁCIE NA GITHUB

## Zmeny v tejto verzii:
- ✅ Odstránenie systémových alert/confirm okien
- ✅ Implementované vlastné dizajnové dialógy
- ✅ Potvrdenie odhlásenia používateľa
- ✅ Nové farebné rozlíšenie (žltá, zelená, červená)
- ✅ Pridané zobrazenie verzie vľavo dole (v79)
- ✅ Aktualizácia Service Workera na v79

## POSTUP - Skopíruj do Git Bash:

```bash
cd "c:\Users\doros\Desktop\Nový priečinok"
git remote set-url origin https://github.com/daneh471/Zdravie_plus.git
git add .
git commit -m "Update v79: Custom dialogs and color updates"
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
