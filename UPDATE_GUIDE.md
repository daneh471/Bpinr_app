# 🚀 AKTUALIZÁCIA APLIKÁCIE NA GITHUB

## Zmeny v tejto verzii:
- ✅ Návrat k Firebase (Auth & Cloud Firestore)
- ✅ Cloudová synchronizácia dát medzi zariadeniami
- ✅ Oprava radenia záznamov v archíve
- ✅ Rozšírené informácie o TAB, INR, SYS, DIA a PULZ
- ✅ Pridané zobrazenie verzie vľavo dole (v78)
- ✅ Aktualizácia Service Workera na v78

## POSTUP - Skopíruj do Git Bash:

```bash
cd "c:\Users\doros\Desktop\Nový priečinok"
git remote set-url origin https://github.com/daneh471/Zdravie_plus.git
git add .
git commit -m "Update v78: Added version display"
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
